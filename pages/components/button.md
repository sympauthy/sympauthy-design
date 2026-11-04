# Button

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaButton</code> </p>

The one button of both apps: filled Bordeaux for what the screen is for, and quieter styles for everything beside it.

<script setup>
import { ChevronDownIcon, PlusIcon, SearchIcon } from '../.vitepress/theme/demo-icons'
</script>

<div class="demo"><div class="stack" style="max-width: none">
  <div class="row">
    <SaButton label="Create client" />
    <SaButton label="Create client" disabled />
    <SaButton label="Creating..." submitting />
    <SaButton label="Create client" loading />
  </div>
  <div class="row">
    <SaButton label="Refresh" variant="secondary" />
    <SaButton label="Refresh" variant="secondary" disabled />
    <SaButton label="Refreshing..." variant="secondary" submitting />
    <SaButton label="Delete user" variant="secondary" refused />
  </div>
  <div class="row">
    <SaButton label="No, cancel" variant="outline" />
    <SaButton label="No, cancel" variant="outline" disabled />
    <SaButton label="Cancelling..." variant="outline" submitting />
  </div>
  <div class="row">
    <SaButton label="Revoke grant" variant="danger" />
    <SaButton label="Revoke grant" variant="danger" disabled />
    <SaButton label="Revoking..." variant="danger" submitting />
  </div>
  <div class="row">
    <SaButton label="Create client" :icon="PlusIcon" />
    <SaButton label="Actions" variant="secondary" :trailing-icon="ChevronDownIcon" />
    <SaButton label="Search" variant="secondary" :icon="SearchIcon" collapse-label />
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; max-width: 520px">
    <SaButton label="Yes, continue" size="large" />
    <SaButton label="No, cancel" size="large" variant="outline" />
  </div>
</div></div>

## Usage

- **`variant="primary"`**, the default: the one action a screen or card exists for. One per card in the flow; one per collection toolbar or dialog in the admin.
- **`variant="secondary"`** (admin): everything beside it, such as Refresh or Cancel.
- **`variant="outline"`** (flow): the alternative path inside an auth card, such as "No, cancel" or an identity provider.
- **`variant="danger"`**: what destroys or revokes, inside a `SaConfirmDialog` only.
- **`size="control"`**, the default (admin): as wide as its label.
- **`size="large"`** (flow): full width, in an auth card.
- **`collapseLabel`**: a control of a toolbar, which keeps only its icon below `sm:`.
- **Not for** a second filled button: Bordeaux stays the only solid one, so a destructive action takes the soft `variant="danger"`.

## Look

- **Box**: `.sa-control`, so `control-height` tall and at least as wide (see [Control height](/foundations/control-height)), padded 12px by 8px.
- **`variant="primary"`**: `primary` fill, `on-primary` label, `primary-hover` on hover.
- **`variant="secondary"`**: `ink-100` fill, `ink-200` border, `ink-700` label, `ink-200` on hover.
- **`variant="outline"`**: transparent, `primary` border and label, `primary-subtle` on hover.
- **`variant="danger"`**: `danger-subtle` fill, `danger-line` border, `danger` label, `danger-hover` on hover.
- **Label**: `panel-strong` at `size="control"`; 16px/600 at `size="large"`.
- **Icons**: 16px and `space-1.5` from the label, `icon` before it and `trailingIcon` after it.

## Behavior

- **Hover**: the fill each style names above.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus), through `.sa-button-focus`, for the keyboard alone. A `refused` button takes it too.
- **Disabled** (`disabled`): `variant="primary"` and `variant="danger"` take `disabled` with `on-disabled`; `variant="secondary"` takes an `ink-50` fill, `ink-200` border and `ink-400` label; `variant="outline"` stays transparent, with an `ink-200` border and `ink-400` label. The cursor is `not-allowed`, and the button keeps its place.
- **In flight** (`loading` or `submitting`): the style's colors stay, a small [Spinner](/components/spinner) replaces `icon`, the label stays, the cursor is `wait`, and the button cannot be pressed.
- **Refused** (`refused`): drawn as disabled, but it stays focusable and takes the pointer so that an app's tooltip can open on it. Its click is dropped, and inside a form it does not submit.

## Content

- **A label says what happens**, and in flight keeps that verb as a progress form (see [Content](/foundations/content)).
- **`variant="danger"` is labelled with the destructive verb**: "Revoke grant", "Delete user".

## Accessibility

- **`label` is the button's name.** It is also its `title`, which is what names a button whose label `collapseLabel` has dropped, so pass an `icon` with it.
- **`refused` is `aria-disabled`, not `disabled`.** A person on a keyboard can still reach the button and read why it is refused (WCAG 2.1.1).
- **Its height meets the touch targets** set on [Control height](/foundations/control-height#accessibility).

## API

The consumer provides a `label`, optionally an icon, and `submitting` or `loading` while waiting. An app that refuses a button for a reason passes `refused` and wraps the button in its own tooltip saying why. A wrapper extends the exported `SaButtonProps`, and hands down everything but what it adds. Every other attribute reaches the `<button>`.

| Name            | Type                                                | Default     | Description                                                 |
| --------------- | --------------------------------------------------- | ----------- | ----------------------------------------------------------- |
| `variant`       | `'primary' \| 'secondary' \| 'outline' \| 'danger'` | `'primary'` | What the button is for.                                     |
| `label`         | `string`                                            |             | What the button does, kept while in flight.                 |
| `icon`          | `Component`                                         |             | Drawn before the label.                                     |
| `trailingIcon`  | `Component`                                         |             | Drawn after the label, for a button that opens something.   |
| `collapseLabel` | `boolean`                                           | `false`     | Drops the label below `sm:`, keeping it as the title.       |
| `size`          | `'control' \| 'large'`                              | `'control'` | The label's type and the width. The height does not change. |
| `loading`       | `boolean`                                           | `false`     | Waiting for something to arrive.                            |
| `submitting`    | `boolean`                                           | `false`     | Waiting for what it sent.                                   |
| `disabled`      | `boolean`                                           | `false`     | Unavailable, and needing no explanation.                    |
| `refused`       | `boolean`                                           | `false`     | Drawn disabled but kept focusable, its click dropped.       |
| `#default`      | slot                                                | `label`     | The words, when idle.                                       |
| `#loading`      | slot                                                | `label`     | The words, while `loading`.                                 |
| `#submitting`   | slot                                                | `label`     | The words, while `submitting`.                              |

## Related

- [Control height](/foundations/control-height): the box every control shares.
- [Color](/foundations/color): why Bordeaux is the only filled button.
- [Focus, states and motion](/foundations/focus): the ring, disabled and in flight.
- [Spinner](/components/spinner): what it draws in flight.
- [ConfirmDialog](/components/confirm-dialog): where `variant="danger"` appears.
- [Menu](/components/menu): a `variant="secondary"` with a `trailingIcon`.
- [AuthCard](/components/auth-card): where `size="large"` and `variant="outline"` appear.
