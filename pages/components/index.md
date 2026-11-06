# Components

Components are grouped by where they are drawn. **Common** components ship in `@sympauthy/design` for any app to import; **Flow** and **Admin** components are specified here and implemented in the app that uses them. A component moves to Common the day a second app needs it, or when it names nothing of its app and any app built like the admin would draw it.

## Common

- [Alert](./alert) — a message that stays on screen: a failure, or what a reader should know.
- [AppShell](./app-shell) — the frame of an app built like the admin: sidebar, bar and page.
- [BrandLogo](./brand-logo) — the deployment's logo, or SympAuthy's where it configures none.
- [Breadcrumb](./breadcrumb) — the bar naming the screen, its ancestors, and what can be done there.
- [Button](./button) — the one button: filled for what the screen is for, quieter beside it.
- [Card](./card) — the one flat box every other boxed component is built on.
- [ConfirmDialog](./confirm-dialog) — the question a destructive action asks before it reaches the server.
- [CopyableValue](./copyable-value) — a value to paste elsewhere, with the control copying it.
- [Dialog](./dialog) — a flat card on a scrim, with a title and a footer for its buttons.
- [EmptyValue](./empty-value) — the dash where a record carries no value.
- [Field](./field) — a labelled input, select or text area.
- [Link](./link) — a link inside a sentence.
- [Listbox](./listbox) — a choice among options whose number the build does not know.
- [LoadingState](./loading-state) — a spinner and a line saying what is being waited for.
- [Menu](./menu) — the actions of one record or page, behind a button.
- [Pagination](./pagination) — which page of a list is on screen, and the way to the others.
- [Popover](./popover) — an explanation pressed open, beside the term it explains.
- [RadioGroup](./radio-group) — one choice among a few options shown at once.
- [RecordPage](./record-page) — one record: a summary card, then sections of fields.
- [Sidebar](./sidebar) — an app's navigation, dark in every theme.
- [Skeleton](./skeleton) — the place of a value that has not arrived.
- [Spinner](./spinner) — a request in flight.
- [Table](./table) — a list of records in one card, and what it shows while it waits, fails or is empty.
- [TableEnd](./table-end) — the end of a phone's list, which grows as it is scrolled.
- [TableFilters](./table-filters) — what narrows a table.
- [TableSort](./table-sort) — what orders a table.
- [Tabs](./tabs) — the views one thing is read through.
- [Tag](./tag) — a short status, colored by what it means.
- [TagsInput](./tags-input) — several values entered one at a time.
- [Tooltip](./tooltip) — a sentence beside a control, on hover, focus or tap.

## Flow

- [AuthCard](./auth-card) — the page every flow screen is: brand header, card, footer.
- [CodeInput](./code-input) — six digit boxes for a one-time code.
- [ConfirmRequest](./confirm-request) — what a client asks to do on the account, and an explicit yes or no.

## Admin

- [ActionsDropdown](./actions-dropdown) — a menu of actions that knows about scopes.
