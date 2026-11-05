# TableFilters

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaTableFilters</code>, <code>SaTableFilterPicker</code> and <code>useSaFilters</code></p>

What narrows a [Table](/components/table): the control adding a filter, the band reading each one as a sentence, and the popover choosing its condition and value.

<script setup>
import { computed, reactive } from 'vue'
import { useSaFilters, useSaSort } from '../../src/index'
import { ArrowPathIcon, EllipsisHorizontalIcon, SearchIcon } from '../.vitepress/theme/demo-icons'
const users = [
  { email: 'ada@example.com', id: 'c3f1e0a2-7b4d-4e8a-9d21-5e7a90c32f6b', status: 'enabled', signIn: '02/11/2026 13:33', created: '2026-11-01', nickname: 'Ada' },
  { email: 'grace@example.com', id: '8d21b6f4-1c9e-4a07-b3e2-4c1d7a60e8f5', status: 'enabled', signIn: '28/10/2026 09:12', created: '2026-10-14', nickname: null },
  { email: 'katherine.johnson@example.com', id: '5e7a90c3-2f6b-4d18-8a51-f1395eeb4307', status: 'enabled', signIn: null, created: '2026-10-03', nickname: null },
  { email: 'alan@example.com', id: '2b9c4e17-6a03-4f5d-a7c8-90d1e3f6b254', status: 'disabled', signIn: '12/09/2026 17:45', created: '2026-08-20', nickname: 'Alan' },
  { email: 'edsger@example.com', id: '71d3a8f0-5c2e-4b96-8e14-3fa6c07d92e1', status: 'invited', signIn: null, created: '2026-07-02', nickname: null }
]
const statusColor = { enabled: 'green', disabled: 'red', invited: 'yellow' }
const statusName = { enabled: 'Enabled', disabled: 'Disabled', invited: 'Invited' }
const fields = [
  { field: 'status', name: 'Status', type: 'enum', operators: ['eq', 'ne', 'in'], values: Object.entries(statusName).map(([value, name]) => ({ value, name })) },
  { field: 'email', name: 'Email', type: 'email', operators: ['contains', 'starts_with', 'eq', 'in'] },
  { field: 'created', name: 'Created', type: 'date', operators: ['gte', 'lte'] },
  { field: 'nickname', name: 'Nickname', type: 'string', operators: ['is_null'] }
]
// What a server answers in an app, answered here so that the demo narrows its rows.
const answers = {
  eq: (held, c) => held === c.value,
  ne: (held, c) => held !== c.value,
  in: (held, c) => c.values.includes(held),
  contains: (held, c) => (held ?? '').includes(c.value),
  starts_with: (held, c) => (held ?? '').startsWith(c.value),
  gte: (held, c) => held >= c.value,
  lte: (held, c) => held <= c.value,
  is_null: (held) => held == null
}
const operatorNames = { eq: 'is', ne: 'is not', in: 'is one of', contains: 'contains', starts_with: 'starts with', gte: 'is at least', lte: 'is at most', is_null: 'is empty' }
const dateNames = { gte: 'is on or after', lte: 'is on or before' }
const labels = {
  list: 'Active filters',
  clear: 'Clear filters',
  add: 'Add filter',
  searchFields: 'Search fields',
  searchValues: 'Search values',
  noMatch: 'Nothing matches',
  operator: 'Condition',
  value: 'Value',
  selectValue: 'Choose…',
  addValue: 'Add a value',
  removeValue: 'Remove',
  yes: 'Yes',
  no: 'No',
  removeFilter: (name) => `Remove the ${name} filter`,
  operatorName: (operator, type) => (type === 'date' ? dateNames[operator] : null) ?? operatorNames[operator]
}
const sortLabels = { sort: 'Sort', search: 'Search orders', noMatch: 'Nothing matches', ascending: 'ascending', descending: 'descending' }
const sortFields = [{ field: 'email', name: 'Email' }, { field: 'created', name: 'Created' }]
const defaultKeys = () => [{ field: 'created', descending: true }]
const inOrder = (rows, keys) => {
  const [key] = keys
  return key ? [...rows].sort((a, b) => a[key.field].localeCompare(b[key.field]) * (key.descending ? -1 : 1)) : rows
}
const PAGE_SIZE = 3
// One list per frame, each holding its own filters: a filter just added opens its popover and takes
// the focus, which only one frame can do.
const lists = ['phone', 'tablet', 'desktop'].map((mode) => {
  const list = reactive({ mode, page: 0 })
  list.filters = useSaFilters({
    fields: () => fields,
    initial: [{ field: 'status', operator: 'eq', value: 'enabled' }],
    onChange: () => { list.page = 0 }
  })
  list.matching = computed(() => users.filter((user) => list.filters.complete.every((c) => answers[c.operator](user[c.field], c))))
  list.sort = useSaSort({ fields: () => sortFields, defaultKeys, onChange: () => { list.page = 0 } })
  list.rows = computed(() => inOrder(list.matching, list.sort.keys).slice(list.page * PAGE_SIZE, (list.page + 1) * PAGE_SIZE))
  list.pages = computed(() => Math.max(1, Math.ceil(list.matching.length / PAGE_SIZE)))
  return list
})
const pageLabel = (p, total) => `Page ${p} of ${total}`
const rangeLabel = ({ from, to, total }) => `Showing ${from}-${to} of ${total}`
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="list in lists" :key="list.mode" :mode="list.mode">
    <SaTable loading-label="Loading users." :empty="list.matching.length === 0">
      <template #toolbar>
        <SaInput class="min-w-0 flex-1 basis-60" :icon="SearchIcon" placeholder="Search by email or user ID" aria-label="Search users" />
        <SaTableFilterPicker :filters="list.filters" :labels="labels" />
        <SaTableSort :sort="list.sort" :labels="sortLabels" />
        <SaButton variant="secondary" label="Refresh" :icon="ArrowPathIcon" icon-only />
      </template>
      <template #filters>
        <SaTableFilters :filters="list.filters" :labels="labels">
          <template #summary><strong class="font-semibold text-gray-900">{{ list.matching.length }} of {{ users.length }} users</strong> match</template>
        </SaTableFilters>
      </template>
      <template #header>
        <SaTableHeader :sorting="list.sort" field="email">User</SaTableHeader>
        <SaTableHeader fit :filtered-label="list.filters.isFiltered('status') ? 'Filtered' : undefined">Status</SaTableHeader>
        <SaTableHeader fit>Last sign-in</SaTableHeader>
        <SaTableHeader fit :sorting="list.sort" field="created" :filtered-label="list.filters.isFiltered('created') ? 'Filtered' : undefined">Created</SaTableHeader>
        <SaTableHeader fit><span class="sr-only">Actions</span></SaTableHeader>
      </template>
      <template #rows>
        <tr v-for="user in list.rows" :key="user.id">
          <SaTableCell primary><SaTableRecord :name="user.email" :detail="user.id" :link="{ href: '#' }" /></SaTableCell>
          <SaTableCell label="Status" label-hidden fit><SaTag :color="statusColor[user.status]">{{ statusName[user.status] }}</SaTag></SaTableCell>
          <SaTableCell label="Last sign-in" fit><SaEmptyValue v-if="!user.signIn" /><template v-else>{{ user.signIn }}</template></SaTableCell>
          <SaTableCell label="Created" fit>{{ user.created }}</SaTableCell>
          <SaTableCell actions><SaButton variant="secondary" :label="`Actions for ${user.email}`" :icon="EllipsisHorizontalIcon" icon-only /></SaTableCell>
        </tr>
      </template>
      <template #empty><p class="text-sm text-gray-500">No user matches these filters.</p></template>
      <template #footer>
        <SaPagination always-shown :page="list.page" :total-pages="list.pages" :size="PAGE_SIZE" :total="list.matching.length" label="Pages of users" previous-label="Previous" next-label="Next" :page-label="pageLabel" :range-label="rangeLabel" @page-change="list.page = $event" />
      </template>
    </SaTable>
  </DemoFrame>
