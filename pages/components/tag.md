# Tag

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaTag</code></p>

A short status or label, in a color that comes from what the word means.

<div class="demo"><div class="row">
  <SaTag color="green">Active</SaTag>
  <SaTag color="red">Revoked</SaTag>
  <SaTag color="yellow">Pending</SaTag>
  <SaTag color="blue">Standard</SaTag>
  <SaTag color="purple">Custom</SaTag>
  <SaTag color="gray">Email</SaTag>
</div></div>

## Usage

- **`green`**: what is enabled or active.
- **`red`**: what is disabled, revoked or failed.
- **`yellow`**: what needs attention.
- **`blue`** and **`purple`**: a classification, such as standard or custom.
- **`gray`**: the rest.
- **Not for** an action: a tag does nothing when pressed. Use [Button](/components/button).
- **Not for** a message a screen keeps showing: use [Alert](/components/alert).

## Look

- **Box**: 2px by 8px padding, `radius-md`, and `space-1` between two tags.
- **Text**: `panel-tag`.
- **Colors**: `tag-green`, `tag-red`, `tag-yellow`, `tag-blue` and `tag-purple` on their `-fill` tokens, and `ink-700` on `ink-100` for `gray`. Each pair holds 6:1 or better in both themes.

## Content

- **The word carries the meaning**, and the color only speeds up scanning (see [Content](/foundations/content)).

## Accessibility

- **A status always carries its word, so color is never the only signal** (WCAG 1.4.1).

## API

The consumer provides the word and its meaning.

| Name       | Type                                                           | Default | Description                              |
| ---------- | -------------------------------------------------------------- | ------- | ---------------------------------------- |
| `color`    | `'green' \| 'red' \| 'yellow' \| 'blue' \| 'purple' \| 'gray'` |         | What the word means. Required.           |
| `#default` | slot                                                           |         | The word.                                |
| `#help`    | slot                                                           |         | A control explaining it, after the word. |

## Related

- [Color](/foundations/color): the status colors.
- [Type](/foundations/type): `panel-tag`.
- [Table](/components/table): where most tags are read.
