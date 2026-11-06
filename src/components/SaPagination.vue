<script lang="ts" setup>
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import {
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot
} from 'reka-ui'

/**
 * Which page of a list is on screen, and the way to the others. A phone is told which page of how
 * many, since page numbers do not fit it, and every step is a control a thumb can hit.
 *
 * A list of one page is told its range alone: a disabled pair of arrows around a lone "1" says
 * nothing the range does not. The bar keeps the height of a step either way, so that a filter taking
 * a list down to one page moves nothing but the steps, and a table sizing its pages from the height
 * left to its rows is not handed a different one.
 */
const props = withDefaults(
  defineProps<{
    /** The current page, counted from 0. */
    page: number
    totalPages: number
    /** Names the pager, as "Pages of users". */
    label: string
    previousLabel: string
    nextLabel: string
    /** Says which page a step leads to, as "Page 2 of 10". */
    pageLabel: (page: number, totalPages: number) => string
    /** The number of rows on a page, which with [total] gives the range. */
    size?: number
    total?: number
    /** Says which rows are on screen, as "Showing 1-20 of 200". */
    rangeLabel?: (range: { from: number; to: number; total: number }) => string
  }>(),
  {
    size: 0,
    total: 0,
    rangeLabel: undefined
  }
)

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const range = computed(() => {
  if (props.size <= 0 || props.total <= 0) {
    return null
  }
  return {
    from: props.page * props.size + 1,
    to: Math.min((props.page + 1) * props.size, props.total),
    total: props.total
  }
})

// reka-ui derives the page count from the item counts. A caller that only knows how many pages it
// has maps one item to one page, which gives back the same count.
const itemsPerPage = computed(() => (props.size > 0 ? props.size : 1))
const totalItems = computed(() => (props.size > 0 ? props.total : props.totalPages))

const stepClasses =
  'sa-control sa-control-focus inline-flex items-center justify-center bg-white font-medium text-gray-700 hover:bg-gray-50'
</script>

<template>
  <!-- Not a navigation: there is nowhere to go. -->
  <p v-if="totalPages <= 1" class="flex min-h-control items-center text-sm text-gray-500">
    <template v-if="range && rangeLabel">{{ rangeLabel(range) }}</template>
  </p>

  <PaginationRoot
    v-else
    :page="page + 1"
    :items-per-page="itemsPerPage"
    :total="totalItems"
    :sibling-count="1"
    show-edges
    :aria-label="label"
    class="flex items-center gap-2 sm:justify-between"
    @update:page="(value: number) => emit('pageChange', value - 1)"
  >
    <!-- A phone is told which page of how many by the indicator inside the pager, so the range it
         also reads would cost the list a record to say the same thing twice. -->
    <span class="hidden text-sm text-gray-500 sm:inline">
      <template v-if="range && rangeLabel">{{ rangeLabel(range) }}</template>
    </span>

    <PaginationList
      v-slot="{ items }"
      class="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start"
    >
      <!-- The words wait for `lg:`: seven steps and the range take all of `sm:`'s width. -->
      <PaginationPrev
        :class="stepClasses"
        class="disabled:cursor-not-allowed disabled:opacity-50"
        :aria-label="previousLabel"
      >
        <ChevronLeftIcon class="size-4 lg:mr-1" />
        <span class="hidden lg:inline">{{ previousLabel }}</span>
      </PaginationPrev>

      <span class="px-2 text-sm text-gray-500 sm:hidden">
        {{ pageLabel(page + 1, totalPages) }}
      </span>

      <div class="hidden items-center gap-2 sm:flex">
        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="`page-${item.value}`"
            :value="item.value"
            :aria-label="pageLabel(item.value, totalPages)"
            :class="stepClasses"
            class="data-[selected]:border-transparent data-[selected]:bg-primary data-[selected]:text-on-primary"
          />
          <PaginationEllipsis
            v-else
            :key="`ellipsis-${index}`"
            class="inline-flex min-w-6 items-center justify-center text-sm text-gray-500"
          >
            &hellip;
          </PaginationEllipsis>
        </template>
      </div>

      <PaginationNext
        :class="stepClasses"
        class="disabled:cursor-not-allowed disabled:opacity-50"
        :aria-label="nextLabel"
      >
        <span class="hidden lg:inline">{{ nextLabel }}</span>
        <ChevronRightIcon class="size-4 lg:ml-1" />
      </PaginationNext>
    </PaginationList>
  </PaginationRoot>
</template>
