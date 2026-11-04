<script lang="ts" setup>
import { computed, ref } from 'vue'
import SaAlert from './SaAlert.vue'
import SaLoadingState from './SaLoadingState.vue'
import { useSaAutoPageSize } from './useSaAutoPageSize'

/**
 * Any table of records, and what it shows instead of one while it waits, fails or holds nothing. Below
 * `sm:` every row is a card: the markup stays the table's own, so a column added to a screen reaches
 * the phone with it.
 */
const props = withDefaults(
  defineProps<{
    /** Says what is being waited for while [loading]. */
    loadingLabel: string
    loading?: boolean
    error?: string | null
    empty?: boolean
    tableLayout?: 'fixed' | 'auto'
    /**
     * Fills the height of the parent: rows scroll inside the table while the header row and the
     * footer stay pinned. The parent must have a height set by the layout.
     */
    fill?: boolean
    /** Derives the number of rows per page from the height available in [fill] mode. */
    autoPageSize?: boolean
    minPageSize?: number
  }>(),
  {
    loading: false,
    error: null,
    empty: false,
    tableLayout: 'auto',
    fill: false,
    autoPageSize: false,
    minPageSize: 1
  }
)

const emit = defineEmits<{
  pageSizeChange: [size: number]
}>()

const viewport = ref<HTMLElement | null>(null)

useSaAutoPageSize(viewport, {
  enabled: () => props.fill && props.autoPageSize,
  minSize: props.minPageSize,
  onChange: (size) => emit('pageSizeChange', size)
})

const showsTable = computed(() => !props.loading && !props.error && !props.empty)
</script>

<template>
  <div :class="fill ? 'flex h-full min-h-0 flex-col' : ''">
    <div
      ref="viewport"
      :class="[
        fill ? 'min-h-0 flex-1 overflow-x-auto overflow-y-auto' : 'overflow-x-auto',
        showsTable ? 'sm:rounded-lg sm:border sm:border-gray-200 sm:bg-white' : ''
      ]"
    >
      <SaLoadingState v-if="loading" :label="loadingLabel" :centered="fill" />

      <SaAlert v-else-if="error" color="danger">
        {{ error }}
      </SaAlert>

      <div v-else-if="empty" :class="fill ? 'flex h-full items-center justify-center' : ''">
        <slot name="empty" />
      </div>

      <table
        v-else
        class="sa-table-as-cards w-full divide-y divide-gray-200"
        :class="[
          tableLayout === 'auto' ? 'table-auto' : 'table-fixed',
          fill ? 'sa-table-pinned-header' : ''
        ]"
      >
        <thead class="bg-gray-50">
          <tr>
            <slot name="header" />
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white [&>tr:hover]:bg-gray-50">
          <slot name="rows" />
        </tbody>
      </table>
    </div>

    <div v-if="$slots.footer" class="mt-4 shrink-0">
      <slot name="footer" />
    </div>
  </div>
</template>
