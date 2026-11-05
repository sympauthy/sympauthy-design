<script lang="ts" setup>
import type { Component } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import SaCard from './SaCard.vue'

export interface SaRecordView {
  key: string
  label: string
  /** What the view holds, under its name. */
  description?: string
  /** What the link is given, as `{ href }` or a router's `{ to }`. */
  link: Record<string, unknown>
}

/**
 * The views one record is read through, on a phone: each a row opening a screen of its own, where a
 * wider screen has the room for `SaTabs` and the view under them. The package knows no router, so an
 * app that has one names its link in [linkAs].
 */
withDefaults(
  defineProps<{
    views: SaRecordView[]
    /** Names the navigation, as "Views of this user". */
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
  <nav :aria-label="label">
    <SaCard :padded="false">
      <ul class="divide-y divide-gray-200">
        <li v-for="view in views" :key="view.key">
          <component
            :is="linkAs"
            v-bind="view.link"
            class="flex min-h-control items-center gap-3 py-2.5 pr-3 pl-4 outline-primary -outline-offset-2 transition-colors hover:bg-gray-50 focus-visible:outline-2"
          >
            <span class="flex min-w-0 flex-1 flex-col gap-0.5 text-sm">
              <span class="font-medium text-gray-900">{{ view.label }}</span>
              <span v-if="view.description" class="text-gray-500">{{ view.description }}</span>
            </span>
            <ChevronRightIcon class="size-4 shrink-0 text-primary" />
          </component>
        </li>
      </ul>
    </SaCard>
  </nav>
</template>
