# ActionsDropdown

<p class="caps-note">Admin · specified here, implemented in the app</p>

The actions of one record or page in the admin: `ActionsDropdown`, built on reka-ui's dropdown menu and drawn as `.menu` and `.menu-item`.

**Trigger**: a secondary button with a chevron as its `trailingIcon`, at the right end of the breadcrumb bar.

**Menu**: `surface`, `ink-200` border, `radius-md`, no shadow, min 200px. Items `admin-body` in `ink-700` with 16px `ink-500` icons, 8px by 16px; `data-[highlighted]` (hover and keyboard) is `ink-100` with `ink-900` text.

**Order**: most used first; destructive items last, under an `ink-200` separator, in `danger`, each opening a `ConfirmDialog`.

**Disabled item**: `ink-400`, `cursor-not-allowed`, `aria-disabled`, with its reason under the label in 12px `ink-500`: a menu is read while open, so the reason is written, not hovered.

**Motion**: `.overlay-animated`, 120ms in from 4px above, 100ms out.

**The consumer provides** the items: label, icon, handler, the scopes each needs, and whether it destroys.
