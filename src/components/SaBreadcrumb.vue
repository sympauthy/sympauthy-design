<script lang="ts" setup>
import type { Component } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { SA_PAGE_ACTIONS_OUTLET } from './pageActionsOutlet'

export interface SaBreadcrumbItem {
  key: string
  label: string
  /** What the link is given, as `{ href }` or a router's `{ to }`. The last item takes none. */
  link?: Record<string, unknown>
}

/**
 * The bar naming the screen: its ancestors as links, the screen itself as the page's heading, and at
 * its right end what `SaPageActions` draws. Below `lg:` it names the screen alone. The package knows
 * no router, so an app that has one derives the items from it and names its link in [linkAs].
 */
withDefaults(
  defineProps<{
    items: SaBreadcrumbItem[]
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
        <li
          v-for="(item, index) in items"
          :key="item.key"
          class="min-w-0 items-center gap-2"
          :class="index < items.length - 1 ? 'hidden lg:flex' : 'flex'"
        >
          <ChevronRightIcon
            v-if="index > 0"
            class="hidden size-4 shrink-0 text-gray-400 lg:block"
          />
          <component
            :is="linkAs"
            v-if="item.link"
            v-bind="item.link"
            class="flex min-h-control min-w-control items-center rounded-md text-sm whitespace-nowrap text-gray-500 outline-primary transition-colors hover:text-gray-700 focus-visible:outline-2"
          >
            {{ item.label }}
          </component>
          <h1
            v-else
            aria-current="page"
            class="truncate text-lg font-semibold text-gray-900 lg:text-sm"
          >
            {{ item.label }}
          </h1>
        </li>
      </ol>
      <!-- Filled by whichever screen is open, through `SaPageActions`. Empty on a screen with nothing
           to do, where it takes no room. -->
      <div :id="SA_PAGE_ACTIONS_OUTLET" class="flex shrink-0 items-center gap-2" />
    </div>
  </nav>
</template>
