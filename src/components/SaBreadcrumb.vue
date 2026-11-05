<script lang="ts" setup>
import { computed, onBeforeUnmount, watchEffect, type Component } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { useAppShellMenuReplaced } from './appShellMenu'
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
 * its right end what `SaPageActions` draws. Below `sm:` a screen with ancestors links to the nearest
 * alone, in place of the shell's menu, and names it over its own name. The package knows no router,
 * so an app that has one derives the items from it and names its link in [linkAs].
 */
const props = withDefaults(
  defineProps<{
    items: SaBreadcrumbItem[]
    /** Names the navigation holding the ancestors, as "Where you are". */
    label: string
    /** What draws a link: an element's name, or a component such as a router's link. */
    linkAs?: string | Component
    /**
     * Names the mark standing in the bar for the link to [parent], as "Back to Ada Lovelace". Without
     * it the link takes the parent's own name.
     */
    backLabel?: (parent: string) => string
  }>(),
  {
    linkAs: 'a',
    backLabel: undefined
  }
)

const ancestors = computed(() => props.items.slice(0, -1))
const screen = computed(() => props.items[props.items.length - 1])
const parent = computed(() => ancestors.value[ancestors.value.length - 1])

const backName = computed(() =>
  parent.value ? (props.backLabel?.(parent.value.label) ?? parent.value.label) : undefined
)

const menuReplaced = useAppShellMenuReplaced()

watchEffect(() => {
  if (menuReplaced) {
    menuReplaced.value = parent.value?.link !== undefined
  }
})
onBeforeUnmount(() => {
  if (menuReplaced) {
    menuReplaced.value = false
  }
})
</script>

<template>
  <div v-if="screen" class="flex h-14 shrink-0 items-center border-b border-gray-200 bg-white">
    <!-- Lined up with the column the content below is centred in, so the record's name sits over the
         record rather than at the far edge of a wide monitor. -->
    <div class="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 lg:px-6">
      <div class="flex min-w-0 items-center gap-2">
        <!-- Where the shell's control would stand, so that the mark does not move between screens. -->
        <nav v-if="parent?.link" :aria-label="label" class="-mr-0.5 -ml-2.5 shrink-0 sm:hidden">
          <component
            :is="linkAs"
            v-bind="parent.link"
            :aria-label="backName"
            :title="backName"
            class="flex size-control items-center justify-center text-gray-600 outline-primary -outline-offset-2 focus-visible:outline-2"
          >
            <ChevronLeftIcon class="size-6" />
          </component>
        </nav>
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
        <div class="flex min-w-0 flex-col">
          <span v-if="parent" class="truncate text-xs text-gray-500 sm:hidden">
            {{ parent.label }}
          </span>
          <h1 :id="SA_PAGE_HEADING" class="truncate text-lg font-semibold text-gray-900 sm:text-sm">
            {{ screen.label }}
          </h1>
        </div>
      </div>
      <!-- Filled by whichever screen is open, through `SaPageActions`. Empty on a screen with nothing
           to do, where it takes no room. -->
      <div :id="SA_PAGE_ACTIONS_OUTLET" class="flex shrink-0 items-center gap-2" />
    </div>
  </div>
</template>
