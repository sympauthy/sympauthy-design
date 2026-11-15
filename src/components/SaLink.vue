<script lang="ts" setup>
import type { Component } from 'vue'

/**
 * A link standing on its own, as "Forgot password?" under a form: `.sa-link`'s look, and a target
 * as easy to press as a button. A link inside a sentence stays `.sa-link`, whose target is the
 * sentence's. The package knows no router, so an app that has one names its link in [linkAs].
 */
export interface SaLinkProps {
  /** Where the link leads, said as the place or the task, as "Forgot password?". */
  label: string
  /** What the link is given, as `{ href }` or a router's `{ to }`. */
  link: Record<string, unknown>
  /** What draws a link: an element's name, or a component such as a router's link. */
  linkAs?: string | Component
}

withDefaults(defineProps<SaLinkProps>(), {
  linkAs: 'a'
})
</script>

<template>
  <!-- The line stays as tall as its text, and the pseudo-element around it is the target. -->
  <component
    :is="linkAs"
    v-bind="link"
    class="sa-link relative inline-flex w-fit max-w-full min-w-control justify-center text-sm font-medium after:absolute after:inset-x-0 after:top-1/2 after:h-control after:-translate-y-1/2"
  >
    {{ label }}
  </component>
</template>
