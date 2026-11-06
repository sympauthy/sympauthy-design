<script lang="ts" setup>
import type { Component } from 'vue'
import SaRecordLink from './SaRecordLink.vue'

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
    /** Cut with an ellipsis rather than wrapped, under a `truncate` cell. */
    truncate?: boolean
  }>(),
  {
    detail: undefined,
    linkAs: 'a',
    truncate: false
  }
)
</script>

<template>
  <div class="flex min-w-0 flex-col items-start">
    <SaRecordLink :name="name" :link="link" :link-as="linkAs" :truncate="truncate" />
    <span v-if="detail" class="hidden max-w-full truncate font-mono text-xs text-gray-500 sm:block">
      {{ detail }}
    </span>
  </div>
</template>
