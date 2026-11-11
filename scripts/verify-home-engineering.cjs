/* Uses an existing Playwright installation; no app dependency added. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/engineering-review");
const screenshotStyle = ".home-nav, .fixed { display: none !important; }";
const headings = {
  en: "Built as a system. Delivered as a product.",
  fr: "Pensé comme un système. Livré comme un produit.",
  es: "Pensado como un sistema. Entregado como un producto.",
};
const layers = {
  en: ["Interface", "Application", "Data", "Infrastructure"],
  fr: ["Interface", "Application", "Données", "Infrastructure"],
  es: ["Interfaz", "Aplicación", "Datos", "Infraestructura"],
};
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const checks = [];
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const section = page.locator("#stack");
  const ready = async () => {
    await section.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => getComputedStyle(document.querySelector("#stack").parentElement).opacity === "1",
    );
    await page.evaluate(() => document.fonts.load('500 32px "ZahTech Hero Sans"'));
  };
  try {
    assert.equal((await page.goto(baseURL, { waitUntil: "domcontentloaded" })).status(), 200);
    await ready();
    assert.deepEqual(await section.locator("h3").allTextContents(), layers.en);
    assert.deepEqual(await section.locator(".home-engineering__layer p").allTextContents(), [
      "React / Next.js",
      "Node.js / APIs",
      "PostgreSQL",
      "AWS / Docker / CI/CD",
    ]);
    checks.push("four original layers, order and technologies preserved");
    assert.ok(
      await section
        .locator("h2")
        .evaluate(
          (element) =>
            getComputedStyle(element).fontFamily.includes("ZahTech Hero Sans") &&
            getComputedStyle(element).fontWeight === "500",
        ),
    );
    checks.push("Inter heading in weight 500 applied");
    assert.equal(await section.getAttribute("aria-labelledby"), "engineering-heading");
    assert.equal(await section.getByRole("list").count(), 1);
    assert.equal(await section.getByRole("listitem").count(), 4);
    checks.push("existing stack anchor and accessible ordered layer list retained");
    assert.equal(
      await section
        .locator("ol")
        .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length),
      4,
    );
    checks.push("desktop diagram presents four columns");
    await section.screenshot({ path: path.join(artifacts, "desktop.png"), style: screenshotStyle });
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        await page.waitForFunction((language) => document.documentElement.lang === language, lang);
        await ready();
        assert.equal(await section.locator("h2").innerText(), headings[lang]);
        assert.deepEqual(await section.locator("h3").allTextContents(), layers[lang]);
        const metrics = await page.evaluate(() => ({
          width: innerWidth,
          content: document.documentElement.scrollWidth,
        }));
        assert.ok(metrics.content <= metrics.width, `${lang} ${width}: horizontal overflow`);
        const bounds = await section.boundingBox();
        for (const element of await section.locator("h2, h3, p, li").all()) {
          const rect = await element.boundingBox();
          assert.ok(
            rect.x >= bounds.x && rect.x + rect.width <= bounds.x + bounds.width + 1,
            `${lang} ${width}: clipped content`,
          );
        }
        const columns = await section
          .locator("ol")
          .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
        assert.equal(columns, width < 1024 ? 1 : 4);
        console.log(`Checked ${lang} at ${width}px`);
        checks.push(`${lang} ${width}: localized content fits; responsive diagram layout verified`);
        if (width === 390 && ["en", "fr"].includes(lang))
          await section.screenshot({
            path: path.join(artifacts, lang === "en" ? "mobile.png" : "mobile-fr.png"),
            style: screenshotStyle,
          });
      }
    }
    console.log("Checking reduced motion");
    const reducedContext = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 390, height: 844 },
    });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(baseURL, { waitUntil: "domcontentloaded" });
    const reducedSection = reducedPage.locator("#stack");
    await reducedSection.scrollIntoViewIfNeeded();
    assert.equal(
      await reducedSection.evaluate((element) => getComputedStyle(element.parentElement).opacity),
      "1",
    );
    assert.equal(
      await reducedSection.evaluate(
        (element) =>
          element
            .getAnimations({ subtree: true })
            .filter((animation) => animation.playState === "running").length,
      ),
      0,
    );
    checks.push("reduced motion: content immediately visible without active diagram animations");
    await reducedContext.close();
    console.log("Checking without JavaScript");
    const noJSContext = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const noJSPage = await noJSContext.newPage();
    await noJSPage.goto(baseURL, { waitUntil: "domcontentloaded" });
    const noJSSection = noJSPage.locator("#stack");
    await noJSSection.waitFor({ state: "visible" });
    assert.ok(await noJSSection.locator("h2").isVisible());
    assert.deepEqual(await noJSSection.locator("h3").allTextContents(), layers.en);
    checks.push("no JavaScript: heading, four layers and stack anchor remain available");
    await noJSContext.close();
    assert.deepEqual(errors, []);
    await fs.writeFile(
      path.join(artifacts, "browser-results.json"),
      JSON.stringify({ baseURL, browser: browser.version(), checks, errors }, null, 2),
    );
    console.log(`PASS: ${checks.length} checks; no runtime errors; Chromium ${browser.version()}`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
