<script lang="ts" setup>
import { computed } from 'vue'

/**
 * A short status or label. The color comes from what the word means, and the word carries that
 * meaning on its own: the color only speeds up scanning.
 */
const props = defineProps<{
  /**
   * `green` for what is enabled or active, `red` for what is disabled, revoked or failed, `yellow`
   * for what needs attention, `blue` and `purple` for a classification, `gray` for the rest.
   */
  color: 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'gray'
}>()

const colorClasses: Record<string, string> = {
  green: 'bg-tag-green-fill text-tag-green',
  red: 'bg-tag-red-fill text-tag-red',
  yellow: 'bg-tag-yellow-fill text-tag-yellow',
  blue: 'bg-tag-blue-fill text-tag-blue',
  purple: 'bg-tag-purple-fill text-tag-purple',
  gray: 'bg-gray-100 text-gray-700'
}

const classes = computed(() => [
  'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
  colorClasses[props.color]
])
</script>

<template>
  <span :class="classes">
    <slot />
    <slot name="help" />
  </span>
</template>
