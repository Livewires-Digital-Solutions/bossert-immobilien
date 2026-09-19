const { chromium } = require('playwright-core');
const OUT = process.argv[2];
require('fs').mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();

  // 390x844 scroll-through: capture top/middle/bottom of each of the 3 cards
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000/services', { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(1000);

  const cardBounds = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.sopc-card'));
    return cards.map(c => {
      const r = c.getBoundingClientRect();
      const scrollY = window.scrollY;
      return { top: r.top + scrollY, height: r.height };
    });
  });
  console.log('card bounds (doc coords):', JSON.stringify(cardBounds));

  let shotIdx = 0;
  for (let i = 0; i < cardBounds.length; i++) {
    const { top, height } = cardBounds[i];
    const positions = [
      { label: 'top', y: top - 100 },       // just before card enters view
      { label: 'mid', y: top + height / 2 - 422 }, // card centered in viewport
      { label: 'bottom', y: top + height - 100 },  // card's bottom near view
    ];
    for (const pos of positions) {
      await page.evaluate((y) => window.scrollTo(0, Math.max(0, y)), pos.y);
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/390_card${i}_${pos.label}.png` });
      shotIdx++;
    }
  }
  await page.close();

  // 320px quick check
  const page320 = await browser.newPage({ viewport: { width: 320, height: 700 } });
  await page320.goto('http://localhost:3000/services', { waitUntil: 'load', timeout: 45000 });
  await page320.waitForTimeout(1000);
  const found320 = await page320.evaluate(() => {
    const el = Array.from(document.querySelectorAll('div')).find(d => d.textContent && d.textContent.trim() === '01');
    if (el) { el.closest('.sopc-card').scrollIntoView({ block: 'start' }); return true; }
    return false;
  });
  await page320.waitForTimeout(600);
  await page320.screenshot({ path: `${OUT}/320_card0_top.png` });
  await page320.evaluate(() => window.scrollBy(0, 500));
  await page320.waitForTimeout(400);
  await page320.screenshot({ path: `${OUT}/320_scrolled.png` });
  const chk320 = await page320.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
  console.log('320 overflow check:', JSON.stringify(chk320));
  await page320.close();

  // 1024px quick check (should be unchanged sticky behavior)
  const page1024 = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page1024.goto('http://localhost:3000/services', { waitUntil: 'load', timeout: 45000 });
  await page1024.waitForTimeout(1000);
  await page1024.mouse.wheel(0, 1600);
  await page1024.waitForTimeout(800);
  await page1024.screenshot({ path: `${OUT}/1024_check.png` });
  const chk1024 = await page1024.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
  console.log('1024 overflow check:', JSON.stringify(chk1024));
  await page1024.close();

  await browser.close();
})();
