# ConfirmRequest

<p class="caps-note">Flow · specified here, implemented in the app</p>

The request summary of the flow's `ConfirmPage`: what a client asks to do on the account, and an explicit yes or no.

**Card**: an `AuthCard`, so a padded `Card` at `auth-card-width`, titled "Verify this request".

**Summary box**: `primary-subtle` fill, `on-primary-subtle` text, `radius-md`, `space-3` padding, a shield icon; the client's name in bold. One sentence: "{client} has requested to {action} on your account."

**Under it**: the re-authentication notice in `flow-small` / `ink-700`, then the warning sentence in `flow-small` 600 / `ink-900`. It is a caution, not an error, so it is not an alert.

**Actions**: "Yes, continue" as the primary button, "No, cancel" as an outline button under it, both full width. Never put the two side by side on a phone, and never make "No" a plain link: refusing must be as easy to hit as accepting.

**The consumer provides** the client name (or none, for "A request has been made to..."), the action phrase, and the two handlers.
