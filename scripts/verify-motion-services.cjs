/* Run against the local build; uses the existing Playwright installation. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/motion-services-review");
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  const checks = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const scroll = async (selector, offset) => {
    await page
      .locator(selector)
      .evaluate(
        (e, y) =>
          scrollTo({ top: e.getBoundingClientRect().top + scrollY - y, behavior: "instant" }),
        offset,
      );
    await page.waitForTimeout(850);
  };
  try {
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);
    const transforms = [];
    for (const offset of [700, 200]) {
      await scroll(".selected-work__image", offset);
      transforms.push(
        await page.locator(".selected-work__image").evaluate((e) => getComputedStyle(e).transform),
      );
    }
    assert.notEqual(transforms[0], transforms[1]);
    checks.push("Project image transform changes with actual scroll position");
    const rails = [];
    for (const offset of [850, 350]) {
      await scroll(".engineering-motion", offset);
      rails.push(
        await page
          .locator(".engineering-motion__horizontal")
          .evaluate((e) => getComputedStyle(e).transform),
      );
    }
    assert.notEqual(rails[0], rails[1]);
    checks.push("Engineering orange line progresses with actual scroll position");
    await page.goto(`${baseURL}/services`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);
    assert.equal(await page.locator(".services-page__item").count(), 6);
    assert.deepEqual(
      await page.locator(".services-page__item").evaluateAll((es) => es.map((e) => e.id)),
      ["apps", "cloud", "ai", "maintenance", "consulting", "mvp"].map((id) => `service-${id}`),
    );
    checks.push("All six existing Services entries and anchor IDs preserved");
    const heading = {
      en: "Engineering products from idea to production.",
      fr: "De l’idée à la production, nous construisons vos produits.",
      es: "Desarrollamos productos desde la idea hasta la producción.",
    };
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        assert.equal(await page.locator("h1").innerText(), heading[lang]);
        for (const size of ["100%", "200%"]) {
          await page.evaluate((s) => (document.documentElement.style.fontSize = s), size);
          await page.waitForTimeout(160);
          assert.ok(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
            `${lang} ${width} ${size}: overflow`,
          );
          const bounds = await page.locator("h1").boundingBox();
          assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width + 1);
        }
        await page.evaluate(() => (document.documentElement.style.fontSize = "100%"));
        checks.push(
          `${lang} ${width}px: translated title, no horizontal overflow at 100% and 200% text`,
        );
      }
    }
    await page.getByRole("combobox").selectOption("en");
    for (const [width, name] of [
      [1440, "desktop"],
      [390, "mobile"],
    ]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      // Reveal every row, then return to the top for a settled full-page capture.
      for (const selector of [".services-page__item:last-child", ".services-page__contact"])
        await scroll(selector, 200);
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(artifacts, `${name}.png`), fullPage: true });
    }
    await page.locator(".services-page__cta").focus();
    assert.ok(
      await page
        .locator(".services-page__cta")
        .evaluate((e) => getComputedStyle(e).outlineStyle !== "none"),
    );
    await page.locator(".services-page__cta").click();
    await page.waitForURL(`${baseURL}/contact`);
    await page.locator("form").waitFor();
    checks.push("Contact CTA supports keyboard focus and opens the existing form; no submission");
    for (const options of [{ reducedMotion: "reduce" }, { javaScriptEnabled: false }]) {
      const fallback = await browser.newContext({
        ...options,
        viewport: { width: 390, height: 844 },
      });
      const fp = await fallback.newPage();
      await fp.goto(`${baseURL}/services`, { waitUntil: "domcontentloaded" });
      await fp.waitForTimeout(700);
      assert.ok(await fp.locator("h1").isVisible());
      assert.equal(await fp.locator(".services-page__item").count(), 6);
      for (const e of await fp
        .locator(".services-page h1, .services-page h3, .services-page__item p")
        .all()) {
        assert.equal(await e.evaluate((el) => getComputedStyle(el).opacity), "1");
      }
      if (options.reducedMotion) {
        await fp.goto(baseURL, { waitUntil: "domcontentloaded" });
        await fp.waitForTimeout(700);
        assert.equal(
          await fp.locator(".selected-work__image").evaluate((e) => getComputedStyle(e).transform),
          "none",
        );
      }
      checks.push(
        `${options.reducedMotion ? "Reduced motion" : "No JavaScript"}: readable service content${options.reducedMotion ? " and static project image" : ""}`,
      );
      await fallback.close();
    }
    assert.deepEqual(errors, []);
    await fs.writeFile(
      path.join(artifacts, "browser-results.json"),
      JSON.stringify({ browser: browser.version(), checks, errors, transforms, rails }, null, 2),
    );
    console.log(`PASS: ${checks.length} motion and Services checks; no runtime errors`);
    await context.close();
    const recording = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      recordVideo: {
        dir: path.resolve("../motion-preview-recordings"),
        size: { width: 1280, height: 800 },
      },
    });
    const demo = await recording.newPage();
    await demo.goto(baseURL, { waitUntil: "domcontentloaded" });
    await demo.waitForTimeout(1800);
    for (const selector of [
      ".selected-work__header",
      ".selected-work__image",
      ".home-services",
      ".engineering-motion",
      ".home-process",
    ]) {
      await demo
        .locator(selector)
        .evaluate((e) =>
          scrollTo({ top: e.getBoundingClientRect().top + scrollY - 160, behavior: "smooth" }),
        );
      await demo.waitForTimeout(1800);
    }
    await demo.goto(`${baseURL}/services`, { waitUntil: "domcontentloaded" });
    await demo.waitForTimeout(1800);
    await demo
      .locator(".services-page__item")
      .nth(2)
      .evaluate((e) => e.scrollIntoView({ behavior: "smooth", block: "center" }));
    await demo.waitForTimeout(2000);
    const video = demo.video();
    await recording.close();
    await video.saveAs(path.join(artifacts, "motion-preview.webm"));
    console.log("Saved actual browser motion recording");
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
