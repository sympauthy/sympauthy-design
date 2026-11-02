# Card

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as `CommonCard`</p>

<div class="demo"><div class="stack">
  <CommonCard><p>Padded, the default: 16px from the edge, 24px from <code>sm:</code>.</p></CommonCard>
  <CommonCard :padded="false">
    <p class="border-b border-gray-200 px-4 py-3">Flush: rows run edge to edge</p>
    <p class="px-4 py-3">A table, a definition list</p>
  </CommonCard>
</div></div>

The one card of both apps: a flat `surface` box with a 1px `ink-200` border and `radius-lg`, which every other boxed component is built on.

**Look**: `surface`, 1px `ink-200` border, `radius-lg`, no shadow. Padded `space-4`, then `space-6` from `sm:`; flush (no padding, `overflow: hidden`) when its content draws its own rows, like a table or a definition list.

**In the apps**: the admin's `CommonCard` (`rounded-lg border border-gray-200 bg-white`, with `p-4 sm:p-6` when `padded`) is the reference. The flow's card becomes the same classes: one card, two copies of the component until the apps share a package.

**Built on it**:

- Flow: `AuthCard` (adds a width of `auth-card-width` or `auth-card-width-large`, stacks its content at `space-4`, sets `flow-body`), and `ConfirmRequest`, which is an auth card.
- Admin: a `RecordPage`'s summary and section boxes, the box around a `Table`, and a `ConfirmDialog` (a padded card on a scrim).

**Rules**: never put a card inside a card; never give it a shadow, a colored border or a different radius; a card takes the width its parent gives it, and only the flow states a maximum.

**The consumer provides** the content, and whether it is padded or flush.
