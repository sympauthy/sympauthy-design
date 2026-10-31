# Button

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as `CommonButton` with a `ButtonStyle`</p>

<script setup>
import { dangerColoredButton, outlineColoredButton, secondaryColoredButton } from '../../src/components/ButtonStyle'
</script>

<div class="demo"><div class="stack" style="max-width: none">
  <div class="row">
    <CommonButton label="Create client" />
    <CommonButton label="Refresh" :button-style="secondaryColoredButton" />
    <CommonButton label="Revoke grant" :button-style="dangerColoredButton" />
    <CommonButton label="Save" disabled />
    <CommonButton label="Saving..." submitting />
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; max-width: 520px">
    <CommonButton label="Yes, continue" size="large" />
    <CommonButton label="No, cancel" size="large" :button-style="outlineColoredButton" />
  </div>
</div></div>

The one button of both apps: `CommonButton` with a `ButtonStyle`, filled Bordeaux for what the screen is for and quieter styles for everything beside it.

**Use**
- `primary`: the one action a screen or card exists for. One per card in the flow; one per collection toolbar or dialog in the admin.
- `secondary` (admin): everything beside it, such as Refresh or Cancel. `ink-100` fill, `ink-200` border, `ink-700` text.
- `outline` (flow): the alternative path inside an auth card, such as "No, cancel" or an identity provider. Transparent, `primary` border and text, `primary-subtle` on hover.
- `danger`: soft, never filled: `danger-subtle` fill, `danger-line` border, `danger` label, `danger-hover` on hover. Bordeaux stays the only solid button, so two reds never compete. Inside a `ConfirmDialog` only, labelled with the destructive verb.

**The consumer provides** a `label` (shown while in flight too), optionally an `icon` (Heroicons 20 solid, drawn 16px), and `submitting` or `loading` while waiting. A disabled button keeps its place; in the admin it explains itself in a `HintTooltip` and is `aria-disabled`.

**Sizes**: admin `control-height` (38px), 14px/500, padding 12px by 8px. Flow `control-height-flow` (44px), full width, 16px/600.

**Tailwind**: primary `border-transparent bg-primary text-on-primary hover:bg-primary-hover`; secondary `border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200`; outline `border-primary text-primary hover:bg-primary-subtle`; danger `border-red-200 bg-red-50 text-red-700 hover:bg-red-100`; disabled `bg-disabled text-on-disabled cursor-not-allowed`.
