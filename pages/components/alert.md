# Alert

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonAlert</code></p>

A message box that stays on screen: `danger` for a failure, `warning` for what must be read first.

<div class="demo"><div class="stack" style="max-width: 560px">
  <CommonAlert>An unexpected error occurred. Please go back to your application and retry to sign in.</CommonAlert>
  <CommonAlert color="warning">This secret is shown once. Copy it before you close this dialog.</CommonAlert>
</div></div>

## Usage

- **`danger`**, the default: a request that failed and that the screen keeps showing, such as a flow error or a record that could not load.
- **`warning`**: a one-time secret, or what an operator must know before closing a dialog.
- **Not for** success: neither app reports success out of band; a screen shows the result it asked for.
- **Not for** a caution inside a sentence of the flow: [ConfirmRequest](/components/confirm-request)'s warning is text, not an alert.

## Look

- **Box**: full width, `space-3` padding, a 1px border, `radius-md`.
- **Text**: 14px.
- **`danger`**: `danger-subtle` fill, `danger-line` border, `danger` text.
- **`warning`**: `warning-subtle` fill, `warning-line` border, `warning` text.
- **On a dark page**: `CommonAlert` keeps these colors' Light values for now ([#4](https://github.com/sympauthy/sympauthy-design/issues/4)).

## Content

- **It says what went wrong and what to do next** (see [Content](/foundations/content)). The sentence carries the meaning, so the color is never the only signal.

## Accessibility

- **`danger` takes `role="alert"`, and `warning` takes `role="status"`** (WCAG 4.1.3). The component sets both, so a screen reader announces a message that appears.

## API

The consumer provides the sentence: what went wrong and what to do next.

| Name       | Type                    | Default    | Description                 |
| ---------- | ----------------------- | ---------- | --------------------------- |
| `color`    | `'danger' \| 'warning'` | `'danger'` | The meaning of the message. |
| `#default` | slot                    |            | The sentence.               |

## Related

- [Color](/foundations/color): the `danger` and `warning` families.
- [AuthCard](/components/auth-card): a `danger` alert above the form.
