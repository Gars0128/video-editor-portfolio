/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const output = path.resolve('artifacts/browser-debug');
  await fs.mkdir(output, { recursive: true });
  const logFile = path.join(output, 'console.jsonl');
  await fs.writeFile(logFile, '');
  let pendingLog = Promise.resolve();
  const issues = [];
  const log = entry => {
    issues.push(entry);
    console.log(JSON.stringify(entry));
    pendingLog = pendingLog.then(() => fs.appendFile(logFile, JSON.stringify({ time: new Date().toISOString(), ...entry }) + '\n'));
  };
  const browser = await chromium.launch({
    headless: false,
    devtools: true,
    ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : { channel: 'chrome' }),
  });
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  page.on('pageerror', error => log({ type: 'javascript-error', message: error.message, stack: error.stack }));
  page.on('console', message => {
    if (['error', 'warning'].includes(message.type())) log({ type: message.type(), message: message.text(), location: message.location() });
  });
  page.on('response', response => {
    if (response.status() >= 400) log({ type: 'http-error', status: response.status(), url: response.url() });
  });
  page.on('requestfailed', request => {
    if (request.failure()?.errorText !== 'net::ERR_ABORTED') log({ type: 'request-failed', url: request.url(), message: request.failure()?.errorText });
  });
  await page.goto(process.env.TEST_URL || 'http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(output, 'opened.png') });
  await pendingLog;
  console.log(JSON.stringify({ status: 'ready', url: page.url(), initialIssues: issues.length, logFile }));
  await new Promise(resolve => browser.once('disconnected', resolve));
  await pendingLog;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
