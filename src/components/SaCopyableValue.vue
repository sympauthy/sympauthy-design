<script lang="ts" setup>
import SaCopyButton from './SaCopyButton.vue'

/**
 * A value a person reads and then pastes elsewhere. It is cut with an ellipsis rather than wrapped,
 * and the control that copies it in full stays beside it whatever the width leaves.
 */
defineProps<{
  value: string
  /** Names the control: what it copies, as "Copy client ID". */
  label: string
}>()
</script>

<template>
  <span class="flex min-w-0 items-center gap-1.5">
    <span class="truncate">{{ value }}</span>
    <SaCopyButton :value="value" :label="label" />
  </span>
</template>
