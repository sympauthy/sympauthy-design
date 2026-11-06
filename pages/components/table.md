# Table

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaTable</code>, <code>SaTableHeader</code>, <code>SaTableCell</code>, <code>SaTableActions</code> and <code>SaTableRecord</code></p>

A list of records in one card: a header row and rows of cells, what it shows instead while it waits, fails or holds nothing, and what sits around them through its slots.

<script setup>
import { ref } from 'vue'
import { EllipsisHorizontalIcon } from '../.vitepress/theme/demo-icons'
const users = [
  { email: 'ada@example.com', id: 'c3f1e0a2-7b4d-4e8a-9d21-5e7a90c32f6b', status: 'Enabled', color: 'green', signIn: '02/11/2026 13:33', created: '2026-11-01' },
  { email: 'katherine.johnson@example.com', id: '5e7a90c3-2f6b-4d18-8a51-f1395eeb4307', status: 'Invited', color: 'yellow', signIn: null, created: '2026-10-03' },
  { email: 'alan@example.com', id: '2b9c4e17-6a03-4f5d-a7c8-90d1e3f6b254', status: 'Disabled', color: 'red', signIn: '12/09/2026 17:45', created: '2026-08-20' }
]
const actions = [
  { key: 'view', label: 'View user' },
  { key: 'copy', label: 'Copy user ID' },
  { key: 'disable', label: 'Disable user…', danger: true }
]
const fits = ref(1)
const many = Array.from({ length: 40 }, (_, i) => ({ id: `client-${i + 1}`, name: `Client ${i + 1}` }))
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="mode in ['phone', 'tablet', 'desktop']" :key="mode" :mode="mode">
    <SaTable loading-label="Loading users.">
      <template #header>
        <SaTableHeader>User</SaTableHeader>
        <SaTableHeader fit>Status</SaTableHeader>
        <SaTableHeader fit>Last sign-in</SaTableHeader>
        <SaTableHeader fit>Created</SaTableHeader>
        <SaTableHeader fit><span class="sr-only">Actions</span></SaTableHeader>
      </template>
      <template #rows>
        <tr v-for="user in users" :key="user.id">
          <SaTableCell primary><SaTableRecord :name="user.email" :detail="user.id" :link="{ href: '#' }" /></SaTableCell>
          <SaTableCell label="Status" label-hidden fit><SaTag :color="user.color">{{ user.status }}</SaTag></SaTableCell>
          <SaTableCell label="Last sign-in" fit><SaEmptyValue v-if="!user.signIn" /><template v-else>{{ user.signIn }}</template></SaTableCell>
          <SaTableCell label="Created" fit>{{ user.created }}</SaTableCell>
          <SaTableActions><SaMenu :label="`Actions for ${user.email}`" :items="actions" :icon="EllipsisHorizontalIcon" /></SaTableActions>
        </tr>
      </template>
    </SaTable>
  </DemoFrame>
</div></div>

<div class="demo vp-raw"><div class="flex flex-col gap-6">
  <SaTable loading-label="Loading users.">
    <template #header>
      <SaTableHeader>User</SaTableHeader>
      <SaTableHeader fit><span class="sr-only">Actions</span></SaTableHeader>
    </template>
    <template #rows>
      <tr>
        <SaTableCell primary><SaTableRecord :name="users[0].email" :link="{ href: '#' }" /></SaTableCell>
        <SaTableActions><SaMenu :label="`Actions for ${users[0].email}`" :items="actions" :icon="EllipsisHorizontalIcon" /></SaTableActions>
      </tr>
    </template>
  </SaTable>
  <div style="height: 300px">
    <SaTable fill auto-page-size loading-label="Loading clients." @page-size-change="fits = $event">
      <template #header><SaTableHeader>Name</SaTableHeader><SaTableHeader fit>Identifier</SaTableHeader></template>
      <template #rows>
        <tr v-for="client in many.slice(0, fits)" :key="client.id">
          <SaTableCell primary>{{ client.name }}</SaTableCell>
          <SaTableCell label="Identifier" mono fit>{{ client.id }}</SaTableCell>
        </tr>
      </template>
      <template #footer><p class="text-sm text-gray-500">{{ fits }} rows fit this height.</p></template>
    </SaTable>
  </div>
  <SaTable loading-label="Loading users." loading />
  <SaTable loading-label="Loading users." error="The users could not be loaded. Try again in a moment." />
  <SaTable loading-label="Loading users." empty>
    <template #empty><p class="text-sm text-gray-500">No user matches this search.</p></template>
  </SaTable>
</div></div>

## Usage

