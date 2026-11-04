<script lang="ts" setup>
/**
 * What a record does not carry, wherever its value would otherwise be read. It stays in the flow of
 * the sentence rather than disappearing, and drops back to the body face, since a dash in the
 * monospace of the value beside it reads as part of that value.
 */
defineProps<{
  /** Says what the dash means to a screen reader, which otherwise reads nothing here. */
  label?: string
}>()
</script>

<template>
  <span class="font-sans text-gray-300">
    <span aria-hidden="true">&mdash;</span>
    <span v-if="label" class="sr-only">{{ label }}</span>
  </span>
</template>
