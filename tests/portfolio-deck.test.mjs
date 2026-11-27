import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { after, before, test } from 'node:test';
import { chromium, devices } from 'playwright-core';
import { createServer as createViteServer } from 'vite';

let vite;
let server;
let browser;
let url;

before(async () => {
  vite = await createViteServer({
    server: { middlewareMode: true, hmr: false, watch: null },
  });
  server = createServer(vite.middlewares);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  url = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await vite?.close();
  server?.close();
});

async function onPage(options, check) {
  const page = await browser.newPage(options);
  page.setDefaultTimeout(8_000);
  try {
    await page.route('**/*', (route) => route.request().url().startsWith(url) ? route.continue() : route.abort());
    await check(page);
  } finally {
    await page.context().close();
  }
}

async function expectSlide(page, index) {
  await page.waitForFunction((index) => {
    const deck = document.querySelector('.portfolio-deck');
    const status = document.querySelector('.portfolio-controls [aria-live]');
    return deck && status?.textContent.startsWith(`${index + 1} /`) &&
      Math.abs(deck.scrollLeft - index * deck.clientWidth) < 1;
  }, index);
}

test('wheel, arrows and native horizontal gestures snap one full-width slide at a time', async () => {
  await onPage({ viewport: { width: 1280, height: 900 } }, async (page) => {
    await page.goto(url);
    await expectSlide(page, 0);
    const deck = page.getByRole('main', { name: 'Portfolio slides' });
    const slides = deck.locator(':scope > .portfolio-slide');
    assert.equal(await slides.count(), 13);
    const [width, height, snapType] = await deck.evaluate((element) => [
      element.clientWidth, element.clientHeight, getComputedStyle(element).scrollSnapType,
    ]);
    assert.equal(width, 1280);
    assert.equal(snapType, 'x mandatory');
    assert.equal(await page.evaluate(() => document.documentElement.scrollHeight), 900);
    for (const slide of await slides.all()) {
      assert.deepEqual(await slide.evaluate((element) => [element.offsetWidth, element.offsetHeight]), [width, height]);
    }

    await page.waitForFunction(() => {
      const hero = document.querySelector('.portfolio-slide');
      return hero.scrollHeight - hero.clientHeight <= 1;
    });
    await page.mouse.move(100, 250);
    await page.mouse.wheel(0, 100);
    await expectSlide(page, 1);
    await page.keyboard.press('ArrowRight');
    await expectSlide(page, 2);
    await page.keyboard.press('ArrowLeft');
    await expectSlide(page, 1);
    await page.getByRole('button', { name: 'Previous slide' }).click();
    await expectSlide(page, 0);

    await page.mouse.move(100, 250);
    const horizontal = await deck.evaluate((element) => element.dispatchEvent(
      new WheelEvent('wheel', { deltaX: 120, deltaY: 30, bubbles: true, cancelable: true }),
    ));
    assert.equal(horizontal, true);
    await page.mouse.wheel(width, 0);
    await expectSlide(page, 1);

    const previous = page.getByRole('button', { name: 'Previous slide' });
    await previous.click();
    await expectSlide(page, 0);
    await page.getByRole('button', { name: 'See my work' }).click();
    await expectSlide(page, 2);
  });
});

test('overflow scrolls vertically without advancing the deck, and section links still work', async () => {
  await onPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' }, async (page) => {
    await page.goto(`${url}/#projects`);
    await expectSlide(page, 2);
    const projects = page.locator('.portfolio-slide[aria-label="Projects"]');
    assert.equal(await projects.evaluate((element) => element.scrollTop), 0);
    await page.mouse.move(100, 300);
    await page.mouse.wheel(0, 500);
    await page.waitForFunction(() => document.querySelector('#projects').parentElement.scrollTop > 0);
    await expectSlide(page, 2);

    await projects.evaluate((element) => { element.scrollTop = element.scrollHeight; });
    assert.ok(await projects.evaluate((element) =>
      Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) <= 1,
    ));
    // Even at the bottom, wheel input inside a tall slide stays in that slide.
    const prevented = await projects.evaluate((element) => !element.dispatchEvent(
      new WheelEvent('wheel', { deltaY: 500, bubbles: true, cancelable: true }),
    ));
    assert.equal(prevented, false);
    await expectSlide(page, 2);

    await page.locator('header').getByRole('link', { name: 'Contact' }).click();
    await expectSlide(page, 12);
    assert.equal(new URL(page.url()).hash, '#contact');
    assert.equal(await page.getByRole('button', { name: 'Next slide' }).getAttribute('aria-disabled'), 'true');
  });
});

