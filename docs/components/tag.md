# Tag

<p class="caps-note">Admin · specified here, implemented in the app</p>

A short status or label in the admin, and the entity tags built on it, such as a claim's origin or kind.

**Color comes from the meaning, never from taste**: `tag-green` enabled or active, `tag-red` disabled, revoked or failed, `tag-yellow` needs attention, `tag-blue` and `tag-purple` a classification (standard or custom, for example), gray (`ink-100` / `ink-700`) for the rest. Each pair holds 6:1 or better in both themes.

**Look**: `admin-tag` (12px/500), 2px by 8px padding, `radius-md`, tags `space-1` apart. The word carries the meaning; the color only speeds up scanning.

**The consumer provides** the word and its meaning (`green | red | yellow | blue | purple | gray`), and optionally a `#help` slot for a help tooltip.
