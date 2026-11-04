# LoadingState

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>LoadingState</code></p>

What a screen shows while it waits: a spinner and a line saying what is being waited for.

<div class="demo"><div class="stack">
  <LoadingState label="Loading users." />
  <CommonCard><LoadingState label="Waiting for a response from the server." size="lg" /></CommonCard>
</div></div>

## Usage

- **`size="md"`**, the default: a wait heading the part of a screen that will fill in.
- **`size="lg"`**: a wait standing alone in a card or a screen.
- **`centered`**: a wait that fills the height it is given.
- **Not for** a button in flight: pass `submitting` or `loading` to [Button](/components/button).
- **Not for** a single value on its way, on a screen that is already drawn: use [Skeleton](/components/skeleton).

## Look

- **Spinner**: [Spinner](/components/spinner) in `primary`, at the same size as the state.
- **Line**: 14px in `ink-500`.
- **`md`**: the two in a row, `space-2` apart.
- **`lg`**: the two centred in a column, `space-3` apart, with 40px above and below.

## Behavior

- **Motion**: the spinner's, as [Spinner](/components/spinner) says.

## Content

- **The line says what is being waited for** (see [Content](/foundations/content)).

## Accessibility

- **The spinner announces `label` through its `role="status"`, and the line a person reads is hidden from a screen reader**, so the label is announced once (WCAG 4.1.3).

## API

The consumer provides the words, since the component reads no message bundle.

| Name       | Type           | Default | Description                              |
| ---------- | -------------- | ------- | ---------------------------------------- |
| `label`    | `string`       |         | What is being waited for. Required.      |
| `size`     | `'md' \| 'lg'` | `'md'`  | Whether it heads a part or stands alone. |
| `centered` | `boolean`      | `false` | Centres it in the height it is given.    |

## Related

- [Spinner](/components/spinner): what it is built on.
- [Skeleton](/components/skeleton): the wait of a single value.
- [Table](/components/table): draws one while a page of records loads.
