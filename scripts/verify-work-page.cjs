/* Uses an existing Playwright installation; no application dependency is added. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/work-page-review");
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(() => {
    window.__workMotionSeen = false;
    const sample = () => {
      const h = document.querySelector(".work-page h1");
      if (
        h &&
        Number(getComputedStyle(h).opacity) > 0 &&
        Number(getComputedStyle(h).opacity) < 0.99
      )
        window.__workMotionSeen = true;
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  const page = await context.newPage();
  const checks = [],
    errors = [],
    httpErrors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith(baseURL))
      httpErrors.push({ url: r.url(), status: r.status() });
  });
  const settle = async (selector) => {
    await page
      .locator(selector)
      .evaluate((e) =>
        scrollTo({ top: e.getBoundingClientRect().top + scrollY - 180, behavior: "instant" }),
      );
    await page.waitForTimeout(1000);
  };
  const ready = async () => {
    await page.locator(".work-page").waitFor();
    await page.evaluate(() => document.fonts.load('500 40px "ZahTech Hero Sans"'));
    await page.waitForFunction(
      () => document.querySelector(".work-page__header").dataset.motionState === "complete",
    );
  };
  try {
    assert.equal(
      (await page.goto(`${baseURL}/work`, { waitUntil: "domcontentloaded" })).status(),
      200,
    );
    await ready();
    assert.ok(await page.evaluate(() => window.__workMotionSeen));
    checks.push("Normal motion observed in actual heading opacity frames after hydration");
    assert.equal(await page.locator(".work-project").count(), 1);
    assert.equal(await page.locator(".work-project h2").innerText(), "OnzScore");
    assert.ok(
      (await page.locator(".work-project__label").innerText()).includes("Live at onzscore.com"),
    );
    assert.deepEqual(await page.locator(".work-project__identity li").allTextContents(), [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
    ]);
    const img = page.locator(".work-project img");
    assert.equal(await img.getAttribute("src"), "/images/onzscore/live/onzscore-cover.png");
    await img.evaluate((e) => e.decode());
    assert.ok(await img.evaluate((e) => e.naturalWidth > 0 && e.alt.length > 0));
    checks.push(
      "One documented project, current artwork/alt, technologies and verified live status",
    );
    const fullSize = page.locator(".work-project figcaption a");
    assert.equal(await fullSize.getAttribute("href"), "/images/onzscore/live/onzscore-cover.png");
    assert.equal(await fullSize.getAttribute("target"), "_blank");
    assert.ok((await fullSize.getAttribute("rel")).includes("noopener"));
    checks.push("Full-size image link and safe new-tab behavior preserved");
    assert.equal(await page.locator("h1").count(), 1);
    const ids = await page.locator("[id]").evaluateAll((es) => es.map((e) => e.id));
    assert.equal(new Set(ids).size, ids.length);
    assert.equal(
      await page.locator("link[rel=canonical]").getAttribute("href"),
      "https://zahtech.org/work",
    );
    assert.equal(
      await page.locator("link[rel=preload][as=font]").getAttribute("href"),
      "/fonts/hero/inter-latin.woff2",
    );
    checks.push("One H1, unique IDs, canonical metadata and local Inter preload");
    const titles = { en: "Selected Work", fr: "Réalisations choisies", es: "Proyectos destacados" };
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        assert.equal(await page.locator("h1").innerText(), titles[lang]);
        for (const size of ["100%", "200%"]) {
          await page.evaluate((s) => (document.documentElement.style.fontSize = s), size);
          await page.waitForTimeout(150);
          assert.ok(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
            `${width} ${lang} ${size}: overflow`,
          );
          for (const node of await page
            .locator(
              ".work-page h1,.work-page h2,.work-project__summary>p,.work-project__identity>p,.work-project__link",
            )
            .all()) {
            const rect = await node.boundingBox();
            assert.ok(
              rect.x >= -1 && rect.x + rect.width <= width + 1,
              `${width} ${lang} ${size}: clipped content`,
            );
          }
          const nav = await page.locator(".home-nav").boundingBox();
          const heading = await page.locator("h1").boundingBox();
          assert.ok(
            heading.y >= nav.y + nav.height,
            `${width} ${lang} ${size}: navigation overlaps title ${JSON.stringify({ heading, nav, scrollY: await page.evaluate(() => scrollY) })}`,
          );
        }
        await page.evaluate(() => (document.documentElement.style.fontSize = "100%"));
        checks.push(
          `${lang} ${width}px: translated title, bounded content and navigation at 100%/200% text`,
        );
      }
    }
    await page.getByRole("combobox").selectOption("en");
    for (const [width, name] of [
      [1440, "desktop"],
      [390, "mobile"],
    ]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      for (const selector of [".work-project__visual", ".work-project__details", ".work-cta"])
        await settle(selector);
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(artifacts, `${name}.png`), fullPage: true });
      await page.screenshot({ path: path.join(artifacts, `${name}-first-screen.png`) });
    }
    const toggle = page.locator(".home-nav__menu-button");
    await toggle.click();
    assert.equal(await toggle.getAttribute("aria-expanded"), "true");
    await page.keyboard.press("Escape");
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    assert.ok(await toggle.evaluate((e) => e === document.activeElement));
    checks.push("Mobile menu opens, Escape closes it and restores focus");
    await page.locator(".work-project__link").focus();
    assert.ok(
      await page
        .locator(".work-project__link")
        .evaluate((e) => getComputedStyle(e).outlineStyle !== "none"),
    );
    await page.keyboard.press("Enter");
    await page.waitForURL(`${baseURL}/work/onzscore`);
    await page.locator(".onz-case").waitFor();
    assert.equal(await page.locator(".home-nav--liquid").count(), 1);
    assert.ok((await page.locator("h1").innerText()).includes("OnzScore"));
    await page.getByRole("link", { name: "Back to work", exact: true }).click();
    await ready();
    assert.equal(await page.locator(".home-nav").count(), 1);
    checks.push(
      "Keyboard case-study link opens the existing detail page; Back restores the dark Work index",
    );
    await page.locator(".work-cta a").click();
    await page.waitForURL(`${baseURL}/contact`);
    await page.locator("form").waitFor();
    checks.push("Contact CTA opens the existing form; no request submitted");
    for (const options of [{ reducedMotion: "reduce" }, { javaScriptEnabled: false }]) {
      const fallback = await browser.newContext({
        ...options,
        viewport: { width: 390, height: 844 },
      });
      const fp = await fallback.newPage();
      await fp.goto(`${baseURL}/work`, { waitUntil: "domcontentloaded" });
      await fp.waitForTimeout(800);
      for (const node of await fp
        .locator(".work-page h1,.work-page h2,.work-project__summary,.work-project__visual")
        .all()) {
        assert.ok(await node.isVisible());
        assert.equal(await node.evaluate((e) => getComputedStyle(e).opacity), "1");
        assert.equal(await node.evaluate((e) => getComputedStyle(e).transform), "none");
      }
      assert.equal(await fp.locator(".work-project__link").getAttribute("href"), "/work/onzscore");
      if (options.reducedMotion)
        assert.equal(
          await fp
            .locator(".work-project img")
            .evaluate((e) => getComputedStyle(e).transitionProperty),
          "none",
        );
      checks.push(
        `${options.reducedMotion ? "Reduced motion" : "No JavaScript"}: readable static project content and case-study link`,
      );
      await fallback.close();
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(httpErrors, []);
    await fs.writeFile(
      path.join(artifacts, "browser-results.json"),
      JSON.stringify({ browser: browser.version(), checks, errors, httpErrors }, null, 2),
    );
    console.log(`PASS: ${checks.length} Work-page checks; no local HTTP or runtime errors`);
    await context.close();
    const demoContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      recordVideo: {
        dir: path.resolve("../work-preview-recordings"),
        size: { width: 1280, height: 800 },
      },
    });
    const demo = await demoContext.newPage();
    await demo.goto(`${baseURL}/work`, { waitUntil: "domcontentloaded" });
    await demo.waitForTimeout(1600);
    for (const selector of [".work-project__visual", ".work-project__details", ".work-cta"]) {
      await demo
        .locator(selector)
        .evaluate((e) =>
          scrollTo({ top: e.getBoundingClientRect().top + scrollY - 180, behavior: "smooth" }),
        );
      await demo.waitForTimeout(1800);
    }
    await demo.locator(".work-project__link").hover();
    await demo.waitForTimeout(900);
    await demo.setViewportSize({ width: 390, height: 844 });
    await demo.goto(`${baseURL}/work`, { waitUntil: "domcontentloaded" });
    await demo.waitForTimeout(1800);
    await demo
      .locator(".work-project__details")
      .evaluate((e) => e.scrollIntoView({ behavior: "smooth", block: "center" }));
    await demo.waitForTimeout(1800);
    const video = demo.video();
    await demoContext.close();
    await video.saveAs(path.join(artifacts, "motion-preview.webm"));
    console.log("Saved actual desktop/mobile browser recording");
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
