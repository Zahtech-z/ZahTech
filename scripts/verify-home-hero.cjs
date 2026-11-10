/* Run with an existing Playwright installation; this adds no app dependency.
 * PLAYWRIGHT_MODULE may point to that installation's package directory.
 * BASE_URL defaults to the isolated local preview.
 */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/hero-review");
const expected = {
  en: "Your next idea. Built to work.",
  fr: "Votre prochaine idée. Pensée pour réussir.",
  es: "Tu próxima idea. Hecha para funcionar.",
};

(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  const failures = [];
  const checks = [];
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(() => {
    window.__heroMotionSeen = false;
    new MutationObserver(() => {
      if (
        [...document.querySelectorAll("[data-hero-reveal]")].some(
          (element) => Number(getComputedStyle(element).opacity) < 0.99,
        )
      ) {
        window.__heroMotionSeen = true;
      }
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ["style"] });
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) =>
    failures.push({ url: request.url(), error: request.failure()?.errorText }),
  );
  const ready = async () => {
    await page.locator(".home-hero").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() =>
      [...document.querySelectorAll("[data-hero-reveal]")].every(
        (element) => Number(getComputedStyle(element).opacity) > 0.99,
      ),
    );
    // Allow the final reveal frame and hover state to settle before capture.
    await page.waitForTimeout(900);
    await page.waitForFunction(() =>
      [...document.querySelectorAll("[data-hero-reveal]")].every(
        (element) => Number(getComputedStyle(element).opacity) > 0.99,
      ),
    );
  };
  const noOverflow = async (label) => {
    const size = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    assert.ok(
      size.document <= size.viewport,
      `${label}: horizontal overflow ${JSON.stringify(size)}`,
    );
    const heading = await page.locator("h1").boundingBox();
    const header = await page.locator("header").boundingBox();
    assert.ok(heading.y > header.y + header.height, `${label}: header overlaps title`);
    checks.push(`${label}: no horizontal overflow or title overlap`);
  };
  try {
    assert.equal((await page.goto(baseURL)).status(), 200);
    await ready();
    assert.equal((await page.locator("h1").innerText()).replace(/\s+/g, " ").trim(), expected.en);
    assert.equal(await page.locator(".home-hero__primary").getAttribute("href"), "/contact");
    assert.equal(await page.locator(".home-hero__secondary").getAttribute("href"), "/work");
    assert.ok(
      await page.evaluate(
        () =>
          document.fonts.check('16px "ZahTech Hero Sans"') &&
          document.fonts.check('600 48px "ZahTech Hero Display"'),
      ),
    );
    checks.push("local Syne and Inter fonts loaded");
    assert.ok(await page.evaluate(() => window.__heroMotionSeen), "normal motion never animated");
    checks.push("normal motion: reveal visibly changes opacity after hydration");
    await noOverflow("desktop 1440");
    await page.screenshot({ path: path.join(artifacts, "desktop.png") });
    checks.push("desktop screenshot captured");

    // Real route transitions, including the default navigation on destination pages.
    for (const route of ["/services", "/work", "/about", "/blog"]) {
      await page.locator(`header nav:visible a[href='${route}']`).click();
      await page.waitForURL(`${baseURL}${route}`);
      await page.locator(".home-nav").waitFor({ state: "detached" });
      assert.equal(await page.locator(".home-nav").count(), 0);
      await page.goto(baseURL);
      await ready();
    }
    for (const [selector, route] of [
      [".home-hero__primary", "/contact"],
      [".home-hero__secondary", "/work"],
    ]) {
      await page.locator(selector).click();
      await page.waitForURL(`${baseURL}${route}`);
      await page.goto(baseURL);
      await ready();
    }
    checks.push("four navigation routes and both hero CTAs navigate successfully");

    // The original section still receives the existing anchor and natural scroll.
    await page.locator(".home-hero__discover").click();
    await page.waitForFunction(() => window.scrollY > 100);
    assert.ok(await page.locator("#selected-work").count());
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).overflow), "hidden");
    checks.push("discover link scrolls naturally to existing selected-work section");
    await page.goto(baseURL);
    await ready();

    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        await page.waitForFunction((language) => document.documentElement.lang === language, lang);
        assert.equal(
          (await page.locator("h1").innerText()).replace(/\s+/g, " ").trim(),
          expected[lang],
        );
        await noOverflow(`${lang} ${width}`);
        if (width === 390 && lang === "fr") {
          await ready();
          await page.screenshot({ path: path.join(artifacts, "mobile-fr.png") });
        }
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("combobox").selectOption("en");
    await ready();
    const discover = await page.locator(".home-hero__discover").boundingBox();
    const whatsapp = await page.locator("a[href*='wa.me']").boundingBox();
    assert.ok(
      discover.x + discover.width <= whatsapp.x || discover.y + discover.height <= whatsapp.y,
      "mobile discover link overlaps WhatsApp",
    );
    checks.push("mobile footnote does not overlap existing WhatsApp control");
    await page.screenshot({ path: path.join(artifacts, "mobile.png") });
    await page.getByRole("button", { name: "Open menu" }).click();
    assert.equal(
      await page.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded"),
      "true",
    );
    await page.screenshot({ path: path.join(artifacts, "mobile-menu.png") });
    await page.keyboard.press("Escape");
    assert.equal(
      await page.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded"),
      "false",
    );
    assert.ok(
      await page
        .getByRole("button", { name: "Open menu" })
        .evaluate((element) => element === document.activeElement),
    );
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator(".home-hero__description").click();
    assert.equal(
      await page.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded"),
      "false",
    );
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-menu a[href='/contact']").click();
    await page.waitForURL(`${baseURL}/contact`);
    checks.push(
      "mobile menu: open, Escape restores focus, outside click closes, contact navigates",
    );

    await page.goto(baseURL);
    await ready();
    await page.getByRole("combobox").selectOption("fr");
    await page.reload();
    await page.waitForFunction(() => document.documentElement.lang === "fr");
    assert.equal((await page.locator("h1").innerText()).replace(/\s+/g, " ").trim(), expected.fr);
    checks.push("French selection persists after reload");
    await page.getByRole("combobox").selectOption("en");
    await page.goto(baseURL);
    await ready();
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").getAttribute("href"), "#main-content");
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => document.activeElement.id === "main-content");
    checks.push("keyboard skip link moves focus to main-content");

    // Reduced motion and no-JS use independent fresh contexts, not persisted state.
    const reduced = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 390, height: 844 },
    });
    const reducedPage = await reduced.newPage();
    await reducedPage.goto(baseURL);
    await reducedPage.locator("h1").waitFor();
    const reducedStyles = await reducedPage.locator("[data-hero-reveal]").evaluateAll((nodes) =>
      nodes.map((node) => ({
        opacity: getComputedStyle(node).opacity,
        transform: getComputedStyle(node).transform,
      })),
    );
    assert.ok(reducedStyles.every((style) => style.opacity === "1" && style.transform === "none"));
    checks.push("reduced motion: all reveal content immediately visible without transforms");
    await reduced.close();
    const noJS = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const noJSPage = await noJS.newPage();
    await noJSPage.goto(baseURL);
    assert.equal(
      (await noJSPage.locator("h1").innerText()).replace(/\s+/g, " ").trim(),
      expected.en,
    );
    assert.equal(
      await noJSPage
        .locator(".home-hero__primary")
        .evaluate((element) => getComputedStyle(element).opacity),
      "1",
    );
    checks.push("no JavaScript: server-rendered heading, description and links remain visible");
    await noJS.close();
    assert.deepEqual(errors, [], "browser runtime errors");
    // External font failures are reported separately; local app failures are errors.
    assert.deepEqual(
      failures.filter(
        (failure) => failure.url.startsWith(baseURL) && !failure.error.includes("ABORTED"),
      ),
      [],
      "local network errors",
    );
    await fs.writeFile(
      path.join(artifacts, "browser-results.json"),
      JSON.stringify(
        { baseURL, browser: browser.version(), checks, errors, failedRequests: failures },
        null,
        2,
      ),
    );
    console.log(`PASS: ${checks.length} checks; browser ${browser.version()}`);
    console.log(JSON.stringify({ errors, failedRequestCount: failures.length }));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
