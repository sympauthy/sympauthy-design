# CodeInput

<p class="caps-note">Flow · specified here, implemented in the app</p>

Six digit boxes for a one-time code, used in the flow for claim validation and TOTP.

**Look**: each box 64px tall, `flow-code` (JetBrains Mono 30px), `surface`, a 2px `ink-400` border, `radius-md`; the boxes share the width with `space-2` gaps and one extra `space-2` after the third digit, so the code reads as two groups of three. Focus: `focus-ring` border and a 1px ring of the same color, as on every field. An error line in `danger` sits under the group.

**Behavior**: typing moves to the next box, Backspace to the previous; pasting a whole code fills every box; the first box carries `autocomplete="one-time-code"` and `inputmode="numeric"`. Give the group `role="group"` and a label, and each box an `aria-label` with its position.

**The consumer provides** the code length (default 6) and the submit handler; it submits on the last digit.
