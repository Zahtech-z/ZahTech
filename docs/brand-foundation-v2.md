# ZahTech V2 ? Phase 1 brand foundation

Phase 1 only. No page layouts, marketing copy, routes, translations, contact behavior, or animation logic were redesigned. No dependencies added. No commit, push, or deployment performed.

## Identity and use

Warm White is the default canvas, Ink the main text, Graphite the supporting neutral, and Signal Orange a restrained accent. Aim for 5?10% orange in future compositions; this is a usage guideline, not a measured site-wide coverage claim. Existing component-local effects remain for a later phase.

`src/styles.css` is the source of truth. Use semantic Tailwind colors instead of copying palette values into components. `primary` is the exact Signal Orange; use Ink text on orange. `primary-text` is the darker orange for text on light surfaces. Existing `.text-primary` consumers resolve to this accessible text tone through the utilities layer. Use `primary-hover` for solid action hover states, `ring` for focus, and `input-background` with `input` borders for controls.

The default is explicitly `color-scheme: light`. `.dark` is an opt-in compatibility theme for existing dark previews, with complete surface/text aliases. There is no new theme toggle or system-preference behavior.

## Exact default tokens

| Token | Value / alias |
| --- | --- |
| `--brand-signal` | `#ff5a36` |
| `--brand-ink` | `#0a0a0a` |
| `--brand-warm-white` | `#f5f2eb` |
| `--brand-graphite` | `#242424` |
| `--radius` | `0.75rem` |
| `--background` | `var(--brand-warm-white)` |
| `--foreground` | `var(--brand-ink)` |
| `--surface` | `#eeebe4` |
| `--surface-elevated` | `#fffdf8` |
| `--card` | `var(--surface-elevated)` |
| `--card-foreground` | `var(--foreground)` |
| `--popover` | `var(--surface-elevated)` |
| `--popover-foreground` | `var(--foreground)` |
| `--primary` | `var(--brand-signal)` |
| `--primary-foreground` | `var(--brand-ink)` |
| `--primary-hover` | `#ed4926` |
| `--primary-text` | `#b83218` |
| `--secondary` | `#e6e2d9` |
| `--secondary-foreground` | `var(--brand-graphite)` |
| `--muted` | `var(--surface)` |
| `--muted-foreground` | `#625e57` |
| `--accent` | `var(--secondary)` |
| `--accent-foreground` | `var(--brand-ink)` |
| `--destructive` | `#b42318` |
| `--destructive-foreground` | `#fffdf8` |
| `--border` | `#d5d0c6` |
| `--input` | `#878177` |
| `--input-background` | `var(--surface-elevated)` |
| `--ring` | `var(--primary-text)` |
| `--logo` | `var(--foreground)` |
| `--logo-accent` | `var(--brand-signal)` |
| `--grid-line` | `color-mix(in srgb, var(--foreground) 6%, transparent)` |
| `--tracking-heading` | `-0.02em` |

## Exact opt-in dark overrides

| Token | Value / alias |
| --- | --- |
| `--background` | `var(--brand-ink)` |
| `--foreground` | `var(--brand-warm-white)` |
| `--surface` | `#191919` |
| `--surface-elevated` | `var(--brand-graphite)` |
| `--card` | `var(--surface-elevated)` |
| `--card-foreground` | `var(--foreground)` |
| `--popover` | `var(--surface-elevated)` |
| `--popover-foreground` | `var(--foreground)` |
| `--secondary` | `#303030` |
| `--secondary-foreground` | `var(--foreground)` |
| `--muted` | `var(--surface-elevated)` |
| `--muted-foreground` | `#b9b4aa` |
| `--accent` | `var(--secondary)` |
| `--accent-foreground` | `var(--foreground)` |
| `--primary-text` | `#ff856b` |
| `--border` | `#45423d` |
| `--input` | `#878177` |
| `--input-background` | `var(--surface-elevated)` |
| `--ring` | `var(--primary-text)` |
| `--logo` | `var(--foreground)` |
| `--grid-line` | `color-mix(in srgb, var(--foreground) 6%, transparent)` |

## Tailwind mapping and global utilities

Existing semantic `--color-*` mappings remain. New mappings: `primary-hover`, `primary-text`, `input-background`, `logo`, `logo-accent`, and `logo-inverse` (Warm White). `bg-grid` uses a neutral 6% foreground line; `bg-radial-fade` now resolves to a flat surface. No purple/cyan colors or glow remain in the global foundation or new logo assets. Global focus is a 2px ring with 3px offset. Selection uses Signal Orange with Ink text. Existing radius, responsive classes, spacing, and animation definitions are retained.

## Typography decision

Keep Syne for display headings and Inter for body/UI. Syne provides an editorial distinction without adding another font or changing heading wrapping; retain the existing size/weight hierarchy and -0.02em heading tracking via `--tracking-heading`. The wordmark uses Inter semibold with restrained tracking. Existing font preloads and the prior mobile animation optimization are preserved. Page-specific gradient headings are intentionally outside this phase.

