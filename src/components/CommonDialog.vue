<script lang="ts" setup>
import { useSlots } from 'vue'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui'

/**
 * The shell of any dialog: the scrim, the centred card, the title and the footer its buttons sit in.
 * It is controlled by [open] and `close`.
 */
const props = withDefaults(
  defineProps<{
    open: boolean
    /** The heading. A `title` slot takes its place for what is more than a sentence. */
    title?: string
    /** Blocks Escape and a click outside, while a request is in flight. */
    dismissDisabled?: boolean
  }>(),
  {
    title: undefined,
    dismissDisabled: false
  }
)

const emit = defineEmits<{
  close: []
}>()

const slots = useSlots()

// reka-ui only emits `update:open(false)` on a person dismissing the dialog, never when the parent
// flips `open`, so a parent closing it once a request succeeds gets no second `close`.
function onOpenChange(value: boolean) {
  if (!value) emit('close')
}

function preventWhenDisabled(event: Event) {
  if (props.dismissDisabled) event.preventDefault()
}
</script>

<template>
  <DialogRoot :open="open" @update:open="onOpenChange">
    <DialogPortal>
      <DialogOverlay class="dialog-animated fixed inset-0 z-50 bg-nav/50" />
      <DialogContent
        class="dialog-animated fixed top-1/2 left-1/2 z-50 mx-4 max-h-[calc(100vh-2rem)] w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 sm:p-6"
        :aria-describedby="undefined"
        @escape-key-down="preventWhenDisabled"
        @pointer-down-outside="preventWhenDisabled"
        @interact-outside="preventWhenDisabled"
      >
        <DialogTitle
          v-if="title || slots.title"
          as="h3"
          class="mb-4 text-lg font-semibold text-gray-900"
        >
          <slot name="title">{{ title }}</slot>
        </DialogTitle>
        <slot />
        <div v-if="slots.actions" class="mt-6 flex justify-end gap-3">
          <slot name="actions" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
