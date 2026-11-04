<script lang="ts" setup>
import { computed } from 'vue'
import SaTableFilter from './SaTableFilter.vue'
import type { SaFilterCriterion, SaFilterField, SaFilterLabels } from './saFilter'
import type { SaFilters } from './useSaFilters'

/**
 * The band of a table saying what narrows it: its filters, how many records are left, and the way
 * back to all of them. It goes in the table's `#filters` slot, and draws nothing while no filter is
 * applied, since it has nothing to say.
 */
const props = defineProps<{
  filters: SaFilters
  labels: SaFilterLabels
}>()

/**
 * Each filter beside the field it names, paired once.
 *
 * The band is read again on every letter typed into a filter, and the fields are the source's, so
 * the pairing is done here rather than twice per filter in the template. A filter naming a field no
 * longer published is dropped from the band: there is no control to draw it with.
 */
const shown = computed(() =>
  props.filters.criteria
    .map((criterion) => ({
      criterion,
      field: props.filters.fields.find((field) => field.field === criterion.field)
    }))
    .filter(
      (pair): pair is { criterion: SaFilterCriterion; field: SaFilterField } =>
        pair.field !== undefined
    )
)
</script>

<template>
  <div
    v-if="shown.length > 0"
    class="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 bg-gray-50 px-3 py-2.5 sm:px-4"
  >
    <ul
      :aria-label="props.labels.list"
      class="flex max-w-full min-w-0 basis-full flex-wrap items-center gap-2 sm:flex-1 sm:basis-60"
    >
      <SaTableFilter
        v-for="{ criterion, field } in shown"
        :key="criterion.id"
        :field="field"
        :criterion="criterion"
        :labels="props.labels"
        :open-on-mount="criterion.id === props.filters.added"
        @update="(patch) => props.filters.update(criterion.id, patch)"
        @remove="props.filters.remove(criterion.id)"
      />
    </ul>
    <!-- A status, since the count changes under a person who just changed a filter. -->
    <p
      v-if="$slots.summary"
      role="status"
      class="min-w-0 flex-1 text-sm text-gray-700 sm:flex-none"
    >
      <slot name="summary" />
    </p>
    <button
      type="button"
      class="sa-link inline-flex min-h-control min-w-control items-center justify-center px-2 text-sm font-medium"
      @click="props.filters.clear()"
    >
      {{ props.labels.clear }}
    </button>
  </div>
</template>
