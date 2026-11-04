# Tooltip

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaTooltip</code> and <code>SaTooltipProvider</code></p>

A sentence beside a control, shown while the pointer rests on it, the keyboard focuses it or a finger taps it.

<div class="demo"><SaTooltipProvider><div class="row">
  <SaTooltip text="Your role does not allow deleting users."><SaButton label="Delete user" refused /></SaTooltip>
  <SaTooltip text="Your role does not allow deleting users." side="right"><SaButton label="To its right" refused /></SaTooltip>
</div></SaTooltipProvider></div>

## Usage

- **The reason a control cannot be used**, on a [Button](/components/button) passed `refused` or anything else marked `aria-disabled`.
- **Not for** what a term means: use [Popover](/components/popover), which is pressed open and may hold a link.
- **Not for** a disabled item in a [Menu](/components/menu), which writes its reason under its label.
- **Not for** something a person must read to carry on: a touch screen only shows it on a tap. Write it on the screen.

## Look

- **Box**: `.sa-popover`, at most 288px wide, 8px by 12px padding, 4px from the control.
- **Text**: 12px in `ink-700`.

## Behavior

- **Opening**: on hover after 150ms, on keyboard focus, or on a tap. A pointer moving from one tooltip to the next skips the delay.
- **Closing**: when the pointer or focus leaves, on Escape, or on a tap elsewhere.
- **Placing**: on the `side` asked for, unless the screen's edge moves it.
- **Motion**: `.sa-overlay-animated`.

## Content

- **It is one sentence about the control under it**, and says why rather than restating the label (see [Content](/foundations/content)).

## Accessibility

- **The control is the trigger, so it has to keep the focus**: mark it `aria-disabled` rather than `disabled`, which would refuse both the pointer and the keyboard.
- **The primitive sets the tooltip role, and describes the control by it** (WCAG 1.4.13).

## API

The consumer provides the sentence and the control, and mounts one `SaTooltipProvider` at the root of the app.

### SaTooltip

| Name       | Type                                     | Default | Description                  |
| ---------- | ---------------------------------------- | ------- | ---------------------------- |
| `text`     | `string`                                 |         | Required. The sentence.      |
| `side`     | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | The side it opens on.        |
| `#default` | slot                                     |         | The one element it explains. |

### SaTooltipProvider

| Name       | Type | Default | Description |
| ---------- | ---- | ------- | ----------- |
| `#default` | slot |         | The app.    |

## Related

- [Button](/components/button): `refused`.
- [Popover](/components/popover): an explanation pressed open.
- [Menu](/components/menu): a reason written under its item.