test('direct section hashes select their containing slide during startup', async () => {
  await onPage({ viewport: { width: 1280, height: 720 } }, async (page) => {
    await page.goto(`${url}/#projects`, { waitUntil: 'networkidle' });
    await expectSlide(page, 2);
    for (const [hash, index] of [['#ai-research', 3], ['#contact', 12]]) {
      await page.goto(`${url}/${hash}`, { waitUntil: 'networkidle' });
      await expectSlide(page, index);
      assert.equal(new URL(page.url()).hash, hash);
    }
  });
});

test('mobile swipes and menu links navigate the same deck', async () => {
  await onPage({ ...devices['iPhone 13'], reducedMotion: 'reduce' }, async (page) => {
    await page.goto(url);
    await expectSlide(page, 0);
    const session = await page.context().newCDPSession(page);
    const touch = (type, x) => session.send('Input.dispatchTouchEvent', {
      type,
      touchPoints: x === undefined ? [] : [{ x, y: 280 }],
    });
    await touch('touchStart', 350);
    for (let x = 320; x >= 30; x -= 30) await touch('touchMove', x);
    await touch('touchEnd');
    await expectSlide(page, 1);

    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    const close = dialog.getByRole('button', { name: 'Close', exact: true });
    const closeTarget = await close.boundingBox();
    assert.ok(closeTarget && closeTarget.width >= 44 && closeTarget.height >= 44);
    const themeTarget = await dialog.getByRole('button', { name: 'Toggle theme' }).boundingBox();
    assert.ok(themeTarget && themeTarget.x + themeTarget.width <= closeTarget.x);

    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Open navigation menu');

    await trigger.click();
    await dialog.getByRole('link', { name: 'Writing' }).click();
    await expectSlide(page, 7);
    assert.equal(new URL(page.url()).hash, '#writing');
  });
});

test('all three sample AI prototypes update independently on desktop and mobile', async () => {
  for (const options of [
    { viewport: { width: 1280, height: 900 } },
    devices['iPhone 13'],
  ]) {
    await onPage({ ...options, reducedMotion: 'reduce' }, async (page) => {
      await page.goto(`${url}/#ai-research`);
      await expectSlide(page, 3);
      const lab = page.getByRole('region', { name: 'AI Prototype Lab' });
      assert.equal(await lab.getByRole('article').count(), 3);
      assert.ok(await lab.getByText('Try three interactive simulations with sample data.').isVisible());

      const cases = [
        ['Test report', 'Release still on hold', 'Release notes', 'Ready for review'],
        ['Approve once', 'Approved in simulation', 'Preview plan', 'Waiting for approval'],
        ['Higher accuracy', 'Careful profile', 'Faster replies', 'Fast profile'],
      ];
      for (const [alternate, result] of cases) {
        const button = lab.getByRole('button', { name: alternate });
        await button.click();
        assert.equal(await button.getAttribute('aria-pressed'), 'true');
        assert.ok(await lab.getByRole('status').filter({ hasText: result }).isVisible());
        await expectSlide(page, 3);
      }
      for (const [alternate, result, initial, initialResult] of cases) {
        assert.ok(await lab.getByRole('status').filter({ hasText: result }).isVisible());
        await lab.getByRole('button', { name: initial }).press('Enter');
        assert.equal(await lab.getByRole('button', { name: alternate }).getAttribute('aria-pressed'), 'false');
        assert.ok(await lab.getByRole('status').filter({ hasText: initialResult }).isVisible());
      }
    });
  }
});

test('the code review research card links to the current demo', async () => {
  await onPage({ reducedMotion: 'reduce' }, async (page) => {
    await page.goto(`${url}/#ai-research`);
    await expectSlide(page, 3);
    const research = page.getByRole('region', { name: 'AI Research', exact: true });
    const simulation = research.getByRole('heading', { name: 'Code Review Signal vs Noise' })
      .locator('xpath=../..').getByRole('link', { name: 'Visit', exact: true });
    assert.equal(await simulation.getAttribute('href'), 'https://ai-code-review-demo.vercel.app/');
  });
});

test('the deck fetches Shorts on first visit to each media slide', async () => {
  await onPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' }, async (page) => {
    const requestedChannels = [];
    await page.route('**/api/top-youtube-shorts?*', async (route) => {
      const channel = new URL(route.request().url()).searchParams.get('channel');
      requestedChannels.push(channel);
      await route.fulfill({ json: { shorts: [{
        id: 'fixture1234',
        title: `Live ${channel} Short`,
        views: 300,
        viewLabel: '300 views',
        href: 'https://www.youtube.com/shorts/fixture1234',
        thumbnail: 'https://i.ytimg.com/vi/fixture1234/frame0.jpg',
      }] } });
    });

    await page.goto(url);
    await expectSlide(page, 0);
    await page.getByRole('button', { name: 'See my work' }).click();
    await expectSlide(page, 2);
    assert.deepEqual(requestedChannels, []);

    await page.locator('header').getByRole('link', { name: 'Podcast' }).click();
    await expectSlide(page, 8);
    const podcastShort = page.getByRole('link', { name: /Live podcast Short/ });
    await podcastShort.waitFor();
    assert.deepEqual(requestedChannels, ['podcast']);

    const next = page.getByRole('button', { name: 'Next slide' });
    const previous = page.getByRole('button', { name: 'Previous slide' });
    await next.click();
    await expectSlide(page, 9);
    await page.getByRole('link', { name: /Live personal Short/ }).waitFor();
    await previous.click();
    await expectSlide(page, 8);
    await podcastShort.waitFor();
    assert.deepEqual(requestedChannels, ['podcast', 'personal']);
  });
});

