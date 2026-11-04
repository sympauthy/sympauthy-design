<script lang="ts" setup generic="T extends string">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui'

/**
 * One choice among a few options a person should see all at once. The whole row is the target, at
 * least `control-height` tall, while the mark stays the size of the text beside it.
 */
defineProps<{
  options: {
    value: T
    label: string
    /** Draws the option disabled, with this reason under its label. */
    disabledReason?: string
  }[]
  /** Names the group, where the label beside it does not point at it. */
  ariaLabel?: string
}>()

const model = defineModel<T>()
</script>

<template>
  <RadioGroupRoot v-model="model" class="flex flex-col" :aria-label="ariaLabel">
    <label
      v-for="option in options"
      :key="option.value"
      class="flex min-h-control items-center gap-2 text-sm"
      :class="
        option.disabledReason ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-gray-700'
      "
    >
      <RadioGroupItem
        :value="option.value"
        :disabled="option.disabledReason !== undefined"
        class="flex size-4 shrink-0 items-center justify-center rounded-full border border-gray-400 bg-white outline-primary focus-visible:outline-2 focus-visible:outline-offset-2 disabled:border-gray-300 data-[state=checked]:border-primary"
      >
        <RadioGroupIndicator class="size-2 rounded-full bg-primary" />
      </RadioGroupItem>
      <span class="flex flex-col">
        {{ option.label }}
        <span v-if="option.disabledReason" class="text-xs text-gray-500">
          {{ option.disabledReason }}
        </span>
      </span>
    </label>
  </RadioGroupRoot>
</template>
