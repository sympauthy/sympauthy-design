<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDownIcon, ArrowsUpDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import SaButton from './SaButton.vue'
import SaListbox from './SaListbox.vue'
import { usePortalBody } from './portalBody'
import type { SaSort } from './useSaSort'

/**
 * The order of a table on a phone, where the header row holding it is not drawn. It goes in the
 * table's `#toolbar` slot, says the order the list is in, and offers the others. From `sm:` the
 * headers do this, and it draws nothing.
 *
 * It says an order the way a header does, as a field's name and an arrow after it, on the control
 * and in the list alike. A person moving between widths then reads one order, and the words an order
 * would otherwise need cannot push the rest of the toolbar off its line. Where the list is in no
 * order it can name, the control says "Sort".
 */
const props = defineProps<{
  sort: SaSort
}>()

const { t } = useI18n()
const portalBody = usePortalBody()

const open = ref(false)

const orderOf = (field: string, descending: boolean) => `${descending ? '-' : ''}${field}`

const options = computed(() =>
  props.sort.fields.flatMap((field) =>
    [false, true].map((descending) => ({
      value: orderOf(field.field, descending),
      label: field.name,
      icon: descending ? ArrowDownIcon : ArrowUpIcon,
      iconLabel: descending ? t('sa.tableSort.descending') : t('sa.tableSort.ascending'),
      field: field.field,
      descending
    }))
  )
)

const current = computed(() => {
  const key = props.sort.keys[0]
  return key ? orderOf(key.field, key.descending) : undefined
})

const chosen = computed(() => options.value.find((option) => option.value === current.value))

// What a screen reader is told and what a pointer shows, since an arrow tells the first nothing. It
// starts with what the control shows, so that a person speaking to their device can name it
// (WCAG 2.5.3).
const accessibleName = computed(() =>
  chosen.value ? `${chosen.value.label}, ${chosen.value.iconLabel}` : t('sa.tableSort.sort')
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
      <SaButton
        class="sm:hidden"
        variant="secondary"
        :label="accessibleName"
        :aria-label="accessibleName"
        :trailing-icon="chosen?.icon ?? ArrowsUpDownIcon"
      >
        {{ chosen?.label ?? t('sa.tableSort.sort') }}
      </SaButton>
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
          :search-placeholder="t('sa.tableSort.search')"
          :aria-label="t('sa.tableSort.sort')"
          @select="onSelect"
        />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
