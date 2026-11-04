# Alert

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaAlert</code></p>

A message box that stays on screen: `danger` for a failure, `warning` for what a reader should know.

<div class="demo"><div class="stack" style="max-width: 560px">
  <SaAlert>An unexpected error occurred. Please go back to your application and retry to sign in.</SaAlert>
  <SaAlert color="warning" urgent>This secret is shown once. Copy it before you close this dialog.</SaAlert>
  <SaAlert color="warning">Some filters could not be read and were removed. Choose them again.</SaAlert>
</div></div>

## Usage

- **`danger`**, the default: a request that failed and that the screen keeps showing, such as a flow error or a record that could not load.
- **`warning`**: a screen that is still usable with something to say about it, such as filters that could not be read.
- **`urgent`**: a `warning` that must be read before moving on, such as a one-time secret, or a chosen client with no redirect URI. Leave it off a notice that stops nobody doing anything, since it interrupts what the reader is hearing.
- **Not for** success: neither app reports success out of band; a screen shows the result it asked for.
- **Not for** a caution inside a sentence of the flow: [ConfirmRequest](/components/confirm-request)'s warning is text, not an alert.

## Look

- **Box**: full width, `space-3` padding, a 1px border, `radius-md`.
- **Text**: 14px.
- **`danger`**: `danger-subtle` fill, `danger-line` border, `danger` text.
- **`warning`**: `warning-subtle` fill, `warning-line` border, `warning` text. `urgent` changes none of it.

## Content

- **It says what went wrong and what to do next** (see [Content](/foundations/content)). The sentence carries the meaning, so the color is never the only signal.

## Accessibility

- **`danger` and an `urgent` `warning` take `role="alert"`, and any other `warning` takes `role="status"`** (WCAG 4.1.3). The component sets both from its props: the first is announced at once, and the second waits until the screen reader is idle, and may not be announced at all when it is inserted together with its sentence. The screen says which a warning is, because color and urgency are two questions.

## API

The consumer provides the sentence: what went wrong and what to do next.

| Name       | Type                    | Default    | Description                                                            |
| ---------- | ----------------------- | ---------- | ---------------------------------------------------------------------- |
| `color`    | `'danger' \| 'warning'` | `'danger'` | The meaning of the message.                                            |
| `urgent`   | `boolean`               | `false`    | Announces a `warning` at once. A `danger` is announced at once anyway. |
| `#default` | slot                    |            | The sentence.                                                          |

## Related

- [Color](/foundations/color): the `danger` and `warning` families.
- [AuthCard](/components/auth-card): a `danger` alert above the form.
