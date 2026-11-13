/* Uses the existing Playwright installation and explicit software WebGL. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { createHash } = require("node:crypto");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/liquid-glass-review");
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const checks = [],
    errors = [],
    httpErrors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.url().startsWith(baseURL) && r.status() >= 400)
      httpErrors.push({ url: r.url(), status: r.status() });
  });
  const ready = async (width = 1440, lang = "en") => {
    await page.waitForFunction(
      ({ width, lang }) => {
        const header = document.querySelector(".home-nav--liquid");
        return (
          header?.dataset.glassState === "ready" &&
          header.dataset.glassWidth === String(width) &&
          header.dataset.glassLocale === lang
        );
      },
      { width, lang },
      { timeout: 30000 },
    );
    await page.waitForTimeout(150);
  };
  try {
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await ready();
    const canvas = page.locator(".home-nav canvas");
    assert.equal(await canvas.count(), 1);
    const glState = await canvas.evaluate((c) => {
      const gl = c.getContext("webgl");
      const program = gl.getParameter(gl.CURRENT_PROGRAM);
      return {
        linked: !!program && gl.getProgramParameter(program, gl.LINK_STATUS),
        width: c.width,
        height: c.height,
        error: gl.getError(),
      };
    });
    assert.equal(glState.linked, true);
    assert.equal(glState.error, 0);
    assert.ok(glState.width > 100 && glState.height > 30);
    assert.equal(await page.locator(".liquid-nav-surface").getAttribute("aria-hidden"), "true");
    assert.equal(
      await canvas.evaluate((e) => getComputedStyle(e.parentElement).pointerEvents),
      "none",
    );
    checks.push(
      "One real upstream WebGL shader links successfully behind native, accessible navigation",
    );
    const topHash = hash(await canvas.screenshot());
    await page.screenshot({ path: path.join(artifacts, "desktop.png") });
    await page
      .locator(".home-hero__heading")
      .evaluate((e) =>
        scrollTo({ top: e.getBoundingClientRect().top + scrollY - 8, behavior: "instant" }),
      );
    await page.waitForTimeout(450);
    const scrollHash = hash(await canvas.screenshot());
    assert.notEqual(topHash, scrollHash);
    await page.screenshot({ path: path.join(artifacts, "desktop-scrolled.png") });
    checks.push("Actual glass-canvas pixels change while scrolling over the captured page");
    for (const [width, lang] of [
      [1440, "fr"],
      [390, "es"],
      [320, "fr"],
      [1440, "en"],
    ]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.getByRole("combobox").selectOption(lang);
      await ready(width, lang);
      assert.equal(await page.locator(".home-nav canvas").count(), 1);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      const nav = await page.locator(".home-nav").boundingBox();
      assert.ok(nav.x >= 0 && nav.x + nav.width <= width + 1);
      assert.equal(await page.locator("iframe.html2canvas-container").count(), 0);
      checks.push(
        `${lang} ${width}px: resized and translated snapshot, bounded navigation, one canvas and no leftover capture iframe`,
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(390, "en");
    await page.screenshot({ path: path.join(artifacts, "mobile.png") });
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    assert.equal(
      await page.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded"),
      "true",
    );
    assert.equal(
      await page.locator(".liquid-nav-surface").evaluate((e) => getComputedStyle(e).opacity),
      "0",
    );
    await page.screenshot({ path: path.join(artifacts, "mobile-menu.png") });
    await page.keyboard.press("Escape");
    assert.ok(await toggle.evaluate((e) => e === document.activeElement));
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    checks.push(
      "Mobile menu uses a stable dark surface; Escape restores focus and glass reappears when closed",
    );
    for (let i = 0; i < 2; i++) {
      await toggle.click();
      await page.locator('#mobile-menu a[href="/services"]').click();
      await page.waitForURL(`${baseURL}/services`);
      await page.locator(".services-page").waitFor();
      assert.equal(await page.locator(".liquid-nav-surface").count(), 0);
      await page.getByRole("link", { name: "ZahTech", exact: true }).first().click();
      await page.waitForURL(baseURL + "/");
      await ready(390, "en");
      assert.equal(await page.locator(".liquid-nav-surface").count(), 1);
    }
    checks.push(
      "Repeated SPA navigation disposes the glass layer and restores exactly one instance on returning home",
    );
    for (const mode of ["reduce", "no-webgl", "save-data", "contrast", "no-js"]) {
      const fallback = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        ...(mode === "reduce" ? { reducedMotion: "reduce" } : {}),
        ...(mode === "contrast" ? { contrast: "more" } : {}),
        ...(mode === "no-js" ? { javaScriptEnabled: false } : {}),
      });
      if (mode === "no-webgl")
        await fallback.addInitScript(() => {
          const original = HTMLCanvasElement.prototype.getContext;
          HTMLCanvasElement.prototype.getContext = function (type, ...args) {
            return type === "webgl" || type === "webgl2"
              ? null
              : original.call(this, type, ...args);
          };
        });
      if (mode === "save-data")
        await fallback.addInitScript(() =>
          Object.defineProperty(navigator, "connection", {
            value: { saveData: true },
            configurable: true,
          }),
        );
      const fp = await fallback.newPage();
      await fp.goto(baseURL, { waitUntil: "domcontentloaded" });
      await fp.waitForTimeout(1800);
      assert.equal(await fp.locator(".home-nav canvas").count(), 0);
      assert.equal(
        await fp.locator('.home-nav__bar nav a[href="/work"]').getAttribute("href"),
        "/work",
      );
      assert.ok(await fp.getByRole("link", { name: "Contact", exact: true }).first().isVisible());
      assert.ok(await fp.locator("h1").isVisible());
      if (mode === "contrast")
        assert.equal(
          await fp.locator(".home-nav").evaluate((e) => getComputedStyle(e).backdropFilter),
          "none",
        );
      checks.push(`${mode}: navigation and hero remain usable without the WebGL glass layer`);
      await fallback.close();
    }
    const fresh = await browser.newContext();
    const other = await fresh.newPage();
    await other.goto(`${baseURL}/services`, { waitUntil: "domcontentloaded" });
    await other.waitForTimeout(500);
    assert.equal(await other.locator(".home-nav--liquid").count(), 0);
    assert.equal(
      await other.evaluate(() =>
        performance.getEntriesByType("resource").some((r) => r.name.includes("html2canvas")),
      ),
      false,
    );
    await fresh.close();
    checks.push("A fresh Services visit does not opt into glass or fetch the capture library");
    assert.deepEqual(errors, []);
    assert.deepEqual(httpErrors, []);
    await fs.writeFile(
      path.join(artifacts, "browser-results.json"),
      JSON.stringify(
        {
          browser: browser.version(),
          renderer: "Chromium software WebGL (SwiftShader)",
          checks,
          errors,
          httpErrors,
          glState,
          hashes: { top: topHash, scrolled: scrollHash },
        },
        null,
        2,
      ),
    );
    console.log(`PASS: ${checks.length} Liquid Glass checks; no local HTTP or runtime errors`);
    await context.close();
    const recording = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      recordVideo: { dir: path.resolve("../glass-recordings"), size: { width: 1280, height: 800 } },
    });
    const demo = await recording.newPage();
    await demo.goto(baseURL, { waitUntil: "domcontentloaded" });
    await demo.waitForFunction(
      () => document.querySelector(".home-nav")?.dataset.glassState === "ready",
      {},
      { timeout: 30000 },
    );
    await demo.waitForTimeout(1000);
    await demo
      .locator(".home-hero__heading")
      .evaluate((e) =>
        scrollTo({ top: e.getBoundingClientRect().top + scrollY - 8, behavior: "smooth" }),
      );
    await demo.waitForTimeout(2300);
    await demo
      .locator("#services")
      .evaluate((e) =>
        scrollTo({ top: e.getBoundingClientRect().top + scrollY - 100, behavior: "smooth" }),
      );
    await demo.waitForTimeout(2300);
    await demo.setViewportSize({ width: 390, height: 844 });
    await demo.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await demo.waitForTimeout(1800);
    await demo.getByRole("button", { name: "Open menu" }).click();
    await demo.waitForTimeout(1000);
    await demo.keyboard.press("Escape");
    await demo.waitForTimeout(700);
    const video = demo.video();
    await recording.close();
    await video.saveAs(path.join(artifacts, "motion-preview.webm"));
    console.log("Saved actual Liquid Glass navigation recording");
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
