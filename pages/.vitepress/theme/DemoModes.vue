<script setup lang="ts">
import { computed, ref, useId, useSlots } from 'vue'
import DemoFrame from './DemoFrame.vue'
import { MODES, type DemoMode, type DemoModeFrame } from './demo-modes'

/**
 * One demo, a tab each for what it shows on the page and for its modes, drawn one at a time: a frame
 * per mode, stacked under the demo on the page, runs longer than the page around it.
 *
 * The `#inline` slot is the first tab, drawn on the page at the reader's own width, as its states and
 * variants. The default slot is drawn in a single `DemoFrame` for each mode's tab, which stays as the
 * tab changes between modes, so the demo keeps its state and only its width answers. It is handed
 * the open tab's entry, as `v-slot="{ frame }"`, for a demo whose content changes with it.
 */
const props = withDefaults(
  defineProps<{
    /** The modes' tabs, in order: a mode, or an entry naming one. */
    modes: (DemoMode | DemoModeFrame)[]
    /** Names the strip of tabs. */
    label?: string
    /** What every mode's frame takes, where its entry says nothing. */
    height?: number
    crop?: number
    flush?: boolean
  }>(),
  {
    label: 'Views of this demo',
    flush: false
  }
)

const slots = useSlots()

/** The tabs, `null` standing for the one on the page. */
const tabs = computed(() => [
  ...(slots.inline ? [null] : []),
  ...props.modes.map((entry): DemoModeFrame =>
    typeof entry === 'string' ? { mode: entry } : entry
  )
])
const nameOf = (frame: DemoModeFrame | null) =>
  frame ? (frame.label ?? MODES[frame.mode].label) : 'Inline'

const id = useId()
const selected = ref(0)
const current = computed(() => tabs.value[selected.value] ?? null)
const shown = computed(() =>
  current.value
    ? {
        mode: current.value.mode,
        label: nameOf(current.value),
        height: current.value.height ?? props.height,
        crop: current.value.crop ?? props.crop,
        flush: current.value.flush ?? props.flush
      }
    : null
)

const buttons = ref<HTMLButtonElement[]>([])

/** Arrows, Home and End move between the tabs and open the one they reach. */
function onKeydown(event: KeyboardEvent) {
  const last = tabs.value.length - 1
  const next = {
    ArrowLeft: selected.value === 0 ? last : selected.value - 1,
    ArrowRight: selected.value === last ? 0 : selected.value + 1,
    Home: 0,
    End: last
  }[event.key]
  if (next === undefined) {
    return
  }
  event.preventDefault()
  selected.value = next
  buttons.value[next]?.focus()
}
</script>

<template>
  <div class="demo-modes">
    <div role="tablist" :aria-label="label" class="demo-modes-tabs" @keydown="onKeydown">
      <button
        v-for="(tab, index) in tabs"
        :id="`${id}-tab-${index}`"
        :key="index"
        ref="buttons"
        type="button"
        role="tab"
        class="demo-modes-tab"
        :aria-selected="index === selected"
        :aria-controls="`${id}-panel`"
        :tabindex="index === selected ? 0 : -1"
        @click="selected = index"
      >
        {{ nameOf(tab) }}
      </button>
    </div>
    <div :id="`${id}-panel`" role="tabpanel" :aria-labelledby="`${id}-tab-${selected}`">
      <DemoFrame v-if="shown" v-bind="shown" label-hidden>
        <slot :frame="current" />
      </DemoFrame>
      <slot v-else name="inline" />
    </div>
  </div>
</template>
