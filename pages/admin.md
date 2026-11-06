# Admin panel

The screens of **sympauthy-admin**. Its own `docs/design-system-standard.md` and `docs/page-layout-standard.md` stay the authority for which component a screen uses and how a page is laid out. This page says which component of the system draws each part of a screen, and the few rules the components leave to the screen. How each component looks is on its own page.

## The shell

Drawn by [AppShell](/components/app-shell); how a person moves between screens is [Navigation](/foundations/navigation).

- **Sidebar**: a [Sidebar](/components/sidebar), dark in every theme, and a drawer below `lg:`. An entry the token cannot open stays in place, disabled, and a tooltip says why.
- **Bar**: a [Breadcrumb](/components/breadcrumb) naming the screen and its ancestors, sticky, with the screen's actions at its right end. Below `sm:` those actions are always a [Menu](/components/menu)'s mark, even for one action.
- **Main**: on `ground`, centred at `page-width` ([Layout](/foundations/layout)).

## Collections

Drawn by [Table](/components/table).

- **One card holds a collection**: the toolbar, the filters while one is applied, the table and the pagination bar.
- **A column that orders the list** is a button in its header, and a phone reaches the same order through a control in the toolbar ([TableSort](/components/table-sort)).
- **A filter** is chosen in a popover and read as a sentence in a band under the toolbar ([TableFilters](/components/table-filters)). Which fields exist is the collection's capability document.
- **From `sm:` the card's foot is a [Pagination](/components/pagination).** Below `sm:` the list grows as it is scrolled instead ([TableEnd](/components/table-end)): a first page is 20 rows, and a person coming back from a row finds the rows and the scroll they left.
- **An empty collection is one sentence**, centred in the card.

## Records

Drawn by [RecordPage](/components/record-page).

- **Summary first**: a summary card of fields, the identifier with a copy button ([CopyableValue](/components/copyable-value)).
- **Views**: [Tabs](/components/tabs) under the summary from `sm:`; below `sm:` a list of them, each a screen of its own.
- **Sections**: a title, then a flat card holding a definition list. A missing value is an [EmptyValue](/components/empty-value).

## Controls and actions

- **Every control is `.sa-control`**, at `control-height` ([Control height](/foundations/control-height)). A field is the [Field](/components/field) the flow draws.
- **Buttons** are [Button](/components/button)s: `primary` for what the screen is for, and `variant="danger"` inside a [ConfirmDialog](/components/confirm-dialog) only.
- **A field or a cell naming another record** links to it through a [RecordLink](/components/record-link), cut with an ellipsis where the value keeps to one line.
- **Tags** take their color from what the word means ([Tag](/components/tag)).
- **Alerts**: `danger` for a failure the screen keeps showing, `warning` for what an operator should know, `urgent` when it must be read before closing a dialog ([Alert](/components/alert)).
- **A record's or a page's actions** are a [Menu](/components/menu), which the admin's `ActionsDropdown` wraps: destructive items last, under a separator.
- **Dialogs** are a [Dialog](/components/dialog), the confirming button last.
- **A one-time secret** sits in an `urgent` `warning` alert, with the value in `panel-mono` and a copy button: the operator must read that it will not be shown again.
