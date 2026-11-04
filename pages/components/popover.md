# Popover

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonPopover</code></p>

An explanation pressed open, which may hold a link: what a term means, beside the term.

<script setup>
import { secondaryColoredButton } from '../../src/components/ButtonStyle'
</script>

<div class="demo"><div class="stack">
  <p class="field-label">Grant<CommonPopover label="What is a grant?">A grant is what a person allowed a client to do on their behalf. <a class="link" href="#">Read more</a>.</CommonPopover></p>
  <CommonPopover><template #trigger><CommonButton label="Show the filter" :button-style="secondaryColoredButton" class="self-start" /></template>A box of fields, pressed open from a control of the caller's.</CommonPopover>
</div></div>

## Usage

- **What a term means, drawn beside it**, through the default information icon.
- **`#trigger`**: a small surface of controls opened from a control of the caller's, such as a filter.
- **Not for** why a control is disabled: use [Tooltip](/components/tooltip).
- **Not for** a question that stops the screen: use [Dialog](/components/dialog).

## Look

- **Box**: `.popover`, 288px wide and never wider than the screen, `space-3` padding, 4px from its trigger.
- **Text**: 14px in `ink-700`.
- **Icon**: 12px in `ink-500`, `ink-700` on hover, `space-1` after the word it explains.

## Behavior

- **Opening**: pressing the trigger. It does not open on hover, since it may hold a link.
- **Closing**: Escape, or a press outside.
- **Focus**: the outline of [Focus, states and motion](/foundations/focus) on the icon. It moves into the box when it opens, and back when it closes.
- **Placing**: below its trigger, unless the screen's edge moves it.
- **Motion**: `.overlay-animated`.

## Content

- **It says what the term is, for somebody meeting it for the first time** (see [Content](/foundations/content)).

## Accessibility

- **Pass `label` with the default icon**, as "What is a grant?", since the icon draws no words (WCAG 4.1.2). A `#trigger` names itself.
- **The icon's target is 24px square**, while it stays 12px (WCAG 2.5.8). It is under `control-height`, because it sits inside a line of text.

## API

The consumer provides the explanation, and the words or the control that open it.

| Name           | Type      | Default     | Description                                 |
| -------------- | --------- | ----------- | ------------------------------------------- |
| `label`        | `string`  | `undefined` | Names the icon. Unused with `#trigger`.     |
| `v-model:open` | `boolean` | `undefined` | Whether it is open, for a caller that asks. |
| `#trigger`     | slot      |             | One control, in place of the icon.          |
| `#default`     | slot      |             | The explanation.                            |

## Related

- [Tooltip](/components/tooltip): a sentence on hover.
- [Link](/components/link): a link inside it.
- [Field](/components/field): its `#help` slot beside a label.
