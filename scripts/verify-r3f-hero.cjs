/* Existing Playwright install; software WebGL is explicit for reproducible CI. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { createHash } = require("node:crypto");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/r3f-review");
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [],
    httpErrors = [],
    checks = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith(baseURL))
      httpErrors.push({ url: r.url(), status: r.status() });
  });
  try {
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    const scene = page.locator(".brand-sculpture");
    await page.waitForFunction(
      () => document.querySelector(".brand-sculpture")?.dataset.sceneState === "ready",
      {},
      { timeout: 25000 },
    );
    const canvas = scene.locator("canvas");
    assert.equal(await canvas.count(), 1);
    assert.equal(await canvas.evaluate((e) => e.tabIndex), -1);
    const approvedSvg = await fs.readFile(
      path.resolve(__dirname, "../public/logo-mark.svg"),
      "utf8",
    );
    const approvedPaths = [...approvedSvg.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map(
      (match) => match[1],
    );
    assert.equal(approvedPaths.length, 2);
    assert.deepEqual(
      await page
        .locator('.home-nav svg[viewBox="0 0 32 32"] path')
        .evaluateAll((paths) => paths.map((p) => p.getAttribute("d"))),
      approvedPaths,
    );
    assert.deepEqual(
      await page
        .locator(".brand-sculpture__poster [data-brand-mark]")
        .evaluateAll((paths) => paths.map((p) => p.getAttribute("d"))),
      approvedPaths,
    );
    checks.push(
      "3D source/static fallback share the approved logo contours; navigation mark remains identical to the original SVG",
    );
    assert.equal(await page.locator(".brand-sculpture__art").getAttribute("aria-hidden"), "true");
    const moving = [];
    for (let i = 0; i < 2; i++) {
      await page.waitForTimeout(900);
      moving.push(hash(await canvas.screenshot()));
    }
    assert.notEqual(moving[0], moving[1]);
    checks.push(
      "Actual React Three Fiber canvas renders and pixels change over time; decorative art is hidden from assistive technology",
    );
    const control = page.locator(".brand-sculpture__control");
    await control.focus();
    assert.ok(
      await control.evaluate(
        (e) => e === document.activeElement && getComputedStyle(e).outlineStyle !== "none",
      ),
    );
    await page.keyboard.press("Enter");
    assert.equal(await control.getAttribute("aria-pressed"), "true");
    await page.waitForTimeout(500);
    const paused1 = hash(await canvas.screenshot());
    await page.waitForTimeout(700);
    const paused2 = hash(await canvas.screenshot());
    assert.equal(paused1, paused2);
    await control.click();
    await page.waitForTimeout(700);
    assert.notEqual(hash(await canvas.screenshot()), paused2);
    checks.push(
      "Keyboard-visible pause/resume control stops actual canvas pixels and resumes movement",
    );
    await page
      .locator("#selected-work")
      .evaluate((e) => e.scrollIntoView({ behavior: "instant", block: "start" }));
    await page.waitForFunction(
      () => document.querySelector(".brand-sculpture").dataset.sceneActive === "false",
    );
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForFunction(
      () => document.querySelector(".brand-sculpture").dataset.sceneActive === "true",
    );
    checks.push("Scene rendering stops outside the viewport and resumes on returning");
    await control.click();
    const pauseLabels = {
      en: "Resume animation",
      fr: "Reprendre l’animation",
      es: "Reanudar animación",
    };
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        assert.equal(await control.getAttribute("aria-label"), pauseLabels[lang]);
        for (const size of ["100%", "200%"]) {
          await page.evaluate((s) => {
            document.documentElement.style.fontSize = s;
            scrollTo({ top: 0, behavior: "instant" });
          }, size);
          await page.waitForTimeout(180);
          assert.ok(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
            `${width} ${lang} ${size}: overflow`,
          );
          const nav = await page.locator(".home-nav").boundingBox();
          const eyebrow = await page.locator(".home-hero__eyebrow").boundingBox();
          assert.ok(
            eyebrow.y >= nav.y + nav.height,
            `${width} ${lang} ${size}: navigation overlaps introduction ${JSON.stringify({ nav, eyebrow })}`,
          );
          for (const node of await page
            .locator(
              ".home-hero h1,.home-hero__description,.home-hero__primary,.home-hero__secondary",
            )
            .all()) {
            const box = await node.boundingBox();
            assert.ok(
              box.x >= -1 && box.x + box.width <= width + 1,
              `${width} ${lang} ${size}: clipped text`,
            );
          }
        }
        await page.evaluate(() => (document.documentElement.style.fontSize = "100%"));
        checks.push(`${lang} ${width}px: localized controls and readable hero at 100%/200% text`);
      }
    }
    await page.getByRole("combobox").selectOption("en");
    for (const [width, name] of [
      [1440, "desktop"],
      [390, "mobile"],
    ]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(500);
      const orangePixels = await page.evaluate(
        async (encoded) => {
          const bitmap = await createImageBitmap(
            await (await fetch(`data:image/png;base64,${encoded}`)).blob(),
          );
          const surface = document.createElement("canvas");
          surface.width = bitmap.width;
          surface.height = bitmap.height;
          const context = surface.getContext("2d");
          context.drawImage(bitmap, 0, 0);
          const data = context.getImageData(0, 0, surface.width, surface.height).data;
          let count = 0;
          for (let i = 0; i < data.length; i += 4)
            if (data[i] > 80 && data[i] > data[i + 1] * 1.7 && data[i] > data[i + 2] * 1.4) count++;
          bitmap.close();
          return count;
        },
        (await canvas.screenshot()).toString("base64"),
      );
      assert.ok(
        orangePixels > 100,
        `${name}: paused sculpture disappeared after resizing (${orangePixels} orange pixels)`,
      );
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await control.evaluate((e) => e.blur());
      await page.mouse.move(0, 0);
      await page.screenshot({ path: path.join(artifacts, `${name}-first-screen.png`) });
      await page.locator(".home-hero").screenshot({ path: path.join(artifacts, `${name}.png`) });
    }
    checks.push("Paused 3D sculpture retains visible orange pixels after desktop/mobile resizing");
    for (const [selector, destination] of [
      [".home-hero__secondary", "/work"],
      [".home-hero__primary", "/contact"],
    ]) {
      await page.locator(selector).click();
      await page.waitForURL(`${baseURL}${destination}`);
      await page.locator(".brand-sculpture").waitFor({ state: "detached" });
      assert.equal(await page.locator(".brand-sculpture canvas").count(), 0);
      await page.goto(baseURL, { waitUntil: "domcontentloaded" });
      await page.locator(".home-hero").waitFor();
    }
    checks.push(
      "Hero buttons still open Work and Contact; canvas unmounts on navigation; no form submitted",
    );
    for (const mode of ["reduced", "no-js", "no-webgl", "save-data"]) {
      const fallback = await browser.newContext({
        viewport: { width: 390, height: 844 },
        ...(mode === "reduced" ? { reducedMotion: "reduce" } : {}),
        ...(mode === "no-js" ? { javaScriptEnabled: false } : {}),
      });
      if (mode === "no-webgl")
        await fallback.addInitScript(() => {
          const original = HTMLCanvasElement.prototype.getContext;
          HTMLCanvasElement.prototype.getContext = function (type, ...args) {
            return type === "webgl2" || type === "webgl"
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
      await fp.waitForTimeout(1200);
      await fp
        .locator(".brand-sculpture")
        .evaluate((e) => e.scrollIntoView({ behavior: "instant", block: "center" }));
      await fp.waitForTimeout(400);
      assert.equal(await fp.locator(".brand-sculpture canvas").count(), 0);
      assert.equal(
        await fp.locator(".brand-sculpture__poster").evaluate((e) => getComputedStyle(e).opacity),
        "1",
      );
      assert.ok(await fp.locator("h1").isVisible());
      assert.ok(await fp.locator(".home-hero__primary").isVisible());
      if (mode === "reduced")
        await fp
          .locator(".home-hero")
          .screenshot({ path: path.join(artifacts, "reduced-motion.png") });
      checks.push(
        `${mode}: static SVG remains visible, no 3D canvas, hero content and links preserved`,
      );
      await fallback.close();
    }
    const unloaded = await browser.newContext();
    const other = await unloaded.newPage();
    await other.goto(`${baseURL}/services`, { waitUntil: "domcontentloaded" });
    await other.waitForTimeout(500);
    assert.equal(await other.locator(".brand-sculpture").count(), 0);
    assert.equal(
      await other.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .some((r) => r.name.includes("BrandSculptureScene")),
      ),
      false,
    );
    await unloaded.close();
    checks.push("Services does not render the scene or request the lazy 3D scene chunk");
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
          moving,
          paused: [paused1, paused2],
        },
        null,
        2,
      ),
    );
    console.log(`PASS: ${checks.length} R3F hero checks; no local HTTP or runtime errors`);
    await context.close();
    const recording = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      recordVideo: { dir: path.resolve("../r3f-recordings"), size: { width: 1280, height: 800 } },
    });
    const demo = await recording.newPage();
    await demo.goto(baseURL, { waitUntil: "domcontentloaded" });
    await demo.waitForTimeout(5000);
    await demo.locator(".brand-sculpture__control").click();
    await demo.waitForTimeout(1800);
    await demo.locator(".brand-sculpture__control").click();
    await demo.waitForTimeout(2500);
    await demo.setViewportSize({ width: 390, height: 844 });
    await demo.waitForTimeout(900);
    await demo
      .locator(".brand-sculpture")
      .evaluate((e) => e.scrollIntoView({ behavior: "smooth", block: "center" }));
    await demo.waitForTimeout(3500);
    const video = demo.video();
    await recording.close();
    await video.saveAs(path.join(artifacts, "motion-preview.webm"));
    console.log("Saved actual R3F browser recording");
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
