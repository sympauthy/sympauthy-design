<script lang="ts" setup>
import { computed, ref, watch, type Component } from 'vue'
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import {
  ListboxContent,
  ListboxFilter,
  ListboxItem,
  ListboxItemIndicator,
  ListboxRoot
} from 'reka-ui'
import { useFieldDescription } from './fieldDescription'

export interface SaListboxOption {
  value: string
  label: string
  /** A 12px mark after the label, where it says what the label cannot. */
  icon?: Component
  /** What [icon] says to a screen reader. */
  iconLabel?: string
}

/**
 * A choice among options whose number the build does not know. It scrolls rather than grows, and
 * grows a search field once the list is longer than it shows, so a set a deployment configures can
 * never render past the bottom of the screen.
 *
 * What is chosen travels as a list whether one may be chosen or several, so that callers bind the
 * same shape and this is the only place a single value and a list of them meet.
 */
const props = withDefaults(
  defineProps<{
    options: SaListboxOption[]
    /** What is chosen, holding at most one value unless [multiple]. */
    selected: string[]
    /** Names what is being searched, where the list is long enough to be. */
    searchPlaceholder: string
    /** Said in place of the options when the search matches none. */
    noMatchLabel: string
    multiple?: boolean
    /** Names the list itself, which the label beside it does not do: it points at nothing. */
    ariaLabel?: string
  }>(),
  {
    multiple: false,
    ariaLabel: undefined
  }
)

const emit = defineEmits<{
  select: [values: string[]]
}>()

const description = useFieldDescription()

/**
 * The length past which a list is searched rather than read. Under it a search field is one more
 * thing to look at before the answer, which is already in sight.
 */
const SEARCHED_FROM = 8

const search = ref('')

const searchable = computed(() => props.options.length >= SEARCHED_FROM)

// The set can change under the control, and a search written for the old set hides most of the new
// one without saying why.
watch(
  () => props.options,
  () => {
    search.value = ''
  }
)

const matches = computed(() => {
  const typed = search.value.trim().toLowerCase()
  if (typed === '') {
    return props.options
  }
  return props.options.filter((option) => option.label.toLowerCase().includes(typed))
})

// The primitive models one value where one may be chosen and a list where several may; the caller
// holds a list either way.
const model = computed(() => (props.multiple ? props.selected : (props.selected[0] ?? '')))

function onUpdate(value: unknown) {
  if (props.multiple) {
    emit('select', (value as string[] | undefined) ?? [])
  } else {
    emit('select', value ? [value as string] : [])
  }
}
</script>

<template>
  <ListboxRoot
    :multiple="props.multiple"
    :model-value="model"
    :selection-behavior="props.multiple ? 'toggle' : 'replace'"
    highlight-on-hover
    class="rounded-md border border-gray-400 bg-white"
    @update:model-value="onUpdate"
  >
    <div v-if="searchable" class="relative border-b border-gray-200 p-2">
      <MagnifyingGlassIcon class="absolute top-1/2 left-5 size-4 -translate-y-1/2 text-gray-400" />
      <ListboxFilter
        v-model="search"
        class="sa-control sa-control-focus sa-control-field block w-full pl-9"
        :placeholder="props.searchPlaceholder"
      />
    </div>

    <ListboxContent
      class="max-h-56 overflow-y-auto py-1"
      :aria-label="props.ariaLabel"
      :aria-describedby="description"
    >
      <ListboxItem
        v-for="option in matches"
        :key="option.value"
        :value="option.value"
        class="sa-menu-item justify-between text-gray-700 data-[highlighted]:bg-gray-100"
      >
        <span class="flex min-w-0 items-center gap-1">
          <span class="truncate">{{ option.label }}</span>
          <component :is="option.icon" v-if="option.icon" class="size-3 shrink-0" />
          <span v-if="option.iconLabel" class="sr-only">{{ option.iconLabel }}</span>
        </span>
        <ListboxItemIndicator>
          <CheckIcon class="size-4 shrink-0 text-primary" />
        </ListboxItemIndicator>
      </ListboxItem>

      <!-- Nothing the search matches, which is a list and not a failure. -->
      <p v-if="matches.length === 0" class="px-4 py-2 text-sm text-gray-500">
        {{ props.noMatchLabel }}
      </p>
    </ListboxContent>
  </ListboxRoot>
</template>
