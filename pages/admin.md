# Admin panel

The screens of **sympauthy-admin**. Its own `docs/design-system-standard.md` and `docs/page-layout-standard.md` stay the authority for which component a screen uses and how a page is laid out. This system supplies the values those components are drawn with, and the few rules that change with the Bordeaux identity.

## The shell

Drawn by [AppShell](/components/app-shell), [Sidebar](/components/sidebar) and [Breadcrumb](/components/breadcrumb).

- **Sidebar**: `nav-ground` (Cassis), `sidebar-width`, the mark (`sympauthy-icon-dark.svg`, 32px) and the wordmark with "Admin" in `nav-muted` in a 56px head under a `nav-divider` rule. Section labels in 12px uppercase `nav-muted`; entries in `nav-text`; hover `nav-hover`; the current entry `nav-active` with a 3px `gold` rule on its left edge; an entry the token cannot open `nav-disabled`, explained by a tooltip. Below `lg:` it is a drawer over a `rgba(31,20,24,0.5)` scrim.
- **Breadcrumb bar**: sticky, `surface` with an `ink-200` bottom rule; ancestors are `ink-500` links, the current record `ink-900`. The page's actions sit at its right end, and below `sm:` they are always a `⋯` mark with no border, even for one action. Below `lg:` the menu icon in `ink-600` stands before it, in the same 56px row. Below `sm:` the row drops the ancestors, and the screen's name takes `panel-heading`. A screen with ancestors has a link back in place of the menu icon, with its parent's name over its own ([Navigation](/foundations/navigation)).
- **Main**: `ground`, padded `space-4` then `space-6` from `lg:`, centred at `page-width`.

## Collections

Drawn by [Table](/components/table).

- **One card holds a collection**, `surface` with an `ink-200` border and `radius-lg`: the toolbar, the filters while one is applied, the table and the pagination bar, split by `ink-200` rules.
- **A table**: the header row is `ink-50` with `panel-label` names, and a column that orders the list is a button (see [TableSort](/components/table-sort)), which a phone reaches through a control in the toolbar; cells are `panel-body` in `ink-900`, the primary column `panel-strong`, identifiers `panel-mono`. Rows are separated by `ink-200` rules and highlight `ink-50` on hover.
- **A filter** (see [TableFilters](/components/table-filters)) is a `primary-subtle` control with a `primary` border, in an `ink-50` band with how many records are left and the way to clear them. Its condition and value are chosen in a popover, and which fields exist is the collection's capability document.
- **The pagination bar** is the card's foot from `sm:` (see [Pagination](/components/pagination)): the range in `ink-500` on the left, always, and the pager on the right only past one page; the current page is a `primary` square with `on-primary` digits.
- **Below `sm:` the card stays and each row is laid out down**: the record's name and its actions, then its other values wrapping beside their column's name.
- **Below `sm:` a collection grows as it is scrolled** (see [TableEnd](/components/table-end)): the card ends with its rows, with no foot, and the next page is asked for before the end is reached, with two placeholder rows standing for it. Once the list is whole a line in `ink-500` says how many it holds. A first page is 20 rows, and an operator coming back from a row finds the rows and the scroll they left.
- **An empty collection is one sentence** in `ink-500`, centred in the card.

## Records

- **Summary first**: a summary card of fields, each an `panel-label` over its value; the identifier is in `panel-mono`, with a copy button (see [RecordPage](/components/record-page)).
- **Tabs** (see [Tabs](/components/tabs)): `panel-strong` labels in `ink-500`, a 2px `primary` underline and `primary` text on the current tab, an `ink-200` rule under the strip.
- **Sections**: an `panel-heading` title, then a flat card. Fields are a definition list: `panel-label` on the left (on top below `sm:`), the value in `ink-900`, rows split by `ink-200`. A missing value is a dash in `ink-300`.

## Controls and actions

- **Every control is `.sa-control`**: `control-height` (44px, the flow's touch target; see [Control height](/foundations/control-height)), `radius-md`, 12px by 8px padding, `panel-body`, and an `ink-400` border. A field is the [Field](/components/field) the flow draws, with 16px text. The Tailwind v3 compatibility rule paints every border `gray-200`, which fails 3:1 on a control: `.sa-control` must state its own border (see [Using in the apps](/using-in-apps)).
- **Buttons**: `variant="primary"` is `primary` / `primary-hover` / `on-primary`; `variant="secondary"` is `ink-100` with an `ink-200` border and `ink-700` text, hovering to `ink-200`; `variant="danger"` is soft (`danger-subtle` fill, `danger-line` border, `danger` text, `danger-hover` on hover), used inside a `SaConfirmDialog` only. `primary` is the only filled button.
- **Tags** keep their meaning-to-color rule; they read from the `tag-*` tokens so a dark admin later needs no new classes.
- **Alerts**: `danger` for a failure the screen keeps showing, `warning` for what an operator should know, `urgent` when it must be read before closing a dialog.
- **Menus** (`SaMenu`, which `ActionsDropdown` wraps): `surface`, `ink-200` border, `radius-md`, no shadow; items in `ink-700` with `ink-500` icons, highlighted `ink-100`; destructive items last, under an `ink-200` separator, in `danger`; a disabled item in `ink-400` with its reason under it in 12px `ink-500`.
- **Dialogs**: the flat card (`ink-200` border, `radius-lg`, no shadow) on the Cassis scrim, `panel-heading` title, `space-3` between footer buttons, the confirming button last.
- **One-time secrets** sit in an `urgent` `warning` alert with the value in `panel-mono` and a copy button: the operator must read that it will not be shown again.
