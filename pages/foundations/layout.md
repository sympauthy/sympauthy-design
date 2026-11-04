# Layout

How each app places a screen, and the widths where it changes.

## Usage

- **The flow** centres one card, at most `auth-card-width`, or `auth-card-width-large` for a form of collected claims, between the brand header and the "Powered by SympAuthy" footer.
- **The admin** is a `sidebar-width` sidebar (a drawer below `lg:`), a sticky breadcrumb bar, and a main column that stops at `page-width` and centres. It supports 360px and up.
- **`breakpoint-sm` is the mobile breakpoint, in both apps.** Below it a screen is laid out for a phone. Write that layout first and add the wider ones with `sm:` and `lg:`.
- **`sm:` and `lg:` are the only breakpoints.** Tailwind's `md:`, `xl:` and `2xl:` still compile, and a screen never writes them. Neither does a stylesheet write a width of its own: a media query reads `theme(--breakpoint-sm)`.
- **A deployment cannot change a breakpoint.** A media query cannot read a CSS variable, so they are in `theme.css` and not in the stylesheet the server answers.

## Tokens

<TokenTable group="size" :except="['control-height']" />

<TokenTable group="breakpoint" />

## Related

- [AuthCard](/components/auth-card): the flow's card and its widths.
- [Sidebar](/components/sidebar): the admin's sidebar.
- [RecordPage](/components/record-page): a screen in the admin's main column.
