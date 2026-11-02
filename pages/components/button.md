# Button

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonButton</code> with a <code>ButtonStyle</code></p>

The one button of both apps: filled Bordeaux for what the screen is for, and quieter styles for everything beside it.

<script setup>
import { dangerColoredButton, outlineColoredButton, secondaryColoredButton } from '../../src/components/ButtonStyle'
import { ChevronDownIcon, PlusIcon, SearchIcon } from '../.vitepress/theme/demo-icons'
</script>

<div class="demo"><div class="stack" style="max-width: none">
  <div class="row">
    <CommonButton label="Create client" />
    <CommonButton label="Create client" disabled />
    <CommonButton label="Creating..." submitting />
    <CommonButton label="Create client" loading />
  </div>
  <div class="row">
    <CommonButton label="Refresh" :button-style="secondaryColoredButton" />
    <CommonButton label="Refresh" :button-style="secondaryColoredButton" disabled />
    <CommonButton label="Refreshing..." :button-style="secondaryColoredButton" submitting />
    <CommonButton label="Delete user" :button-style="secondaryColoredButton" refused />
  </div>
  <div class="row">
    <CommonButton label="No, cancel" :button-style="outlineColoredButton" />
    <CommonButton label="No, cancel" :button-style="outlineColoredButton" disabled />
    <CommonButton label="Cancelling..." :button-style="outlineColoredButton" submitting />
  </div>
  <div class="row">
    <CommonButton label="Revoke grant" :button-style="dangerColoredButton" />
    <CommonButton label="Revoke grant" :button-style="dangerColoredButton" disabled />
    <CommonButton label="Revoking..." :button-style="dangerColoredButton" submitting />
  </div>
  <div class="row">
    <CommonButton label="Create client" :icon="PlusIcon" />
    <CommonButton label="Actions" :button-style="secondaryColoredButton" :trailing-icon="ChevronDownIcon" />
    <CommonButton label="Search" :button-style="secondaryColoredButton" :icon="SearchIcon" collapse-label />
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; max-width: 520px">
    <CommonButton label="Yes, continue" size="large" />
    <CommonButton label="No, cancel" size="large" :button-style="outlineColoredButton" />
  </div>
</div></div>

## Usage

- **`primaryColoredButton`**, the default: the one action a screen or card exists for. One per card in the flow; one per collection toolbar or dialog in the admin.
- **`secondaryColoredButton`** (admin): everything beside it, such as Refresh or Cancel.
- **`outlineColoredButton`** (flow): the alternative path inside an auth card, such as "No, cancel" or an identity provider.
- **`dangerColoredButton`**: what destroys or revokes, inside a `ConfirmDialog` only.
- **`size="control"`**, the default (admin): as wide as its label.
- **`size="large"`** (flow): full width, in an auth card.
- **`collapseLabel`**: a control of a toolbar, which keeps only its icon below `sm:`.
- **Not for** a second filled button: Bordeaux stays the only solid one, so a destructive action takes the soft `dangerColoredButton`.

## Look

- **Box**: `.control`, so `control-height` tall and at least as wide (see [Control height](/foundations/control-height)), padded 12px by 8px.
- **`primaryColoredButton`**: `primary` fill, `on-primary` label, `primary-hover` on hover.
- **`secondaryColoredButton`**: `ink-100` fill, `ink-200` border, `ink-700` label, `ink-200` on hover.
- **`outlineColoredButton`**: transparent, `primary` border and label, `primary-subtle` on hover.
- **`dangerColoredButton`**: `danger-subtle` fill, `danger-line` border, `danger` label, `danger-hover` on hover. On a dark page it keeps these colors' Light values for now.
- **Label**: `admin-strong` at `size="control"`; 16px/600 at `size="large"`.
- **Icons**: 16px and `space-1.5` from the label, `icon` before it and `trailingIcon` after it.

## Behavior

- **Hover**: the fill each style names above.
- **Focus**: a 2px `focus-ring` outline offset by 2px, as [Focus, states and motion](/foundations/focus) has it. `CommonButton` does not draw it yet, so a button shows the browser's own outline.
- **Disabled** (`disabled`): `primaryColoredButton` and `dangerColoredButton` take `disabled` with `on-disabled`; `secondaryColoredButton` takes an `ink-50` fill, `ink-200` border and `ink-400` label; `outlineColoredButton` stays transparent, with an `ink-200` border and `ink-400` label. The cursor is `not-allowed`, and the button keeps its place.
- **In flight** (`loading` or `submitting`): the style's colors stay, a small [Spinner](/components/spinner) replaces `icon`, the label stays, the cursor is `wait`, and the button cannot be pressed.
- **Refused** (`refused`): drawn as disabled, but it stays focusable and takes the pointer so that an app's tooltip can open on it. Its click is dropped, and inside a form it does not submit.

## Content

- **A label says what happens**, and in flight keeps that verb as a progress form (see [Content](/foundations/content)).
- **`dangerColoredButton` is labelled with the destructive verb**: "Revoke grant", "Delete user".

## Accessibility

- **`label` is the button's name.** It is also its `title`, which is what names a button whose label `collapseLabel` has dropped, so pass an `icon` with it.
- **`refused` is `aria-disabled`, not `disabled`.** A person on a keyboard can still reach the button and read why it is refused (WCAG 2.1.1).
- **Its height meets the touch targets** set on [Control height](/foundations/control-height#accessibility).

## API

The consumer provides a `label`, optionally an icon, and `submitting` or `loading` while waiting. An app that refuses a button for a reason passes `refused` and wraps the button in its own tooltip saying why. Every other attribute reaches the `<button>`.

| Name            | Type                   | Default                | Description                                                 |
| --------------- | ---------------------- | ---------------------- | ----------------------------------------------------------- |
| `buttonStyle`   | `ButtonStyle`          | `primaryColoredButton` | The style, one of the four exported.                        |
| `label`         | `string`               |                        | What the button does, kept while in flight.                 |
| `icon`          | `Component`            |                        | Drawn before the label.                                     |
| `trailingIcon`  | `Component`            |                        | Drawn after the label, for a button that opens something.   |
| `collapseLabel` | `boolean`              | `false`                | Drops the label below `sm:`, keeping it as the title.       |
| `size`          | `'control' \| 'large'` | `'control'`            | The label's type and the width. The height does not change. |
| `loading`       | `boolean`              | `false`                | Waiting for something to arrive.                            |
| `submitting`    | `boolean`              | `false`                | Waiting for what it sent.                                   |
| `disabled`      | `boolean`              | `false`                | Unavailable, and needing no explanation.                    |
| `refused`       | `boolean`              | `false`                | Drawn disabled but kept focusable, its click dropped.       |
| `#default`      | slot                   | `label`                | The words, when idle.                                       |
| `#loading`      | slot                   | `label`                | The words, while `loading`.                                 |
| `#submitting`   | slot                   | `label`                | The words, while `submitting`.                              |

## Related

- [Control height](/foundations/control-height): the box every control shares.
- [Color](/foundations/color): why Bordeaux is the only filled button.
- [Focus, states and motion](/foundations/focus): the ring, disabled and in flight.
- [Spinner](/components/spinner): what it draws in flight.
- [ConfirmDialog](/components/confirm-dialog): where `dangerColoredButton` appears.
- [ActionsDropdown](/components/actions-dropdown): a `secondaryColoredButton` with a `trailingIcon`.
- [AuthCard](/components/auth-card): where `size="large"` and `outlineColoredButton` appear.
