<script lang="ts" setup>
import CommonSpinner from './CommonSpinner.vue'

/**
 * What a screen shows while it waits for what it was asked for, so that a slow fetch does not look
 * like a different kind of wait on each screen.
 */
withDefaults(
  defineProps<{
    /** Says what is being waited for. */
    label: string
    /** `md` heads what is being waited for, and `lg` stands alone in a card or a screen. */
    size?: 'md' | 'lg'
    /** Centred in the height it is given, for a wait that fills a page rather than heading one. */
    centered?: boolean
  }>(),
  {
    size: 'md',
    centered: false
  }
)
</script>

<template>
  <div
    class="flex items-center text-sm text-gray-500"
    :class="[
      size === 'lg' ? 'flex-col gap-3 py-10' : 'gap-2',
      centered ? 'h-full justify-center' : ''
    ]"
  >
    <CommonSpinner :size="size" class="text-primary">{{ label }}</CommonSpinner>
    <!-- The spinner announces the label, so the line a person reads is not announced twice. -->
    <span aria-hidden="true">{{ label }}</span>
  </div>
</template>
