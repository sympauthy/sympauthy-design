<script lang="ts" setup>
import { useFieldDescription } from './fieldDescription'

/**
 * Several lines of text a person types. [rows] is the height it opens at, and the only thing that
 * distinguishes one from another.
 */
withDefaults(
  defineProps<{
    rows?: number
    /** For a value read character by character: a JSON document, a list of identifiers. */
    mono?: boolean
    /** Draws the error border; pair it with FormField's `error`. */
    invalid?: boolean
  }>(),
  {
    rows: 2,
    mono: false,
    invalid: false
  }
)

const model = defineModel<string>({ default: '' })
const description = useFieldDescription()
</script>

<template>
  <textarea
    v-model="model"
    :rows="rows"
    :aria-describedby="description"
    :aria-invalid="invalid || undefined"
    class="control control-focus control-field block w-full"
    :class="[mono ? 'font-mono' : '', invalid ? 'border-danger' : '']"
  />
</template>
