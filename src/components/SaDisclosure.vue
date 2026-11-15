<script lang="ts" setup>
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'

/**
 * A section a person opens on purpose: a head naming it, and what it holds under it. For what most
 * people never need on the screen they are reading, such as the technical details of an error.
 */
export interface SaDisclosureProps {
  /** Names the section, as "Technical details". */
  label: string
}

defineProps<SaDisclosureProps>()

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <CollapsibleRoot v-model:open="open">
    <!-- Neither the chevron nor the section moves as it opens: they are not motions the system has. -->
    <CollapsibleTrigger
      class="sa-button-focus flex min-h-control w-full cursor-pointer items-center gap-2 rounded-md text-left text-sm font-medium text-gray-700 hover:text-gray-900"
    >
      <ChevronRightIcon class="size-4 shrink-0 text-gray-500" :class="{ 'rotate-90': open }" />
      {{ label }}
    </CollapsibleTrigger>
    <CollapsibleContent class="pl-6 text-sm text-gray-700">
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