test('the YouTube slide stays available when the Shorts response contains an invalid row', async () => {
  await onPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' }, async (page) => {
    const liveShort = {
      id: 'fixture1234',
      title: 'Fixture live Short',
      views: 300,
      viewLabel: '300 views',
      href: 'https://www.youtube.com/shorts/fixture1234',
      thumbnail: 'https://i.ytimg.com/vi/fixture1234/frame0.jpg',
    };
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    let payload = { shorts: [null, { ...liveShort, title: {} }, liveShort] };
    await page.route('**/api/top-youtube-shorts?channel=personal', (route) =>
      route.fulfill({ json: payload }),
    );

    const openYouTube = async (navigate) => {
      await Promise.all([
        page.waitForResponse((response) => response.url().endsWith('/api/top-youtube-shorts?channel=personal')),
        navigate(),
      ]);
      await expectSlide(page, 9).catch((error) => {
        assert.deepEqual(pageErrors, []);
        throw error;
      });
    };

    await openYouTube(() => page.goto(`${url}/#youtube`));
    const youtube = page.getByRole('region', { name: 'YouTube', exact: true });
    const short = youtube.getByRole('link', { name: /Fixture live Short/ });
    await short.waitFor();
    assert.equal(await short.getAttribute('href'), liveShort.href);

    for (const response of [{ shorts: [null] }, null, { shorts: 'unavailable' }]) {
      payload = response;
      await openYouTube(() => page.reload());
      await youtube.getByRole('link', { name: /Still pasting code into ChatGPT/ }).waitFor();
    }
    assert.deepEqual(pageErrors, []);
  });
});

test('Ask Rodney is reachable in the deck and answers without advancing the slide', async () => {
  await onPage({ ...devices['iPhone 13'], reducedMotion: 'reduce' }, async (page) => {
    await page.goto(`${url}/#projects`);
    await expectSlide(page, 2);
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expectSlide(page, 3);
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expectSlide(page, 4);

    const showcase = page.getByRole('region', { name: 'Ask Rodney', exact: true });
    await showcase.getByRole('button', { name: 'What have you built?' }).click();
    await showcase.getByText(/AI safety simulations, bias detection systems/).waitFor();
    await showcase.getByRole('button', { name: "What's your best work?" }).waitFor({ timeout: 20_000 });

    const input = showcase.getByPlaceholder('Ask anything…');
    const send = showcase.getByRole('button', { name: 'Send' });
    await input.fill('   ');
    assert.equal(await send.isDisabled(), true);
    await input.press('Enter');
    assert.equal(await input.inputValue(), '   ');
    const question = 'What is your tech stack?';
    await input.fill(`  ${question}  `);
    assert.equal(await send.isEnabled(), true);
    await input.press('ArrowLeft');
    await expectSlide(page, 4);
    assert.equal(await input.evaluate((element) => element.selectionStart), question.length + 3);
    await input.press('Enter');
    await showcase.getByText(question, { exact: true }).waitFor();
    await showcase.getByText(/Claude Code for agentic sessions, Cursor for in-editor flow/).waitFor();
    await showcase.getByRole('button', { name: 'How do you approach automation?' }).waitFor();
    assert.equal(await input.inputValue(), '');
    await expectSlide(page, 4);
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expectSlide(page, 5);
  });
});

