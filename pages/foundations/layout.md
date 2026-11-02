# Layout

How each app places a screen.

## Usage

- **The flow** centres one card, at most `auth-card-width`, or `auth-card-width-large` for a form of collected claims, between the brand header and the "Powered by SympAuthy" footer.
- **The admin** is a `sidebar-width` sidebar (a drawer below `lg:`), a sticky breadcrumb bar, and a main column that stops at `page-width` and centres. It supports 360px and up, with `sm:` and `lg:` as its only breakpoints.

## Tokens

<TokenTable group="size" :except="['control-height']" />

## Related

- [AuthCard](/components/auth-card): the flow's card and its widths.
- [Sidebar](/components/sidebar): the admin's sidebar.
- [RecordPage](/components/record-page): a screen in the admin's main column.
