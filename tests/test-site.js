const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.join(__dirname, '..');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  // Mobile - reviews section
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('file://' + path.join(ROOT, 'index.html'), { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const reviews = await page.$('#reviews');
  if (reviews) { await reviews.scrollIntoViewIfNeeded(); await page.waitForTimeout(500); }
  await page.screenshot({ path: path.join(ROOT, 'screenshots', 'mobile-reviews-1card.png'), fullPage: false });

  // Count visible review pages
  const pageCount = await page.evaluate(() => document.querySelectorAll('.review-page').length);
  console.log('Review pages on mobile:', pageCount);

  console.log('JS errors:', errors.length ? errors.join('\n') : 'NONE');
  await browser.close();
})();
