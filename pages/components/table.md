# Table

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaTable</code>, <code>SaTableHeader</code> and <code>SaTableCell</code></p>

Any table of records: a header row, rows of cells, and what it shows instead while it waits, fails or holds nothing.

<script setup>
import { ref } from 'vue'
const users = [
  { name: 'Ada Lovelace', email: 'ada@example.com', id: 'c3f1e0a2-7b4d-4e8a', status: 'Active', color: 'green' },
  { name: 'Alan Turing', email: 'alan@example.com', id: '8d21b6f4-1c9e-4a07', status: 'Revoked', color: 'red' },
  { name: 'Grace Hopper', email: 'grace@example.com', id: '5e7a90c3-2f6b-4d18', status: 'Pending', color: 'yellow' }
]
const page = ref(0)
const fits = ref(1)
const many = Array.from({ length: 40 }, (_, i) => ({ id: `client-${i + 1}`, name: `Client ${i + 1}` }))
const pageLabel = (p, total) => `Page ${p} of ${total}`
const rangeLabel = ({ from, to, total }) => `Showing ${from}-${to} of ${total}`
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="mode in ['phone', 'tablet', 'desktop']" :key="mode" :mode="mode">
    <SaTable loading-label="Loading users.">
      <template #header>
        <SaTableHeader>Name</SaTableHeader>
        <SaTableHeader hidden-below="lg">Email</SaTableHeader>
        <SaTableHeader hidden-below="sm">Identifier</SaTableHeader>
        <SaTableHeader fit>Status</SaTableHeader>
      </template>
      <template #rows>
        <tr v-for="user in users" :key="user.id">
          <SaTableCell primary>{{ user.name }}</SaTableCell>
          <SaTableCell label="Email" hidden-below="lg" truncate>{{ user.email }}</SaTableCell>
          <SaTableCell label="Identifier" hidden-below="sm" mono fit>{{ user.id }}</SaTableCell>
          <SaTableCell label="Status" fit><SaTag :color="user.color">{{ user.status }}</SaTag></SaTableCell>
        </tr>
      </template>
      <template #footer>
        <SaPagination :page="page" :total-pages="3" :size="3" :total="9" label="Pages of users" previous-label="Previous" next-label="Next" :page-label="pageLabel" :range-label="rangeLabel" @page-change="page = $event" />
      </template>
    </SaTable>
  </DemoFrame>
</div></div>

<div class="demo vp-raw"><div class="flex flex-col gap-6">
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
- **`fit`**: a column that takes only the width its content needs, such as a status, a date or a row of actions. A column without it takes a share of what is left. That is the whole sizing model, and neither writes a width.
- **`truncate`**: a value cut with an ellipsis rather than wrapped, under a column taking a share of the width.
- **`primary`**: the one column identifying the record. Never a status.
- **`mono`**: an identifier, an address or a token.
- **`hiddenBelow`**: a secondary column dropped below `sm:` or `lg:`, on the header and the cell alike.
- **`fill`**: a table filling the height of its parent, whose rows scroll under a pinned header and above a pinned footer. **`autoPageSize`** then derives the rows per page from that height.
- **Not for** the fields of one record: use the definition list on [RecordPage](/components/record-page).

## Look

- **Box**: `surface` with an `ink-200` border and `radius-lg`, from `sm:`.
- **Header row**: `ink-50`, its names in `.sa-field-label`, 12px by 24px.
- **Cell**: 14px in `ink-500`, 16px by 24px, with rows split by `ink-200`.
- **The `primary` cell**: `panel-strong` in `ink-900`.
- **Below `sm:`**: every row is its own card on `ground`, and each cell is a line of it under the `.sa-field-label` its `label` gives.
- **Footer**: `space-4` under the table.

## Behavior

- **Hover**: a row is `ink-50`, from `sm:`.
- **Loading** (`loading`): a [LoadingState](/components/loading-state) in place of the table.
- **Failed** (`error`): a `danger` [Alert](/components/alert) in place of the table.
- **Empty** (`empty`): the `#empty` slot in place of the table, centred under `fill`.
- **Long values**: the table scrolls sideways inside its box, rather than the page.

## Content

- **An empty table is one sentence**, saying what is missing (see [Content](/foundations/content)).
- **A missing value is an [EmptyValue](/components/empty-value).**

## Accessibility

- **It is a real table**, so its header cells are read with each value (WCAG 1.3.1). Below `sm:` it is displayed as blocks, and the `label` of each cell is what names its value.
- **Pass `label` on every cell** but the one identifying the record and the one holding the row's actions, which name themselves.

## API

The consumer provides the header cells, the rows, the sentence for an empty table and the words, since the component reads no message bundle. The rows and the empty sentence stay the consumer's, so that an app's own sort header can sit among the `SaTableHeader`s.

### SaTable

| Name              | Type                | Default  | Description                                                         |
| ----------------- | ------------------- | -------- | ------------------------------------------------------------------- |
| `loadingLabel`    | `string`            |          | Required. What is being waited for.                                 |
| `loading`         | `boolean`           | `false`  | Draws the wait in place of the table.                               |
| `error`           | `string \| null`    | `null`   | Draws the failure in place of the table.                            |
| `empty`           | `boolean`           | `false`  | Draws `#empty` in place of the table.                               |
| `tableLayout`     | `'fixed' \| 'auto'` | `'auto'` | The table's layout.                                                 |
| `fill`            | `boolean`           | `false`  | Fills the parent's height, with the rows scrolling inside.          |
| `autoPageSize`    | `boolean`           | `false`  | Derives the rows per page from that height.                         |
| `minPageSize`     | `number`            | `1`      | The fewest rows it asks for.                                        |
| `@pageSizeChange` | event               |          | The number of rows that fit.                                        |
| `#header`         | slot                |          | The header cells.                                                   |
| `#rows`           | slot                |          | The `tr` of each row.                                               |
| `#empty`          | slot                |          | The sentence for an empty table.                                    |
| `#footer`         | slot                |          | What sits under it, usually a [Pagination](/components/pagination). |

### SaTableHeader

| Name          | Type           | Default     | Description                    |
| ------------- | -------------- | ----------- | ------------------------------ |
| `fit`         | `boolean`      | `false`     | Takes only the width it needs. |
| `hiddenBelow` | `'sm' \| 'lg'` | `undefined` | Dropped below this width.      |
| `#default`    | slot           |             | The column's name.             |

### SaTableCell

| Name          | Type           | Default     | Description                                      |
| ------------- | -------------- | ----------- | ------------------------------------------------ |
| `label`       | `string`       | `undefined` | The column's name, shown once the row is a card. |
| `primary`     | `boolean`      | `false`     | The column identifying the record.               |
| `fit`         | `boolean`      | `false`     | Does not wrap, under a `fit` column.             |
| `truncate`    | `boolean`      | `false`     | Cut with an ellipsis rather than wrapped.        |
| `mono`        | `boolean`      | `false`     | For a value read character by character.         |
| `hiddenBelow` | `'sm' \| 'lg'` | `undefined` | Dropped below this width.                        |
| `#default`    | slot           |             | The value.                                       |

`useSaAutoPageSize` is exported as well, for a list that is not a table.

## Related

- [Pagination](/components/pagination): what sits in its footer.
- [LoadingState](/components/loading-state) and [Alert](/components/alert): what replaces it.
- [Tag](/components/tag) and [EmptyValue](/components/empty-value): what its cells often hold.
- [Layout](/foundations/layout): the widths it changes at.
