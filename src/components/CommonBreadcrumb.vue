<script lang="ts" setup>
import type { Component } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { PAGE_ACTIONS_OUTLET } from './pageActionsOutlet'

export interface BreadcrumbItem {
  key: string
  label: string
  /** What the link is given, as `{ href }` or a router's `{ to }`. The last item takes none. */
  link?: Record<string, unknown>
}

/**
 * The bar naming the screen: its ancestors as links, the screen itself, and at its right end what
 * `PageActions` draws. The package knows no router, so an app that has one derives the items from it
 * and names its link in [linkAs].
 */
withDefaults(
  defineProps<{
    items: BreadcrumbItem[]
    /** Names the bar, as "Where you are". */
    label: string
    /** What draws a link: an element's name, or a component such as a router's link. */
    linkAs?: string | Component
  }>(),
  {
    linkAs: 'a'
  }
)
</script>

<template>
  <nav
    v-if="items.length > 0"
    :aria-label="label"
    class="flex h-14 shrink-0 items-center border-b border-gray-200 bg-white"
  >
    <!-- Lined up with the column the content below is centred in, so the record's name sits over the
         record rather than at the far edge of a wide monitor. -->
    <div class="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 lg:px-6">
      <ol class="flex min-w-0 items-center gap-2">
        <li v-for="(item, index) in items" :key="item.key" class="flex min-w-0 items-center gap-2">
          <ChevronRightIcon v-if="index > 0" class="size-4 shrink-0 text-gray-400" />
          <component
            :is="linkAs"
            v-if="item.link"
            v-bind="item.link"
            class="flex min-h-control min-w-control items-center rounded-md text-sm whitespace-nowrap text-gray-500 outline-primary transition-colors hover:text-gray-700 focus-visible:outline-2"
          >
            {{ item.label }}
          </component>
          <span v-else aria-current="page" class="truncate text-sm font-semibold text-gray-900">
            {{ item.label }}
          </span>
        </li>
      </ol>
      <!-- Filled by whichever screen is open, through `PageActions`. Empty on a screen with nothing
           to do, where it takes no room. -->
      <div :id="PAGE_ACTIONS_OUTLET" class="flex shrink-0 items-center gap-2" />
    </div>
  </nav>
</template>
