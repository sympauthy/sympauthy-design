<script lang="ts" setup>
/**
 * One field of a form: the name of what is being filled in, the control filling it, and a line
 * under it for what the name alone does not say, or for what went wrong.
 *
 * It owns the space between the three, so a form stacking four fields does not decide it four
 * times.
 */
withDefaults(
  defineProps<{
    label: string
    /** The id of the control, so a click on the label focuses it. */
    for?: string
    /** A line under the control, for a format or a consequence the label cannot carry. */
    hint?: string
    /** Replaces the hint while set, in `danger`. */
    error?: string
  }>(),
  {
    for: undefined,
    hint: undefined,
    error: undefined
  }
)
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="$props.for" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <slot name="help" />
    </label>
    <slot />
    <p v-if="error" class="text-sm text-danger">{{ error }}</p>
    <p v-else-if="hint" class="text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>
