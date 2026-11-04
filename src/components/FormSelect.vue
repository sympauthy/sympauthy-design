<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useFieldDescription } from './fieldDescription'

/**
 * A choice among the values a field admits, written as `option` elements in the default slot. The
 * browser's arrow is replaced by a chevron, since it follows neither the theme nor the box's
 * padding, and a list the deployment sizes reaches for `FormListbox` instead.
 */
const props = withDefaults(
  defineProps<{
    /** Draws the error border; pair it with FormField's `error`. */
    invalid?: boolean
  }>(),
  {
    invalid: false
  }
)

const model = defineModel<string>({ default: '' })
const description = useFieldDescription()

// As FormInput: `class` sizes the wrapper the chevron is positioned against, and everything else a
// caller says is said to the select.
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const fieldAttrs = computed(() => {
  const rest = { ...attrs }
  delete rest.class
  delete rest.style
  return rest
})
</script>

<template>
  <div class="relative" :class="attrs.class" :style="attrs.style">
    <select
      :aria-describedby="description"
      v-bind="fieldAttrs"
      v-model="model"
      :aria-invalid="props.invalid || undefined"
      class="control control-focus control-field block w-full appearance-none pr-9"
      :class="props.invalid ? 'border-danger' : ''"
    >
      <slot />
    </select>
    <ChevronDownIcon
      class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500"
    />
  </div>
</template>