- **A list of records with the same fields**, read across.
- **`SaTableHeader` and `SaTableCell`**: every column and every cell. A screen writes no padding, text size or color of its own.
- **`#toolbar`**: what narrows and re-reads the list, in one row that wraps. The search field takes what is left.
- **`#filters`**: the band under the toolbar, for a [TableFilters](/components/table-filters). A table with no filters leaves it out, and nothing else changes.
- **`SaTableRecord`**: the name of a record, linking to it, in the `primary` cell. Its `detail` is an identifier, from `sm:`.
- **`sorting`** and **`field`**: a column that orders the list, as [TableSort](/components/table-sort) shows.
- **`filteredLabel`**: says that a filter narrows a column, as [TableFilters](/components/table-filters) shows.
- **`SaTableActions`**: the cell holding what can be done to a row, one [Menu](/components/menu) drawn as its mark alone. The name of a record already leads to it, so no second control does. A row with nothing to do keeps the cell and leaves it empty.
- **Not for** labelled buttons in a row: they repeat down the column, and a phone has no corner to hold them. Put them in the row's menu.
- **`labelHidden`**: a value read without the column's name on a phone, such as a status.
- **`fit`**: a column that takes only the width its content needs, such as a status, a date or a row of actions. A column without it takes a share of what is left. That is the whole sizing model, and neither writes a width.
- **`truncate`**: a value cut with an ellipsis rather than wrapped, under a column taking a share of the width.
- **`primary`**: the one column identifying the record. Never a status.
- **`mono`**: an identifier, an address or a token.
- **`hiddenBelow`**: a secondary column dropped below `sm:` or `lg:`, on the header and the cell alike.
- **`fill`**: a table filling the height of its parent from `sm:`, whose rows scroll under a pinned header and above a pinned footer. **`autoPageSize`** then derives the rows per page from that height.
- **Below `sm:` a collection grows as it is scrolled**: a [TableEnd](/components/table-end) ends its `#rows`, and the `#footer` holds no [Pagination](/components/pagination).
- **Not for** the fields of one record: use the definition list on [RecordPage](/components/record-page).

## Look

- **Box**: one flat card at every width: `surface` with an `ink-200` border and `radius-lg`. Its parts are split by `ink-200` rules.
- **Toolbar**: `space-4` around it and `space-2` between its controls, `space-3` around it below `sm:`, where the search field takes the first line and the controls share the next in equal parts, cutting a label with an ellipsis where it does not fit. A control drawn as its mark alone stays square.
- **Header row**: `ink-50`, its names in `.sa-field-label`, 10px by `space-4`.
- **Cell**: 14px in `ink-900`, `space-3` by `space-4`, with rows split by `ink-200`.
- **The `primary` cell**: `panel-strong` in `ink-900`.
- **Record**: `primary` at 600, underlined, with a 14px chevron. Its `detail` is `panel-mono` in `ink-500`, under it and cut with an ellipsis.
- **Below `sm:`**: the rows stay in the card, split by the same rules. The `primary` cell takes the first line, and the other cells wrap under it, each 12px beside its `label` in `ink-500`. A `detail` is dropped.
- **The row's mark, below `sm:`**: in the top right corner of every row, centred on its first line, out of the row's flow. The row keeps `control-height` free on its right, so that its name and values lay out the same whether it has a mark or not, and the mark is in the same place in every row.
- **The row's mark, from `sm:`**: the last cell, as tall as the mark whether or not the row has one, so that rows stay one height.
- **Below `sm:` the card ends with its rows**, `fill` or not, and the page scrolls: a card stretched to the bottom of the screen would hold nothing but the space, with its foot pinned under it.
- **Footer**: `space-3` by `space-4`, `space-2` by `space-3` below `sm:`.

## Behavior

- **Hover**: a row is `ink-50`, from `sm:`.
- **Loading** (`loading`): a [LoadingState](/components/loading-state) in place of the rows. What sits around the rows stays.
- **Failed** (`error`): a `danger` [Alert](/components/alert) in place of the rows.
- **Empty** (`empty`): the `#empty` slot in place of the rows, centred.
- **Long values**: the table scrolls sideways inside its box, rather than the page.

## Content

- **An empty table is one sentence**, saying what is missing (see [Content](/foundations/content)).
- **A missing value is an [EmptyValue](/components/empty-value).**

## Accessibility

- **It is a real table**, so its header cells are read with each value (WCAG 1.3.1). Below `sm:` it is displayed as blocks, and the `label` of each cell is what names its value.
- **Pass `label` on every cell** but the one identifying the record, which names itself. The row's mark is named by its own label, as "Actions for ada@example.com". `labelHidden` keeps it for a screen reader alone.
- **`filteredLabel` says what the funnel says, to a screen reader** (WCAG 1.1.1). A column without a visible name, such as the actions, takes one a screen reader alone reads.
- **The record's link keeps to its line and its target reaches `control-height`** (see [Control height](/foundations/control-height)).

## API

