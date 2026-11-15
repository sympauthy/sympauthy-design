<script lang="ts" setup>
import { computed, ref, watch, type Component } from 'vue'
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import {
  ListboxContent,
  ListboxFilter,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
  ListboxItemIndicator,
  ListboxRoot
} from 'reka-ui'
import { useFieldDescription } from './fieldDescription'
import { useFieldLabel } from './fieldLabel'

export interface SaListboxOption {
  value: string
  label: string
  /** A text after the label in a quieter ink, as the region of a city. Searched with the label. */
  secondary?: string
  /** A text in the mono face toward the option's trailing end, as an offset. Never cut short. */
  meta?: string
  /** The words of the heading the option sits under. A heading is drawn each time it changes. */
  groupLabel?: string
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
    /**
     * Names the list itself, outside a `SaField`: the label beside it points at nothing. In a field,
     * the field's label names it.
     */
    ariaLabel?: string
    /**
     * Fills the height of what holds it and draws no box of its own, its list scrolling under the
     * search rather than stopping at 224px: for a list that is the whole of a sheet.
     */
    fill?: boolean
  }>(),
  {
    multiple: false,
    ariaLabel: undefined,
    fill: false
  }
)

const emit = defineEmits<{
  select: [values: string[]]
}>()

/** What is typed in the search, for a caller ordering the options by whether one is typed. */
const search = defineModel<string>('search', { default: '' })

const description = useFieldDescription()
const field = useFieldLabel()

const name = computed(() => props.ariaLabel ?? field?.value.text)

/**
 * The length past which a list is searched rather than read. Under it a search field is one more
 * thing to look at before the answer, which is already in sight.
 */
const SEARCHED_FROM = 8

// An option of empty value stands for nothing chosen, as a combobox's "Clear", and is not one of the
// values a person looks for.
const searchable = computed(
  () => props.options.filter((option) => option.value !== '').length >= SEARCHED_FROM
)

// The set can change under the control, and a search written for the old set hides most of the new
// one without saying why. The same set in another order is not a new one: a caller ordering the
// options by the search would otherwise clear what is being typed.
watch(
  () =>
    props.options
      .map((option) => option.value)
      .sort()
      .join('\n'),
  () => {
    search.value = ''
  }
)

const searching = computed(() => search.value.trim() !== '')

const matches = computed(() => {
  const typed = search.value.trim().toLowerCase()
  if (typed === '') {
    return props.options
  }
  return props.options.filter((option) =>
    [option.label, option.secondary, option.meta].some((text) =>
      text?.toLowerCase().includes(typed)
    )
  )
})

/**
 * The options in runs sharing a heading, each run starting where `groupLabel` changes. A search
 * draws no heading: its matches are one run, in the order the options were passed.
 */
const runs = computed(() => {
  const found: { label?: string; options: SaListboxOption[] }[] = []
  for (const option of matches.value) {
    const label = searching.value ? undefined : option.groupLabel
    const last = found[found.length - 1]
    if (last && last.label === label) {
      last.options.push(option)
    } else {
      found.push({ label, options: [option] })
    }
  }
  return found
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

// The primitive's root is generic, which InstanceType cannot read: this is what is called on it.
const root = ref<{ highlightSelected: () => Promise<void> }>()
const filter = ref<InstanceType<typeof ListboxFilter>>()

/**
 * Gives the list the focus, for a caller opening it: the search where there is one, and the chosen
 * option otherwise, or the first where none is. The list is scrolled to the choice either way.
 */
function focus() {
  if (searchable.value) {
    ;(filter.value?.$el as HTMLElement | undefined)?.focus()
  }
  root.value?.highlightSelected()
}

defineExpose({ focus })
</script>

<template>
  <ListboxRoot
    ref="root"
    :multiple="props.multiple"
    :model-value="model"
    :selection-behavior="props.multiple ? 'toggle' : 'replace'"
    highlight-on-hover
    :class="
      props.fill
        ? 'flex min-h-0 flex-1 flex-col bg-white'
        : 'rounded-md border border-gray-400 bg-white'
    "
    @update:model-value="onUpdate"
  >
    <div v-if="searchable" class="relative shrink-0 border-b border-gray-200 p-2">
      <MagnifyingGlassIcon class="absolute top-1/2 left-5 size-4 -translate-y-1/2 text-gray-400" />
      <ListboxFilter
        ref="filter"
        v-model="search"
        class="sa-control sa-control-focus sa-control-field block w-full pl-9"
        :placeholder="props.searchPlaceholder"
      />
    </div>

    <ListboxContent
      class="overflow-y-auto py-1"
      :class="props.fill ? 'min-h-0 flex-1' : 'max-h-56'"
      :aria-label="name"
      :aria-describedby="description"
    >
      <template v-for="(run, index) in runs" :key="`${index}:${run.label ?? ''}`">
        <component :is="run.label ? ListboxGroup : 'div'" class="contents">
          <ListboxGroupLabel v-if="run.label" class="sa-field-label block px-4 pt-3 pb-1">
            {{ run.label }}
          </ListboxGroupLabel>
          <ListboxItem
            v-for="option in run.options"
            :key="option.value"
            :value="option.value"
            class="sa-menu-item text-gray-700 data-[highlighted]:bg-gray-100"
          >
            <!-- The label and the secondary text are cut short together; the meta never is. -->
            <span class="flex min-w-0 flex-1 items-center gap-1">
              <span class="truncate"
                >{{ option.label
                }}<span v-if="option.secondary" class="text-gray-500">{{
                  ` · ${option.secondary}`
                }}</span></span
              >
              <component :is="option.icon" v-if="option.icon" class="size-3 shrink-0" />
              <span v-if="option.iconLabel" class="sr-only">{{ option.iconLabel }}</span>
            </span>
            <!-- Read between the label and the meta, and dropped from the layout. -->
            {{ ' ' }}
            <span v-if="option.meta" class="shrink-0 font-mono text-gray-500">{{
              option.meta
            }}</span>
            <!-- Its place is kept, so that the metas of a column line up whichever is chosen. -->
            <span class="flex size-4 shrink-0">
              <ListboxItemIndicator>
                <CheckIcon class="size-4 text-primary" />
              </ListboxItemIndicator>
            </span>
          </ListboxItem>
        </component>
      </template>

      <!-- Nothing the search matches, which is a list and not a failure. -->
      <p v-if="matches.length === 0" class="px-4 py-2 text-sm text-gray-500">
        {{ props.noMatchLabel }}
      </p>
    </ListboxContent>
  </ListboxRoot>
</template>
