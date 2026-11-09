# Tag

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaTag</code></p>

A short status or label, in a color that comes from what the word means.

<div class="demo"><div class="row">
  <SaTag color="green">Active</SaTag>
  <SaTag color="red">Revoked</SaTag>
  <SaTag color="yellow">Pending</SaTag>
  <SaTag color="blue">Standard</SaTag>
  <SaTag color="purple">Custom</SaTag>
  <SaTag color="ink">Client</SaTag>
  <SaTag color="gray">Email</SaTag>
</div><div class="row">
  <SaTag color="green" variant="outline">Active</SaTag>
  <SaTag color="red" variant="outline">Revoked</SaTag>
  <SaTag color="yellow" variant="outline">Pending</SaTag>
  <SaTag color="blue" variant="outline">Standard</SaTag>
  <SaTag color="purple" variant="outline">Grantable</SaTag>
  <SaTag color="ink" variant="outline">Client</SaTag>
  <SaTag color="gray" variant="outline">Email</SaTag>
</div></div>

## Usage

- **`green`**: what is enabled or active.
- **`red`**: what is disabled, revoked or failed.
- **`yellow`**: what needs attention.
- **`blue`** and **`purple`**: a classification, such as standard or custom.
- **`ink`**: a third classification, such as a client's own scope beside consentable and grantable
  ones. It is the strongest tag, so a list gives it to the kind it sets apart most.
- **`gray`**: the rest.
- **`fill`**: every tag, unless a list says otherwise.
- **`outline`**: a kind a list tells apart from the filled tags beside it, such as a grantable scope
  among consentable ones, so that two kinds differ in more than hue. A list keeps one variant per
  kind.
- **Not for** an action: a tag does nothing when pressed. Use [Button](/components/button).
- **Not for** a message a screen keeps showing: use [Alert](/components/alert).

## Look

- **Box**: 2px by 8px padding, `radius-md`, and `space-1` between two tags.
- **Text**: `panel-tag`.
- **Colors**: `tag-green`, `tag-red`, `tag-yellow`, `tag-blue` and `tag-purple` on their `-fill` tokens, `surface` on `ink-700` for `ink`, and `ink-700` on `ink-100` for `gray`. Each pair holds 6:1 or better in both themes.
- **Outline**: the same text on `surface`, inside a 1px ring of the color's `-line` token, `ink-700` for `ink` and `ink-400` for `gray`. The ring is drawn inside the box, so an outline tag is the size of a filled one, and holds 3:1 or better on `surface` in both themes.

## Content

- **The word carries the meaning**, and the color only speeds up scanning (see [Content](/foundations/content)).

## Accessibility

- **A status always carries its word, so color is never the only signal** (WCAG 1.4.1).

## API

The consumer provides the word and its meaning.

| Name       | Type                                                                    | Default  | Description                              |
| ---------- | ----------------------------------------------------------------------- | -------- | ---------------------------------------- |
| `color`    | `'green' \| 'red' \| 'yellow' \| 'blue' \| 'purple' \| 'ink' \| 'gray'` |          | What the word means. Required.           |
| `variant`  | `'fill' \| 'outline'`                                                   | `'fill'` | Whether the tag is filled or ringed.     |
| `#default` | slot                                                                    |          | The word.                                |
| `#help`    | slot                                                                    |          | A control explaining it, after the word. |

## Related

- [Color](/foundations/color): the status colors.
- [Type](/foundations/type): `panel-tag`.
- [Table](/components/table): where most tags are read.
