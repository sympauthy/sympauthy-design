<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CheckIcon, ClipboardDocumentIcon, XMarkIcon } from '@heroicons/vue/20/solid'

/**
 * The control that copies a value, drawn beside it. A browser may refuse the clipboard, and what is
 * copied is often shown only once, so a refusal is said rather than swallowed.
 */
const props = defineProps<{
  value: string
  /** Names the control: what it copies, as "Copy client ID". */
  label: string
}>()

const emit = defineEmits<{
  copied: []
  failed: [error: unknown]
}>()

const { t } = useI18n()

const state = ref<'idle' | 'copied' | 'failed'>('idle')

// Announced, and shown as the title, once the value is copied or when the browser refuses.
const outcome = computed(() =>
  state.value === 'copied'
    ? t('sa.copy.copied')
    : state.value === 'failed'
      ? t('sa.copy.failed')
      : ''
)
let timer: ReturnType<typeof setTimeout> | undefined

function show(next: 'copied' | 'failed') {
  state.value = next
  clearTimeout(timer)
  timer = setTimeout(() => {
    state.value = 'idle'
  }, 2000)
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value)
    show('copied')
    emit('copied')
  } catch (error) {
    show('failed')
    emit('failed', error)
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span class="inline-flex shrink-0">
    <!-- The box stays small beside a value, and the pseudo-element around it is what a finger hits:
         `control-height` square, without opening up the line the value sits on. -->
    <button
      type="button"
      class="relative -m-1 cursor-pointer rounded-md p-1 text-gray-500 outline-primary after:absolute after:top-1/2 after:left-1/2 after:size-control after:-translate-x-1/2 after:-translate-y-1/2 hover:bg-primary-subtle hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
      :aria-label="label"
      :title="outcome || label"
      @click="copy"
    >
      <CheckIcon v-if="state === 'copied'" class="size-4 text-tag-green" />
      <XMarkIcon v-else-if="state === 'failed'" class="size-4 text-danger" />
      <ClipboardDocumentIcon v-else class="size-4" />
    </button>
    <span class="sr-only" role="status">
      {{ outcome }}
    </span>
  </span>
</template>
