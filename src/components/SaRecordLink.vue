<script lang="ts" setup>
import type { Component } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

/**
 * The name of another record, linking to it: a row's record, the user a grant was given to, the
 * client a session signed in at. The chevron says that it opens another screen rather than acting
 * on this one. The package knows no router, so an app that has one names its link in [linkAs].
 */
export interface SaRecordLinkProps {
  /** What the record is called, as an email. */
  name: string
  /** What the link is given, as `{ href }` or a router's `{ to }`. */
  link: Record<string, unknown>
  /** What draws a link: an element's name, or a component such as a router's link. */
  linkAs?: string | Component
  /** Cut with an ellipsis rather than wrapped, the chevron kept after what is shown. */
  truncate?: boolean
  /** For a name read character by character: an identifier, a client's ID. */
  mono?: boolean
}

withDefaults(defineProps<SaRecordLinkProps>(), {
  linkAs: 'a',
  truncate: false,
  mono: false
})
</script>

<template>
  <!-- The line stays as tall as the text around it, and the pseudo-element around it is the target.
       The name cuts itself rather than leaving it to a parent, whose clip would cut the target too. -->
  <component
    :is="linkAs"
    v-bind="link"
    class="sa-record-link relative inline-flex max-w-full min-w-control items-end gap-1 font-semibold text-primary underline underline-offset-3 outline-primary after:absolute after:inset-x-0 after:top-1/2 after:h-control after:-translate-y-1/2 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="{ 'sa-record-link-truncate': truncate, 'font-mono': mono }"
  >
    <span class="min-w-0" :class="truncate ? 'truncate' : '[overflow-wrap:anywhere]'">{{
      name
    }}</span>
    <!-- On the last line of a name that wraps, centred on it whatever the size of the text. -->
    <span class="flex h-lh shrink-0 items-center"><ChevronRightIcon class="size-3.5" /></span>
  </component>
</template>
