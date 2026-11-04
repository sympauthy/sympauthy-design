<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * A demo drawn at the width of a device, for a component that changes at a breakpoint. A breakpoint
 * reads the viewport, so the demo is teleported into an iframe of that width, where it keeps the
 * page's state and its media queries answer the frame. A frame too wide for the page is scaled down.
 *
 * reka-ui's portals open on the page and not in the frame, so a framed demo opens no overlay.
 * `SaPageActions` looks for its bar on the page too, so a framed demo draws `DemoPageActions`.
 */
const MODES = {
  phone: { width: 390, label: 'Phone' },
  tablet: { width: 768, label: 'Tablet' },
  desktop: { width: 1024, label: 'Desktop' }
}

const EMPTY_DOCUMENT =
  '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>'

const props = defineProps<{
  mode: keyof typeof MODES
  /** Says which widths it stands for, where that is more than its mode, as "Tablet and desktop". */
  label?: string
  /** The frame's height, for a demo filling the viewport. Without it the frame fits its demo. */
  height?: number
  /** Shows only this much of the frame's width, at full size, for a demo narrower than the frame. */
  crop?: number
  /** Draws the demo against the frame's edges. */
  flush?: boolean
}>()

const frameWidth = computed(() => MODES[props.mode].width)
const shownWidth = computed(() => props.crop ?? frameWidth.value)
const caption = computed(() => props.label ?? MODES[props.mode].label)

const box = ref<HTMLElement>()
const frame = ref<HTMLIFrameElement>()
const body = ref<HTMLElement>()
const mounted = ref(false)
const availableWidth = ref(Infinity)
const fittedHeight = ref(0)

const scale = computed(() => Math.min(1, availableWidth.value / shownWidth.value))
const frameHeight = computed(() => props.height ?? fittedHeight.value)

const stop: (() => void)[] = []

/** Gives the frame the page's stylesheets, again only when they changed: Vite swaps them on a save. */
function copyStyles(doc: Document) {
  let copied = ''
  const copy = () => {
    const sheets = [...document.head.querySelectorAll('link[rel~="stylesheet"], style')]
    const current = sheets.map((sheet) => sheet.outerHTML).join()
    if (current === copied) {
      return
    }
    copied = current
    doc.head.querySelectorAll('[data-copied]').forEach((sheet) => sheet.remove())
    for (const sheet of sheets) {
      const clone = doc.importNode(sheet, true) as HTMLElement
      clone.dataset.copied = ''
      doc.head.append(clone)
    }
  }
  copy()
  const observer = new MutationObserver(copy)
  observer.observe(document.head, { childList: true, subtree: true, characterData: true })
  stop.push(() => observer.disconnect())
}

/** Keeps the frame on the page's theme, which `tokens.css` reads from `data-theme`. */
function copyTheme(doc: Document) {
  const copy = () => {
    doc.documentElement.className = document.documentElement.className
    const theme = document.documentElement.dataset.theme
    if (theme) {
      doc.documentElement.dataset.theme = theme
    } else {
      delete doc.documentElement.dataset.theme
    }
  }
  copy()
  const observer = new MutationObserver(copy)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme']
  })
  stop.push(() => observer.disconnect())
}

function onLoad() {
  const doc = frame.value?.contentDocument
  const view = frame.value?.contentWindow as (Window & typeof globalThis) | null | undefined
  if (!doc || !view) {
    return
  }
  copyStyles(doc)
  copyTheme(doc)
  doc.body.className = props.flush ? 'demo-frame-body demo-frame-flush' : 'demo-frame-body'

  const observer = new view.ResizeObserver(() => {
    fittedHeight.value = Math.ceil(doc.body.getBoundingClientRect().height)
  })
  observer.observe(doc.body)
  stop.push(() => observer.disconnect())

  body.value = doc.body
}

onMounted(() => {
  mounted.value = true
  const observer = new ResizeObserver(() => {
    availableWidth.value = box.value?.clientWidth ?? Infinity
  })
  if (box.value) {
    observer.observe(box.value)
  }
  stop.push(() => observer.disconnect())
})

onBeforeUnmount(() => stop.forEach((stopOne) => stopOne()))
</script>

<template>
  <!-- 2px wider, for the box's border. -->
  <figure class="demo-frame" :style="{ width: `${shownWidth + 2}px` }">
    <figcaption class="demo-frame-label">{{ caption }}</figcaption>
    <div ref="box" class="demo-frame-box" :style="{ height: `${frameHeight * scale}px` }">
      <iframe
        v-if="mounted"
        ref="frame"
        :srcdoc="EMPTY_DOCUMENT"
        :title="caption"
        :style="{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          transform: `scale(${scale})`
        }"
        @load="onLoad"
      />
    </div>
    <Teleport v-if="body" :to="body"><slot /></Teleport>
  </figure>
</template>
