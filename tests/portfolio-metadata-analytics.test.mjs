import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import { chromium } from 'playwright-core';
import { build, preview } from 'vite';

const scriptPath = '/_vercel/insights/script.js';
let outDir;
let server;
let browser;
let origin;

before(async () => {
  outDir = await mkdtemp(join(tmpdir(), 'portfolio-analytics-'));
  await build({ logLevel: 'silent', build: { outDir } });
  server = await preview({
    logLevel: 'silent',
    build: { outDir },
    preview: { host: '127.0.0.1', port: 0, strictPort: true, open: false },
  });
  origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await server?.close();
  if (outDir) await rm(outDir, { recursive: true, force: true });
});

test('built portfolio metadata uses its own name, URL, and portrait', async () => {
  const html = await readFile(join(outDir, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /lovable|rodney-gainous-jr|cdn\.gpteng\.co/i);
  assert.match(html, /<title>Rodney Gainous Jr\.<\/title>/);
  assert.match(html, /name="author" content="Rodney Gainous Jr\."/);
  assert.match(html, /property="og:title" content="Rodney Gainous Jr\."/);
  assert.match(html, /rel="canonical" href="https:\/\/rodneygainous\.com\/"/);
  assert.match(html, /property="og:image" content="https:\/\/rodneygainous\.com\/temp-avatar\.jpg"/);
  assert.ok((await readFile(join(outDir, 'temp-avatar.jpg'))).length > 0);
});

for (const scriptResult of ['200', '404', 'blocked']) {
  test(`portfolio renders with analytics script ${scriptResult}`, async () => {
    const page = await browser.newPage();
    const appErrors = [];
    const resourceErrors = [];
    const scriptReferrers = [];
    page.on('pageerror', (error) => appErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() !== 'error') return;
      // Chromium reports failed resource loads independently of page JavaScript.
      const error = { url: message.location().url, text: message.text() };
      if (error.url === `${origin}${scriptPath}` && /^Failed to load resource:/.test(error.text)) {
        resourceErrors.push(error.text);
      } else {
        appErrors.push(error);
      }
    });
    try {
      await page.route('**/*', (route) => {
        const url = new URL(route.request().url());
        if (url.origin !== origin) return route.fulfill({ status: 204 });
        // Vite preview does not run the existing Vercel Function.
        if (url.pathname === '/api/cta-event') return route.fulfill({ status: 204 });
        if (url.pathname !== scriptPath) return route.continue();
        scriptReferrers.push(route.request().headers()['referer']);
        if (scriptResult === 'blocked') return route.abort('blockedbyclient');
        return route.fulfill({
          status: Number(scriptResult),
          contentType: 'application/javascript',
          body: scriptResult === '200'
            ? `window.testAnalyticsFilter = window.vaq.find(([name]) => name === 'beforeSend')[1];`
            : '',
        });
      });
      await page.goto(`${origin}/?email=fixture%40example.test#private-fixture`, { timeout: 15_000 });
      const deck = page.getByRole('main', { name: 'Portfolio slides' });
      await deck.waitFor({ timeout: 8_000 });
      assert.deepEqual(scriptReferrers, [`${origin}/`]);
      if (scriptResult === '200') {
        await page.waitForFunction(() => typeof window.testAnalyticsFilter === 'function');
        assert.deepEqual(await page.evaluate(() => {
          const filter = window.testAnalyticsFilter;
          return [
            filter({ type: 'pageview', url: location.href }),
            filter({ type: 'pageview', url: location.origin + '/private-fixture' }),
            filter({ type: 'event', url: location.href }),
          ];
        }), [{ type: 'pageview', url: `${origin}/` }, null, null]);

        await page.goto(`${origin}/`, {
          referer: 'https://example.test/private-fixture?email=fixture%40example.test',
          timeout: 15_000,
        });
        await page.waitForFunction(() => typeof window.testAnalyticsFilter === 'function');
        assert.equal(await page.evaluate(() => window.testAnalyticsFilter({
          type: 'pageview', url: location.href,
        })), null);
        assert.deepEqual(resourceErrors, []);
      }
      assert.deepEqual(appErrors, []);
      if (resourceErrors.length) console.info(`Chromium analytics resource diagnostics: ${resourceErrors.join(' | ')}`);
    } finally {
      await page.context().close();
    }
  });
}