test('the Podcast slide is media first and keeps the listen links and clips', async () => {
  await onPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' }, async (page) => {
    await page.goto(`${url}/#podcast`);
    await expectSlide(page, 8);
    const podcast = page.getByRole('region', { name: 'Podcast', exact: true });

    await podcast.getByRole('heading', { name: 'Beat The Odds', exact: true }).waitFor();
    await podcast.getByText('with Dre, Rodney, and Brylan', { exact: true }).waitFor();
    assert.equal(await podcast.getByText('I co-host Beat The Odds').count(), 0);
    assert.equal(await podcast.getByText('We started it in 2022').count(), 0);

    const links = [
      ['Apple Podcasts', 'https://podcasts.apple.com/us/podcast/beat-the-odds-with-dre-rodney-brylan/id1639175138'],
      ['Spotify', 'https://open.spotify.com/show/1ZgWdURhqi0S2q2SExfqbW'],
      ['YouTube', 'https://www.youtube.com/@beattheoddspod'],
      ['Patreon', 'https://www.patreon.com/BeatTheOddsPod'],
      ['Instagram', 'https://www.instagram.com/btopodofficial/'],
    ];
    for (const [name, href] of links) {
      const link = podcast.getByRole('link', { name: new RegExp(`^${name}`) });
      assert.equal(await link.getAttribute('href'), href);
    }

    await podcast.getByRole('button', { name: /Play Anthropic/ }).click();
    const youtube = podcast.locator('iframe[src*="youtube.com/embed/3JFbudnWiB8"]');
    await youtube.waitFor();
    assert.match(await youtube.getAttribute('src'), /https:\/\/www\.youtube\.com\/embed\/3JFbudnWiB8/);

    const spotify = podcast.locator('iframe[title^="Spotify:"]');
    const apple = podcast.locator('iframe[title^="Apple Podcasts:"]');
    assert.equal(await spotify.getAttribute('src'), 'https://open.spotify.com/embed/episode/0WxjNo1pTiV3qE4F0Lt4DB');
    assert.equal(await apple.getAttribute('src'), 'https://embed.podcasts.apple.com/us/podcast/id1639175138?i=1000804241190');
    assert.equal(await spotify.getAttribute('loading'), 'lazy');
    assert.equal(await apple.getAttribute('loading'), 'lazy');

    await podcast.getByRole('link', { name: /AI Trust Breakdown Is Coming/ }).waitFor();
  });
});

test('the AutoFighterPro card links to four verified demo videos and the repo', async () => {
  await onPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' }, async (page) => {
    await page.goto(`${url}/#projects`);
    await expectSlide(page, 2);
    const projects = page.getByRole('region', { name: 'Projects', exact: true });
    const heading = projects.getByRole('heading', { name: 'AutoFighterPro', exact: true });
    await heading.scrollIntoViewIfNeeded();
    const card = heading.locator('xpath=ancestor::div[contains(@class,"enhanced-card")][1]');

    const videos = [
      ['AutoFighterPro V4 Dagganoth Killing (2010)', 'https://www.youtube.com/watch?v=QLvFNIMU-_k'],
      ['RsBots.net promo (2010)', 'https://www.youtube.com/watch?v=4Rs5LXbJPMg'],
      ['AutoFighterPro, AutoHunterPro and AutoFisherPro running (2010)', 'https://www.youtube.com/watch?v=I4TMz2Kw1x4'],
      ['75k exp per hour guide (2011)', 'https://www.youtube.com/watch?v=3xbhfX58D7A'],
    ];
    for (const [name, href] of videos) {
      assert.equal(await card.getByRole('link', { name }).getAttribute('href'), href);
    }

    const source = card.getByRole('link', { name: 'Source' });
    assert.equal(await source.getAttribute('href'), 'https://github.com/rodneyg/AutoFighterPro');
  });
});

test('every built project card shows product visuals that link to the product', async () => {
  await onPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' }, async (page) => {
    await page.goto(`${url}/#projects`);
    await expectSlide(page, 2);
    const projects = page.getByRole('region', { name: 'Projects', exact: true });
    const expected = {
      ScreenHawk: 2,
      SafeDose: 2,
      SeenClearly: 2,
      'Reddit Post Time Analyzer': 2,
      Vouch: 2,
      'Phantom Audio Lab': 1,
      'Did TikTok Get Banned?': 2,
      TempleToss: 2,
    };
    for (const [name, count] of Object.entries(expected)) {
      const heading = projects.getByRole('heading', { name, exact: true });
      await heading.scrollIntoViewIfNeeded();
      const card = heading.locator('xpath=ancestor::div[contains(@class,"enhanced-card")][1]');
      const images = card.locator('img[src*="project-visuals/"]');
      assert.equal(await images.count(), count, `${name} visual count`);
      for (let i = 0; i < count; i += 1) {
        const image = images.nth(i);
        await image.scrollIntoViewIfNeeded();
        await page.waitForFunction((el) => el.complete && el.naturalWidth > 0, await image.elementHandle());
        assert.ok((await image.getAttribute('alt'))?.length > 10, `${name} visual ${i} has alt text`);
        const href = await image.locator('xpath=ancestor::a[1]').getAttribute('href');
        assert.match(href, /^https:\/\//);
      }
    }
    const concept = projects.getByRole('heading', { name: 'Nearby Awareness', exact: true });
    const conceptCard = concept.locator('xpath=ancestor::div[contains(@class,"enhanced-card")][1]');
    assert.equal(await conceptCard.locator('img[src*="project-visuals/"]').count(), 0);
  });
});
