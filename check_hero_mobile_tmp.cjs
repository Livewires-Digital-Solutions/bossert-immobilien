const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  const height = await page.evaluate(() => document.body.scrollHeight);
  console.log('scrollHeight', height);
  let y = 0;
  let i = 0;
  while (y < height) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `shots_after/scroll_${String(i).padStart(2, '0')}_y${y}.png` });
    y += 850;
    i++;
  }
  await browser.close();
  console.log('done');
})();
