/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

const sizes = [[320, 740], [375, 812], [390, 844], [640, 800], [768, 1024], [820, 1180], [1024, 768], [1440, 900], [1920, 1080], [2560, 1440], [844, 390]];
const output = path.resolve('artifacts/responsive');

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  const results = [];
  try {
    for (const [width, height] of sizes) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(process.env.TEST_URL || 'http://localhost:3000/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      for (const section of await page.locator('main section').all()) {
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(100);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      const layout = await page.evaluate(() => {
        const visible = el => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0;
        const bounds = el => { const r = el.getBoundingClientRect(); return { text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 70), x: Math.round(r.x), width: Math.round(r.width), height: Math.round(r.height) }; };
        return {
          documentOverflow: document.documentElement.scrollWidth > innerWidth + 1,
          overflow: [...document.querySelectorAll('header a, header button, main h1, main h2, main h3, main p, main article, main video')].filter(visible).filter(el => { const r = el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1; }).map(bounds),
          smallHeaderTargets: [...document.querySelectorAll('header a, header button')].filter(visible).filter(el => el.getBoundingClientRect().height < 44).map(bounds),
          headerNavigation: [...document.querySelectorAll('header nav a')].filter(visible).map(el => el.textContent.trim()),
          brokenImages: [...document.images].filter(img => img.complete && !img.naturalWidth).map(img => img.src),
          hiddenSections: [...document.querySelectorAll('[data-reveal]')].filter(el => Number(getComputedStyle(el).opacity) < 0.99).map(el => el.textContent.trim().slice(0, 70)),
        };
      });
      await page.screenshot({ path: path.join(output, `${width}x${height}.png`), fullPage: true });
      await page.screenshot({ path: path.join(output, `${width}x${height}-hero.png`) });
      if ([320, 820, 1440].includes(width)) {
        await page.locator('#about').screenshot({ path: path.join(output, `${width}-about.png`) });
        await page.locator('#contact').screenshot({ path: path.join(output, `${width}-contact.png`) });
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      const menu = page.getByRole('button', { name: 'Open menu', exact: true });
      let menuWorks = null;
      if (await menu.isVisible()) {
        await menu.click();
        const nav = page.getByRole('navigation', { name: 'Mobile navigation' });
        await nav.waitFor({ state: 'visible' });
        menuWorks = await nav.getByRole('link').count() === 4;
        await page.keyboard.press('Escape');
        menuWorks &&= !(await nav.isVisible());
        await menu.click();
        await nav.getByRole('link', { name: 'Portfolio', exact: true }).click();
        await page.waitForTimeout(150);
        menuWorks &&= !(await nav.isVisible());
        menuWorks &&= await page.evaluate(() => location.hash === '#showcase' && document.querySelector('#showcase').getBoundingClientRect().top >= document.querySelector('header').getBoundingClientRect().bottom - 1);
        await page.getByRole('button', { name: 'Open menu', exact: true }).click();
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.waitForTimeout(100);
        menuWorks &&= !(await nav.isVisible());
        await page.setViewportSize({ width, height });
        await page.waitForTimeout(100);
        menuWorks &&= (await page.getByRole('button', { name: 'Open menu', exact: true }).isVisible());
      }
      const failed = layout.documentOverflow || layout.overflow.length || layout.smallHeaderTargets.length || layout.brokenImages.length || layout.hiddenSections.length || errors.length || menuWorks === false || (width < 1024 && menuWorks === null && !layout.headerNavigation.length);
      results.push({ width, height, ...layout, menuWorks, errors, passed: !failed });
      await page.close();
    }
    for (const [width, height] of [[390, 844], [844, 390], [1440, 900]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'no-preference' });
      await page.goto(process.env.TEST_URL || 'http://localhost:3000/', { waitUntil: 'networkidle' });
      const hidden = [];
      for (const reveal of await page.locator('[data-reveal]').all()) {
        await reveal.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        if (await reveal.evaluate(el => Number(getComputedStyle(el).opacity) < 0.99)) hidden.push((await reveal.textContent()).trim().slice(0, 70));
      }
      results.push({ width, height, motion: 'normal', hiddenSections: hidden, passed: !hidden.length });
      await page.close();
    }
  } finally {
    await browser.close();
  }
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  if (results.some(result => !result.passed)) process.exitCode = 1;
})();