</div></div>

## Usage

- **A list whose records can be narrowed by their fields**, where the fields may be the deployment's, such as one per claim.
- **`useSaFilters`**: what plugs a list into its filters. Whoever holds the records holds one, says which fields exist, and asks again on `onChange` with what `complete` holds. What a request looks like stays theirs.
- **`SaTableFilterPicker`** in the table's `#toolbar`: adds a filter, from the fields searched rather than read down. A field is offered again once filtered, since two filters over one field is how a range is asked for.
- **`SaTableFilters`** in the table's `#filters`: draws each filter, with the popover choosing its condition and value. It draws nothing while none is applied.
- **`filteredLabel`** on a [Table](/components/table)'s header: marks the column a filter narrows, read from `isFiltered`.
- **`initial`**: a filter the list starts with, such as one a link asked for.
- **Not for** a free text search: that is a field in the table's `#toolbar`.

## Look

- **Band**: `ink-50`, 10px by `space-4`, with the filters first and the summary in 14px `ink-700`. Below `sm:` the filters take their own line, over the summary and the clearing link.
- **Filter**: a `.sa-control` in `primary-subtle` with a `primary` border, reading as a sentence. The field is `ink-700`, the operator and the value `panel-strong` in `on-primary-subtle`, and the control removing it sits behind a rule of `primary` at a quarter. A value still missing is `ink-700` at regular weight.
- **Picker**: a secondary [Button](/components/button) with a plus, over a [Listbox](/components/listbox) of the fields.
- **Popover**: a [Popover](/components/popover)'s surface, `space-3` inside, holding the condition as a [Field](/components/field)'s select over the value.
- **Value**: a [Listbox](/components/listbox) where the field's set is closed, several chosen under `in`. A [TagsInput](/components/tags-input) under `in` where it is open. Otherwise an input of the field's type. Nothing under `is_null`.

## Behavior

