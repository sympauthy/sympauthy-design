<script lang="ts" setup>
import { computed, type Component } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { SA_PAGE_ACTIONS_OUTLET } from './pageActionsOutlet'
import { SA_PAGE_HEADING } from './pageHeading'

export interface SaBreadcrumbItem {
  key: string
  label: string
  /** What the link is given, as `{ href }` or a router's `{ to }`. The last item takes none. */
  link?: Record<string, unknown>
}

/**
 * The bar naming the screen: its ancestors as links, the screen itself as the page's heading, and at
 * its right end what `SaPageActions` draws. Below `sm:` it names the screen alone. The package knows
 * no router, so an app that has one derives the items from it and names its link in [linkAs].
 */
const props = withDefaults(
  defineProps<{
    items: SaBreadcrumbItem[]
    /** Names the navigation holding the ancestors, as "Where you are". */
    label: string
    /** What draws a link: an element's name, or a component such as a router's link. */
    linkAs?: string | Component
  }>(),
  {
    linkAs: 'a'
  }
)

const ancestors = computed(() => props.items.slice(0, -1))
const screen = computed(() => props.items[props.items.length - 1])
</script>

<template>
  <div v-if="screen" class="flex h-14 shrink-0 items-center border-b border-gray-200 bg-white">
    <!-- Lined up with the column the content below is centred in, so the record's name sits over the
         record rather than at the far edge of a wide monitor. -->
    <div class="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 lg:px-6">
      <div class="flex min-w-0 items-center gap-2">
        <nav v-if="ancestors.length > 0" :aria-label="label" class="hidden shrink-0 sm:block">
          <ol class="flex items-center gap-2">
            <li v-for="item in ancestors" :key="item.key" class="flex items-center gap-2">
              <component
                :is="item.link ? linkAs : 'span'"
                v-bind="item.link"
                class="flex min-h-control min-w-control items-center rounded-md text-sm whitespace-nowrap text-gray-500 outline-primary transition-colors hover:text-gray-700 focus-visible:outline-2"
              >
                {{ item.label }}
              </component>
              <ChevronRightIcon class="size-4 shrink-0 text-gray-400" />
            </li>
          </ol>
        </nav>
        <!-- Beside the nav and not in it, so that skipping the navigation does not skip the heading
             naming the screen. -->
        <h1 :id="SA_PAGE_HEADING" class="truncate text-lg font-semibold text-gray-900 sm:text-sm">
          {{ screen.label }}
        </h1>
      </div>
      <!-- Filled by whichever screen is open, through `SaPageActions`. Empty on a screen with nothing
           to do, where it takes no room. -->
      <div :id="SA_PAGE_ACTIONS_OUTLET" class="flex shrink-0 items-center gap-2" />
    </div>
  </div>
</template>
