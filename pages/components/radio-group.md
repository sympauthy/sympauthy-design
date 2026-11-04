# RadioGroup

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaRadioGroup</code></p>

One choice among a few options a person should see all at once.

<script setup>
import { ref } from 'vue'
const options = [
  { value: 'all', label: 'Every client' },
  { value: 'specific', label: 'One client' }
]
const withDisabled = [
  { value: 'all', label: 'Every client' },
  { value: 'specific', label: 'One client', disabledReason: 'Your role does not allow reading clients.' }
]
const mode = ref('all')
const other = ref('all')
</script>

<div class="demo vp-raw"><div class="stack">
  <SaField label="Sign out of"><SaRadioGroup v-model="mode" :options="options" aria-label="Sign out of" /></SaField>
  <SaField label="Sign out of" hint="This cannot be undone."><SaRadioGroup v-model="other" :options="withDisabled" aria-label="Sign out of" /></SaField>
</div></div>

## Usage

- **Two to about five options**, where seeing them all helps a person choose.
- **`disabledReason`**: an option that exists but cannot be chosen, drawn rather than removed.
- **Not for** a long list: use `SaSelect` on [Field](/components/field).
- **Not for** something that can be on or off by itself: no shipped control draws that yet.

## Look

- **Row**: at least `control-height` tall, in 14px `ink-700`, with `space-2` between the mark and its label.
- **Mark**: 16px, `radius-full`, `surface`, with an `ink-400` border, beside the first line of its label however many lines follow.
- **Chosen**: a `primary` border and an 8px `primary` dot.
- **Disabled**: `ink-400` text, an `ink-300` border, and the reason under its label in 12px `ink-500`.

## Behavior

- **Pressing**: anywhere on the row chooses the option.
- **Keyboard**: Tab reaches the group, on the chosen option. The arrow keys move between options and choose as they go, skipping a disabled one.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus), on the mark.

## Content

- **An option says what it is**, in the same form as its neighbours. A reason says why it cannot be chosen (see [Content](/foundations/content)).

## Accessibility

- **The primitive sets the radio group and radio roles, and the keyboard** (WCAG 4.1.2).
- **Pass `ariaLabel`**, since `SaField`'s label points at no single control here. A line under it in `SaField` is linked with `aria-describedby`.
- **The mark's border holds 3:1 in light and dark** ([Color](/foundations/color#accessibility)). A disabled mark's need not.
- **The target is the whole row**, at least `control-height` tall (WCAG 2.5.5).

## API

The consumer provides the options, the value and the words, since the component reads no message bundle.

| Name        | Type                                  | Default     | Description                |
| ----------- | ------------------------------------- | ----------- | -------------------------- |
| `options`   | `{ value, label, disabledReason? }[]` |             | Required. What is offered. |
| `ariaLabel` | `string`                              | `undefined` | Names the group.           |
| `v-model`   | a value of `options`                  | `undefined` | What is chosen.            |

## Related

- [Field](/components/field): the field it goes in, and the select.
- [Control height](/foundations/control-height): the height of a row.
