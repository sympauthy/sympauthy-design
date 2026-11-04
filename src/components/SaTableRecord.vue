<script lang="ts" setup>
import type { Component } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

/**
 * What identifies a record in a row: its name, linking to the record, and on wider screens the
 * identifier under it. The package knows no router, so an app that has one names its link in
 * [linkAs].
 */
withDefaults(
  defineProps<{
    /** What the record is called, as an email. */
    name: string
    /** What the link is given, as `{ href }` or a router's `{ to }`. */
    link: Record<string, unknown>
    /** A value read character by character, under the name from `sm:`. A phone has no room for it. */
    detail?: string
    /** What draws a link: an element's name, or a component such as a router's link. */
    linkAs?: string | Component
  }>(),
  {
    detail: undefined,
    linkAs: 'a'
  }
)
</script>

<template>
  <div class="flex min-w-0 flex-col items-start">
    <!-- The line stays small beside the identifier, and the pseudo-element around it is the target. -->
    <component
      :is="linkAs"
      v-bind="link"
      class="relative inline-flex max-w-full min-w-control items-center gap-1 font-semibold text-primary underline underline-offset-3 outline-primary after:absolute after:inset-x-0 after:top-1/2 after:h-control after:-translate-y-1/2 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span class="min-w-0 [overflow-wrap:anywhere]">{{ name }}</span>
      <ChevronRightIcon class="size-3.5 shrink-0" />
    </component>
    <span v-if="detail" class="hidden max-w-full truncate font-mono text-xs text-gray-500 sm:block">
      {{ detail }}
    </span>
  </div>
</template>
