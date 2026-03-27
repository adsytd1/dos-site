const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.join(__dirname, '..');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('file://' + path.join(ROOT, 'index.html'), { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Full page screenshots at key scroll positions
  const positions = [0, 800, 1600, 2400, 3200, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000];
  for (let i = 0; i < positions.length; i++) {
    await page.evaluate(y => window.scrollTo(0, y), positions[i]);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(ROOT, 'screenshots', `audit-desktop-${String(i).padStart(2,'0')}.png`) });
  }

  // Mobile full
  await page.setViewportSize({ width: 375, height: 812 });
  const mPositions = [0, 600, 1200, 1800, 2400, 3000, 4000, 5000, 6000, 8000];
  for (let i = 0; i < mPositions.length; i++) {
    await page.evaluate(y => window.scrollTo(0, y), mPositions[i]);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(ROOT, 'screenshots', `audit-mobile-${String(i).padStart(2,'0')}.png`) });
  }

  await browser.close();
  console.log('Done - 24 screenshots');
})();
