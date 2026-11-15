<script lang="ts" setup>
import { computed, provide, useId } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import { FIELD_DESCRIPTION } from './fieldDescription'
import { FIELD_LABEL } from './fieldLabel'

/**
 * One field of a form: the name of what is being filled in, the control filling it, and a line
 * under it for what the name alone does not say, or for what went wrong.
 *
 * It owns the space between the three, so a form stacking four fields does not decide it four
 * times.
 */
const props = withDefaults(
  defineProps<{
    label: string
    /** The id of the control, so a click on the label focuses it. */
    for?: string
    /** A line under the control, for a format or a consequence the label cannot carry. */
    hint?: string
    /** Replaces the hint while set, in `danger`. */
    error?: string
    /**
     * Marks the field optional, as "(optional)", drawn after the label and inside it so that a
     * screen reader reads the two together. A form marks the fewer kind, so a required field is
     * never starred.
     */
    optionalLabel?: string
  }>(),
  {
    for: undefined,
    hint: undefined,
    error: undefined,
    optionalLabel: undefined
  }
)

const labelId = useId()
const descriptionId = useId()

provide(
  FIELD_DESCRIPTION,
  computed(() => (props.error || props.hint ? descriptionId : undefined))
)

provide(
  FIELD_LABEL,
  computed(() => ({ id: labelId, text: props.label, optional: !!props.optionalLabel }))
)
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="$props.for" class="block text-sm font-medium text-gray-700">
      <!-- The words a control names itself with, which the help beside them is not. -->
      <span :id="labelId"
        >{{ label
        }}<span v-if="optionalLabel" class="font-normal text-gray-500">{{
          ` ${optionalLabel}`
        }}</span></span
      >
      <slot name="help" />
    </label>
    <slot />
    <!-- The icon sets an error apart from a hint at a glance, centred on the message's first line. -->
    <p v-if="error" :id="descriptionId" class="flex gap-1 text-sm text-danger">
      <ExclamationCircleIcon class="mt-0.5 size-4 shrink-0" />
      <span>{{ error }}</span>
    </p>
    <p v-else-if="hint" :id="descriptionId" class="text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>
