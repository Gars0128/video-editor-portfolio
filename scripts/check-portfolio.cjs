/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

const baseURL = process.env.TEST_URL || 'http://localhost:3000/';
const output = path.resolve('artifacts/portfolio');
const videos = [
  { title: 'Skincare Ritual Cut', src: '/marta/videos/dr-althea.mp4' },
  { title: 'Bodywear Mood Edit', src: '/marta/videos/skims-body.mp4' },
  { title: 'Editorial Motion Story', src: '/marta/videos/mrtvld-montage.mp4' },
];
const instagram = 'https://www.instagram.com/callme.martix/';
const results = [];

async function check(name, run) {
  try {
    const detail = await run();
    results.push({ name, passed: true, ...(detail ? { detail } : {}) });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, passed: false, error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

async function ready(page) {
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
}

async function decodeVideo(page, src) {
  return page.evaluate(async videoURL => {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = videoURL;
    document.body.append(video);
    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error(`Media decode timeout: ${videoURL}`)), 20000);
        video.addEventListener('loadeddata', () => { clearTimeout(timeout); resolve(); }, { once: true });
        video.addEventListener('error', () => { clearTimeout(timeout); reject(new Error(`Media error ${video.error?.code}: ${videoURL}`)); }, { once: true });
        video.load();
      });
      await video.play();
      return { duration: video.duration, width: video.videoWidth, height: video.videoHeight, readyState: video.readyState };
    } finally {
      video.pause();
      video.removeAttribute('src');
      video.load();
      video.remove();
    }
  }, src);
}

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  const errors = [];
  function observe(page) {
    page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
    page.on('console', message => { if (message.type() === 'error' || message.type() === 'warning') errors.push(`${message.type()}: ${message.text()}`); });
    page.on('response', response => { if (response.status() >= 400 && new URL(response.url()).origin === new URL(baseURL).origin) errors.push(`HTTP ${response.status()}: ${response.url()}`); });
  }
  try {
    for (const [width, height] of [[320, 740], [375, 812], [768, 1024], [1440, 900], [2560, 1440], [844, 390]]) {
      await check(`Layout and real assets ${width}x${height}`, async () => {
        const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
        observe(page);
        try {
          await ready(page);
          assert.equal(await page.locator('h1').count(), 1, 'Exactly one meaningful page title');
          for (const section of await page.locator('main section').all()) await section.scrollIntoViewIfNeeded();
          await page.waitForFunction(() => [...document.images].every(image => image.complete));
          const defects = await page.evaluate(() => {
            const visible = element => element.getBoundingClientRect().width > 0 && element.getBoundingClientRect().height > 0;
            return {
              overflow: document.documentElement.scrollWidth > innerWidth + 1,
              outOfBounds: [...document.querySelectorAll('main h1, main h2, main h3, main article, main video, header a, header button')].filter(visible).filter(element => { const rect = element.getBoundingClientRect(); return rect.left < -1 || rect.right > innerWidth + 1; }).map(element => element.tagName + ': ' + (element.textContent || '').trim().slice(0, 50)),
              brokenImages: [...document.images].filter(image => !image.naturalWidth || !image.alt.trim()).map(image => image.src),
              hiddenReveals: [...document.querySelectorAll('[data-reveal]')].filter(element => Number(getComputedStyle(element).opacity) < 0.99).length,
            };
          });
          assert.deepEqual(defects, { overflow: false, outOfBounds: [], brokenImages: [], hiddenReveals: 0 });
          assert.equal(await page.locator('#showcase').getByRole('button', { name: /^Watch / }).count(), 3, 'Three real work launchers remain');
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(150);
          await page.screenshot({ path: path.join(output, `${width}x${height}-page.png`), fullPage: true });
          if ([375, 768, 1440, 2560].includes(width)) await page.locator('#showcase').screenshot({ path: path.join(output, `${width}-gallery.png`), style: 'header, .skip-link { visibility: hidden !important; }' });
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(150);
          await page.screenshot({ path: path.join(output, `${width}x${height}-hero.png`) });
          return defects;
        } finally { await page.close(); }
      });
    }

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    observe(page);
    const initialMediaRequests = [];
    page.on('request', request => { if (/\.mp4(?:\?|$)/.test(request.url())) initialMediaRequests.push(request.url()); });
    await ready(page);
    await check('No MP4 transfer before playback intent', async () => { assert.deepEqual(initialMediaRequests, []); });
    await check('Contact, Instagram, footer, SEO and real pricing preserved', async () => {
      for (const region of [page.locator('#contact'), page.locator('footer')]) {
        const link = region.locator(`a[href="${instagram}"]`);
        assert.ok(await link.count() >= 1, 'Instagram must be a real link in contact and footer');
        assert.ok((await link.first().innerText()).includes('@callme.martix'));
      }
      assert.ok(await page.locator('#contact a[href="mailto:martavaitkevich@gmail.com"]').count() >= 1);
      for (const price of ['from $40', '$25', 'from $60']) assert.ok((await page.locator('#pricing').innerText()).includes(price));
      assert.match(await page.title(), /Marta Vaitkevich/);
      assert.ok((await page.locator('meta[name="description"]').getAttribute('content')).length > 40);
      for (const href of await page.locator('a[href^="#"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')))])) assert.equal(await page.locator(href).count(), 1, `Anchor ${href} resolves`);
    });
    for (const video of videos) {
      await check(`HTTP range and decoded real video: ${video.title}`, async () => {
        const response = await page.request.get(new URL(video.src, baseURL).href, { headers: { Range: 'bytes=0-1023' } });
        assert.ok([200, 206].includes(response.status()));
        assert.match(response.headers()['content-type'] || '', /video\/mp4/);
        if (response.status() === 206) assert.match(response.headers()['content-range'] || '', /^bytes 0-1023\//);
        const media = await decodeVideo(page, video.src);
        assert.ok(media.duration > 0 && Number.isFinite(media.duration) && media.width > 0 && media.height > 0 && media.readyState >= 2);
        return media;
      });
    }
    await check('Desktop anchors and active scrollspy', async () => {
      for (const id of ['showcase', 'about', 'pricing', 'contact']) {
        const link = page.getByRole('navigation', { name: 'Main navigation', exact: true }).locator(`a[href="#${id}"]`);
        await link.click();
        await page.waitForFunction(section => location.hash === `#${section}` && document.querySelector(`header nav[aria-label="Main navigation"] a[href="#${section}"]`)?.getAttribute('aria-current') === 'location', id);
        assert.ok(await page.locator(`#${id}`).evaluate(element => element.getBoundingClientRect().top >= document.querySelector('header').getBoundingClientRect().bottom - 2), `${id} not obscured by header`);
      }
      for (const id of ['about', 'showcase', 'pricing']) {
        await page.locator(`#${id}`).evaluate(element => window.scrollTo({ top: element.offsetTop - 120, behavior: 'instant' }));
        await page.waitForFunction(section => document.querySelector(`header nav[aria-label="Main navigation"] a[href="#${section}"]`)?.getAttribute('aria-current') === 'location', id);
      }
    });
    await check('Viewer keyboard open, focus trap, Escape, focus return and pause', async () => {
      for (const video of videos) {
        const trigger = page.getByRole('button', { name: `Watch ${video.title}`, exact: true });
        await trigger.scrollIntoViewIfNeeded();
        await trigger.focus();
        // Arrive through a real Tab action so :focus-visible uses keyboard modality.
        // Programmatic focus after pointer navigation intentionally preserves pointer modality.
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
        assert.ok(await trigger.evaluate(element => element === document.activeElement && element.matches(':focus-visible')), 'Tab reaches the film launcher with keyboard focus');
        const focusStyle = await trigger.evaluate(element => { const style = getComputedStyle(element); return { outline: style.outlineStyle, width: style.outlineWidth, shadow: style.boxShadow }; });
        assert.ok((focusStyle.outline !== 'none' && focusStyle.width !== '0px') || focusStyle.shadow !== 'none', 'Keyboard focus has a visible treatment');
        await page.keyboard.press('Enter');
        const dialog = page.getByRole('dialog');
        await dialog.waitFor({ state: 'visible' });
        if (video === videos[0]) await page.screenshot({ path: path.join(output, '1440-viewer.png') });
        assert.ok((await dialog.getAttribute('aria-labelledby')) || (await dialog.getAttribute('aria-label')), 'Viewer is named');
        const playback = dialog.locator('video');
        await playback.evaluate(videoElement => { window.__qaViewerVideo = videoElement; videoElement.muted = true; return videoElement.play(); });
        await page.waitForFunction(() => window.__qaViewerVideo && !window.__qaViewerVideo.paused);
        for (let i = 0; i < 8; i++) {
          await page.keyboard.press('Tab');
          assert.ok(await dialog.evaluate(element => element.contains(document.activeElement)), 'Tab stays in viewer');
        }
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'hidden' });
        assert.ok(await trigger.evaluate(element => element === document.activeElement), 'Focus returns to launching card');
        assert.ok(await page.evaluate(() => window.__qaViewerVideo.paused), 'Closed video is paused');
      }
      const trigger = page.getByRole('button', { name: `Watch ${videos[0].title}`, exact: true });
      await trigger.click();
      await page.getByRole('dialog').getByRole('button', { name: /close/i }).click();
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
    });
    await check('Reduced motion disables hover autoplay', async () => {
      const trigger = page.getByRole('button', { name: `Watch ${videos[0].title}`, exact: true });
      await trigger.hover();
      await page.waitForTimeout(600);
      assert.equal(await page.locator('#showcase video').count(), 0, 'No preview is mounted for reduced motion');
    });
    await page.close();

    await check('Fine pointer preview plays muted and pauses on mouse leave', async () => {
      const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
      observe(desktop);
      try {
        await ready(desktop);
        assert.ok(await desktop.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches));
        await desktop.getByRole('button', { name: `Watch ${videos[0].title}`, exact: true }).hover();
        await desktop.waitForFunction(() => { const video = document.querySelector('#showcase video'); return video && !video.paused && video.muted; });
        await desktop.evaluate(() => { window.__qaPreviewVideo = document.querySelector('#showcase video'); });
        await desktop.mouse.move(0, 0);
        await desktop.waitForFunction(() => !document.querySelector('#showcase video') && window.__qaPreviewVideo.paused);
        for (const reveal of await desktop.locator('[data-reveal]').all()) {
          await reveal.scrollIntoViewIfNeeded();
          await desktop.waitForFunction(element => Number(getComputedStyle(element).opacity) >= 0.99, await reveal.elementHandle());
        }
      } finally { await desktop.close(); }
    });
    await check('Touch navigation, Escape focus, resize and touch viewer', async () => {
      const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
      observe(mobile);
      try {
        await ready(mobile);
        const menu = mobile.getByRole('button', { name: 'Open menu', exact: true });
        await menu.click();
        const nav = mobile.getByRole('navigation', { name: 'Mobile navigation', exact: true });
        await nav.waitFor({ state: 'visible' });
        assert.equal(await nav.getByRole('link').count(), 4);
        await mobile.keyboard.press('Escape');
        await nav.waitFor({ state: 'hidden' });
        assert.ok(await menu.evaluate(element => element === document.activeElement));
        await menu.click();
        await nav.locator('a[href="#showcase"]').click();
        await nav.waitFor({ state: 'hidden' });
        assert.equal(new URL(mobile.url()).hash, '#showcase');
        await menu.click();
        await mobile.setViewportSize({ width: 1440, height: 900 });
        await nav.waitFor({ state: 'hidden' });
        await mobile.setViewportSize({ width: 375, height: 812 });
        const trigger = mobile.getByRole('button', { name: `Watch ${videos[0].title}`, exact: true });
        await trigger.tap();
        await mobile.getByRole('dialog').waitFor({ state: 'visible' });
        await mobile.screenshot({ path: path.join(output, '375-viewer.png') });
        assert.ok(await mobile.getByRole('dialog').evaluate(element => { const rect = element.getBoundingClientRect(); return rect.left >= 0 && rect.right <= innerWidth + 1 && rect.top >= 0 && rect.bottom <= innerHeight + 1; }), 'Viewer fits phone viewport');
        await mobile.keyboard.press('Escape');
        await mobile.getByRole('dialog').waitFor({ state: 'hidden' });
        assert.equal(await mobile.locator('#showcase video').count(), 0, 'Touch card never mounts a hover preview');
      } finally { await mobile.close(); }
    });
    await check('No runtime, console warnings, console errors or local HTTP errors', async () => { assert.deepEqual(errors, []); });
  } finally {
    await browser.close();
    await fs.writeFile(path.join(output, 'results.json'), JSON.stringify({ baseURL, results }, null, 2));
  }
  console.log(`${results.filter(result => result.passed).length}/${results.length} portfolio checks passed. Artifacts: ${output}`);
  if (results.some(result => !result.passed)) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
