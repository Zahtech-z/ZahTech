/* Uses an existing Playwright installation; no dependency installation. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/selected-work-review");
// Isolated section captures: omit fixed UI to avoid stitching it into the middle
// of a section taller than the viewport. This style applies only during capture.
const screenshotStyle =
  ".home-nav, button.fixed, div.group.fixed { visibility: hidden !important; }";

(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  const checks = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const section = page.locator("#selected-work");
  const ready = async () => {
    await section.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const section = document.querySelector("#selected-work");
      return getComputedStyle(section.parentElement).opacity === "1";
    });
    await page.evaluate(() => document.fonts.ready);
    await section.locator("img").evaluate((image) => image.decode());
  };
  try {
    assert.equal((await page.goto(baseURL)).status(), 200);
    await ready();
    assert.equal(await section.getByRole("article").count(), 1);
    assert.equal(await section.getByRole("heading", { level: 3 }).innerText(), "OnzScore");
    assert.equal(
      await section.locator("img").getAttribute("src"),
      "/images/onzscore/onzscore-landing.webp",
    );
    assert.equal(
      await section.locator(".selected-work__status").innerText(),
      "Preparing for production",
    );
    assert.equal(await section.locator(".selected-work__technologies li").count(), 3);
    assert.ok((await section.locator(".selected-work__note").innerText()).includes("October 2026"));
    checks.push(
      "one documented OnzScore project, original screenshot, status, technologies and capture note preserved",
    );
    const fullSize = section.getByRole("link", { name: /View full-size image/ });
    assert.equal(await fullSize.getAttribute("href"), "/images/onzscore/onzscore-landing.webp");
    assert.equal(await fullSize.getAttribute("target"), "_blank");
    assert.ok((await fullSize.getAttribute("rel")).includes("noopener"));
    checks.push("original full-size image link and safe new-tab attributes preserved");
    await section.screenshot({ path: path.join(artifacts, "desktop.png"), style: screenshotStyle });

    await section.locator(".selected-work__case-study").click();
    await page.waitForURL(`${baseURL}/work/onzscore`);
    await page.locator(".home-nav").waitFor({ state: "detached" });
    assert.ok((await page.locator("h1").innerText()).includes("OnzScore"));
    checks.push("case-study link navigates to existing OnzScore case study");
    await page.goto(baseURL);
    await ready();
    await section.locator(".selected-work__all").click();
    await page.waitForURL(`${baseURL}/work`);
    await page.locator(".home-nav").waitFor({ state: "detached" });
    assert.equal(await page.locator(".selected-work").count(), 0);
    checks.push("work link navigates to the unchanged Work page");
    await page.goto(baseURL);

    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        await page.waitForFunction((language) => document.documentElement.lang === language, lang);
        await ready();
        const dimensions = await page.evaluate(() => ({
          viewport: innerWidth,
          page: document.documentElement.scrollWidth,
        }));
        assert.ok(dimensions.page <= dimensions.viewport, `${lang} ${width}: horizontal overflow`);
        const bounds = await section.boundingBox();
        for (const selector of [
          "h2",
          "h3",
          "img",
          ".selected-work__case-study",
          ".selected-work__note",
        ]) {
          const child = await section.locator(selector).boundingBox();
          assert.ok(
            child.x >= bounds.x && child.x + child.width <= bounds.x + bounds.width + 1,
            `${lang} ${width}: ${selector} escapes section`,
          );
        }
        assert.ok((await section.locator("img").getAttribute("alt")).length > 10);
        checks.push(`${lang} ${width}: localized content stays within viewport`);
        if (width === 390 && ["en", "fr"].includes(lang)) {
          await section.screenshot({
            path: path.join(artifacts, lang === "en" ? "mobile.png" : "mobile-fr.png"),
            style: screenshotStyle,
          });
        }
      }
    }

    const reducedContext = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 390, height: 844 },
    });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(baseURL);
    const reducedSection = reducedPage.locator("#selected-work");
    await reducedSection.scrollIntoViewIfNeeded();
    const motion = await reducedSection.evaluate((section) => ({
      opacity: getComputedStyle(section.parentElement).opacity,
      transition: getComputedStyle(section.querySelector("img")).transitionProperty,
    }));
    assert.equal(motion.opacity, "1");
    assert.equal(motion.transition, "none");
    checks.push("reduced motion: section visible and image hover transition disabled");
    await reducedContext.close();

    const noJSContext = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const noJSPage = await noJSContext.newPage();
    await noJSPage.goto(baseURL);
    const noJSSection = noJSPage.locator("#selected-work");
    await noJSSection.scrollIntoViewIfNeeded();
    assert.ok(await noJSSection.getByRole("heading", { name: "OnzScore" }).isVisible());
    assert.equal(
      await noJSSection.locator(".selected-work__case-study").getAttribute("href"),
      "/work/onzscore",
    );
    checks.push("no JavaScript: project content and case-study link remain available");
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
