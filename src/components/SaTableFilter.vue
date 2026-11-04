<script lang="ts" setup>
import { computed, ref, useId } from 'vue'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import SaField from './SaField.vue'
import SaSelect from './SaSelect.vue'
import SaTableFilterValue from './SaTableFilterValue.vue'
import { usePortalBody } from './portalBody'
import {
  saFilterIsComplete,
  saFilterIsMultiValued,
  saFilterIsValueless,
  saFilterValues,
  type SaFilterCriterion,
  type SaFilterField,
  type SaFilterLabels,
  type SaFilterOperator,
  type SaFilterPatch
} from './saFilter'

/**
 * One filter of a table: a control reading it as a sentence, and the popover the operator and the
 * value are filled in from. `SaTableFilters` draws one per filter.
 *
 * It is drawn as a control and not as a chip, because it is one. The value moved into the popover
 * since inside the sentence it had no room for a box of its own, and an input without one cannot be
 * seen.
 */
const props = withDefaults(
  defineProps<{
    field: SaFilterField
    criterion: SaFilterCriterion
    labels: SaFilterLabels
    /** Set on the filter just added, whose value is what a person opened the list to give. */
    openOnMount?: boolean
  }>(),
  {
    openOnMount: false
  }
)

const emit = defineEmits<{
  update: [patch: SaFilterPatch]
  remove: []
}>()

const operatorFieldId = useId()
const valueFieldId = useId()
const portalBody = usePortalBody()

const open = ref(props.openOnMount)
// What the popover focuses when it opens, read off the DOM rather than exposed by each of the value
// controls: which of them is rendered is the field's business and not this component's.
const valueBox = ref<HTMLElement | null>(null)
const value = ref<InstanceType<typeof SaTableFilterValue> | null>(null)

const valueless = computed(() => saFilterIsValueless(props.criterion.operator))

const operatorName = computed(() =>
  props.labels.operatorName(props.criterion.operator, props.field.type)
)

// A value the field published is read under the name it published it with, and one a person typed
// under what they typed.
const valueName = computed(() => {
  const values = saFilterValues(props.field, props.labels.yes, props.labels.no)
  const named = (candidate: string) =>
    values?.find((known) => known.value === candidate)?.name ?? candidate
  if (saFilterIsMultiValued(props.criterion.operator)) {
    return props.criterion.values.map(named).join(', ')
  }
  return props.criterion.value === '' ? '' : named(props.criterion.value)
})

const shownValue = computed(() =>
  valueName.value === '' ? props.labels.selectValue : valueName.value
)

// What the trigger reads when it is too narrow to show it all, which has to be the same sentence: a
// filter still waiting for a value says so, and a title stopping before that part hides the one
// thing a person has left to do.
const sentence = computed(() =>
  [props.field.name, operatorName.value, valueless.value ? '' : shownValue.value]
    .filter((part) => part !== '')
    .join(' ')
)

function onOperatorChange(operator: string) {
  // The value is cleared with the operator: `in` holds a list where the others hold one value and
  // `is_null` holds neither, so carrying one across would ask the new operator the old question.
  emit('update', { operator: operator as SaFilterOperator, value: '', values: [] })
}

/**
 * A filter still unanswerable when its popover closes is dropped. It narrows nothing, and leaving it
 * on the row is a sentence that stops halfway.
 */
function onOpenChange(opened: boolean) {
  open.value = opened
  if (opened) {
    return
  }
  // The value settles before it is judged. A list of values holds what was typed into it and not
  // yet entered, and this popover is dismissed on the pointer going down outside it, before the
  // field could lose the focus and hand it over on its own.
  value.value?.flush()
  if (!saFilterIsComplete(props.criterion)) {
    emit('remove')
  }
}

/**
 * Opens on the value rather than on the operator.
 *
 * The operator is the first control the popover holds and the one a person most often keeps, so the
 * focus the primitive would give it is a tab away from what they came to write. Where there is
 * nothing to fill in, the primitive's own choice stands.
 */
function onOpenAutoFocus(event: Event) {
  // The field the value is written in first, and the list itself where there is none to write in:
  // one selector over all three would answer whichever the markup happens to nest first.
  const box = valueBox.value
  const control =
    box?.querySelector<HTMLElement>('input, select') ??
    box?.querySelector<HTMLElement>('[role="listbox"]')
  if (!control) {
    return
  }
  event.preventDefault()
  control.focus()
}
</script>

<template>
  <PopoverRoot :open="open" @update:open="onOpenChange">
    <!-- The box is the wrapper's and the two controls inside it are real ones, so removing a filter
         stays one press and stays reachable from the keyboard. The box's border takes 2px of its
         height, so each control's target reaches over it, and only the text inside clips, or the
         box would clip that target. -->
    <li
      class="sa-control sa-control-focus-within flex max-w-full items-center border-primary bg-primary-subtle p-0 text-on-primary-subtle"
    >
      <PopoverTrigger
        class="relative flex min-w-0 items-center gap-1.5 self-stretch rounded-l-md pr-2 pl-3 text-left font-medium outline-none after:absolute after:inset-x-0 after:-inset-y-px hover:bg-primary/10 focus-visible:bg-primary/10"
        :title="sentence"
      >
        <span class="flex min-w-0 items-center gap-1 overflow-hidden">
          <span class="shrink-0 font-normal text-gray-700">{{ props.field.name }}</span>
          <span class="shrink-0">{{ operatorName }}</span>
          <span
            v-if="!valueless"
            class="min-w-0 truncate"
            :class="valueName === '' ? 'font-normal text-gray-700' : ''"
          >
            {{ shownValue }}
          </span>
        </span>
        <ChevronDownIcon class="size-3.5 shrink-0" />
      </PopoverTrigger>

      <button
        type="button"
        class="relative flex min-w-control shrink-0 items-center justify-center self-stretch rounded-r-md border-l border-primary/25 outline-none after:absolute after:inset-x-0 after:-inset-y-px hover:bg-primary/10 focus-visible:bg-primary/10"
        :title="props.labels.removeFilter(props.field.name)"
        :aria-label="props.labels.removeFilter(props.field.name)"
        @click="emit('remove')"
      >
        <XMarkIcon class="size-3.5" />
      </button>
    </li>

    <PopoverPortal :to="portalBody">
      <PopoverContent
        align="start"
        :side-offset="4"
        :collision-padding="16"
        class="sa-popover sa-overlay-animated z-50 w-72 max-w-[calc(100vw-2rem)] space-y-3 p-3"
        @open-auto-focus="onOpenAutoFocus"
      >
        <SaField :for="operatorFieldId" :label="props.labels.operator">
          <SaSelect
            :id="operatorFieldId"
            :model-value="props.criterion.operator"
            @update:model-value="onOperatorChange"
          >
            <option v-for="operator in props.field.operators" :key="operator" :value="operator">
              {{ props.labels.operatorName(operator, props.field.type) }}
            </option>
          </SaSelect>
        </SaField>

        <!-- `is_null` asks whether the row carries a value at all, so there is nothing to fill in. -->
        <div v-if="!valueless" ref="valueBox">
          <SaField :for="valueFieldId" :label="props.labels.value">
            <SaTableFilterValue
              :id="valueFieldId"
              ref="value"
              :field="props.field"
              :criterion="props.criterion"
              :labels="props.labels"
              @update="(patch) => emit('update', patch)"
              @submit="onOpenChange(false)"
            />
          </SaField>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
