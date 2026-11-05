# TableSort

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaTableSort</code> and <code>useSaSort</code></p>

What orders a [Table](/components/table): a column pressed from `sm:`, and a control in the toolbar on a phone, whose header row is not drawn.

<script setup>
import { computed } from 'vue'
import { useSaSort } from '../../src/index'
import { SearchIcon } from '../.vitepress/theme/demo-icons'
const users = [
  { email: 'ada@example.com', status: 'Enabled', color: 'green', created: '2026-11-01' },
  { email: 'grace@example.com', status: 'Enabled', color: 'green', created: '2026-10-14' },
  { email: 'katherine.johnson@example.com', status: 'Invited', color: 'yellow', created: '2026-10-03' },
  { email: 'alan@example.com', status: 'Disabled', color: 'red', created: '2026-08-20' }
]
const labels = { sort: 'Sort', search: 'Search orders', noMatch: 'Nothing matches', ascending: 'ascending', descending: 'descending' }
const sort = useSaSort({
  fields: () => [{ field: 'email', name: 'Email' }, { field: 'created', name: 'Created' }],
  defaultKeys: () => [{ field: 'created', descending: true }]
})
// What a server answers in an app, answered here so that the demo orders its rows.
const rows = computed(() => {
  const [key] = sort.keys
  return [...users].sort((a, b) => a[key.field].localeCompare(b[key.field]) * (key.descending ? -1 : 1))
})
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="mode in ['phone', 'tablet', 'desktop']" :key="mode" :mode="mode">
    <SaTable loading-label="Loading users.">
      <template #toolbar>
        <SaInput class="min-w-0 flex-1 basis-60" :icon="SearchIcon" placeholder="Search by email" aria-label="Search users" />
        <SaTableSort :sort="sort" :labels="labels" />
      </template>
      <template #header>
        <SaTableHeader :sorting="sort" field="email">User</SaTableHeader>
        <SaTableHeader fit>Status</SaTableHeader>
        <SaTableHeader fit :sorting="sort" field="created">Created</SaTableHeader>
      </template>
      <template #rows>
        <tr v-for="user in rows" :key="user.email">
          <SaTableCell primary>{{ user.email }}</SaTableCell>
          <SaTableCell label="Status" label-hidden fit><SaTag :color="user.color">{{ user.status }}</SaTag></SaTableCell>
          <SaTableCell label="Created" fit>{{ user.created }}</SaTableCell>
        </tr>
      </template>
    </SaTable>
  </DemoFrame>
</div></div>

## Usage

- **A list a person reads in more than one order**, where the fields it orders on may be the deployment's.
- **`useSaSort`**: what plugs a list into its order. Whoever holds the records holds one, says which fields it orders on, and asks again on `onChange` with what `asked` holds. What a request looks like stays theirs.
- **`sorting`** and **`field`** on a [Table](/components/table)'s header: the column orders the list where the list orders on that field, and otherwise draws as any other. A column the list arrived ordered on says so either way.
- **`SaTableSort`** in the table's `#toolbar`: the same order on a phone. It draws nothing from `sm:`, so give the toolbar something else to hold there, or leave the toolbar out from `sm:`.
- **`defaultKeys`**: the order the list takes on its own, so that its column says so before anything is pressed.
- **Not for** a list in one order, or one too short to need another: a plain [Table](/components/table) says nothing about order.

## Look

- **Header**: a column that orders the list makes the header row `control-height` tall and carries a 12px mark for what pressing it does, which the canvas leaves out, since a control has to be findable.
- **The column setting the order**: `ink-700` with a 12px arrow.
- **Control**: a secondary [Button](/components/button) holding the field's name and a 16px arrow, as a header writes them. The name is cut with an ellipsis where the controls beside it leave too little room, and the arrow stays.
- **List**: a [Listbox](/components/listbox) of each field twice, its name and a 12px arrow, up and down.

## Behavior

- **Hover**: a column that orders the list is `ink-100`.
- **Focus**: the column's button takes the outline of [Focus, states and motion](/foundations/focus).
- **Pressing a column**: orders the list on it, ascending, then descending, then back to the list's own order. The whole cell is the target.
- **Choosing an order on a phone**: the list closes and the control shows the new arrow and field. Choosing the current one goes back to the list's own, as the third press does.
- **`onChange`**: called only where the order moved. Going back to the list's own order while it is already in it asks nothing.
- **A field no longer published**: its column draws as any other, and the control stops offering it.

## Content

- **An order is a field's `name` and an arrow, in every mode**, so that an app chooses no words for it (see [Content](/foundations/content)).
- **`sort` is said only where the list is in no order the control can name**, as "Sort".

## Accessibility

- **A column that orders the list holds a real button, so it reaches the keyboard, and the cell takes `aria-sort`** (WCAG 2.1.1, 4.1.2).
- **An arrow says nothing to a screen reader, so `ascending` and `descending` say it**: in the control's name, which starts with what it shows (WCAG 2.5.3), and in each choice of the list. The list is named by `labels.sort`, and the primitive holds the popover's focus and its Escape. Closing it returns the focus to the control.

## API

The consumer provides the fields, the words and the toolbar around the control, since the component reads no message bundle, and turns what `asked` holds into its own request.

### SaTableSort

| Name     | Type           | Default | Description                                                               |
| -------- | -------------- | ------- | ------------------------------------------------------------------------- |
| `sort`   | `SaSort`       |         | Required. What `useSaSort` holds.                                         |
| `labels` | `SaSortLabels` |         | Required. Its words, with `ascending` and `descending` saying the arrows. |

### useSaSort

`useSaSort(options)` answers a `SaSort`, the same one handed to the headers and the picker.

| Option        | Type                  | Description                                                  |
| ------------- | --------------------- | ------------------------------------------------------------ |
| `fields`      | `() => SaSortField[]` | Required. What it orders on, each a `field` and a `name`.    |
| `defaultKeys` | `() => SaSortKey[]`   | The order the list takes on its own, so a column can say so. |
| `onChange`    | `() => void`          | The order moved: read the list again.                        |
| `initial`     | `SaSortKey[]`         | The order it starts with.                                    |

| Member        | Type                          | Description                                         |
| ------------- | ----------------------------- | --------------------------------------------------- |
| `fields`      | `SaSortField[]`               | What it orders on.                                  |
| `asked`       | `SaSortKey[]`                 | What a person asked for: build a request from this. |
| `keys`        | `SaSortKey[]`                 | The order the list reads in.                        |
| `sortsOn`     | `(field) => boolean`          | Whether it orders on a field.                       |
| `directionOf` | `(field) => direction`        | How a field is read, if at all.                     |
| `toggle`      | `(field) => void`             | Ascending, then descending, then its own order.     |
| `set`         | `(field, descending) => void` | Orders on a field in a direction.                   |
| `clear`       | `() => void`                  | Goes back to its own order.                         |

## Related

- [Table](/components/table): what it orders, and the header and slot it goes in.
- [TableFilters](/components/table-filters): what narrows the same list.
- [Listbox](/components/listbox): the list of orders on a phone.
- [Control height](/foundations/control-height): the height of a column that orders.
