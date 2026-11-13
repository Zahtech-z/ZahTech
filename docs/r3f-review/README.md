# React Three Fiber hero experiment

Status: ready for visual review. Branch: `experiment/r3f-brand-motion`, stacked on `feat/work-page-review` (PR #16). No deployment or merge.

## What was tried

The [supplied repository](https://github.com/Zahtech-z/react-three-fiber) is the React Three Fiber library, rather than an installable Codex skill. Its [README](https://github.com/Zahtech-z/react-three-fiber/blob/master/readme.md), [Canvas API](https://github.com/Zahtech-z/react-three-fiber/blob/master/docs/API/canvas.mdx) and [performance guidance](https://github.com/Zahtech-z/react-three-fiber/blob/master/docs/advanced/scaling-performance.mdx) informed this implementation. No Codex skill was installed.

The homepage now pairs the approved copy with an extruded ZahTech Z in warm white with its orange accent and fine orbit lines. The logo, 3D extrusion and static fallback share the exact approved SVG contours. The Z tilts gently while keeping its front readable. It uses Three.js geometry through React Three Fiber, with no downloaded models, textures, HDR environment or postprocessing libraries. Desktop uses a split composition; mobile places the scene after the existing text and buttons. Brand colors, logo, translations, links and subsequent sections remain available. OnzScore work remains paused and is not included in this branch.

The 3D chunk loads separately after hydration and support detection. A fixed-size SVG illustration is present from SSR, including when JavaScript, WebGL or animation is unavailable. Reduced-motion and save-data preferences keep the static illustration. The pause control is an icon in a 44px touch target, with a localized accessible name and hover tooltip in EN/FR/ES. Animation stops outside the viewport and while the document is hidden; demand rendering repaints the paused scene after resizing without advancing its animation.

## Preview and artifacts

- Local page: http://127.0.0.1:3100/
- Local motion player: http://127.0.0.1:3100/__review/r3f
- [Desktop](desktop.png), [mobile](mobile.png), [desktop first screen](desktop-first-screen.png), [mobile first screen](mobile-first-screen.png), [reduced-motion fallback](reduced-motion.png).
- [Actual browser recording](motion-preview.webm).
- [R3F results](browser-results.json), [navigation regression](hero-regression.json), [homepage integration regression](homepage-regression.json).

The preview adapter/player runs outside the repository and is not shipped with the website. The process must remain running on this computer.

## Verified

- Local `npm run build`, TypeScript (`tsc --noEmit`) and changed-TSX ESLint passed. `bun install --lockfile-only --frozen-lockfile --ignore-scripts` passed.
- `scripts/verify-r3f-hero.cjs`: 26 checks passed in Chromium 149 using explicit software WebGL (SwiftShader). Actual canvas screenshot hashes changed during movement and remained identical when paused; movement resumed after the control was activated. The shared logo/fallback contours were also compared against the approved public SVG.
- EN/FR/ES at 320, 390, 768, 1024 and 1440px with 100%/200% root text. A navigation overlap at 1024px/200% Spanish text was fixed and rechecked.
- Visual inspection caught a paused-canvas resize issue. Demand rendering fixed it; the audit now checks that orange sculpture pixels remain visible after desktop/mobile resizing. Updated captures were visually inspected.
- Reduced-motion, no-JavaScript, disabled WebGL and simulated save-data cases preserve the static SVG and accessible hero content. The scene is decorative; keyboard-visible pause/resume controls remain outside the hidden art container.
- Hero buttons navigate to Work and Contact; no form was submitted. A fresh Services visit does not request the lazy scene chunk.
- Existing hero/navigation (27) and homepage integration (37) suites passed: 90 checks in total. No homepage/R3F runtime or local HTTP errors were observed. Navigation to unmodified interior pages still encounters existing failing/aborted external font requests.

## Cost and limitations

The lazy 3D scene chunk is approximately 964 kB uncompressed / 261 kB gzip. This is a meaningful addition to evaluate visually before adopting. DPR is capped at 1.25 and the scene uses six meshes without shadows or postprocessing. FPS, battery use and Core Web Vitals on physical hardware or slow networks were not measured. Safari, Firefox, physical phones, actual GPU drivers and screen-reader software were not tested. Visibility handling is implemented; OS-level background-tab behavior was not separately automated.

Runtime additions are `@react-three/fiber@9.8.2` and `three@0.187.0`, with `@types/three@0.187.0` for development; the Bun lockfile was updated. For this local worktree, the new runtime packages are isolated outside the original repository's shared dependencies. No original dependency directory was modified and install scripts were disabled.

Rollback: revert the focused experiment commit to restore the approved centered hero and its previous dependency declarations. Keep this PR unmerged pending visual review; no production publication is authorized.
