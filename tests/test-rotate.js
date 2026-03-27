const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.join(__dirname, '..');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('file://' + path.join(ROOT, 'index.html'), { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(ROOT, 'screenshots', 'rotate-fix-desktop.png'), clip: { x: 0, y: 0, width: 1440, height: 600 } });

  // Wait for word change
  await page.waitForTimeout(3500);
  await page.screenshot({ path: path.join(ROOT, 'screenshots', 'rotate-fix-desktop-2.png'), clip: { x: 0, y: 0, width: 1440, height: 600 } });

  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ROOT, 'screenshots', 'rotate-fix-mobile.png'), clip: { x: 0, y: 0, width: 375, height: 500 } });

  await browser.close();
  console.log('Done');
})();
