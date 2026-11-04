# Admin panel

The screens of **sympauthy-admin**. Its own `docs/design-system-standard.md` and `docs/page-layout-standard.md` stay the authority for which component a screen uses and how a page is laid out. This system supplies the values those components are drawn with, and the few rules that change with the Bordeaux identity.

## The shell

Drawn by [AppShell](/components/app-shell), [Sidebar](/components/sidebar) and [Breadcrumb](/components/breadcrumb).

- **Sidebar**: `nav-ground` (Cassis), `sidebar-width`, the mark (`sympauthy-icon-dark.svg`, 32px) and the wordmark with "Admin" in `nav-muted` in a 56px head under a `nav-divider` rule. Section labels in 12px uppercase `nav-muted`; entries in `nav-text`; hover `nav-hover`; the current entry `nav-active` with a 3px `gold` rule on its left edge; an entry the token cannot open `nav-disabled`, explained by a tooltip. Below `lg:` it is a drawer over a `rgba(31,20,24,0.5)` scrim.
- **Breadcrumb bar**: sticky, `surface` with an `ink-200` bottom rule; ancestors are `ink-500` links, the current record `ink-900`. The page's actions sit at its right end. Below `lg:` it is one 56px row: the menu icon in `ink-600`, the screen's name in 18px, and those actions.
- **Main**: `ground`, padded `space-4` then `space-6` from `lg:`, centred at `page-width`.

## Collections

- **A table** is `surface` inside an `ink-200` bordered `radius-lg` card. The header row is `ink-50` with an `ink-200` inset rule and `panel-label` names; cells are `panel-body` in `ink-500`, the primary column `panel-strong` in `ink-900`, identifiers `panel-mono`. Rows are separated by `ink-200` rules and highlight `ink-50` on hover.
- **The pagination bar** sits under the table (see [Pagination](/components/pagination)): the range in `ink-500` on the left, the pager on the right; the current page is a `primary` square with `on-primary` digits.
- **Below `sm:` each row is a card** on `ground`, as the global stylesheet already draws it; only the border color changes to `ink-200`.
- **An empty collection is one sentence** in `ink-500`, centred in the table body.

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
