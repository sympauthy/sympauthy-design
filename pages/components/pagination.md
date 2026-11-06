# Pagination

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaPagination</code></p>

Which page of a list is on screen, and the way to the others.

<script setup>
import { ref } from 'vue'
const page = ref(4)
const pageLabel = (p, total) => `Page ${p} of ${total}`
const rangeLabel = ({ from, to, total }) => `Showing ${from}-${to} of ${total}`
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="mode in ['phone', 'tablet', 'desktop']" :key="mode" :mode="mode">
    <div class="flex flex-col gap-4">
    <SaPagination :page="page" :total-pages="10" :size="20" :total="200" label="Pages of users" previous-label="Previous" next-label="Next" :page-label="pageLabel" :range-label="rangeLabel" @page-change="page = $event" />
    <SaPagination :page="0" :total-pages="1" :size="20" :total="3" label="Pages of clients" previous-label="Previous" next-label="Next" :page-label="pageLabel" :range-label="rangeLabel" />
    </div>
  </DemoFrame>
</div></div>

## Usage

- **Under a list the server hands out page by page**, usually in the `#footer` of a [Table](/components/table), which draws its rule and its padding.
- **Not for** a collection below `sm:`: it grows as it is scrolled, through [TableEnd](/components/table-end), since a pager makes a phone hop from page to page. The pager's own phone layout stays for a list that cannot grow.
- **Not for** moving through a process with steps: use [Button](/components/button).

## Look

- **Step**: `.sa-control`, so `control-height` square at least, with `surface` and `panel-strong` `ink-700` text, `space-2` apart.
- **Current page**: `primary` with `on-primary` digits, and no border.
- **Range**: 14px in `ink-500`, on the left from `sm:`, with the pager on the right. On one page it is there at every width, alone.
- **Bar**: `control-height` at least, with its steps or without, so that the foot holding it keeps its height.
- **Below `sm:`**: no page numbers and no range. The two arrows take the ends of the row, and the page indicator sits between them.
- **Previous and next**: arrows alone until `lg:`, then with their words. Seven steps and the range take all of the width at `sm:`.

## Behavior

- **Hover**: `ink-50`.
- **Focus**: the one focus ring through `.sa-control-focus`.
- **Disabled**: the arrow with nowhere to go, at half opacity with a `not-allowed` cursor.
- **Several pages**: the first and last pages stay, with one page either side of the current one and an ellipsis for the rest.
- **One page**: the range alone, with no step. A disabled pair of arrows around a lone page says nothing the range does not, and the bar keeps its height, so a filter taking a list down to one page moves nothing but the steps, and a table's `autoPageSize` is not handed a different height.

## Content

- **`pageLabel` says which page of how many**, as "Page 2 of 10". **`rangeLabel` says which rows**, as "Showing 1-20 of 200" (see [Content](/foundations/content)).

## Accessibility

- **`label` names the pager, and every step has a name**: `previousLabel`, `nextLabel`, and `pageLabel` for each number (WCAG 4.1.2).
- **The current page takes `aria-current="page"`**, set by the primitive.

## API

The consumer provides the page, what it counts, and the words, since the component reads no message bundle.

| Name            | Type                              | Default     | Description                                        |
| --------------- | --------------------------------- | ----------- | -------------------------------------------------- |
| `page`          | `number`                          |             | Required. The current page, counted from 0.        |
| `totalPages`    | `number`                          |             | Required.                                          |
| `label`         | `string`                          |             | Required. Names the pager.                         |
| `previousLabel` | `string`                          |             | Required.                                          |
| `nextLabel`     | `string`                          |             | Required.                                          |
| `pageLabel`     | `(page, totalPages) => string`    |             | Required. Says which page a step leads to.         |
| `size`          | `number`                          | `0`         | The rows on a page, which with `total` is a range. |
| `total`         | `number`                          | `0`         | The rows in the list.                              |
| `rangeLabel`    | `({ from, to, total }) => string` | `undefined` | Says which rows are on screen.                     |
| `@pageChange`   | event                             |             | The page asked for, counted from 0.                |

## Related

- [Table](/components/table): what it sits under.
- [TableEnd](/components/table-end): what takes its place on a phone.
- [Control height](/foundations/control-height): the height of a step.
