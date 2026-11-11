/* Full homepage integration audit. Uses an existing Playwright installation. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/final-review");
const sections = ["main-content", "selected-work", "services", "stack", "process", "contact"];
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const checks = [],
    errors = [],
    httpErrors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) httpErrors.push({ url: r.url(), status: r.status() });
  });
  const fontReady = () => page.evaluate(() => document.fonts.load('500 32px "ZahTech Hero Sans"'));
  const revealAll = async () => {
    for (const id of sections) {
      await page
        .locator("#" + id)
        .evaluate((e) => e.scrollIntoView({ behavior: "instant", block: "start" }));
      if (id !== "main-content")
        await page.waitForFunction(
          (id) => getComputedStyle(document.getElementById(id).parentElement).opacity === "1",
          id,
        );
    }
    await page
      .locator("img")
      .evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
  };
  try {
    assert.equal((await page.goto(baseURL, { waitUntil: "domcontentloaded" })).status(), 200);
    await fontReady();
    await revealAll();
    assert.equal(await page.locator("h1").count(), 1);
    const ids = await page.locator("[id]").evaluateAll((nodes) => nodes.map((node) => node.id));
    assert.equal(new Set(ids).size, ids.length);
    const levels = await page
      .locator("h1,h2,h3,h4,h5,h6")
      .evaluateAll((nodes) => nodes.map((node) => Number(node.tagName[1])));
    assert.ok(
      levels.every((level, index) => (index === 0 ? level === 1 : level <= levels[index - 1] + 1)),
    );
    assert.ok(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => image.alt.length > 0 && image.naturalWidth > 0),
        ),
    );
    checks.push(
      "one H1, no duplicate IDs, coherent heading outline and loaded image with alt text",
    );
    assert.deepEqual(
      await page
        .locator("link[rel=preload][as=font]")
        .evaluateAll((nodes) => nodes.map((node) => new URL(node.href).pathname)),
      ["/fonts/hero/inter-latin.woff2"],
    );
    checks.push("homepage preloads only local Inter");
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        await page.waitForFunction((lang) => document.documentElement.lang === lang, lang);
        for (const scale of [100, 200]) {
          await page.evaluate((scale) => {
            document.documentElement.style.fontSize = scale + "%";
            scrollTo({ top: 0, behavior: "instant" });
          }, scale);
          await page.evaluate(() => new Promise(requestAnimationFrame));
          const metrics = await page.evaluate(() => ({
            viewport: innerWidth,
            document: document.documentElement.scrollWidth,
            clipped: [
              ...document.querySelectorAll(
                "h1,h2,h3,.home-nav__bar,.home-nav__bar>div,.home-contact__project,.home-contact__email a,.home-hero__primary,.home-services__contact",
              ),
            ]
              .filter((e) => e.clientWidth > 0 && e.scrollWidth > e.clientWidth + 2)
              .map((e) => e.textContent.trim().slice(0, 40)),
          }));
          assert.ok(
            metrics.document <= metrics.viewport,
            `${width} ${lang} ${scale}%: ${JSON.stringify(metrics)}`,
          );
          assert.deepEqual(metrics.clipped, [], `${width} ${lang} ${scale}%: clipped text`);
          const hero = await page.locator("h1").boundingBox(),
            nav = await page.locator(".home-nav").boundingBox();
          assert.ok(
            hero.y >= nav.y + nav.height,
            `${width} ${lang} ${scale}%: title under navigation`,
          );
          checks.push(
            `${width}px ${lang} ${scale}% text: no overflow, clipped titles or nav overlap`,
          );
        }
        await page.evaluate(() => (document.documentElement.style.fontSize = "100%"));
      }
    }
    await page.setViewportSize({ width: 320, height: 844 });
    await page.getByRole("combobox").selectOption("en");
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
      scrollTo({ top: 0, behavior: "instant" });
    });
    const menuButton = page.locator('button[aria-controls="mobile-menu"]');
    await menuButton.click();
    const menuLast = page.locator("#mobile-menu a").last();
    await menuLast.focus();
    const last = await menuLast.boundingBox();
    assert.ok(last.y >= 0 && last.y + last.height <= 844);
    await page.keyboard.press("Escape");
    assert.equal(await menuButton.getAttribute("aria-expanded"), "false");
    assert.ok(await menuButton.evaluate((e) => e === document.activeElement));
    const whatsapp = await page.locator('a[href^="https://wa.me/"]').boundingBox();
    const backToTop = await page.locator("button.fixed").boundingBox();
    assert.equal(whatsapp.width, 56);
    assert.equal(whatsapp.height, 56);
    assert.equal(backToTop.width, 44);
    assert.equal(backToTop.height, 44);
    checks.push("icon-only floating controls retain 56px and 44px touch targets at 200% text");
    await page.screenshot({
      path: path.join(artifacts, "mobile-text-200.png"),
      animations: "disabled",
    });
    checks.push("320px menu at 200% text: last link reachable; Escape closes and restores focus");
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await fontReady();
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").getAttribute("href"), "#main-content");
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => document.activeElement.id === "main-content");
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).overflow), "hidden");
    checks.push("skip link focuses main content; native page scroll remains available");
    for (const [width, lang, file] of [
      [1440, "en", "desktop-full.png"],
      [390, "en", "mobile-full.png"],
      [390, "fr", "mobile-fr-full.png"],
    ]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await page.getByRole("combobox").selectOption(lang);
      await page.waitForFunction((lang) => document.documentElement.lang === lang, lang);
      await fontReady();
      await revealAll();
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(artifacts, file.replace("-full", "-top")),
        animations: "disabled",
      });
      await page.screenshot({
        path: path.join(artifacts, file),
        fullPage: true,
        animations: "disabled",
      });
    }
    checks.push("complete desktop, mobile and French mobile screenshots captured");
    const noJS = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const staticPage = await noJS.newPage();
    await staticPage.goto(baseURL, { waitUntil: "domcontentloaded" });
    for (const id of sections) assert.ok(await staticPage.locator("#" + id).isVisible());
    assert.equal(await staticPage.locator("footer.home-footer nav a").count(), 6);
    await noJS.close();
    checks.push("without JavaScript: all six sections and footer links remain available");
    assert.deepEqual(httpErrors, [], "homepage HTTP errors");
    assert.deepEqual(errors, [], "homepage runtime errors");
    await fs.writeFile(
      path.join(artifacts, "browser-results.json"),
      JSON.stringify({ baseURL, browser: browser.version(), checks, errors, httpErrors }, null, 2),
    );
    console.log(`PASS: ${checks.length} global checks; no homepage runtime or HTTP errors`);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
