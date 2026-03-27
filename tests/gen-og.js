const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.join(__dirname, '..');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });

  await page.setContent(`
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1200px; height: 630px;
          background: #0e0e0e;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        /* Top accent bar */
        .bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: #00e676; }
        /* Glow */
        .glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,230,118,.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .title {
          font-size: 96px; font-weight: 800; color: #00e676;
          letter-spacing: -2px; text-align: center;
          position: relative; z-index: 1;
        }
        .subtitle {
          font-size: 36px; font-weight: 700; color: #ffffff;
          margin-top: 16px; text-align: center;
          position: relative; z-index: 1;
        }
        .stats {
          font-family: 'JetBrains Mono', monospace;
          font-size: 18px; color: #888;
          margin-top: 32px; text-align: center;
          position: relative; z-index: 1;
        }
        .domain {
          font-family: 'JetBrains Mono', monospace;
          font-size: 16px; color: #555;
          position: absolute; bottom: 32px; right: 40px;
        }
      </style>
    </head>
    <body>
      <div class="bar"></div>
      <div class="glow"></div>
      <div class="title">YERNAR DOS</div>
      <div class="subtitle">ИИ автоматизация для бизнеса</div>
      <div class="stats">20+ проектов · 10 000+ лидов · Казахстан</div>
      <div class="domain">yernardos.space</div>
    </body>
    </html>
  `, { waitUntil: 'networkidle' });

  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(ROOT, 'og-image.png') });
  console.log('OG image generated');
  await browser.close();
})();
