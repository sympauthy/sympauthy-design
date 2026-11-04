<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ArrowsUpDownIcon } from '@heroicons/vue/20/solid'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import SaButton from './SaButton.vue'
import SaListbox from './SaListbox.vue'
import { usePortalBody } from './portalBody'
import type { SaSort, SaSortField } from './useSaSort'

/** The words `SaTableSort` draws, since the package reads no message bundle. */
export interface SaSortLabels {
  /** Said by the control where the list is in no order it can name, as "Sort". */
  sort: string
  /** Names what is searched, where the orders are many, as "Search orders". */
  search: string
  /** Said when a search matches nothing, as "Nothing matches". */
  noMatch: string
  /** What an order reads, as "Oldest first", which a field's type or its name can decide. */
  order: (field: SaSortField, descending: boolean) => string
}

/**
 * The order of a table on a phone, where the header row holding it is not drawn. It goes in the
 * table's `#toolbar` slot, says the order the list is in, and offers the others. From `sm:` the
 * headers do this, and it draws nothing.
 */
const props = defineProps<{
  sort: SaSort
  labels: SaSortLabels
}>()

const portalBody = usePortalBody()

const open = ref(false)

const orderOf = (field: string, descending: boolean) => `${descending ? '-' : ''}${field}`

const options = computed(() =>
  props.sort.fields.flatMap((field) =>
    [false, true].map((descending) => ({
      value: orderOf(field.field, descending),
      label: props.labels.order(field, descending),
      field: field.field,
      descending
    }))
  )
)

const current = computed(() => {
  const key = props.sort.keys[0]
  return key ? orderOf(key.field, key.descending) : undefined
})

const label = computed(
  () => options.value.find((option) => option.value === current.value)?.label ?? props.labels.sort
)

// The list answers a pick whether or not it changed anything. Picking the order already chosen asks
// for the list's own, the same third press a header gives, and it is a phone's only way back to it.
function onSelect(values: string[]) {
  const picked = options.value.find((option) => option.value === values[0])
  if (picked && picked.value !== current.value) {
    props.sort.set(picked.field, picked.descending)
  } else {
    props.sort.clear()
  }
  open.value = false
}
</script>

<template>
  <PopoverRoot v-if="options.length > 0" v-model:open="open">
    <PopoverTrigger as-child>
      <SaButton class="sm:hidden" variant="secondary" :label="label" :icon="ArrowsUpDownIcon" />
    </PopoverTrigger>

    <PopoverPortal :to="portalBody">
      <PopoverContent
        align="end"
        :side-offset="4"
        :collision-padding="16"
        class="sa-overlay-animated z-50 w-64 max-w-[calc(100vw-2rem)] rounded-md"
      >
        <SaListbox
          :options="options"
          :selected="current ? [current] : []"
          :search-placeholder="props.labels.search"
          :no-match-label="props.labels.noMatch"
          :aria-label="props.labels.sort"
          @select="onSelect"
        />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
