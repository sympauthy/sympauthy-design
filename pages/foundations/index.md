# Foundations

One system for the two web apps SympAuthy ships: **sympauthy-flow**, the pages an end user signs in, signs up, verifies and confirms on, and **sympauthy-admin**, the operator's panel. Both are Vue 3 + Tailwind v4 and read the same tokens. They differ in density and nothing else: the flow is one card on a quiet page, read on a phone, at 16px; the admin is tables and records, read at a desk, at 14px. The pages [Flow pages](/flow), [Admin panel](/admin) and [Using in the apps](/using-in-apps) hold the rules specific to each.

Components are grouped the same way, by the app that draws them: [Components](/components/) says which ship in `@sympauthy/design` and which live in their app.

## Content

- [Content](./content): voice, case, button labels, errors.

## Visual

- [Color](./color): ground and surface, the ink scale, Bordeaux, gold, status colors.
- [Themes](./themes): light first; dark in the flow only.
- [Type](./type): the two families, each app's styles, and what aligns on the baseline.
- [Spacing](./spacing): the steps and what each separates.
- [Control height](./control-height): one height for every control, in both apps.
- [Shape](./shape): flat surfaces, and what each radius means.
- [Focus, states and motion](./focus): the one focus ring, disabled, loading, the one motion.
- [Layout](./layout): the flow's centred card, the admin's shell, the breakpoints.
- [Navigation](./navigation): how a person moves between the admin's screens, and gets back.
- [Iconography](./iconography): Heroicons, and their sizes.

## Brand

- [The mark](./mark): the keyhole between braces, and which file goes where.
