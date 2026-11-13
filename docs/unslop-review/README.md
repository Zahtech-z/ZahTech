# Unslop — homepage finishing trial

Status: ready for visual review. Owner: ZahTech. Branch: `experiment/unslop-hero-polish`, based on `experiment/r3f-brand-motion` (PR #17). No production publication or merge.

This trial uses **Unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0**, from the [supplied repository](https://github.com/Zahtech-z/unslop), with its [skill instructions](https://github.com/Zahtech-z/unslop/blob/main/skills/unslop/SKILL.md). Attribution is retained here and in the installed skill. Unslop was installed in the local Codex skills folder and its signs, tokens, visuals and finished-reference guidance were read.

## Scope and direction

Assessment: **light polish**, not a redesign. The existing brand, chosen Inter font, approved English copy/translations, split layout, real Z mark, discreet pause control, navigation and section order are preserved. The trial concerns the homepage navigation and first screen. OnzScore remains paused; subsequent sections and interior routes were not restyled.

- **Product:** websites, applications and cloud solutions for businesses.
- **Character:** precise, composed, warm.
- **World:** engineering and tangible material on a dark field.
- **Moment:** the actual ZahTech Z in warm white and orange.
- **Signature:** the approved two-part mark, shared with the navigation logo and static fallback.

The direction follows the user's already chosen brand, font and animated Z. Those choices take precedence over generic recommendations to replace the headline/font or remove all continuous motion.

## Audit and passes

| Pass    | Finding and resulting treatment                                                                                                                                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spacing | Hero action gap moved from 14px to 16px, group spacing from 36px to 32px. Buttons retain a 48px minimum height and readable padding. Existing split and page rhythm stay.                                                                                  |
| Color   | Removed the hero grain, colored radial washes and the extra glow behind the mark. Navigation is opaque ink with a quiet hairline. The main CTA is warm white; orange remains in the mark and the approved headline accent.                                 |
| Icons   | Hero action/discover/pause icons use Lucide at 16px with a 1.5 stroke. The pause target remains 44px with its accessible label and hover tooltip.                                                                                                          |
| Copy    | Preserved approved content in EN/FR/ES. No claims, client names, figures or service promises were added. The decorative dot before the service-category line was removed.                                                                                  |
| Type    | Kept the explicitly chosen local Inter. Hero buttons use weight 500. The mobile category line is now 12px with normal tracking instead of 10px.                                                                                                            |
| Layout  | Kept desktop split, mobile reading order, floating rounded navigation, both CTA destinations and subsequent sections. No new cards or visual layers were added.                                                                                            |
| Details | Hero buttons now use a 12px corner radius; navigation retains its approved rounded shell. Hover and keyboard focus remain visible.                                                                                                                         |
| Visuals | Removed two orbit rings and their two satellites from 3D and static SVG. The exact Z contours remain, with a less glossy material. The scene now has two meshes. No image was generated and no image prompt was needed.                                    |
| Motion  | Main entrance shortened from 800ms/40px to 450ms/12px with 50ms stagger. The user-requested Z animation remains as a gentle yaw; vertical bobbing and extra rotational oscillations were removed. Pause, offscreen suspension and static fallbacks remain. |

The existing functional WhatsApp action was preserved. No full-site typography or copy pass was attempted. This trial therefore does not claim every generic Unslop checklist item has been applied across the entire website.

## Preview and artifacts

- Local page: http://127.0.0.1:3100/
- Local before/after comparison: http://127.0.0.1:3100/__review/unslop
- [Before desktop](before-desktop.png) / [after desktop](desktop.png).
- [Before mobile](before-mobile.png) / [after mobile](mobile.png).
- [Reduced-motion fallback](reduced-motion.png), [browser results](browser-results.json), [navigation regression](hero-regression.json), [homepage integration](homepage-regression.json).

Before captures were preserved from the preceding reviewed proposal. After captures were visually inspected. The comparison route and local adapter live outside the repository and are not shipped in the site. No Unslop story video or paid image generation was requested or created.

## Verified and not tested

VERIFIED: local build, `tsc --noEmit`, changed-TSX ESLint; Chromium 149 passed 26 scene/brand checks, 27 hero/navigation checks and 37 homepage integration checks (90 total). The checks cover actual canvas movement, pause/resume pixel stability, paused resizing, original SVG contours, EN/FR/ES, 320–1440px, 200% root text, reduced motion, disabled WebGL, no JavaScript, save-data, and existing CTA routes. No inquiry was submitted. No homepage runtime or local HTTP errors were observed.

Browser commands use the existing Playwright install. For the scene audit, set `REVIEW_ARTIFACTS=docs/unslop-review` and `SKIP_RECORDING=1`, then run `scripts/verify-r3f-hero.cjs`; regression scripts are `scripts/verify-home-hero.cjs` and `scripts/verify-homepage.cjs`. Regression artifacts were generated outside the repository before copying the JSON evidence here.

UNKNOWN/not tested: Safari, Firefox, physical mobile/GPU performance, battery use, screen-reader software, actual OS background-tab behavior, constrained-network Core Web Vitals, contact delivery and production hosting. Existing external font failures/aborts on unmodified interior routes remain outside this trial. The lazy renderer is still about 963 kB / 260 kB gzip; fewer scene objects are not a measured performance improvement.

Rollback: switch back to `experiment/r3f-brand-motion` or revert this focused trial commit. No new project dependency, data migration or infrastructure change is involved. Keep the PR unmerged pending the user's visual comparison.
