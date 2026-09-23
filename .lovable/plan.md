# Faithful inFIELD7 React migration

## Goal
Rebuild the supplied static inFIELD7 website as a Lovable-compatible React and TypeScript application without redesigning it. Preserve all copy, visual styling, original assets, responsive behavior, URLs, SEO, and working interactions.

## What will be built

- Keep the long-form home experience at `/`, with every existing section in the same order and hierarchy.
- Recreate the legal pages as `/privacy` and `/terms`, preserving their full text and cross-links.
- Keep old `privacy.html` and `terms.html` links working through permanent redirects to the new routes.
- Split the site into focused reusable pieces: shared header/footer, intro questionnaire, reveal screen, hero phone, dashboard visual, content sections, legal layout, cards, buttons, status pills, and animation helpers.
- Preserve the supplied inFIELD7 logo and mobile app screenshot at their original aspect ratios and placements.

## Behavior to preserve

- Three-step business questionnaire with single selection, tailored multi-selection questions, back/continue flow, validation, solution matching, and hero personalization.
- Session-stored lead details and the prefilled WhatsApp inquiry to the existing number.
- Skip, keyboard dismissal, demo-button replay, and the timed navy presentation screen.
- Sticky navigation state, responsive mobile menu, smooth in-page navigation, and legal-page navigation.
- Scroll reveals, staggered cards and words, count-up values, chart growth/drawing, progress animation, marker drift, phone overlays, hover states, and reduced-motion support.
- Existing Google Play, email, telephone, privacy, terms, contact, and section links.

## Visual fidelity

- Carry the existing CSS token system into the global application stylesheet, including exact blue/navy/orange/status colors, Inter and JetBrains Mono, spacing, radii, shadows, gradients, and breakpoints.
- Retain specialized CSS where it gives the closest match; use Tailwind only where it does not alter the original result.
- Preserve the current desktop, tablet, and mobile layouts, including dashboard/sidebar collapse, card-grid changes, form stacking, phone sizing, and navigation changes.
- Remove only the explicitly design-time-only tweaks control; no visible production content will be removed or rewritten.

## Routes and page information

- Use Lovable’s built-in TanStack routing rather than adding a second router library.
- Add unique page titles, descriptions, Open Graph text, canonical URLs, and Twitter card metadata for `/`, `/privacy`, and `/terms`.
- Preserve semantic landmarks, heading order, labels, alt text, keyboard behavior, and focus styles.

## Technical approach

- Establish the standard React 19 + TypeScript + Vite 7 + Tailwind v4/TanStack Start project structure required by Lovable.
- Convert imperative DOM mutation into typed React state, effects, refs, and small hooks while keeping timing and transitions equivalent.
- Keep all business-question and feature content in typed data modules so repeated UI is rendered consistently.
- Serve the original binary assets through the project asset flow and update references without changing their appearance.
- Do not add a database or backend; the original lead workflow remains browser storage plus WhatsApp.

## Verification

- Compare the original and migrated pages section-by-section at desktop, laptop, tablet, and mobile widths, checking header geometry, logo/navigation alignment, typography, colors, gradients, cards, controls, icons, imagery, phone/dashboard visuals, spacing, and footer. Use the original CSS values rather than approximations.
- Exercise the complete questionnaire (all steps, selection modes, back/continue, validation, solution matching, personalization), storage behavior, WhatsApp-link generation, skip/replay and keyboard paths, presentation timing, sticky header, mobile menu, smooth section links, legal navigation, and every external/email/telephone/Google Play link.
- Verify the bespoke reveal, stagger, word, counter, chart, progress, marker, phone-overlay, hover, and presentation animations against the original rather than substituting generic motion.
- Verify every image and font loads, all three routes open directly, legacy `.html` URLs redirect, responsive layouts have no unintended horizontal overflow, TypeScript is clean, and browser console/network logs are clean.
- Confirm the final preview build succeeds before completion.
