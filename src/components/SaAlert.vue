<script lang="ts" setup>
import { computed } from 'vue'

/**
 * What a screen has to keep saying: a call it could not make, or something missing from what it
 * drew. Every one of them is this box.
 */
const props = withDefaults(
  defineProps<{
    /**
     * `warning` is for a screen that is still usable with something missing from it; `danger` for
     * one that could not render what it was asked to.
     */
    color?: 'danger' | 'warning'
    /**
     * A `warning` the reader must not move on without, announced at once. It changes nothing on
     * screen, and a `danger` is always announced at once.
     */
    urgent?: boolean
  }>(),
  {
    color: 'danger',
    urgent: false
  }
)

const colorClasses: Record<string, string> = {
  danger: 'border-danger-line bg-danger-subtle text-danger',
  warning: 'border-warning-line bg-warning-subtle text-warning'
}

const classes = computed(() => ['w-full rounded-md border p-3 text-sm', colorClasses[props.color]])
const role = computed(() => (props.color === 'danger' || props.urgent ? 'alert' : 'status'))
</script>

<template>
  <div :class="classes" :role="role">
    <slot />
  </div>
</template>
