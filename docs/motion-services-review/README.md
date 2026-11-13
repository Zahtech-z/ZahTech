# Motion and Services review

The homepage now has masked title entrances, individual service/process/layer reveals, scroll-linked project perspective, and a progressive orange engineering line. Services uses the approved dark palette, local Inter, floating navigation, six existing translated service descriptions, and the existing contact destination. No client names, metrics, or service claims were added.

## Preview and evidence

- Local homepage: http://127.0.0.1:3100/
- Local Services: http://127.0.0.1:3100/services
- Local recording player: http://127.0.0.1:3100/__review/motion
- [Desktop capture](desktop.png), [mobile capture](mobile.png), [actual 16-second browser recording](motion-preview.webm).
- [Motion and Services browser results](browser-results.json); seven `*-regression.json` files contain the homepage regression results.

The preview adapter and recording-player routes run outside the repository and are not shipped with the site. The Vercel preset was built locally; nothing was deployed.

## Verified

- Build, TypeScript, and ESLint on the changed TSX files passed.
- Chromium 149: 191 browser checks passed across the new audit and seven existing homepage suites.
- Actual project transform and engineering-line scale sampled at different scroll positions; title opacity animation observed after hydration.
- Services in EN/FR/ES at 320, 390, 768, 1024, and 1440px; no horizontal overflow with 100% or 200% root text size.
- Desktop and mobile captures inspected. Contact CTA reaches the existing form; keyboard focus is visible. No form was submitted.
- Reduced-motion mode keeps Services text visible and the project image static. No-JavaScript Services content remains readable.
- Homepage integration audit reported no runtime or HTTP errors. Route-transition tests still encounter the pre-existing external font requests on other interior pages; those routes were not restyled here.
- Recording decoded and seeked successfully in the local browser player.

## Not tested

Safari, Firefox, physical mobile devices, screen-reader software, contact delivery, production hosting, and performance under constrained hardware/network conditions were not tested. The local preview is available only while its process runs on this computer.

This branch stacks on `fix/homepage-final-review` (PR #14). Review only; no merge or production publication.
