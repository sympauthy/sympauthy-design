<script lang="ts" setup>
import CopyToClipboard from './CopyToClipboard.vue'

/**
 * A value a person reads and then pastes elsewhere. It is cut with an ellipsis rather than wrapped,
 * and the control that copies it in full stays beside it whatever the width leaves.
 */
defineProps<{
  value: string
  /** Names the control: what it copies, as "Copy client ID". */
  label: string
  /** Announced, and shown as the title, once the value is copied. */
  copiedLabel: string
  /** Announced, and shown as the title, when the browser refuses. */
  failedLabel: string
}>()
</script>

<template>
  <span class="flex min-w-0 items-center gap-1.5">
    <span class="truncate">{{ value }}</span>
    <CopyToClipboard
      :value="value"
      :label="label"
      :copied-label="copiedLabel"
      :failed-label="failedLabel"
    />
  </span>
</template>
