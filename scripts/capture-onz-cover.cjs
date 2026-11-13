/* Reproducible portfolio artwork composed from official OnzScore interface assets. */
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 1600, height: 1000 },
      reducedMotion: "reduce",
    });
    await page.goto(`${process.env.BASE_URL || "http://127.0.0.1:3100"}/work/onzscore`, {
      waitUntil: "domcontentloaded",
    });
    await page.evaluate(() => document.fonts.load('500 40px "ZahTech Hero Sans"'));
    await page
      .locator(".onz-hero img")
      .evaluateAll((nodes) => Promise.all(nodes.map((n) => n.decode())));
    await page.evaluate(() => {
      const art = document.querySelector(".onz-hero [data-onz-artwork]").cloneNode(true);
      document.body.replaceChildren(art);
      const style = document.createElement("style");
      style.textContent = `body{margin:0;background:#141514;font-family:"ZahTech Hero Sans",sans-serif}.onz-scene__art{position:fixed;inset:0;width:1600px;height:1000px;border:0;border-radius:0}.onz-device--back{width:22%;left:28%;top:14%}.onz-device--front{width:24%;left:46%;right:auto;top:8%}.onz-scene__word{font-size:220px;top:7%;left:7%}.onz-scene__signature{font-size:16px;bottom:4%}.onz-scene__pitch{width:100%;left:0;top:10%}`;
      document.head.append(style);
    });
    await page.screenshot({ path: path.resolve("public/images/onzscore/live/onzscore-cover.png") });
    console.log("Exported 1600 × 1000 OnzScore portfolio artwork");
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
