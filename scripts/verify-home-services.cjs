/* Uses an existing Playwright installation; adds no app dependency. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/services-review");
// Omit fixed UI only while capturing a section taller than the viewport.
const screenshotStyle = ".home-nav, .fixed { display: none !important; }";
const headings = {
  en: "The right expertise, at every stage.",
  fr: "La bonne expertise, à chaque étape.",
  es: "La experiencia adecuada en cada etapa.",
};
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const checks = [];
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const section = page.locator("#services");
  const ready = async () => {
    await section.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => getComputedStyle(document.querySelector("#services").parentElement).opacity === "1",
    );
    await page.evaluate(() => document.fonts.ready);
  };
  try {
    assert.equal((await page.goto(baseURL)).status(), 200);
    await ready();
    const titles = await section.locator("h3").allTextContents();
    assert.deepEqual(titles, [
      "App Development",
      "Cloud & DevOps",
      "AI-Powered Build",
      "Server Maintenance",
      "Tech Consulting",
      "MVP Launch",
    ]);
    assert.equal(await section.getByRole("listitem").count(), 6);
    assert.ok(
      await section
        .locator("h2")
        .evaluate((element) => getComputedStyle(element).fontFamily.includes("ZahTech Hero Sans")),
    );
    checks.push("six existing services and their order preserved; Inter applied");
    assert.equal(await section.locator(".home-services__contact").getAttribute("href"), "/contact");
    assert.equal(await section.locator(".home-services__all").getAttribute("href"), "/services");
    for (const link of await section.getByRole("link").all())
      assert.ok((await link.boundingBox()).height >= 44);
    checks.push("contact and services links have valid destinations and 44px minimum targets");
    await section.screenshot({ path: path.join(artifacts, "desktop.png"), style: screenshotStyle });
    await section.locator(".home-services__contact").focus();
    await page.keyboard.press("Tab");
    assert.ok(
      await section
        .locator(".home-services__all")
        .evaluate((element) => element === document.activeElement),
    );
    assert.ok(
      await section
        .locator(".home-services__all")
        .evaluate((element) => getComputedStyle(element).outlineStyle !== "none"),
    );
    checks.push("keyboard tab order and visible focus ring verified");
    for (const [selector, route] of [
      [".home-services__contact", "/contact"],
      [".home-services__all", "/services"],
    ]) {
      await section.locator(selector).click();
      await page.waitForURL(`${baseURL}${route}`);
      await page.locator(".home-nav").waitFor({ state: "detached" });
      assert.equal(await page.locator(".home-services").count(), 0);
      await page.goto(baseURL);
      await ready();
    }
    checks.push("both CTAs navigate to existing pages with their default navigation");
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        await page.waitForFunction((language) => document.documentElement.lang === language, lang);
        await ready();
        assert.equal(await section.locator("h2").innerText(), headings[lang]);
        assert.equal(await section.locator("h3").count(), 6);
        assert.equal(await section.locator(".home-services__item p").count(), 6);
        const metrics = await page.evaluate(() => ({
          width: innerWidth,
          content: document.documentElement.scrollWidth,
        }));
        assert.ok(metrics.content <= metrics.width, `${lang} ${width}: horizontal overflow`);
        const bounds = await section.boundingBox();
        for (const element of await section.locator("h2, h3, p, a").all()) {
          const rect = await element.boundingBox();
          assert.ok(
            rect.x >= bounds.x && rect.x + rect.width <= bounds.x + bounds.width + 1,
            `${lang} ${width}: clipped content`,
          );
        }
        checks.push(`${lang} ${width}: headings, descriptions and links fit viewport`);
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
    await reducedPage.goto(baseURL);
    const reducedSection = reducedPage.locator("#services");
    await reducedSection.scrollIntoViewIfNeeded();
    assert.equal(
      await reducedSection.evaluate((element) => getComputedStyle(element.parentElement).opacity),
      "1",
    );
    assert.equal(
      await reducedSection
        .locator("a")
        .first()
        .evaluate((element) => getComputedStyle(element).transitionProperty),
      "none",
    );
    checks.push("reduced motion: visible content and disabled link transitions");
    await reducedContext.close();
    const noJSContext = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const noJSPage = await noJSContext.newPage();
    await noJSPage.goto(baseURL);
    const noJSSection = noJSPage.locator("#services");
    await noJSSection.scrollIntoViewIfNeeded();
    assert.equal(await noJSSection.locator("h3").count(), 6);
    assert.ok(await noJSSection.locator("h2").isVisible());
    assert.equal(
      await noJSSection.locator(".home-services__all").getAttribute("href"),
      "/services",
    );
    checks.push("no JavaScript: six services and navigation remain available");
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
