# Type

The two families, the styles each app sets its text in, and how what shares a line is aligned.

## Usage

- **Plus Jakarta Sans** for everything (`font-sans`), **JetBrains Mono** for identifiers, tokens, JSON and code digits (`font-mono`). Self-host both (see [Using in the apps](/using-in-apps)): an authorization server's sign-in page must not call a third-party font host.
- **Each app sets its text in its own styles**: `flow-*` in the flow, `panel-*` in the admin and any app built like it. A field label is the one exception: it is `flow-label` in both.
- **A panel has four sizes and no others**: the ones its styles below set.
- **The wordmark** is "Symp" at 500 and "Authy" at 800, one word, in `ink-900` on light ground and white on `nav-ground`. Never set it in capitals or split it.
- **Words sharing a line share its baseline.** Text set in two styles side by side, such as a value and the date that verified it, is aligned on the baseline (`items-baseline`), never centred: centring two sizes lifts the smaller one off the line the eye reads along.
- **A box sharing a line is centred on it.** A tag, a button or anything else drawn with a fill or a border is read by its edges rather than by the words inside it, so it is centred on the line (`items-center`). On the baseline, its fill would hang below the text beside it.
- **An icon is centred on the words it belongs to, and kept out of the baseline.** It has no baseline of its own, so a line aligned on the baseline takes its words' and centres the icon on them (`self-center` on the icon).

## Tokens

<TokenTable group="type" />

## Related

- [Field](/components/field): `flow-label`.
- [AuthCard](/components/auth-card): `flow-brand` and the wordmark.
- [CodeInput](/components/code-input): `flow-code`.
- [Tag](/components/tag): `panel-tag`, and centred on the line beside text.
- [RecordPage](/components/record-page): `panel-label` and `panel-heading`.
- [Sidebar](/components/sidebar): its head's words on one baseline, and the logo centred on them.
