# Focus, states and motion

What a control shows when it is focused, disabled or in flight, and the one thing that moves.

## Usage

- **One focus ring**: a control takes a `focus-ring` border plus a 1px ring of the same color; links and buttons take a 2px `focus-ring` outline offset by 2px. No halo, in either app.
- **Disabled is visible and explained.** A disabled button is `disabled` with `on-disabled`. In the admin a control the token cannot use stays in place, marked `aria-disabled`, and says why in a tooltip.
- **Loading keeps the label**: a button in flight shows a spinner and its progress verb, and is `cursor: wait`.
- **One motion**: an overlay arrives in 120ms from 4px above, and leaves in 100ms. The spinner turns, and a skeleton pulses. Nothing else animates.

## Accessibility

- **A focused control always shows the ring** (WCAG 2.4.7). Its contrast is held on [Color](/foundations/color#accessibility).
- **Motion honors `prefers-reduced-motion`** (WCAG 2.3.3).

## Related

- [Button](/components/button): disabled and in flight.
- [Skeleton](/components/skeleton): the pulse, which stops under `prefers-reduced-motion`.
- [Field](/components/field): the ring on a control.
- [ActionsDropdown](/components/actions-dropdown): a disabled item, and the overlay's motion.
- [ConfirmDialog](/components/confirm-dialog): where focus starts.
- [Sidebar](/components/sidebar): a disabled entry that keeps focus.
