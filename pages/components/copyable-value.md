# CopyableValue

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CopyableValue</code> and <code>CopyToClipboard</code></p>

A value a person reads and then pastes elsewhere, with the control that copies it beside it.

<div class="demo"><div class="stack">
  <CommonCard>
    <p class="field-label">Client ID</p>
    <p class="mt-1 font-mono text-gray-900">
      <CopyableValue value="c3f1e0a2-7b4d-4e8a-9f21-5d0c8a7e6b13" label="Copy client ID" copied-label="Client ID copied" failed-label="Your browser refused to copy the client ID" />
    </p>
  </CommonCard>
  <div class="row"><CopyToClipboard value="c3f1e0a2" label="Copy token" copied-label="Token copied" failed-label="Your browser refused to copy the token" /></div>
</div></div>

## Usage

- **`CopyableValue`**: an identifier or token shown on a line of its own, cut with an ellipsis where it does not fit.
- **`CopyToClipboard`**: the control alone, beside a value drawn some other way, such as a one-time secret that wraps.
- **Not for** a step whose one action is copying: use [Button](/components/button) with a label, as the flow does for a key to type into an authenticator.

## Look

- **Value**: on one line, cut with an ellipsis. The control never shrinks.
- **Control**: a 16px icon in `ink-500` with `space-1` padding, `radius-md`, and `space-1.5` from the value. It stays that small so that a line is not opened up by it.
- **Target**: `control-height` square, from a pseudo-element around the icon that is not drawn.

## Behavior

- **Hover**: `primary` icon on `primary-subtle`.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus).
- **Copied**: a check in `tag-green` for 2 seconds, with `copiedLabel` as its title.
- **Refused**: a browser may refuse the clipboard. A cross in `danger` for 2 seconds, with `failedLabel` as its title, and `failed` is emitted so that a screen can say more.

## Content

- **`label` names what is copied**, as "Copy client ID": a screen has more than one copy control on it.
- **`failedLabel` says what went wrong**, since what is copied may be shown only once (see [Content](/foundations/content)).

## Accessibility

- **The control is named by `label`**, set by the component as `aria-label`, since it draws no words (WCAG 4.1.2).
- **`copiedLabel` and `failedLabel` are announced through a `role="status"`** (WCAG 4.1.3).
- **The target is `control-height` square** (WCAG 2.5.8).

## API

The consumer provides the value and the words, since the component reads no message bundle.

### CopyableValue

| Name          | Type     | Default | Description                              |
| ------------- | -------- | ------- | ---------------------------------------- |
| `value`       | `string` |         | What is shown and copied. Required.      |
| `label`       | `string` |         | Names the control. Required.             |
| `copiedLabel` | `string` |         | Said once the value is copied. Required. |
| `failedLabel` | `string` |         | Said when the browser refuses. Required. |

### CopyToClipboard

| Name          | Type     | Default | Description                              |
| ------------- | -------- | ------- | ---------------------------------------- |
| `value`       | `string` |         | What is copied. Required.                |
| `label`       | `string` |         | Names the control. Required.             |
| `copiedLabel` | `string` |         | Said once the value is copied. Required. |
| `failedLabel` | `string` |         | Said when the browser refuses. Required. |
| `@copied`     | event    |         | The value was copied.                    |
| `@failed`     | event    |         | The browser refused, with its error.     |

## Related

- [Button](/components/button): a labelled copy action.
- [RecordPage](/components/record-page): the identifier in a summary card.
- [Control height](/foundations/control-height): the target.
