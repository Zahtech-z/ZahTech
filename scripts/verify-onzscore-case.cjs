const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/onzscore-live-review");
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(() => {
    window.__onzMotionSeen = false;
    function sample() {
      const h = document.querySelector(".onz-hero h1");
      if (
        h &&
        Number(getComputedStyle(h).opacity) > 0 &&
        Number(getComputedStyle(h).opacity) < 0.99
      )
        window.__onzMotionSeen = true;
      requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  });
  const page = await context.newPage();
  const checks = [],
    errors = [],
    httpErrors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.url().startsWith(base) && r.status() >= 400)
      httpErrors.push({ url: r.url(), status: r.status() });
  });
  const visit = async () => {
    const response = await page.goto(`${base}/work/onzscore`, { waitUntil: "domcontentloaded" });
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.load('500 40px "ZahTech Hero Sans"'));
  };
  const reveal = async () => {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(1000);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(300);
  };
  try {
    await visit();
    await page.waitForFunction(
      () => document.querySelector(".onz-hero__copy")?.dataset.motionState === "complete",
    );
    assert.ok(await page.evaluate(() => window.__onzMotionSeen));
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(
      await page.locator("link[rel=canonical]").getAttribute("href"),
      "https://zahtech.org/work/onzscore",
    );
    assert.equal(
      await page.locator("link[as=font]").getAttribute("href"),
      "/fonts/hero/inter-latin.woff2",
    );
    const ids = await page.locator("[id]").evaluateAll((ns) => ns.map((n) => n.id));
    assert.equal(new Set(ids).size, ids.length);
    const levels = await page
      .locator("h1,h2,h3")
      .evaluateAll((ns) => ns.map((n) => Number(n.tagName[1])));
    assert.ok(levels.every((n, i) => (!i ? n === 1 : n <= levels[i - 1] + 1)));
    assert.ok((await page.locator("main").innerText()).includes("Live at onzscore.com"));
    assert.ok(!(await page.locator("main").innerText()).includes("Preparing for production"));
    checks.push(
      "Single H1, coherent headings/IDs, canonical, local font, live status and real entrance motion",
    );
    await page.waitForFunction(() => {
      const n = document.querySelector(".home-nav");
      return n?.dataset.glassState === "ready" && n.dataset.glassPath === "/work/onzscore";
    });
    assert.equal(await page.locator(".home-nav canvas").count(), 1);
    checks.push(
      "Real Liquid Glass initializes on the case study with its own current-page snapshot",
    );
    assert.equal(await page.locator(".onz-system__node").count(), 4);
    assert.equal(await page.locator(".onz-system__node ul li").count(), 11);
    assert.ok((await page.locator(".onz-system__base").innerText()).includes("Nginx"));
    checks.push(
      "Engineering diagram preserves documented frontend/services/data/delivery technologies and Nginx",
    );
    for (const lang of ["en", "fr", "es"]) {
      await page.locator("header select").selectOption(lang);
      await page.waitForFunction((lang) => document.documentElement.lang === lang, lang);
      const locale = lang === "fr" ? "fr" : "en";
      for (let i = 0; i < 4; i++) {
        const button = page.locator(".onz-explorer__choice").nth(i);
        await button.focus();
        await page.keyboard.press("Enter");
        assert.equal(await button.getAttribute("aria-pressed"), "true");
        assert.equal(await page.locator('.onz-explorer__choice[aria-pressed="true"]').count(), 1);
        const id = ["matches", "match", "streaks", "vip"][i];
        const src = `/images/onzscore/live/${id}-${locale}.webp`;
        assert.equal(await page.locator(".onz-explorer__stage img").getAttribute("src"), src);
        await page.locator(".onz-explorer__stage img").evaluate((n) => n.decode());
        assert.ok((await page.locator(".onz-explorer__stage img").getAttribute("alt")).length > 25);
        assert.equal(await page.locator(".onz-explorer figcaption a").getAttribute("href"), src);
        assert.ok(await button.evaluate((n) => n === document.activeElement));
      }
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        for (const size of ["100%", "200%"]) {
          await page.evaluate((size) => {
            document.documentElement.style.fontSize = size;
            scrollTo({ top: 0, behavior: "instant" });
          }, size);
          await page.waitForTimeout(150);
          assert.ok(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
            `${lang} ${width} ${size}: overflow`,
          );
          const nav = await page.locator("header.home-nav").boundingBox();
          const back = await page.locator(".onz-back").boundingBox();
          assert.ok(back.y >= nav.y + nav.height, `${lang} ${width} ${size}: nav overlap`);
          const boxes = await page
            .locator("main h1,main h2,main h3,main button,main .onz-button")
            .evaluateAll((ns) =>
              ns.map((n) => {
                const r = n.getBoundingClientRect();
                return { x: r.x, right: r.right };
              }),
            );
          assert.ok(
            boxes.every((r) => r.x >= -1 && r.right <= width + 1),
            `${lang} ${width} ${size}: clipped control/heading`,
          );
        }
        await page.evaluate(() => (document.documentElement.style.fontSize = "100%"));
        checks.push(
          `${lang} ${width}px: no overflow, clipped headings/controls or nav overlap at 100%/200% text`,
        );
      }
      checks.push(
        `${lang}: all four previews switch by keyboard, keep focus, expose current state and link to the correct full-size localized asset`,
      );
    }
    await page.locator("header select").selectOption("en");
    await page.locator(".onz-explorer__choice").first().click();
    for (const [width, name] of [
      [1440, "desktop"],
      [390, "mobile"],
    ]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await reveal();
      await page.screenshot({ path: path.join(artifacts, `${name}.png`), fullPage: true });
      await page.screenshot({ path: path.join(artifacts, `${name}-first-screen.png`) });
      await page
        .locator(".onz-experience")
        .evaluate((e) =>
          scrollTo({ top: e.getBoundingClientRect().top + scrollY - 150, behavior: "instant" }),
        );
      await page.screenshot({ path: path.join(artifacts, `${name}-explorer.png`) });
    }
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    await page.keyboard.press("Escape");
    assert.ok(await toggle.evaluate((n) => n === document.activeElement));
    checks.push(
      "Desktop/mobile complete screenshots and product explorer; mobile menu restores focus",
    );
    const external = await page
      .locator('.onz-case a[href^="https://"]')
      .evaluateAll((ns) =>
        ns.map((n) => ({ href: n.getAttribute("href"), rel: n.rel, target: n.target })),
      );
    assert.ok(external.length >= 3);
    assert.ok(
      external.every(
        (n) =>
          ["https://onzscore.com/", "https://onzscore.com/track-record"].includes(n.href) &&
          n.rel.includes("noopener") &&
          n.target === "_blank",
      ),
    );
    await page.locator(".onz-cta a").click();
    await page.waitForURL(`${base}/contact`);
    await page.locator(".contact-form").waitFor();
    await visit();
    await page.locator(".onz-back").click();
    await page.waitForURL(`${base}/work`);
    assert.ok(
      (await page.locator(".work-project__label").innerText()).includes("Live at onzscore.com"),
    );
    assert.equal(
      await page.locator(".work-project img").getAttribute("src"),
      "/images/onzscore/live/onzscore-cover.png",
    );
    await page.locator(".work-project img").evaluate((n) => n.decode());
    await page.locator(".work-project__link").scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      ["complete", "static"].includes(
        document.querySelector(".work-project__details").dataset.motionState,
      ),
    );
    await page.locator(".work-project__link").click();
    await page.waitForURL(`${base}/work/onzscore`);
    await page.locator(".onz-case").waitFor();
    checks.push(
      "Safe official external links, Contact CTA, Work backlink, updated portfolio cover/status and return to case study",
    );
    const legacy = await page.goto(`${base}/work/matchwise`, { waitUntil: "domcontentloaded" });
    assert.equal(legacy.status(), 200);
    assert.equal(page.url(), `${base}/work/onzscore`);
    checks.push("Legacy Matchwise URL redirects to the current case study");
    for (const options of [{ reducedMotion: "reduce" }, { javaScriptEnabled: false }]) {
      const fallback = await browser.newContext({
        ...options,
        viewport: { width: 390, height: 844 },
      });
      const fp = await fallback.newPage();
      await fp.goto(`${base}/work/onzscore`, { waitUntil: "domcontentloaded" });
      assert.ok((await fp.locator("h1").innerText()).includes("OnzScore"));
      assert.equal(await fp.locator("h1").evaluate((n) => getComputedStyle(n).opacity), "1");
      assert.equal(await fp.locator("h1").evaluate((n) => getComputedStyle(n).transform), "none");
      assert.equal(await fp.locator(".onz-system__node").count(), 4);
      if (options.javaScriptEnabled === false) {
        assert.equal(await fp.locator(".onz-noscript a").count(), 4);
        assert.equal(await fp.locator(".onz-explorer__choices").isVisible(), false);
      }
      checks.push(
        `${options.reducedMotion ? "Reduced motion" : "No JavaScript"}: readable static case study, complete architecture and accessible image links`,
      );
      await fallback.close();
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(httpErrors, []);
    await fs.writeFile(
      path.join(artifacts, "browser-results.json"),
      JSON.stringify(
        {
          browser: browser.version(),
          renderer: "SwiftShader",
          checks,
          errors,
          httpErrors,
          realContactSubmissions: 0,
        },
        null,
        2,
      ),
    );
    console.log(`PASS: ${checks.length} OnzScore case-study checks; no runtime/local HTTP errors`);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
