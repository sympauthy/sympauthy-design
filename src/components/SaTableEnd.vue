<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SaAlert from './SaAlert.vue'
import SaButton from './SaButton.vue'
import SaSkeleton from './SaSkeleton.vue'

/**
 * The end of a phone's list, which grows as it is scrolled rather than paging: drawn after the last
 * row, it asks for the next page before anybody reaches it. A button at the end of a list would land
 * somewhere else on every screen, so nothing at the end is pressed but a retry. What stands there
 * meanwhile is shaped like the rows it waits for, so the rows that arrive take its place and nothing
 * moves. Rows of the table's own body, so that the rules and the padding of a row are what it draws
 * with; from `sm:` a list pages, and it draws nothing.
 */
const props = withDefaults(
  defineProps<{
    /** Whether the server holds rows past the last one drawn. */
    more?: boolean
    /** True from the moment [more] is emitted until its page has been added. */
    loading?: boolean
    /** Why the last page asked for could not be added, in place of the rows it waits for. */
    error?: string | null
    /** Says what is on its way, as "Loading more claims", to a screen reader. */
    loadingLabel: string
    /** Says the list is whole, as "All 23 claims shown". */
    endLabel: string
    /** The retry after [error]. */
    retryLabel: string
  }>(),
  {
    more: false,
    loading: false,
    error: null
  }
)

const emit = defineEmits<{
  more: []
}>()

// The rows standing for the coming page: enough to fill what a thumb flicks into view while it loads,
// few enough to leave the end of a short list near the last row.
const PLACEHOLDERS = 2

const placeholder = ref<HTMLElement | null>(null)
// Set from the moment [more] is emitted, so that a scroll answered before the caller has set
// [loading] does not ask for the same page twice.
let asked = false

/**
 * Asks for the next page once the end comes within a screen of the bottom of the window. Measured
 * against the window rather than observed, since the box that scrolls is the app's and its edges are
 * not the window's: an observer rooted anywhere else would only see the end once it is on screen.
 */
function check() {
  const element = placeholder.value
  if (!element || asked || !props.more || props.loading || props.error) {
    return
  }
  // Drawn nothing from `sm:`, where a box with no layout would read as at the top of the window.
  if (element.getClientRects().length === 0) {
    return
  }
  const view = element.ownerDocument.defaultView
  if (view && element.getBoundingClientRect().top < view.innerHeight * 2) {
    asked = true
    emit('more')
  }
}

let frame = 0
function schedule() {
  const view = placeholder.value?.ownerDocument.defaultView
  if (!view || frame) {
    return
  }
  frame = view.requestAnimationFrame(() => {
    frame = 0
    check()
  })
}

// Once a page has been added the end has moved, and it may still be in reach: a page shorter than
// the window asks for the next at once, so that a short first page fills the screen.
watch(
  () => [props.loading, props.more, props.error],
  () => {
    asked = asked && props.loading
    check()
  },
  { flush: 'post' }
)

// Which document holds the end is only known once drawn: a demo's frame is another window.
let listening: Window | null = null

onMounted(() => {
  listening = placeholder.value?.ownerDocument.defaultView ?? window
  listening.document.addEventListener('scroll', schedule, { capture: true, passive: true })
  listening.addEventListener('resize', schedule, { passive: true })
  check()
})

onBeforeUnmount(() => {
  listening?.document.removeEventListener('scroll', schedule, { capture: true })
  listening?.removeEventListener('resize', schedule)
  if (frame) {
    listening?.cancelAnimationFrame(frame)
  }
})
</script>

<template>
  <!-- One region from the first page to the last, since a screen reader is only told of a region
       already there: it says a page is on its way, then that the list is whole. First of the rows it
       draws, so that the last of them is the one drawn without a rule under it. -->
  <tr v-if="!error" class="sm:hidden" :class="{ 'sr-only': more }">
    <td class="w-full">
      <p role="status" class="text-center text-xs text-gray-500">
        <template v-if="!more">{{ endLabel }}</template>
        <template v-else-if="loading">{{ loadingLabel }}</template>
      </p>
    </td>
  </tr>

  <template v-if="more && !error">
    <tr
      v-for="index in PLACEHOLDERS"
      :key="index"
      :ref="index === 1 ? (element) => (placeholder = element as HTMLElement | null) : undefined"
      class="sm:hidden"
      aria-hidden="true"
    >
      <td class="w-full">
        <div class="flex flex-col gap-2 py-0.5">
          <SaSkeleton class="h-4" :class="index === 1 ? 'w-1/3' : 'w-2/5'" />
          <SaSkeleton class="h-3" :class="index === 1 ? 'w-3/5' : 'w-1/2'" />
        </div>
      </td>
    </tr>
  </template>

  <tr v-if="error" class="sm:hidden">
    <td class="w-full">
      <SaAlert color="danger" class="flex items-center justify-between gap-3 py-1 pr-1">
        <span>{{ error }}</span>
        <SaButton class="shrink-0" variant="secondary" :label="retryLabel" @click="emit('more')" />
      </SaAlert>
    </td>
  </tr>
</template>
