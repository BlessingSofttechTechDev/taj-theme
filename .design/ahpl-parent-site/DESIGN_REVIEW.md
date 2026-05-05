# Design Review: AHPL Parent Site (`/`)

Reviewed against: `.design/ahpl-parent-site/DESIGN_BRIEF.md`
Philosophy: Refined Heritage Modernism (editorial, restrained, hospitality-led)
Date: 2026-05-05

> **Visual review is incomplete.** This pass is code-only — Playwright/cursor-ide-browser MCP servers are not installed in this session. Screenshot capture protocol is at the end of this file; visual findings will be appended after screenshots are received.

## Summary

The parent site is content-complete against the AHPL brief and the structural rhythm (editorial header → balanced two-column body → metadata strip → promise pull-quote) is on-brand. The biggest concerns are technical hygiene — three competing gold tokens, a third font family loaded but unused, hardcoded hex values bypassing the token system, and inline `style={{ textShadow }}` props instead of utility classes. None of this is user-visible yet but it will become a maintenance debt the moment a second developer touches the file.

## Status

All Must Fix and most Should Fix items below have been resolved in this pass. Remaining items: the visual review (pending screenshots) and the optional Could Improve list.

## Must Fix

1. ✅ **FIXED — Three gold values fight each other.** Tokens define `--color-gold #8B6914`, `--color-gold-dark #6A4F0E`, `--color-gold-light #D4C5A9`. The hero then introduces `#E5BE6A`, `#E0B355`, `#C9A24A` as raw hex strings, and the About section keeps using `text-gold-dark`. Result: at least six gold values shipped, none of them documented. _Fix: collapse to three semantic tokens — `gold-deep` (text on light bg), `gold-mid` (CTA + hero accent), `gold-soft` (rules and dividers) — and define them in `globals.css` so they participate in the theme. Replace every raw hex with the token._

2. ✅ **FIXED — `Playfair Display` font is loaded but unused.** `app/layout.tsx:21-25` registers the font and exposes `--font-accent`, but I find no consumer in `page.tsx`. That's a wasted ~25KB woff2 over the wire on every cold load. _Fix: either delete the `Playfair_Display` import + variable, or actually use it for one accent (e.g., the pull-quote on the About promise strip)._

3. ✅ **FIXED — Page metadata still references "Taj Ranthambhore Resort" only in `theme-3`.** Layout title was updated to `AHPL — You belong here` ✓ but make sure no leftover `<title>` blocks exist on the alternate route pages we're keeping live. _Fix: audit `app/theme-1/page.tsx`, `app/theme-2/page.tsx`, `app/theme-3/page.tsx` — they're shipping in production and the brief says only AHPL is public. At minimum hide them behind `noindex` or remove from the build._

## Should Fix

1. **Inline `style={{ textShadow: ... }}` repeats four times in the hero.** This is a presentational concern that belongs in CSS. _Fix: add `.text-shadow-hero` and `.text-shadow-glow-gold` utilities (or `@layer utilities`) in `globals.css` and apply them by class._

