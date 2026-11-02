# ConfirmDialog

<p class="caps-note">Admin · specified here, implemented in the app</p>

The confirmation every destructive admin action passes through: `ConfirmDialog`, built on reka-ui's dialog.

**Look**: the flat card (`surface`, 1px `ink-200` border, `radius-lg`, no shadow), max 448px, padded `space-6`, centred on a scrim of Cassis at 50%. Title `admin-heading` as the h3, body `admin-body` in `ink-700`, footer buttons right-aligned `space-3` apart: secondary "Cancel" first, the `danger` button last.

**Copy**: the title asks the question with the verb ("Revoke this grant?"); the body says what happens to whom, and whether it can be undone; the danger button repeats the verb ("Revoke grant"), never "OK" or "Yes".

**Behavior**: controlled by `:open` and `@close`; Escape and the scrim cancel; focus starts on Cancel, so Enter never destroys by accident; the danger button shows `submitting` while the call runs.

**The consumer provides** the title, the consequence sentence, the confirm label and the handler.
