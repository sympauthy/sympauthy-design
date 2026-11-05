<script lang="ts" setup>
import { computed } from 'vue'
import { ArrowDownIcon, ArrowsUpDownIcon, ArrowUpIcon, FunnelIcon } from '@heroicons/vue/20/solid'
import type { SaSort } from './useSaSort'

/**
 * One column of a table, header side. It owns the padding and the label's text style, so a column
 * the list cannot order on is drawn exactly like one it can.
 *
 * Width is the whole sizing model: a column is either shrink-wrapped around what it holds ([fit])
 * or takes a share of what is left. Neither the header nor the cell writes a width.
 */
const props = withDefaults(
  defineProps<{
    /** Takes only the width its content needs — a status, a date, a row of actions. */
    fit?: boolean
    /** Dropped below this width, for a column a narrower screen can do without. */
    hiddenBelow?: 'sm' | 'lg'
    /** The order of the list. With [field], the column orders it where the list orders on that. */
    sorting?: SaSort
    /** The field this column shows, which [sorting] is asked about. */
    field?: string
    /** Says that a filter narrows this column, as "Filtered", and marks the column with it. */
    filteredLabel?: string
  }>(),
  {
    fit: false,
    hiddenBelow: undefined,
    sorting: undefined,
    field: undefined,
    filteredLabel: undefined
  }
)

const sortable = computed(
  () => !!props.sorting && !!props.field && props.sorting.sortsOn(props.field)
)

const direction = computed(() =>
  props.sorting && props.field ? props.sorting.directionOf(props.field) : undefined
)

const marked = computed(() => !!direction.value || !!props.filteredLabel)

const classes = computed(() => [
  'sa-field-label px-4 py-2.5 text-left',
  props.filteredLabel ? 'text-primary' : direction.value ? 'text-gray-700' : '',
  // Tall enough that the button's target stays inside the header, since the box around it clips. The
  // cell is the button's target, and it is what shows the button under the pointer.
  sortable.value ? 'relative h-control has-[button:hover]:bg-gray-100' : '',
  props.fit ? 'w-0 whitespace-nowrap' : '',
  props.hiddenBelow === 'sm' ? 'hidden sm:table-cell' : '',
  props.hiddenBelow === 'lg' ? 'hidden lg:table-cell' : ''
])

function onSort() {
  if (props.field) {
    props.sorting?.toggle(props.field)
  }
}
</script>

<template>
  <th :class="classes" :aria-sort="direction">
    <span v-if="sortable || marked || $slots.help" class="inline-flex items-center gap-1">
      <!-- A browser takes a button's capitals off, whatever the cell around it says. -->
      <button
        v-if="sortable"
        type="button"
        class="inline-flex cursor-pointer items-center gap-1 rounded-sm tracking-wider uppercase outline-primary after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2"
        @click="onSort"
      >
        <slot />
        <ArrowUpIcon v-if="direction === 'ascending'" class="size-3" />
        <ArrowDownIcon v-else-if="direction === 'descending'" class="size-3" />
        <ArrowsUpDownIcon v-else class="size-3" />
      </button>
      <template v-else>
        <slot />
        <ArrowUpIcon v-if="direction === 'ascending'" class="size-3" />
        <ArrowDownIcon v-else-if="direction === 'descending'" class="size-3" />
      </template>
      <template v-if="props.filteredLabel">
        <FunnelIcon class="size-3" />
        <span class="sr-only">{{ props.filteredLabel }}</span>
      </template>
      <!-- Above the button's target, since asking what a column means is not asking for an order. -->
      <span v-if="$slots.help" class="relative z-10 normal-case">
        <slot name="help" />
      </span>
    </span>
    <slot v-else />
  </th>
</template>
