# Focus, states and motion

- **One focus ring**: a control takes a `focus-ring` border plus a 1px ring of the same color; links and buttons take a 2px `focus-ring` outline offset by 2px. No halo, in either app.
- **Disabled is visible and explained.** A disabled button is `disabled` with `on-disabled`. In the admin a control the token cannot use stays in place, marked `aria-disabled`, and says why in a tooltip.
- **Loading keeps the label**: a button in flight shows a spinner and its progress verb, and is `cursor: wait`.
- **One motion**: an overlay arrives in 120ms from 4px above, and leaves in 100ms. The spinner turns. Nothing else animates; honor `prefers-reduced-motion`.
