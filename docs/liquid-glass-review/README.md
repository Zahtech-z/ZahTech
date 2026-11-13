# Liquid Glass navigation trial

Status: ready for visual review. Owner: ZahTech. Branch: `experiment/liquid-glass-navigation`, based on `experiment/unslop-hero-polish` (PR #18). No merge or production publication.

## Scope and implementation

The [supplied repository](https://github.com/Zahtech-z/liquid-glass-js) is a JavaScript/WebGL library, not an installable skill. This trial applies its real Container refraction shader to one background surface in the homepage's floating navigation. Links, logo, language selector, contact link and menu button remain native HTML/React elements above the glass. The Z, homepage copy, lower sections and interior routes retain the preceding proposal. OnzScore remains paused.

The upstream [Container](https://github.com/Zahtech-z/liquid-glass-js/blob/main/container.js) class body is retained in `src/vendor/liquid-glass/container.js`, with legal notices and an ESM export. MIT copyright: **2025 Armagan Amcalar**. The complete [license](../../src/vendor/liquid-glass/LICENSE.txt) is retained in source and [public assets](../../public/licenses/liquid-glass-js.txt). The library's div-based Button widgets are not substituted for accessible site controls.

The React adapter owns startup, sizing, language/viewport recapture, event listeners, capture disposal, texture/buffer/program cleanup and context release. It bypasses upstream global capture caching and the anonymous scroll listener. Only one surface is used. Rendering is scheduled on changes/scroll, rather than a permanent animation loop, and capture textures are bounded by the device texture limit. No CDN script or backend capture service is used. `html2canvas@1.4.1` was added with the Bun lockfile updated; local installation was isolated from the original shared dependency directory and install scripts were disabled.

Foreground text is not rasterized or distorted. A dark overlay and full warm-white link color keep the foreground distinct. The mobile expanded menu uses a stable dark surface. Reduced motion, high contrast, reduced transparency, save-data and absent WebGL keep a CSS/opaque fallback. A fresh interior-page visit does not load the capture library.

## Preview and evidence

- Site: http://127.0.0.1:3100/
- Before/after: http://127.0.0.1:3100/__review/glass-compare
- Actual scrolling recording: http://127.0.0.1:3100/__review/glass
- [Before desktop](before-desktop.png), [after desktop](desktop.png), [scrolled glass](desktop-scrolled.png).
- [Before mobile](before-mobile.png), [after mobile](mobile.png), [expanded menu](mobile-menu.png).
- [Browser recording](motion-preview.webm), [glass results](browser-results.json), [hero regression](hero-regression.json), [homepage integration](homepage-regression.json).

The comparison/player and local server adapter are outside the shipped repository. Their process must remain running on this computer.

## Verified

- Local `npm run build`, `tsc --noEmit`, changed-TSX/adapter ESLint and frozen Bun lockfile validation passed.
- `scripts/verify-liquid-nav.cjs`: 14 checks passed with Chromium 149 software WebGL (SwiftShader). The real shader linked, reported no GL error, and its actual canvas hashes changed when scrolling across the captured background.
- Snapshot recapture checked at 1440px EN/FR, 390px ES/EN and 320px FR. Exactly one glass canvas remained and no capture iframe was left after capture completion.
- Mobile open/close, Escape focus restoration and repeated SPA navigation to Services and back passed. No glass layer remained on Services; exactly one returned on home.
- Reduced motion, disabled WebGL, simulated save-data, high contrast and no-JavaScript navigation/hero fallbacks passed. Reduced-transparency handling is implemented but was not separately automated.
- Existing hero/navigation suite (27) and homepage integration suite (37) passed, including EN/FR/ES reflow at 100%/200% root text. Total: 78 checks. No homepage runtime or local HTTP errors were observed; no contact inquiry was sent.
- Desktop/scrolled/mobile/menu captures were visually inspected. The source license is shipped as a separate public file because the minifier strips legal comments. The final asset-only rebuild did not change runtime behavior.

Commands use the existing Playwright install: set `PLAYWRIGHT_MODULE`, then run `scripts/verify-liquid-nav.cjs`, `scripts/verify-home-hero.cjs` and `scripts/verify-homepage.cjs`. Regression artifacts were generated outside the repository and their JSON evidence copied here.

## Limits and cost

**Snapshot, not continuous live DOM refraction:** the shader samples a locally captured page texture. It is refreshed on language/viewport changes, not every animation frame. The animated Z uses its static SVG fallback in that snapshot, so its live pose and the refracted pose can differ. Capture ignores fixed UI and WebGL canvases. Content beyond a device's texture-size limit falls back to the regular surface. This is a visual prototype, not a claim of production-ready optical fidelity.

The additional deferred chunks are about 25 kB / 7 kB gzip for the adapter/library and 201 kB / 47 kB gzip for html2canvas. Full-page CPU/GPU capture and the upstream shader's sampling kernel have a real cost that was not benchmarked on physical devices. Software-GL diagnostics emitted GPU readback warnings; no site runtime error resulted. Battery, constrained-network Core Web Vitals, long-session memory and real GPU-driver behavior remain unmeasured. Safari, Firefox, physical phones, screen readers, OS background-tab behavior, contact delivery and production hosting were not tested.

Existing external font failures/aborts when visiting unmodified interior routes remain outside this change. The prototype does not update OnzScore's product content or status.

Rollback: switch back to `experiment/unslop-hero-polish` or revert this focused commit, including its dependency declaration and lockfile. Keep this draft unmerged for visual comparison. Nothing was deployed.
