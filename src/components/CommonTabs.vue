<script lang="ts" setup>
import type { Component } from 'vue'

export interface Tab {
  key: string
  label: string
  /** What the link is given, as `{ href }`, or `{ to }` for a router's link. */
  link: Record<string, unknown>
  /** Whether this is the view on screen, which only the app knows. */
  current?: boolean
}

/**
 * The views one thing is read through. Each tab is a link rather than a panel the strip shows and
 * hides, so a view is addressable and the one open survives a reload.
 *
 * The package knows no router, so an app that has one names its link in [linkAs] and says which tab
 * is current.
 */
withDefaults(
  defineProps<{
    tabs: Tab[]
    /** Names the strip, as "Views of this user". */
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
  <nav :aria-label="label" class="flex shrink-0 gap-1 overflow-x-auto border-b border-gray-200">
    <!-- A tab's explanation is drawn outside the link, or opening it would navigate, and the underline
         is on the row around the two so that it spans both. -->
    <div
      v-for="tab in tabs"
      :key="tab.key"
      class="flex shrink-0 items-center border-b-2 px-4 whitespace-nowrap"
      :class="
        tab.current
          ? 'border-primary text-primary'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800'
      "
    >
      <component
        :is="linkAs"
        v-bind="tab.link"
        :aria-current="tab.current ? 'page' : undefined"
        class="rounded-md py-2 text-sm font-medium outline-primary focus-visible:outline-2"
      >
        {{ tab.label }}
      </component>
      <slot name="help" :tab="tab" />
    </div>
  </nav>
</template>