The consumer provides the controls of the toolbar, the header cells, the rows, the sentence for an empty table and the words, since the component reads no message bundle. The rows and the empty sentence stay the consumer's, so that an app's own sort header can sit among the `SaTableHeader`s.

### SaTable

| Name              | Type                | Default  | Description                                                           |
| ----------------- | ------------------- | -------- | --------------------------------------------------------------------- |
| `loadingLabel`    | `string`            |          | Required. What is being waited for.                                   |
| `loading`         | `boolean`           | `false`  | Draws the wait in place of the table.                                 |
| `error`           | `string \| null`    | `null`   | Draws the failure in place of the table.                              |
| `empty`           | `boolean`           | `false`  | Draws `#empty` in place of the table.                                 |
| `tableLayout`     | `'fixed' \| 'auto'` | `'auto'` | The table's layout.                                                   |
| `fill`            | `boolean`           | `false`  | Fills the parent's height from `sm:`, with the rows scrolling inside. |
| `autoPageSize`    | `boolean`           | `false`  | Derives the rows per page from that height, from `sm:`.               |
| `minPageSize`     | `number`            | `1`      | The fewest rows it asks for.                                          |
| `@pageSizeChange` | event               |          | The number of rows that fit.                                          |
| `#toolbar`        | slot                |          | What narrows and re-reads the list, in a row that wraps.              |
| `#filters`        | slot                |          | A [TableFilters](/components/table-filters).                          |
| `#header`         | slot                |          | The header cells.                                                     |
| `#rows`           | slot                |          | The `tr` of each row, then a [TableEnd](/components/table-end).       |
| `#empty`          | slot                |          | The sentence for an empty table.                                      |
| `#footer`         | slot                |          | The foot of the card, usually a [Pagination](/components/pagination). |

### SaTableHeader

| Name            | Type           | Default     | Description                                |
| --------------- | -------------- | ----------- | ------------------------------------------ |
| `fit`           | `boolean`      | `false`     | Takes only the width it needs.             |
| `hiddenBelow`   | `'sm' \| 'lg'` | `undefined` | Dropped below this width.                  |
| `sorting`       | `SaSort`       | `undefined` | The order of the list.                     |
| `field`         | `string`       | `undefined` | The field this column shows.               |
| `filteredLabel` | `string`       | `undefined` | Says a filter narrows it, and marks it.    |
| `#default`      | slot           |             | The column's name.                         |
| `#help`         | slot           |             | What explains the column, beside its name. |

### SaTableCell

| Name          | Type           | Default     | Description                               |
| ------------- | -------------- | ----------- | ----------------------------------------- |
| `label`       | `string`       | `undefined` | The column's name, shown below `sm:`.     |
| `labelHidden` | `boolean`      | `false`     | Keeps `label` for a screen reader alone.  |
| `primary`     | `boolean`      | `false`     | The column identifying the record.        |
| `fit`         | `boolean`      | `false`     | Does not wrap, under a `fit` column.      |
| `truncate`    | `boolean`      | `false`     | Cut with an ellipsis rather than wrapped. |
| `mono`        | `boolean`      | `false`     | For a value read character by character.  |
| `hiddenBelow` | `'sm' \| 'lg'` | `undefined` | Dropped below this width.                 |
| `#default`    | slot           |             | The value.                                |

### SaTableActions

| Name       | Type | Default | Description                                                   |
| ---------- | ---- | ------- | ------------------------------------------------------------- |
| `#default` | slot |         | The row's [Menu](/components/menu), or nothing for no action. |

### SaTableRecord

| Name     | Type                      | Default     | Description                                                        |
| -------- | ------------------------- | ----------- | ------------------------------------------------------------------ |
| `name`   | `string`                  |             | Required. What the record is called.                               |
| `link`   | `Record<string, unknown>` |             | Required. Given to the link, as `{ href }` or a router's `{ to }`. |
| `detail` | `string`                  | `undefined` | An identifier under the name, from `sm:`.                          |
| `linkAs` | `string \| Component`     | `'a'`       | What draws the link, such as a router's link.                      |

`useSaAutoPageSize` is exported as well, for a list that is not a table. It measures nothing below `sm:`, where the caller asks for pages of a size of its own.

## Related

- [TableFilters](/components/table-filters): what narrows it.
- [TableSort](/components/table-sort): what orders it.
- [Field](/components/field): the search field of its toolbar.
- [Menu](/components/menu): what a row's actions usually are.
- [Pagination](/components/pagination): what sits in its footer, from `sm:`.
- [TableEnd](/components/table-end): what ends its rows below `sm:`.
- [LoadingState](/components/loading-state) and [Alert](/components/alert): what replaces it.
- [Tag](/components/tag) and [EmptyValue](/components/empty-value): what its cells often hold.
- [Layout](/foundations/layout): the widths it changes at.