- **Hover**: a filter's two parts each take `primary` at a tenth.
- **Focus**: a filter's box takes the one focus ring through `.sa-control-focus-within`, and the part holding the focus takes `primary` at a tenth.
- **Adding a filter**: the field list closes, and the new filter opens with the focus on its value. A field's condition opens on the one its type is most often asked by.
- **Pressing a filter**: opens its popover under it, with the focus on the value. Removing one is a second control, so it stays one press.
- **Enter in a value**: closes the popover. Neither list reads Enter that way, one adding a value with it and the other picking one, and an input method confirming a candidate is not a person pressing it.
- **Changing the condition**: clears the value, since `in` holds a list where the others hold one.
- **Closing a filter with no value**: drops it. It narrows nothing, and it would read as a sentence stopping halfway. What was typed into a list of values and not yet entered counts as entered.
- **`onChange`**: called only where the answer moved. Trying two conditions before writing a value asks nothing, and adding a filter with no value asks nothing.
- **Empty**: with no field to offer, the picker draws nothing. With no filter applied, neither does the band.
- **A field no longer published**: its filter leaves the band, and a field the package has no control for is dropped by `saFilterKnownFields` while the rest stay.

## Content

- **A filter reads as a sentence**: the field's `name`, `operatorName`, then the value under the name its field gave it, as "Status is Enabled". `selectValue` stands in until there is one.
- **`operatorName` reads for the type**: "is on or after" over a date, not "is at least".
- **The summary says how many records are left**, as "3 of 9 users match" (see [Content](/foundations/content)).

## Accessibility

- **The filters are a list named by `labels.list`**, and each control in one has a name: its sentence, and `labels.removeFilter` (WCAG 4.1.2).
- **A summary is a `status`**, so that the new count is announced (WCAG 4.1.3).
- **The primitive holds the popover's focus and its Escape**, and closing it returns the focus to its filter. A list of values is named by the field's `name`, which `SaField`'s label cannot point at.

## API

The consumer provides the fields, the words and the summary, since the component reads no message bundle, and turns what `complete` holds into its own request.

### SaTableFilters

| Name       | Type             | Default | Description                          |
| ---------- | ---------------- | ------- | ------------------------------------ |
| `filters`  | `SaFilters`      |         | Required. What `useSaFilters` holds. |
| `labels`   | `SaFilterLabels` |         | Required. Its words.                 |
| `#summary` | slot             |         | How many records are left.           |

### SaTableFilterPicker

| Name      | Type             | Default | Description                          |
| --------- | ---------------- | ------- | ------------------------------------ |
| `filters` | `SaFilters`      |         | Required. What `useSaFilters` holds. |
| `labels`  | `SaFilterLabels` |         | Required. Its words.                 |

### useSaFilters

`useSaFilters(options)` answers a `SaFilters`, the same one handed to both components.

| Option     | Type                    | Description                                           |
| ---------- | ----------------------- | ----------------------------------------------------- |
| `fields`   | `() => SaFilterField[]` | Required. What can be filtered on, read when needed.  |
| `onChange` | `() => void`            | The answer moved: read the list again.                |
| `initial`  | `SaFilterStart[]`       | Filters it starts with, such as one a link asked for. |

| Member       | Type                  | Description                                                |
| ------------ | --------------------- | ---------------------------------------------------------- |
| `fields`     | `SaFilterField[]`     | What can be filtered on.                                   |
| `criteria`   | `SaFilterCriterion[]` | Every filter, including one waiting for a value.           |
| `complete`   | `SaFilterCriterion[]` | The ones that narrow anything: build a request from these. |
| `added`      | `number \| null`      | The filter last added, which opens on its value.           |
| `add`        | `(field) => id`       | Adds a filter over a field.                                |
| `update`     | `(id, patch) => void` | Changes one.                                               |
| `remove`     | `(id) => void`        | Removes one.                                               |
| `clear`      | `() => void`          | Removes them all.                                          |
| `isFiltered` | `(field) => boolean`  | Whether a filter narrows a field, for `filteredLabel`.     |

### What a filter is made of

- **`SaFilterField`**: a `field`, its `name`, a `SaFilterType`, the `SaFilterOperator`s it admits, and its `values` where the set is closed.
- **`SaFilterCriterion`**: an `id`, a `field`, an `operator`, a `value`, and `values` under `in`.
- **`SaFilterLabels`**: every word, once, with `operatorName` answering what an operator reads over a type.
- **`saFilterKnownFields`**: the fields of an untyped description that can be drawn, for a source that may be newer than the package.
- **`saFilterIsComplete`, `saFilterIsValueless`, `saFilterIsMultiValued`, `saFilterDefaultOperator` and `saFilterValues`**: the rules the components follow, for a source writing its request.
- **`SA_FILTER_OPERATORS` and `SA_FILTER_TYPES`**: the two closed sets.

## Related

- [Table](/components/table): what it narrows, and the slots it goes in.
- [Listbox](/components/listbox) and [TagsInput](/components/tags-input): what a filter's value is chosen or entered with.
- [Field](/components/field): the condition of a filter's popover.
- [Popover](/components/popover): the surface it opens on.
- [TableSort](/components/table-sort): what orders the same list.
