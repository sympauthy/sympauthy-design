# Alert

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as `CommonAlert`</p>

<div class="demo"><div class="stack" style="max-width: 560px">
  <CommonAlert>An unexpected error occurred. Please go back to your application and retry to sign in.</CommonAlert>
  <CommonAlert color="warning">This secret is shown once. Copy it before you close this dialog.</CommonAlert>
</div></div>

A message box that stays on screen: `CommonAlert` in both apps, `danger` for a failure and `warning` for what must be read first.

**Look**: full width, `space-3` padding, 1px border, `radius-md`, 14px text, a 20px icon on the left. Danger: `danger-subtle` fill, `danger-line` border, `danger` text. Warning: `warning-subtle`, `warning-line`, `warning`.

**Use** danger for a request that failed and that the screen keeps showing (a flow error, a record that could not load); warning for a one-time secret, or what an operator must know before closing a dialog. Danger takes `role="alert"`, warning `role="status"`.

**Not for** success: neither app reports success out of band; a screen shows the result it asked for.

**The consumer provides** the sentence: what went wrong and what to do next.
