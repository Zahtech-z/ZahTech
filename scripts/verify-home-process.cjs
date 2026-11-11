/* Uses an existing Playwright installation; no app dependency added. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/process-review");
const screenshotStyle = ".home-nav, .fixed { display: none !important; }";
const headings = {
  en: "A clear path from brief to release.",
  fr: "Un parcours clair, du brief à la livraison.",
  es: "Un camino claro, del brief al lanzamiento.",
};
const steps = {
  en: ["Discovery Call", "Scope & Project Plan", "Build & Iterate", "Deploy & Support"],
  fr: [
    "Appel de découverte",
    "Cadrage & plan de projet",
    "Construire & Itérer",
    "Déployer & Soutenir",
  ],
  es: [
    "Llamada de descubrimiento",
    "Alcance y plan de proyecto",
    "Construir & Iterar",
    "Desplegar & Mantener",
  ],
};
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const checks = [];
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const section = page.locator("#process");
  const ready = async () => {
    await section.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => getComputedStyle(document.querySelector("#process").parentElement).opacity === "1",
    );
    await page.evaluate(() => document.fonts.load('500 32px "ZahTech Hero Sans"'));
  };
  try {
    assert.equal((await page.goto(baseURL, { waitUntil: "domcontentloaded" })).status(), 200);
    await ready();
    assert.deepEqual(await section.locator("h3").allTextContents(), steps.en);
    assert.equal(await section.locator("li p").count(), 4);
    assert.equal(
      await section.locator("li p").first().innerText(),
      "We understand your goals, audience, and constraints.",
    );
    checks.push("four existing steps, original order and descriptions retained");
    assert.ok(
      await section
        .locator("h2")
        .evaluate(
          (element) =>
            getComputedStyle(element).fontFamily.includes("ZahTech Hero Sans") &&
            getComputedStyle(element).fontWeight === "500",
        ),
    );
    checks.push("Inter title in weight 500 applied");
    assert.equal(await section.getAttribute("aria-labelledby"), "process-heading");
    assert.equal(await section.getByRole("list").count(), 1);
    assert.equal(await section.getByRole("listitem").count(), 4);
    checks.push("original process anchor, named section and ordered list preserved");
    assert.equal(
      await section
        .locator("li")
        .first()
        .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length),
      3,
    );
    checks.push("desktop step rows separate number, title and description");
    await section.screenshot({ path: path.join(artifacts, "desktop.png"), style: screenshotStyle });
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        await page.waitForFunction((language) => document.documentElement.lang === language, lang);
        await ready();
        assert.equal(await section.locator("h2").innerText(), headings[lang]);
        assert.deepEqual(await section.locator("h3").allTextContents(), steps[lang]);
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
          .locator("li")
          .first()
          .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
        assert.equal(columns, width < 1024 ? 2 : 3);
        checks.push(`${lang} ${width}: localized steps fit; responsive row layout verified`);
        if (width === 390 && ["en", "fr"].includes(lang))
          await section.screenshot({
            path: path.join(artifacts, lang === "en" ? "mobile.png" : "mobile-fr.png"),
            style: screenshotStyle,
          });
      }
    }
    const reducedContext = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 390, height: 844 },
    });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(baseURL, { waitUntil: "domcontentloaded" });
    const reducedSection = reducedPage.locator("#process");
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
    checks.push("reduced motion: visible content without active step animations");
    await reducedContext.close();
    const noJSContext = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const noJSPage = await noJSContext.newPage();
    await noJSPage.goto(baseURL, { waitUntil: "domcontentloaded" });
    const noJSSection = noJSPage.locator("#process");
    await noJSSection.waitFor({ state: "visible" });
    assert.ok(await noJSSection.locator("h2").isVisible());
    assert.deepEqual(await noJSSection.locator("h3").allTextContents(), steps.en);
    assert.equal(await noJSSection.locator("li p").count(), 4);
    checks.push("no JavaScript: heading and all four step descriptions remain available");
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
