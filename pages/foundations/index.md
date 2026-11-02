# Foundations

One system for the two web apps SympAuthy ships: **sympauthy-flow**, the pages an end user signs in, signs up, verifies and confirms on, and **sympauthy-admin**, the operator's panel. Both are Vue 3 + Tailwind v4 and read the same tokens. They differ in density and nothing else: the flow is one card on a quiet page, read on a phone, at 16px; the admin is tables and records, read at a desk, at 14px. The pages [Flow pages](/flow), [Admin panel](/admin) and [Using in the apps](/using-in-apps) hold the rules specific to each.

Components are grouped the same way. **Common** holds what both apps draw (Button, Field, Alert, Card, Spinner), shipped in `@sympauthy/design`. **Flow** holds what only the sign-in pages use (AuthCard, ConfirmRequest, CodeInput). **Admin** holds what only the panel uses (Sidebar, Table, RecordPage, Tag, ActionsDropdown, ConfirmDialog). A component moves to Common the day the second app needs it.

## Content

- [Content](./content): voice, case, button labels, errors.

## Visual

- [Color](./color): ground and surface, the ink scale, Bordeaux, gold, status colors.
- [Themes](./themes): light first; dark in the flow only.
- [Type](./type): the two families and each app's styles.
- [Spacing](./spacing): the steps and what each separates.
- [Control height](./control-height): one height for every control, in both apps.
- [Shape](./shape): flat surfaces, and what each radius means.
- [Focus, states and motion](./focus): the one focus ring, disabled, loading, the one motion.
- [Layout](./layout): the flow's centred card, the admin's shell.
- [Iconography](./iconography): Heroicons, and their sizes.

## Brand

- [The mark](./mark): the keyhole between braces, and which file goes where.