## Logo concept 1: build / handoff

Two complementary geometric modules form an open Z, separated by a small horizontal handoff. The upper module leads diagonally into the lower one, suggesting connected stages of building and delivery. The mark uses two filled paths on a 32-unit grid, no enclosing badge, chip, stroke, gradient, or glow. The favicon has a Warm White backing for visibility on browser chrome.

`Logo` and `LogoMark` accept `size`, `className`, and `variant` (`default`, `accent`, `inverse`). The accent variant colors only the symbol in the full lockup. Default is Ink on light surfaces; inverse is Warm White. `LogoMark` has an accessible label; pass `label=""` when decorative. The full lockup hides the redundant SVG label. Keep the aspect ratio and at least 4 units of internal clear space. Use 16px only for favicon scale; prefer 24px or larger in UI.

Standalone reusable SVG: `public/logo-mark.svg`. Browser icon: `public/favicon.svg`. Keep their path geometry synchronized with `LogoMark`.

## Files changed in this phase

- `src/styles.css`: palette, semantic tokens, dark compatibility, focus, selection, neutral utilities.
- `src/components/site/Logo.tsx`: reusable geometric symbol and lockup.
- `src/routes/__root.tsx`: Warm White browser theme color and favicon link; SEO content unchanged.
- `src/components/ui/button.tsx`: semantic solid hover and accessible link text.
- `src/components/ui/input.tsx`, `textarea.tsx`: semantic input surfaces.
- `src/components/site/Brief.tsx`, `CodePreview.tsx`, `CodeTabs.tsx`, `Experience.tsx`, `PipelineAnimation.tsx`: only scoped `dark` / foreground classes to preserve the readability of existing fixed-dark previews. Layouts and animation logic unchanged by this phase.
- `public/favicon.svg`, `public/logo-mark.svg`: vector assets.
- `docs/brand-foundation-v2.md`: this foundation specification and validation report.

Pre-existing uncommitted changes were present in CodeTabs, Features, Hero, PipelineAnimation, TrustedStack, root/index routes, and styles. Those edits were preserved; they are not all Phase 1 changes.

## Legacy styling intentionally retained

- `Hero.tsx`: purple/cyan badge gradient, heading fade, ambient effect.
- `PageShell.tsx`, `BookCallButton.tsx`: cyan gradients / accents.
- `CodeTabs.tsx`, `CodePreview.tsx`: purple/cyan syntax colors and local glow styles.
- `PipelineAnimation.tsx`: local purple shadow, cyan log arrow, dark presentation.
- `Experience.tsx`: cyan log colors and dark cards.
- `Services.tsx`, `Testimonial.tsx`: purple hover shadows; Testimonial also has cyan stars/avatar gradient.
- `routes/about.tsx`: cyan heading/founder accent and purple portrait shadow.
- `routes/work.tsx`: cyan project links.
- `routes/api.contact.ts`: purple/cyan email header.
- `public/og-image.png`: existing social image retained without editing; it has not been visually audited in this phase.

These are component-local styles/assets, not new global brand tokens. WhatsApp green and existing status colors are also unchanged. This intermediate site is not a completed V2 redesign or a site-wide accessibility certification.

## Validation

- Production build: passed (`npm run build`), including client, SSR, and Vercel output. Initial sandbox attempt was blocked by filesystem access; the permitted retry passed. Existing Calendly mixed-import, dependency unused-import, and Framer Motion directive warnings remain.
- TypeScript: passed (`npx --no-install tsc --noEmit`).
- Compiled CSS: verified `.text-primary` resolves to `var(--primary-text)`.
- Lint: plain `npm run lint` was stopped after an extended scan. Rerun excluding generated `.vercel/**` and bundled `.claude/**` completed with 6,321 Prettier formatting errors and 9 Fast Refresh warnings. Source-only ESLint reported 6,264 formatting errors and the same 9 warnings. Many errors are CRLF line endings in the existing checkout. No broad formatting cleanup performed. New Logo component has no lint findings.
- Contrast: Ink/Warm White 17.71:1; Ink/Signal Orange 6.38:1; Ink/action hover 5.26:1; muted text/surface 5.41:1; primary text/surface 5.03:1; input border/input background 3.80:1; dark primary text/Graphite 6.52:1.
- Logo geometry rendered from SVG path data and visually inspected at 16, 24, 32, 72, and 192px. The split remains visible at favicon scale. QA image is in ignored `.output/brand-qa/logo-sizes.png`.
- Responsive review: existing breakpoints, grids, spacing, heading font metrics, and logo dimensions preserved; SVG cannot shrink in flex layouts. No obvious new responsive issue found in source review. Live viewport, keyboard, and EN/FR/ES interaction checks could not be performed: the Browser runtime reported no available browsers. No claim of browser-tested responsiveness is made.

Phase 1 stops here.
