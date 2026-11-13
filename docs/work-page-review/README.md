# Work index visual review

Status: ready for visual review. Owner: ZahTech. Branch: `feat/work-page-review`, stacked on `feat/brand-motion-services` (PR #15).

## Scope and result

The Work index now continues the approved homepage/Services direction: dark ink, warm white, ZahTech orange, local Inter, floating navigation and a large original OnzScore screenshot. The existing project description, technologies, translated content, image link and case-study destination remain available. Its existing production-preparation status is now visible in the listing. No projects, clients or figures were invented.

Framer Motion reveals the title, image, project details and contact CTA as they enter view. Reduced-motion and no-JavaScript fallbacks remain readable. The case-study page and other interior pages retain their previous presentation. The shared Work layout switches the index appearance off when opening a detail route and back on when returning.

## Preview and captures

- Local page: http://127.0.0.1:3100/work
- Local motion recording player: http://127.0.0.1:3100/__review/work
- [Desktop](desktop.png), [mobile](mobile.png), [desktop first screen](desktop-first-screen.png), [mobile first screen](mobile-first-screen.png).
- [Actual browser recording](motion-preview.webm).
- [Work browser results](browser-results.json) and five `*-regression.json` files.

The local server/player are outside the repository and are not included in the shipped website. The preview requires the process to remain running on this computer.

## Verified

- `npm run build`: passed; compiled locally, no deployment.
- `node node_modules/typescript/bin/tsc --noEmit`: passed.
- ESLint on the five changed TSX files: passed.
- `scripts/verify-work-page.cjs`: 24 checks passed in Chromium 149. Actual heading-opacity animation observed after hydration; full-size screenshot and original project facts checked.
- EN/FR/ES at 320, 390, 768, 1024 and 1440px with 100% and 200% root text size. A navigation/title overlap at 1024px with 200% Spanish text was reproduced, fixed and rechecked.
- Mobile menu and Escape focus restoration, keyboard navigation to the existing case study and Back, contact CTA destination, reduced motion, and no-JavaScript content passed. No contact request was sent.
- Five regression suites passed: homepage integration (37), hero/navigation (27), selected work (21), contact/footer (22), and Services/motion (21). Total including the new Work audit: 152 checks.
- Desktop/mobile captures visually inspected. No Work runtime or local HTTP errors were observed. The existing external font requests on unmodified interior routes can still fail/abort in navigation tests; the Work index uses the local font.

## Limits and review gate

Safari, Firefox, physical phones, screen-reader software, contact delivery and production hosting were not tested. No dependency was installed. No production publication or merge is authorized by this review.

Rollback: revert this branch's focused commit; no data or infrastructure migration is involved. The next visual review can cover the detailed OnzScore case study.
