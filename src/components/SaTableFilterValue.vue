<script lang="ts" setup>
import { computed, ref } from 'vue'
import SaInput from './SaInput.vue'
import SaListbox from './SaListbox.vue'
import SaTagsInput from './SaTagsInput.vue'
import {
  saFilterIsMultiValued,
  saFilterValues,
  type SaFilterCriterion,
  type SaFilterField,
  type SaFilterLabels,
  type SaFilterPatch
} from './saFilter'

/**
 * The control one filter's value is filled in with: the set the field publishes where that set is
 * closed, and the field's own type where it is open.
 *
 * It renders nothing for an operator taking no value; the popover holding it decides not to ask.
 */
const props = defineProps<{
  /** Reaches the field a label can point at. A list of values names itself by its `aria-label`. */
  id: string
  field: SaFilterField
  criterion: SaFilterCriterion
  labels: SaFilterLabels
}>()

const emit = defineEmits<{
  update: [patch: SaFilterPatch]
  /** The value is written and the popover has nothing more to ask. */
  submit: []
}>()

const multiValued = computed(() => saFilterIsMultiValued(props.criterion.operator))

const options = computed(() => {
  const values = saFilterValues(props.field, props.labels.yes, props.labels.no)
  return values?.map((value) => ({ value: value.value, label: value.name })) ?? null
})

// One value or several, the list is what the option list reads; which of the two the filter holds
// is the operator's answer.
const selected = computed(() => {
  if (multiValued.value) {
    return props.criterion.values
  }
  return props.criterion.value === '' ? [] : [props.criterion.value]
})

const typedValues = computed({
  get: () => props.criterion.values,
  set: (values: string[]) => emit('update', { values })
})

const inputType = computed(() => {
  switch (props.field.type) {
    case 'date':
      return 'date'
    case 'date_time':
      return 'datetime-local'
    case 'number':
      return 'number'
    default:
      return 'text'
  }
})

/**
 * Reads a pick from the option list.
 *
 * The list answers a pick whether or not it changed anything, and one value replaces the value it
 * already holds, so picking what is already picked would ask the list again for the answer it is
 * showing, and ask it from the first page.
 */
function onSelect(values: string[]) {
  if (multiValued.value) {
    emit('update', { values })
    return
  }
  const value = values[0] ?? ''
  if (value !== props.criterion.value) {
    emit('update', { value })
  }
}

const tags = ref<InstanceType<typeof SaTagsInput> | null>(null)

/**
 * Settles what the rendered control holds but has not handed over yet. Only a list of values has
 * any: the others write every keystroke straight into the filter.
 */
function flush() {
  tags.value?.flush()
}

defineExpose({ flush })

/**
 * Reads Enter as the end of a value typed into a field.
 *
 * An input method confirming a candidate sends the same key, and that Enter belongs to the word
 * being written rather than to the filter around it. The two lists do not go through here at all:
 * one adds a value with Enter and the other picks one with it.
 */
function onValueKeydown(event: KeyboardEvent) {
  if (event.isComposing) {
    return
  }
  emit('submit')
}
</script>

<template>
  <SaListbox
    v-if="options"
    :options="options"
    :selected="selected"
    :multiple="multiValued"
    :search-placeholder="props.labels.searchValues"
    :no-match-label="props.labels.noMatch"
    :aria-label="props.field.name"
    @select="onSelect"
  />

  <!-- An `in` over a field publishing no values: a person enters the list themselves, one value at
       a time, and never meets the separator it travels under. -->
  <SaTagsInput
    v-else-if="multiValued"
    ref="tags"
    v-model="typedValues"
    :remove-label="props.labels.removeValue"
    :placeholder="props.labels.addValue"
    :aria-label="props.field.name"
  />

  <SaInput
    v-else
    :id="props.id"
    :type="inputType"
    :model-value="props.criterion.value"
    :aria-label="props.field.name"
    @update:model-value="(value: string) => emit('update', { value })"
    @keydown.enter="onValueKeydown"
  />
</template>
