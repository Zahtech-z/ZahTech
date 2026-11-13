/* Real-browser layout/content checks. Contact requests are intercepted locally. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { createHash } = require("node:crypto");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/interior-pages-review");
const routes = ["about", "blog", "contact", "privacy"];
const normalize = (text) => text.replace(/\s+/g, " ").trim();
// The former CSS uppercased eyebrow labels; compare their presentation case only.
const content = async (page) => {
  let text = normalize(await page.locator("main").innerText());
  for (const label of await page.locator(".site-page__eyebrow").allTextContents()) {
    text = text.replace(normalize(label), normalize(label).toUpperCase());
  }
  return text;
};
(async () => {
  const original = JSON.parse(
    await fs.readFile(
      path.resolve(__dirname, "../docs/interior-pages-review/original-content.json"),
      "utf8",
    ),
  );
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const checks = [],
    errors = [],
    httpErrors = [],
    contentHashes = {},
    mockRequests = [];
  let apiMode = "error";
  // No contact POST reaches the server or the email provider.
  await page.route("**/api/contact", async (route) => {
    mockRequests.push(route.request().postDataJSON());
    await route.fulfill({
      status: apiMode === "success" ? 200 : 502,
      contentType: "application/json",
      body: JSON.stringify({ ok: apiMode === "success" }),
    });
  });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.url().startsWith(baseURL) && r.status() >= 400 && !r.url().endsWith("/api/contact"))
      httpErrors.push({ url: r.url(), status: r.status() });
  });
  const visit = async (route) => {
    const response = await page.goto(`${baseURL}/${route}`, { waitUntil: "domcontentloaded" });
    assert.equal(response.status(), 200);
    await page.locator(`[data-site-page="${route}"]`).waitFor();
    await page.evaluate(() => document.fonts.load('500 40px "ZahTech Hero Sans"'));
  };
  const reveal = async () => {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.floor(page.viewportSize().height * 0.7);
    for (let y = 0; y < height; y += step) {
      await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(90);
    }
    await page.waitForTimeout(850);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(350);
  };
  try {
    for (const route of routes) {
      await visit(route);
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await page.locator("header.home-nav").count(), 1);
      assert.equal(await page.locator("footer.home-footer").count(), 1);
      assert.equal(await page.locator("main canvas").count(), 0);
      assert.equal(
        await page.locator("link[rel=canonical]").getAttribute("href"),
        `https://zahtech.org/${route}`,
      );
      assert.equal(
        await page.locator("link[rel=preload][as=font]").getAttribute("href"),
        "/fonts/hero/inter-latin.woff2",
      );
      const ids = await page.locator("[id]").evaluateAll((nodes) => nodes.map((n) => n.id));
      assert.equal(new Set(ids).size, ids.length);
      const levels = await page
        .locator("h1,h2,h3")
        .evaluateAll((nodes) => nodes.map((n) => Number(n.tagName[1])));
      assert.ok(
        levels.every((level, index) =>
          index === 0 ? level === 1 : level <= levels[index - 1] + 1,
        ),
      );
      assert.ok(
        await page
          .locator("h1")
          .evaluate((e) => getComputedStyle(e).fontFamily.includes("ZahTech Hero Sans")),
      );
      checks.push(
        `${route}: semantic headings/IDs, floating navigation, dark footer, canonical and local Inter; no content canvas`,
      );
      contentHashes[route] = {};
      for (const lang of ["en", "fr", "es"]) {
        await page.locator("header select").first().selectOption(lang);
        await page.waitForFunction((l) => document.documentElement.lang === l, lang);
        const text = await content(page);
        if (text !== original[route][lang]) {
          let index = 0;
          while (text[index] === original[route][lang][index] && index < text.length) index++;
          throw new Error(
            `${route} ${lang}: content changed near ${index}: ${JSON.stringify({ before: original[route][lang].slice(Math.max(0, index - 45), index + 100), after: text.slice(Math.max(0, index - 45), index + 100) })}`,
          );
        }
        contentHashes[route][lang] = createHash("sha256").update(text).digest("hex");
        checks.push(
          `${route} ${lang}: original main content preserved (whitespace and eyebrow presentation case normalized)`,
        );
      }
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        for (const lang of ["en", "fr", "es"]) {
          await page.locator("header select").first().selectOption(lang);
          for (const size of ["100%", "200%"]) {
            await page.evaluate((size) => {
              document.documentElement.style.fontSize = size;
              scrollTo({ top: 0, behavior: "instant" });
            }, size);
            await page.waitForTimeout(120);
            assert.ok(
              await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
              `${route} ${lang} ${width} ${size}: horizontal overflow`,
            );
            const nav = await page.locator("header.home-nav").boundingBox();
            const intro = await page
              .locator(".site-page__header .site-page__eyebrow")
              .boundingBox();
            assert.ok(
              intro.y >= nav.y + nav.height,
              `${route} ${lang} ${width} ${size}: nav overlap ${JSON.stringify({ nav, intro })}`,
            );
            const boxes = await page
              .locator(
                "main h1,main h2,main h3,main dt,main dd,main label,main input:not([name=website]),main textarea,main select,main button",
              )
              .evaluateAll((nodes) =>
                nodes.map((n) => {
                  const r = n.getBoundingClientRect();
                  return { x: r.x, width: r.width };
                }),
              );
            assert.ok(
              boxes.every((r) => r.x >= -1 && r.x + r.width <= width + 1),
              `${route} ${lang} ${width} ${size}: clipped heading or control`,
            );
          }
          await page.evaluate(() => (document.documentElement.style.fontSize = "100%"));
          checks.push(
            `${route} ${lang} ${width}px: readable reflow at 100%/200% text, no nav overlap or clipped controls`,
          );
        }
      }
      await page.locator("header select").first().selectOption("en");
      for (const [width, name] of [
        [1440, "desktop"],
        [390, "mobile"],
      ]) {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
        await reveal();
        await page.screenshot({
          path: path.join(artifacts, `${route}-${name}.png`),
          fullPage: true,
        });
        await page.screenshot({ path: path.join(artifacts, `${route}-${name}-first-screen.png`) });
      }
      const toggle = page.getByRole("button", { name: "Open menu" });
      await toggle.click();
      await page.keyboard.press("Escape");
      assert.ok(await toggle.evaluate((e) => e === document.activeElement));
      assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      checks.push(`${route}: mobile menu and Escape focus restoration`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await visit("about");
    assert.equal(await page.locator(".site-page__list li").count(), 3);
    assert.equal(await page.locator(".site-definitions dt").count(), 4);
    assert.equal(await page.locator("#founder-heading").innerText(), "Anicet Hermann Zie");
    await page.locator(".site-cta a").click();
    await page.waitForURL(`${baseURL}/contact`);
    await page.locator(".contact-form").waitFor();
    checks.push(
      "About: original founder, three principles, four disciplines and contact destination preserved",
    );
    await visit("blog");
    assert.equal(await page.locator(".site-page__list li").count(), 4);
    assert.equal(await page.locator("main article").count(), 0);
    assert.equal(await page.locator("#publication-heading").innerText(), "Writing in progress.");
    await page.locator(".site-cta a").click();
    await page.waitForURL(`${baseURL}/contact`);
    await page.locator(".contact-form").waitFor();
    checks.push(
      "Blog: honest unpublished state, four existing topics and contact destination; no invented article",
    );
    await visit("privacy");
    assert.equal(await page.locator(".site-legal__section").count(), 7);
    assert.equal(await page.locator(".site-page__meta").innerText(), "Effective October 4, 2026");
    assert.equal(
      await page.locator('main a[href^="mailto:"]').getAttribute("href"),
      "mailto:contact@zahtech.net",
    );
    await page.locator(".site-legal__contact a").click();
    await page.waitForURL(`${baseURL}/contact`);
    await page.locator(".contact-form").waitFor();
    checks.push(
      "Privacy: seven original sections, effective date, email and contact link preserved",
    );
    const form = page.locator(".contact-form"),
      send = form.locator("button[type=submit]");
    assert.ok(
      await form
        .locator("input,textarea,select")
        .evaluateAll((nodes) =>
          nodes.every(
            (n) => n.name === "website" || !!document.querySelector(`label[for="${n.id}"]`),
          ),
        ),
    );
    await send.click();
    assert.equal(mockRequests.length, 0);
    assert.ok(await form.locator("#inquiry-name").evaluate((e) => e.validity.valueMissing));
    await form.locator("#inquiry-name").fill("Visual review");
    await form.locator("#inquiry-email").fill("invalid");
    await form.locator("#inquiry-description").fill("Local visual test only.");
    await send.click();
    assert.equal(mockRequests.length, 0);
    assert.ok(await form.locator("#inquiry-email").evaluate((e) => e.validity.typeMismatch));
    await form.locator("#inquiry-name").fill("   ");
    await form.locator("#inquiry-email").fill("review@example.com");
    await send.click();
    assert.equal(mockRequests.length, 0);
    checks.push("Contact: labels, required/email/whitespace validation prevent invalid requests");
    await page.locator("header select").first().selectOption("fr");
    await form.locator("#inquiry-name").fill("Visual review");
    await form.locator("#inquiry-description").fill("Local visual test only.");
    await form.locator("#inquiry-service").selectOption("cloud");
    await form.locator("#inquiry-stage").selectOption("2");
    await form.locator("#inquiry-budget").selectOption("2");
    await form.locator("#inquiry-email").focus();
    assert.ok(
      await form
        .locator("#inquiry-email")
        .evaluate((e) => getComputedStyle(e).outlineStyle !== "none"),
    );
    await send.click();
    await page.getByRole("alert").waitFor();
    assert.equal(mockRequests.length, 1);
    assert.equal(
      await form.locator("#inquiry-description").inputValue(),
      "Local visual test only.",
    );
    assert.equal(await send.isEnabled(), true);
    assert.equal(mockRequests[0].services, "Cloud & DevOps");
    assert.equal(mockRequests[0].stage, "In development");
    assert.equal(mockRequests[0].budget, "$5k–$15k");
    checks.push(
      "Contact: simulated error preserves input and retry; French UI sends original normalized English service/stage/budget values",
    );
    apiMode = "success";
    await send.click();
    await page.waitForFunction(
      () => document.querySelector("form [role=status]").textContent.trim().length > 0,
    );
    assert.equal(mockRequests.length, 2);
    assert.equal(await send.isDisabled(), true);
    assert.equal(await form.getAttribute("aria-busy"), "false");
    await form.locator('a[href="/privacy"]').click();
    await page.waitForURL(`${baseURL}/privacy`);
    await page.locator(".site-legal").waitFor();
    checks.push(
      "Contact: simulated success announces status and disables repeat submission; disclosure links to Privacy; zero real emails",
    );
    for (const options of [{ reducedMotion: "reduce" }, { javaScriptEnabled: false }]) {
      const fallback = await browser.newContext({
        ...options,
        viewport: { width: 390, height: 844 },
      });
      const fp = await fallback.newPage();
      for (const route of routes) {
        await fp.goto(`${baseURL}/${route}`, { waitUntil: "domcontentloaded" });
        await fp.waitForTimeout(250);
        assert.equal(await content(fp), original[route].en);
        assert.equal(await fp.locator("h1").evaluate((e) => getComputedStyle(e).opacity), "1");
        assert.equal(await fp.locator("h1").evaluate((e) => getComputedStyle(e).transform), "none");
        checks.push(
          `${route}: ${options.reducedMotion ? "reduced motion" : "no JavaScript"} keeps complete static content readable`,
        );
      }
      await fallback.close();
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(httpErrors, []);
    await fs.writeFile(
      path.join(artifacts, "browser-results.json"),
      JSON.stringify(
        {
          browser: browser.version(),
          checks,
          errors,
          httpErrors,
          contentHashes,
          contact: { mockedRequests: mockRequests.length, realRequests: 0 },
        },
        null,
        2,
      ),
    );
    console.log(
      `PASS: ${checks.length} interior-page checks; no runtime/local HTTP errors; no real inquiry sent`,
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
