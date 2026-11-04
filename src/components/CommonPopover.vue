<script lang="ts" setup>
import { InformationCircleIcon } from '@heroicons/vue/20/solid'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'

/**
 * An explanation pressed open, which may hold a link: what a term means, beside the term. By default
 * its trigger is the information icon. The `trigger` slot replaces it with a control of the caller's.
 */
withDefaults(
  defineProps<{
    /** Names the information icon, as "What is a grant?". Unused with a `trigger` slot. */
    label?: string
  }>(),
  {
    label: undefined
  }
)

const open = defineModel<boolean>('open')
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <!-- The icon stays small beside a label, and the pseudo-element around it is the target. -->
    <PopoverTrigger
      v-else
      type="button"
      class="relative ml-1 inline-flex cursor-help rounded-md align-middle text-gray-500 outline-primary after:absolute after:-inset-1.5 hover:text-gray-700 focus-visible:outline-2"
      :aria-label="label"
    >
      <InformationCircleIcon class="size-3" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        align="center"
        :side-offset="4"
        :collision-padding="16"
        class="popover overlay-animated z-50 w-72 max-w-[calc(100vw-2rem)] p-3 text-sm font-normal text-gray-700"
      >
        <slot />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
