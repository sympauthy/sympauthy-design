<script lang="ts" setup>
import { computed } from 'vue'

export type SaTagVariant = 'fill' | 'outline'

/**
 * A short status or label. The color comes from what the word means, and the word carries that
 * meaning on its own: the color only speeds up scanning.
 */
const props = withDefaults(
  defineProps<{
    /**
     * `green` for what is enabled or active, `red` for what is disabled, revoked or failed, `yellow`
     * for what needs attention, `blue`, `purple` and `ink` for a classification, `gray` for the rest.
     */
    color: 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'ink' | 'gray'
    /**
     * `fill` for every tag, `outline` for a kind a list tells apart from the filled tags beside it,
     * so that two kinds differ in more than hue.
     */
    variant?: SaTagVariant
  }>(),
  { variant: 'fill' }
)

const fillClasses: Record<string, string> = {
  green: 'bg-tag-green-fill text-tag-green',
  red: 'bg-tag-red-fill text-tag-red',
  yellow: 'bg-tag-yellow-fill text-tag-yellow',
  blue: 'bg-tag-blue-fill text-tag-blue',
  purple: 'bg-tag-purple-fill text-tag-purple',
  ink: 'bg-gray-700 text-white',
  gray: 'bg-gray-100 text-gray-700'
}

// The ring is inset, so an outline tag takes the size of a filled one.
const outlineClasses: Record<string, string> = {
  green: 'inset-ring-tag-green-line text-tag-green',
  red: 'inset-ring-tag-red-line text-tag-red',
  yellow: 'inset-ring-tag-yellow-line text-tag-yellow',
  blue: 'inset-ring-tag-blue-line text-tag-blue',
  purple: 'inset-ring-tag-purple-line text-tag-purple',
  ink: 'inset-ring-gray-700 text-gray-700',
  gray: 'inset-ring-gray-400 text-gray-700'
}

const classes = computed(() => [
  'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
  props.variant === 'outline'
    ? ['bg-white inset-ring', outlineClasses[props.color]]
    : fillClasses[props.color]
])
</script>

<template>
  <span :class="classes">
    <slot />
    <slot name="help" />
  </span>
</template>
