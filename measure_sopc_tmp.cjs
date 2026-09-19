const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch();
  for (const vp of [{ width: 390, height: 844 }, { width: 320, height: 700 }]) {
    const page = await browser.newPage({ viewport: vp });
    await page.goto('http://localhost:3000/services', { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1000);
    const info = await page.evaluate(() => {
      const navbar = document.querySelector('.navbar');
      const navRect = navbar ? navbar.getBoundingClientRect() : null;
      const navCS = navbar ? getComputedStyle(navbar) : null;
      const cards = Array.from(document.querySelectorAll('.sopc-card'));
      const cardInfo = cards.map((c, i) => {
        const r = c.getBoundingClientRect();
        const cs = getComputedStyle(c);
        return { idx: i, height: r.height, top: cs.top, position: cs.position };
      });
      return {
        navbarHeight: navRect ? navRect.height : null,
        navbarPosition: navCS ? navCS.position : null,
        viewportHeight: window.innerHeight,
        cards: cardInfo,
      };
    });
    console.log(`viewport ${vp.width}x${vp.height}:`, JSON.stringify(info, null, 2));
    await page.close();
  }
  await browser.close();
})();
