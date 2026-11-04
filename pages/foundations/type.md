# Type

The two families, and the styles each app sets its text in.

## Usage

- **Plus Jakarta Sans** for everything (`font-sans`), **JetBrains Mono** for identifiers, tokens, JSON and code digits (`font-mono`). Self-host both (see [Using in the apps](/using-in-apps)): an authorization server's sign-in page must not call a third-party font host.
- **Each app sets its text in its own styles**: `flow-*` in the flow, `panel-*` in the admin and any app built like it. A field label is the one exception: it is `flow-label` in both.
- **A panel has four sizes and no others**: the ones its styles below set.
- **The wordmark** is "Symp" at 500 and "Authy" at 800, one word, in `ink-900` on light ground and white on `nav-ground`. Never set it in capitals or split it.

## Tokens

<TokenTable group="type" />

## Related

- [Field](/components/field): `flow-label`.
- [AuthCard](/components/auth-card): `flow-brand` and the wordmark.
- [CodeInput](/components/code-input): `flow-code`.
- [Tag](/components/tag): `panel-tag`.
- [RecordPage](/components/record-page): `panel-label` and `panel-heading`.
