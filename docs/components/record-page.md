# RecordPage

<p class="caps-note">Admin · specified here, implemented in the app</p>

The shape of one record in the admin: a `SummaryCard`, a `RecordTabs` strip, and `DetailSection`s of `DefinitionList`s.

**SummaryCard**: a flat card of `SummaryField`s, each an `admin-label` over its value. The identifier is a `CopyableValue`: `admin-mono`, truncated with an ellipsis, and a copy button whose icon is `ink-500` and turns `primary` on a `primary-subtle` hover.

**RecordTabs**: `admin-strong` labels in `ink-500`, 8px by 16px; hover darkens to `ink-800` with an `ink-300` underline; the current tab has `primary` text, a 2px `primary` underline and `aria-current="page"`. The strip scrolls sideways rather than dropping a tab.

**DetailSection**: an `admin-heading` h2, then a flush card holding a `DefinitionList`. Each `DefinitionRow` puts its `admin-label` beside the value from `sm:` (one third, two thirds) and above it on a phone, rows split by `ink-200`, padded `space-3` by `space-4`, `space-6` from `sm:`. A value the record lacks is an `EmptyValue` dash in `ink-300`.

**The consumer provides** the record (fetched once by the shell), the tab routes, and per section its title and rows.
