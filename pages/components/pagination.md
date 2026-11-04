# Pagination

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonPagination</code></p>

Which page of a list is on screen, and the way to the others.

<script setup>
import { ref } from 'vue'
const page = ref(4)
const pageLabel = (p, total) => `Page ${p} of ${total}`
const rangeLabel = ({ from, to, total }) => `Showing ${from}-${to} of ${total}`
</script>

<div class="demo"><div class="flex flex-col gap-4">
  <CommonPagination :page="page" :total-pages="10" :size="20" :total="200" label="Pages of users" previous-label="Previous" next-label="Next" :page-label="pageLabel" :range-label="rangeLabel" @page-change="page = $event" />
  <CommonPagination :page="0" :total-pages="1" :size="20" :total="3" label="Pages of clients" previous-label="Previous" next-label="Next" :page-label="pageLabel" :range-label="rangeLabel" always-shown />
</div></div>

## Usage

- **Under a list the server hands out page by page**, usually in the `#footer` of a [Table](/components/table).
- **`alwaysShown`**: kept on screen for a single page, where hiding it would give the rows more room and change how many fit.
- **Not for** moving through a process with steps: use [Button](/components/button).

## Look

- **Step**: `.control`, so `control-height` square at least, with `surface` and 14px `ink-700` text.
- **Current page**: `primary` with `on-primary` digits, and no border.
- **Range**: 14px in `ink-500`, on the left from `sm:`, with the pager on the right.
- **Below `sm:`**: no page numbers and no range. The pager is centred, and the page indicator sits between its two arrows.
- **Previous and next**: arrows alone until `lg:`, then with their words. Seven steps and the range take all of the width at `sm:`.

## Behavior

- **Hover**: `ink-50`.
- **Focus**: the one focus ring through `.control-focus`.
- **Disabled**: the arrow with nowhere to go, at half opacity with a `not-allowed` cursor.
- **Several pages**: the first and last pages stay, with one page either side of the current one and an ellipsis for the rest.
- **One page**: it draws nothing, unless `alwaysShown`.

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
| `alwaysShown`   | `boolean`                         | `false`     | Kept on screen for a single page.                  |
| `@pageChange`   | event                             |             | The page asked for, counted from 0.                |

## Related

- [Table](/components/table): what it sits under.
- [Control height](/foundations/control-height): the height of a step.
