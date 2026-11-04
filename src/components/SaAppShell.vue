<script lang="ts" setup>
import { Bars3Icon } from '@heroicons/vue/20/solid'
import { SA_PAGE_HEADING } from './pageHeading'

/**
 * The frame of an app built like the admin: a sidebar, permanent from `lg:` and a drawer below it, and
 * a column holding the bar and the page. Below `lg:` the bar also holds the control opening the
 * drawer. The package knows no router, so the app closes the drawer when it navigates.
 */
defineProps<{
  /** Names the control opening the drawer below `lg:`. */
  openMenuLabel: string
}>()

const sidebarOpen = defineModel<boolean>('sidebarOpen', { default: false })
</script>

<template>
  <div class="flex h-screen">
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-nav/50 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- `invisible` while closed, or a drawer moved off the screen would still take the keyboard's
         focus. -->
    <div
      class="fixed inset-y-0 left-0 z-50 w-sidebar transition-[transform,visibility] duration-300 motion-reduce:transition-none lg:visible lg:relative lg:translate-x-0"
      :class="sidebarOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'"
      @keydown.esc="sidebarOpen = false"
    >
      <slot name="sidebar" />
    </div>

    <div class="flex min-h-0 min-w-0 flex-1 flex-col">
      <!-- The bar and the page under it scroll in one box, and both centre their column in it. A
           vertical scrollbar narrows the box it belongs to and not its neighbour, so two boxes capped
           at the same width would centre half a scrollbar apart. The bar is pinned to the top of it. -->
      <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div class="sticky top-0 z-20 flex bg-white max-lg:min-h-14">
          <!-- The icon lines up with the page, and the bar's padding is pulled in under the target:
               `relative` keeps the target on top of the bar's ground. -->
          <button
            type="button"
            :aria-label="openMenuLabel"
            :title="openMenuLabel"
            class="relative -mr-2.5 ml-1.5 flex size-control shrink-0 items-center justify-center self-center text-gray-600 outline-primary -outline-offset-2 focus-visible:outline-2 lg:hidden"
            @click="sidebarOpen = true"
          >
            <Bars3Icon class="size-6" />
          </button>
          <div class="min-w-0 flex-1">
            <slot name="bar" />
          </div>
          <!-- Under the control too, and on a screen whose bar draws nothing. -->
          <div class="absolute inset-x-0 bottom-0 border-b border-gray-200 lg:hidden" />
        </div>
        <!-- Sized by the box rather than by what it holds, so a collection filling the height scrolls
             its rows and not the page. -->
        <main
          :aria-labelledby="SA_PAGE_HEADING"
          class="mx-auto min-h-0 w-full max-w-page flex-1 p-4 lg:p-6"
        >
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
