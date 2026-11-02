# Type

The two families, and the styles each app sets its text in.

## Usage

- **Plus Jakarta Sans** for everything (`font-sans`), **JetBrains Mono** for identifiers, tokens, JSON and code digits (`font-mono`). Self-host both (see [Using in the apps](/using-in-apps)): an authorization server's sign-in page must not call a third-party font host.
- **Each app sets its text in its own styles**: `flow-*` in the flow, `admin-*` in the admin. A field label is the one exception: it is `flow-label` in both.
- **The admin has four sizes and no others**: the ones its styles below set.
- **The wordmark** is "Symp" at 500 and "Authy" at 800, one word, in `ink-900` on light ground and white on `nav-ground`. Never set it in capitals or split it.

## Tokens

<TokenTable group="type" />

## Related

- [Field](/components/field): `flow-label`.
- [AuthCard](/components/auth-card): `flow-brand` and the wordmark.
- [CodeInput](/components/code-input): `flow-code`.
- [Tag](/components/tag): `admin-tag`.
- [RecordPage](/components/record-page): `admin-label` and `admin-heading`.