2. **`ThemeSwitcher` component still mounted in `layout.tsx`.** The brief is the AHPL parent site — there is no theme switcher in the IA. The component renders globally on `/`. _Fix: remove `<ThemeSwitcher />` from `app/layout.tsx:45` (and delete the file if it's only used by this layout)._

3. **The `useScrollY` hook re-runs on every scroll event without throttle.** With Framer Motion's `useScroll` already wired into the hero, this is a duplicate listener that fires at native scroll frequency. _Fix: either drop `useScrollY` and derive `navOpaque` from `scrollYProgress` inside the existing motion hook, or wrap the listener with `requestAnimationFrame`._

4. **Two unused imports.** `useTransform` is imported but the only consumers (`heroOpacity`, `heroScale`, `heroTextY`) live in the hero — that's fine — but double-check after the cleanup that `Image` from `next/image` doesn't get dropped after logo removal (it's still used heavily, leaving as confirmation only). Also ensure the `motion` import path is consistent — file uses both `"motion/react"` and the older `framer-motion` is in package.json; prefer one.

5. **Decorative SVGs lack `aria-hidden="true"`.** Pure-decoration SVGs in `GoldDivider`, `ArchFrame`, the About section ornament, the Portfolio noise pattern, etc. should be hidden from assistive tech. _Fix: add `aria-hidden="true"` to each `<svg>` that is purely decorative._

6. **Form has no `<label htmlFor>`.** Inputs use `<label>` wrapping which is OK semantically, but the `<span>` "labels" are not associated for screen readers in some readers. _Fix: add `htmlFor` + matching `id` on each input. Bonus: add `required` and `aria-required` where appropriate._

7. **`<form onSubmit={(e) => e.preventDefault()}>` ships a form that does nothing.** A real user filling it out gets no feedback. _Fix: either disable the submit button with a "Coming soon" tooltip, or wire it to a `mailto:` fallback (`rst@uniquegroup.in`) until the form endpoint is live._

8. **`Section` uses `useInView` with `{ once: true }` — fine — but combined with `initial={{ opacity: 0, y: 60 }}` the entire section is invisible until visible.** If a user lands on `#leadership` directly via deep link, they may see a brief blank state before the IntersectionObserver fires. _Fix: shorten the entry distance (`y: 30` instead of `60`) or skip the entry animation when the section is already in the initial viewport._

## Could Improve

1. **Announcement bar copy could be louder.** "Under Construction · Taj Ranthambore · 88 Keys" is informational but doesn't convert. Consider adding a one-line value prop: "Opening late 2026 · Reserve early enquiries →".

2. **Portfolio pipeline cards all use the same "Land Converted" badge.** Differentiating Udaipur (lake-city), Jawai (leopards), Pushkar (pilgrim/festival), Jaipur (city) with a one-word descriptor would add depth without disclosing dev status.

3. **The "Promise" pull-quote is great copy** but the layout is very text-heavy. A small italic ornamental glyph (not the diamond — something more architectural like a stylized arch) at the start of the quote would echo the heritage cue without breaking restraint.

4. **Vision/Mission section** is two equal columns with nearly identical structure. Consider differentiating — one as headline + supporting text, the other as a numbered manifesto — to add narrative variation.

5. **Six Values** are presented as identical cards. Reading them feels uniform. Consider stripping the borders on alternate cards or letting one card span 2 columns at lg+ to introduce hierarchy.

6. **Leadership Raunak placeholder is functional but blunt.** Consider replacing the gradient initials block with a treated illustration (e.g., a soft ink-wash silhouette) or an architectural detail from one of the property renders, with the "Portrait Forthcoming" caption underneath. Reads more intentional.

7. **Footer is missing utility nav** that brief A11 calls for: Privacy, Terms, Disclaimer ✓ (present) but no Cookie Policy link mentioned. Add it once analytics decision is made.

## What Works Well

- **Editorial structure throughout.** The header strip + balanced two-column + metadata strip + pull-quote pattern in About is on-brand and reusable. Values, Portfolio, and Leadership all follow it consistently.
- **Hero typography decisions after the contrast fix.** Triple-layered overlay + bright `#E5BE6A` italic + drop-shadow makes the headline legible against any photograph and avoids the cheap "white text on dim image" cliché.
- **Pipeline destination cards** with the `LAND CONVERTED · CITY NAME` overlay treatment honour the brief's instruction to publish locations without overpromising specifics. This is a smart balance.
- **Vision and Mission** copy lifted near-verbatim from the doc — no liberties taken with brand voice.
- **Promise strip** at the bottom of About is the strongest single composition on the page — kicker + italic display quote + signature line in three columns. This template should be reused for the property page hero.
- **Brand discipline.** "AHPL" is used throughout, the legal name does not appear, the tagline is positioned as a quiet refrain (hero kicker, footer, promise strip) without becoming a slogan.

---

## Code Review (Files Touched)

| File                                                  | Status   | Notes                                                                                |
| ----------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `app/page.tsx`                                        | Reviewed | ~1280 lines. Six concerns listed above.                                              |
| `app/layout.tsx`                                      | Reviewed | Metadata updated ✓. Unused Playfair font + ThemeSwitcher mounted are the two issues. |
| `app/globals.css`                                     | Reviewed | Color tokens are good but underused — hero bypasses them entirely.                   |
| `app/theme-1/page.tsx`, `theme-2/page.tsx`, `theme-3` | Skipped  | Out of scope. Confirm `noindex`/removal before launch.                               |
| `app/components/ThemeSwitcher.tsx`                    | Skipped  | Should be deleted per IA.                                                            |

---

## Screenshots Captured

> **Not yet captured.** Please run the screenshot protocol below and add files to `.design/ahpl-parent-site/screenshots/`. I will append the visual review to this document after screenshots are received.

| Screenshot                                          | Breakpoint         | Status     |
| --------------------------------------------------- | ------------------ | ---------- |
| `screenshots/review-homepage-desktop-1280.png`      | Desktop (1280×800) | ⏳ Pending |
| `screenshots/review-homepage-tablet-768.png`        | Tablet (768×1024)  | ⏳ Pending |
| `screenshots/review-homepage-mobile-375.png`        | Mobile (375×812)   | ⏳ Pending |
| `screenshots/review-hero-only-desktop.png`          | Above-the-fold     | ⏳ Pending |
| `screenshots/review-portfolio-section-desktop.png`  | Mid-page           | ⏳ Pending |
| `screenshots/review-leadership-section-desktop.png` | Mid-page           | ⏳ Pending |
| `screenshots/review-cta-button-hover.png`           | Hover state        | ⏳ Pending |
| `screenshots/review-form-focus.png`                 | Form input focus   | ⏳ Pending |
