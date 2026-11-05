<script lang="ts" setup>
import { computed, ref } from 'vue'
import SaAlert from './SaAlert.vue'
import SaLoadingState from './SaLoadingState.vue'
import { useSaAutoPageSize } from './useSaAutoPageSize'

/**
 * A list of records in one card: what narrows it, its rows or what it shows instead of them while it
 * waits, fails or holds nothing, and what pages it. Below `sm:` a row is laid out down rather than
 * across: the markup stays the table's own, so a column added to a screen reaches the phone with it.
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
  <div
    class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    :class="fill ? 'h-full min-h-0' : ''"
  >
    <div
      v-if="$slots.toolbar"
      class="sa-table-toolbar flex shrink-0 flex-wrap items-center gap-2 border-b border-gray-200 p-3 sm:p-4"
    >
      <slot name="toolbar" />
    </div>

    <slot name="filters" />

    <div
      ref="viewport"
      :class="fill ? 'min-h-0 flex-1 overflow-x-auto overflow-y-auto' : 'overflow-x-auto'"
    >
      <SaLoadingState v-if="loading" class="p-4" :label="loadingLabel" :centered="fill" />

      <div v-else-if="error" class="p-4">
        <SaAlert color="danger">
          {{ error }}
        </SaAlert>
      </div>

      <div
        v-else-if="empty"
        class="px-4 py-8 text-center"
        :class="fill ? 'flex h-full items-center justify-center' : ''"
      >
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

    <div v-if="$slots.footer" class="shrink-0 border-t border-gray-200 px-3 py-2 sm:px-4 sm:py-3">
      <slot name="footer" />
    </div>
  </div>
</template>
