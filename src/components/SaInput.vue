<script lang="ts" setup>
import { computed, useAttrs, type Component } from 'vue'
import { useFieldDescription } from './fieldDescription'

/**
 * A single line of text, drawn the same in both apps: the box every control shares, with 16px
 * text, below which iOS zooms the page on focus.
 */
const props = withDefaults(
  defineProps<{
    type?: string
    /** Drawn inside the field on its leading edge, for a field whose purpose the icon names. */
    icon?: Component
    /** For a value read character by character: an identifier, a token, a URL. */
    mono?: boolean
    /** Draws the error border; pair it with SaField's `error`. */
    invalid?: boolean
  }>(),
  {
    type: 'text',
    icon: undefined,
    mono: false,
    invalid: false
  }
)

const model = defineModel<string>({ default: '' })
const description = useFieldDescription()

// The field is wrapped, so that an icon has something to be positioned against. That wrapper is
// what a caller sizes — `class` reaches it — while everything else a caller says is said to the
// field itself: a placeholder on a `div` would never be read.
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const fieldAttrs = computed(() => {
  const rest = { ...attrs }
  delete rest.class
  delete rest.style
  return rest
})

const classes = computed(() => [
  'sa-control sa-control-focus sa-control-field block w-full',
  props.invalid ? 'border-danger' : '',
  props.icon ? 'pl-9' : '',
  props.mono ? 'font-mono' : ''
])
</script>

<template>
  <div class="relative" :class="attrs.class" :style="attrs.style">
    <component
      :is="props.icon"
      v-if="props.icon"
      class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400"
    />
    <input
      :aria-describedby="description"
      v-bind="fieldAttrs"
      v-model="model"
      :type="props.type"
      :aria-invalid="props.invalid || undefined"
      :class="classes"
    />
  </div>
</template>
