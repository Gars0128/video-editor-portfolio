/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('node:fs/promises');
const assert = require('node:assert/strict');
const url = process.env.TEST_URL || 'http://localhost:3001/';
const output = 'artifacts/design-review';
(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE });
  const results = [];
  try {
    for (const [name, width, height] of [['mobile',375,812], ['tablet',768,1024], ['desktop',1440,1000]]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', isMobile: name === 'mobile', hasTouch: name !== 'desktop' });
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.designMetrics = { lcp: 0, cls: 0 };
        new PerformanceObserver(list => { for (const e of list.getEntries()) window.designMetrics.lcp = e.startTime; }).observe({ type:'largest-contentful-paint', buffered:true });
        new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.designMetrics.cls += e.value; }).observe({ type:'layout-shift', buffered:true });
      });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1200);
      const metrics = await page.evaluate(() => ({ ...window.designMetrics, fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime, fonts: document.fonts.status, displayFont: getComputedStyle(document.querySelector('h1')).fontFamily, requests: performance.getEntriesByType('resource').length, transferred: performance.getEntriesByType('resource').reduce((sum,e) => sum+e.transferSize,0), initialMP4: performance.getEntriesByType('resource').filter(e => e.name.includes('.mp4')).length }));
      assert.match(metrics.displayFont, /displayFont/, 'The intended display face must resolve');
      assert.equal(metrics.initialMP4, 0, 'No film payload without intent');
      await page.screenshot({ path: `${output}/${name}-hero.png` });
      await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=600) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,70)); } window.scrollTo(0,0); });
      await page.waitForTimeout(200);
      await page.screenshot({ path: `${output}/${name}-page.png`, fullPage:true });
      const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      const violations = axe.violations.map(v => ({ id:v.id, impact:v.impact, nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})) }));
      await page.locator('#pricing').scrollIntoViewIfNeeded();
      await page.addStyleTag({content:'header {visibility:hidden!important}'});
      await page.locator('#pricing').screenshot({path:`${output}/${name}-pricing.png`});
      await page.addStyleTag({content:'header {visibility:visible!important}'});
      await page.locator('button[aria-label="Watch Skincare Ritual Cut"]').click();
      const modal = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      await page.keyboard.press('Escape');
      const entry = {name,metrics,violations,modalViolations:modal.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))};
      results.push(entry);
      console.log(JSON.stringify(entry));
      await context.close();
    }
    const page = await browser.newPage({viewport:{width:1440,height:900}});
    await page.goto(url,{waitUntil:'networkidle'});
    const card = page.locator('button[aria-label="Watch Skincare Ritual Cut"]');
    await card.hover();
    await page.waitForFunction(() => document.querySelector('#showcase video') && !document.querySelector('#showcase video').paused);
    await page.waitForTimeout(5800);
    assert.equal(await page.locator('#showcase video').count(),0,'Preview must stop after five seconds');
    results.push({name:'Five-second preview stop',passed:true});
    await page.close();
    await fs.writeFile(`${output}/results.json`,JSON.stringify(results,null,2));
    if(results.some(r=>r.violations?.length || r.modalViolations?.length)) process.exitCode=1;
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
