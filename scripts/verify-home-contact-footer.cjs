/* Existing Playwright installation only. Never submits the inquiry form. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3100";
const artifacts = path.resolve("docs/contact-footer-review");
const screenshotStyle = ".home-nav, .fixed { display: none !important; }";
const headings = {
  en: "Have a project in mind?",
  fr: "Un projet en tête ?",
  es: "¿Tienes un proyecto en mente?",
};
const routes = ["/services", "/work", "/about", "/blog", "/contact", "/privacy"];
(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const checks = [],
    errors = [],
    posts = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().includes("/api/contact"))
      posts.push(request.url());
  });
  const contact = page.locator("#contact");
  const footer = page.locator("footer.home-footer");
  const ready = async () => {
    await page.evaluate(() => document.fonts.load('500 32px "ZahTech Hero Sans"'));
    await contact.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => getComputedStyle(document.querySelector("#contact").parentElement).opacity === "1",
    );
  };
  try {
    assert.equal((await page.goto(baseURL, { waitUntil: "domcontentloaded" })).status(), 200);
    await ready();
    assert.equal(await contact.locator(".home-contact__project").getAttribute("href"), "/contact");
    assert.equal(
      await contact.locator(".home-contact__email a").getAttribute("href"),
      "mailto:contact@zahtech.net",
    );
    assert.equal(await contact.locator("form").count(), 0);
    checks.push("existing inquiry route and email preserved; homepage adds no form");
    assert.deepEqual(
      await footer
        .locator("nav a")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
      routes,
    );
    assert.equal(await footer.locator("a[href='https://github.com/Zahtech-z']").count(), 1);
    assert.equal(await footer.locator("a[href='https://linkedin.com/in/anicetzt']").count(), 1);
    assert.equal(await footer.locator("a[href='https://x.com/ZahTech_z']").count(), 1);
    assert.equal(
      await footer.getByRole("link", { name: "ZahTech", exact: true }).getAttribute("href"),
      "/",
    );
    checks.push("footer logo, six internal destinations and three social URLs preserved");
    for (const link of await contact.getByRole("link").all())
      assert.ok((await link.boundingBox()).height >= 44);
    for (const link of await footer.getByRole("link").all())
      assert.ok((await link.boundingBox()).height >= 44);
    await contact.locator(".home-contact__project").focus();
    await page.keyboard.press("Tab");
    assert.ok(
      await contact
        .locator(".home-contact__email a")
        .evaluate(
          (element) =>
            element === document.activeElement && getComputedStyle(element).outlineStyle !== "none",
        ),
    );
    checks.push("44px link targets and contact keyboard focus verified");
    await contact.locator(".home-contact__email a").evaluate((element) => element.blur());
    await contact.screenshot({ path: path.join(artifacts, "desktop.png"), style: screenshotStyle });
    await footer.screenshot({
      path: path.join(artifacts, "desktop-footer.png"),
      style: screenshotStyle,
    });
    for (const route of routes) {
      await footer.locator(`nav a[href='${route}']`).click();
      await page.waitForURL(`${baseURL}${route}`);
      if (["/services", "/work"].includes(route)) {
        await page.locator(route === "/work" ? ".work-page" : ".services-page").waitFor();
        assert.equal(await page.locator("footer.home-footer").count(), 1);
      } else await page.locator("footer.home-footer").waitFor({ state: "detached" });
      assert.ok(await page.locator("footer").count());
      await page.goto(baseURL, { waitUntil: "domcontentloaded" });
      await ready();
    }
    checks.push(
      "six footer routes work; Work and Services use dark footers, other pages retain their appearance",
    );
    await contact.locator(".home-contact__project").click();
    await page.waitForURL(`${baseURL}/contact`);
    await page.locator("footer.home-footer").waitFor({ state: "detached" });
    assert.equal(await page.locator("form").count(), 1);
    assert.ok(await page.locator("form input[type='email']").count());
    checks.push("project CTA reaches the existing inquiry form without submitting it");
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const lang of ["en", "fr", "es"]) {
        await page.getByRole("combobox").selectOption(lang);
        await page.waitForFunction((language) => document.documentElement.lang === language, lang);
        await ready();
        assert.equal(await contact.locator("h2").innerText(), headings[lang]);
        assert.equal(await footer.locator("nav a").count(), 6);
        const metrics = await page.evaluate(() => ({
          width: innerWidth,
          content: document.documentElement.scrollWidth,
        }));
        assert.ok(metrics.content <= metrics.width, `${lang} ${width}: overflow`);
        for (const scope of [contact, footer]) {
          const bounds = await scope.boundingBox();
          for (const element of await scope.locator("h2, p, a").all()) {
            const rect = await element.boundingBox();
            assert.ok(
              rect.x >= bounds.x && rect.x + rect.width <= bounds.x + bounds.width + 1,
              `${lang} ${width}: clipped content`,
            );
          }
        }
        checks.push(`${lang} ${width}: contact and footer fit viewport`);
        if (width === 390 && ["en", "fr"].includes(lang)) {
          await contact.screenshot({
            path: path.join(artifacts, lang === "en" ? "mobile.png" : "mobile-fr.png"),
            style: screenshotStyle,
          });
          if (lang === "en")
            await footer.screenshot({
              path: path.join(artifacts, "mobile-footer.png"),
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
    await reducedPage.goto(baseURL, { waitUntil: "domcontentloaded" });
    const reducedContact = reducedPage.locator("#contact");
    await reducedContact.scrollIntoViewIfNeeded();
    assert.equal(
      await reducedContact.evaluate((element) => getComputedStyle(element.parentElement).opacity),
      "1",
    );
    assert.equal(
      await reducedContact
        .locator("a")
        .first()
        .evaluate((element) => getComputedStyle(element).transitionProperty),
      "none",
    );
    checks.push("reduced motion: contact visible and button transitions disabled");
    await reducedContext.close();
    const noJSContext = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const noJSPage = await noJSContext.newPage();
    await noJSPage.goto(baseURL, { waitUntil: "domcontentloaded" });
    assert.ok(await noJSPage.locator("#contact h2").isVisible());
    assert.equal(await noJSPage.locator(".home-contact__project").getAttribute("href"), "/contact");
    assert.equal(await noJSPage.locator("footer.home-footer nav a").count(), 6);
    checks.push("no JavaScript: static contact content and footer links remain available");
    await noJSContext.close();
    assert.deepEqual(errors, []);
    assert.deepEqual(posts, [], "inquiry form must not be submitted by this test");
    await fs.writeFile(
      path.join(artifacts, "browser-results.json"),
      JSON.stringify(
        { baseURL, browser: browser.version(), checks, errors, inquiryPosts: posts.length },
        null,
        2,
      ),
    );
    console.log(
      `PASS: ${checks.length} checks; no runtime errors; no inquiry sent; Chromium ${browser.version()}`,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
