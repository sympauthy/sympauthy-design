<script lang="ts" setup>
import { ref, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import {
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot
} from 'reka-ui'
import { useFieldDescription } from './fieldDescription'

/**
 * Several values entered one at a time, each becoming a tag as it is entered. A person need not know
 * the separator the list travels under, and a value already entered is removed by the control beside
 * it rather than by finding it inside a sentence.
 */
withDefaults(
  defineProps<{
    /** Names the control that removes a value, as "Remove". */
    removeLabel: string
    /** Named in the empty field, since the tags beside it say nothing about what goes in. */
    placeholder?: string
    /** Names the field, where the label beside it does not point at it. */
    ariaLabel?: string
    /** Draws the error border; pair it with FormField's `error`. */
    invalid?: boolean
  }>(),
  {
    placeholder: undefined,
    ariaLabel: undefined,
    invalid: false
  }
)

const model = defineModel<string[]>({ default: () => [] })
const description = useFieldDescription()

// What has been typed and not yet entered. The primitive keeps it in the DOM and hands it over on
// Enter; this is the copy a caller can ask for before that.
const pending = ref('')

function onPendingInput(event: Event) {
  pending.value = (event.target as HTMLInputElement).value
}

// The primitive clears the field itself when it accepts a value, without an input event, so what is
// pending goes with the list it just joined.
watch(model, () => {
  pending.value = ''
})

/**
 * Enters what has been typed but not yet confirmed. A caller about to take the control away asks for
 * this: `add-on-blur` covers a focus moving on within the page, but an overlay dismissed on the
 * pointer going down is torn away before the field can lose the focus at all.
 */
function flush() {
  const value = pending.value.trim()
  pending.value = ''
  if (value === '' || model.value.includes(value)) {
    return
  }
  model.value = [...model.value, value]
}

// The field inside is shorter than the box around it, and the box is what a person sees and presses.
function focusField(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    ;(event.currentTarget as HTMLElement).querySelector('input')?.focus()
  }
}

defineExpose({ flush })
</script>

<template>
  <TagsInputRoot
    v-model="model"
    add-on-blur
    class="control control-focus-within flex w-full flex-wrap items-center gap-1 bg-white"
    :class="invalid ? 'border-danger' : ''"
    @click="focusField"
  >
    <TagsInputItem
      v-for="value in model"
      :key="value"
      :value="value"
      class="flex max-w-full items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
    >
      <TagsInputItemText class="truncate" />
      <!-- The icon stays small beside the word, and the pseudo-element around it is the target. -->
      <TagsInputItemDelete
        class="relative shrink-0 rounded-md text-gray-500 outline-primary after:absolute after:top-1/2 after:left-1/2 after:size-control after:-translate-x-1/2 after:-translate-y-1/2 hover:text-gray-700 focus-visible:outline-2"
        :aria-label="removeLabel"
      >
        <XMarkIcon class="size-3" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      class="control-text min-w-16 flex-1 bg-transparent outline-none"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :aria-describedby="description"
      :aria-invalid="invalid || undefined"
      @input="onPendingInput"
    />
  </TagsInputRoot>
</template>
