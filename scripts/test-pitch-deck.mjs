import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium, devices } from 'playwright';
import { preview } from 'vite';

const media = process.env.PITCH_DECK_MEDIA;
const server = await preview({ preview: { host: '127.0.0.1', port: 0 } });
const url = `http://127.0.0.1:${server.httpServer.address().port}`;
let browser;
const deck = '.pitch-deck';

async function waitForSlide(page, index) {
  await page.waitForFunction(({ selector, index }) => {
    const element = document.querySelector(selector);
    return Math.abs(element.scrollLeft - index * element.clientWidth) < 2;
  }, { selector: deck, index }, { timeout: 7000 }).catch(async error => {
    const left = await page.locator(deck).evaluate(element => element.scrollLeft);
    throw new Error(`Expected slide ${index + 1}; deck was at ${left}px`, { cause: error });
  });
}

try {
  browser = await chromium.launch();
  if (media) await mkdir(media, { recursive: true });
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    ...(media && { recordVideo: { dir: media, size: { width: 960, height: 666 } } }),
  });
  const page = await desktop.newPage();
  page.setDefaultTimeout(8000);
  await page.goto(url);
  await page.getByRole('heading', { name: /Builder.*Engineer/ }).waitFor();
  const geometry = await page.locator(deck).evaluate(element => ({
    layout: getComputedStyle(element).display,
    snap: getComputedStyle(element).scrollSnapType,
    slideWidths: Array.from(element.children, slide => slide.clientWidth),
    width: element.clientWidth,
    documentHeight: document.documentElement.scrollHeight,
    viewportHeight: innerHeight,
  }));
  assert.equal(geometry.layout, 'flex');
  assert.equal(geometry.snap, 'x mandatory');
  assert.deepEqual(geometry.slideWidths, Array(12).fill(geometry.width));
  assert.equal(geometry.documentHeight, geometry.viewportHeight);
  await page.getByRole('button', { name: 'Previous slide' }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Previous slide' }).isDisabled(), true);
  if (media) {
    await page.waitForFunction(() => getComputedStyle(document.querySelector('main h2')).opacity === '1');
    await page.screenshot({ path: join(media, 'desktop.png') });
  }

  await page.mouse.move(700, 400);
  await page.mouse.wheel(0, 180);
  await waitForSlide(page, 1);
  await page.keyboard.press('ArrowRight');
  await waitForSlide(page, 2);
  await page.keyboard.press('ArrowLeft');
  await waitForSlide(page, 1);
  await page.keyboard.press('ArrowLeft');
  await waitForSlide(page, 0);
  const diagonalWheelHandledNatively = await page.getByRole('region', { name: 'Home' }).evaluate(
    element => element.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaX: 1250, deltaY: 100 })),
  );
  assert.equal(diagonalWheelHandledNatively, true);
  await page.mouse.wheel(1250, 0);
  await waitForSlide(page, 1);
  console.log('Desktop wheel, native horizontal gesture, arrow keys and viewport snapping passed');

  await page.keyboard.press('ArrowLeft');
  await waitForSlide(page, 0);
  await page.getByRole('button', { name: 'See my work' }).click();
  await waitForSlide(page, 2);
  const projects = page.getByRole('region', { name: 'Projects' });
  await projects.hover();
  await page.mouse.wheel(0, 260);
  await page.waitForFunction(() => document.querySelector('[aria-label="Projects"]').scrollTop > 50);
  await waitForSlide(page, 2);
  await projects.evaluate(element => { element.scrollTop = element.scrollHeight; });
  await page.waitForFunction(() => {
    const element = document.querySelector('[aria-label="Projects"]');
    return element.scrollHeight - element.scrollTop - element.clientHeight < 2;
  });
  await page.mouse.wheel(0, 300);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await waitForSlide(page, 2);
  console.log('Tall slide scrolls vertically and stays on the slide at its bottom edge');

  await page.locator('header').getByRole('link', { name: 'Podcast' }).click();
  await waitForSlide(page, 7);
  assert.equal(new URL(page.url()).hash, '#podcast');
  await page.reload();
  await waitForSlide(page, 7);
  await page.setViewportSize({ width: 1280, height: 900 });
  await waitForSlide(page, 7);
  await page.locator('header').getByRole('link', { name: 'Contact' }).click();
  await waitForSlide(page, 11);
  await page.getByRole('region', { name: 'Contact' }).locator('footer').scrollIntoViewIfNeeded();
  await page.getByRole('region', { name: 'Contact' }).locator('footer').getByRole('link', { name: 'Writing' }).click();
  await waitForSlide(page, 6);
  await page.goBack();
  await waitForSlide(page, 11);
  console.log('Hero, header, footer, deep link, history and resize navigation passed');
  const video = page.video();
  await desktop.close();
  if (video) await video.saveAs(join(media, 'navigation.webm'));

  const mobile = await browser.newContext(devices['iPhone 13']);
  const phone = await mobile.newPage();
  phone.setDefaultTimeout(8000);
  await phone.goto(url);
  await phone.getByRole('button', { name: 'Next slide' }).tap();
  await waitForSlide(phone, 1);
  const cdp = await mobile.newCDPSession(phone);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 345, y: 350 }] });
  for (const x of [300, 255, 210, 165, 120, 60]) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: 350 }] });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await waitForSlide(phone, 2);
  if (media) {
    await phone.locator('#projects h2').waitFor();
    await phone.waitForFunction(() => getComputedStyle(document.querySelector('#projects h2')).opacity === '1');
    await phone.screenshot({ path: join(media, 'mobile.png') });
  }
  const menu = phone.getByRole('button', { name: 'Open navigation menu' });
  await menu.tap();
  await phone.getByRole('dialog').getByRole('link', { name: 'Contact' }).tap();
  await phone.getByRole('dialog').waitFor({ state: 'hidden' });
  await waitForSlide(phone, 11);
  await phone.getByRole('button', { name: 'Previous slide' }).tap();
  await waitForSlide(phone, 10);
  assert.equal(await phone.evaluate(() => scrollX), 0);
  console.log('Mobile buttons, native touch swipe and menu passed');
} finally {
  await browser?.close();
  await new Promise(resolve => server.httpServer.close(resolve));
}
