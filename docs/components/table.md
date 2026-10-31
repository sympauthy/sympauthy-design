# Table

<p class="caps-note">Admin · specified here, implemented in the app</p>

Any table of records in the admin: `PaginatedTable` with `TableHeader`, `CollectionSortHeader` and `TableCell`.

**Look**: inside a flat card (`surface`, `ink-200` border, `radius-lg`). Header row `ink-50` with an `ink-200` inset rule, names in `admin-label`, cells `px-6 py-3`. Body cells `px-6 py-4`, `admin-body` in `ink-500`, rows split by `ink-200` and highlighted `ink-50` on hover. The column identifying the record is `primary`: `admin-strong` in `ink-900`. Identifiers are `mono`. A missing value is an `EmptyValue` dash in `ink-300`.

**Footer**: the range in `ink-500` on the left, the pager on the right; the current page is filled `primary`.

**Sizing and phones** follow the admin's page layout standard: `fit` columns shrink-wrap, the rest share what is left, no fixed widths; below `sm:` each row becomes a card with `admin-label` names over the values.

**The consumer provides** the `#header` and `#rows` slots, an `empty` sentence, and the page-size handler.
