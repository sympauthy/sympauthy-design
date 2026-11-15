<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'reka-ui'
import SaListbox, { type SaListboxOption } from './SaListbox.vue'
import { useFieldDescription } from './fieldDescription'
import { useFieldLabel } from './fieldLabel'
import { usePortalBody } from './portalBody'
import { saListGrowsQuery } from './useSaListGrows'

/**
 * One value among many, picked from a field that opens a `SaListbox` on request: a control for
 * `SaField`. From `sm:` the list opens in a popover under the field; below it, in a sheet the height
 * of the screen, so that a phone's keyboard never covers the list it is searching.
 *
 * The field it is drawn in gives it its label, which heads the sheet and names the list, and says
 * whether it is optional: an optional field with a value chosen leads its list with "Clear", the way
 * back to empty.
 */
export interface SaComboboxProps {
  options: SaListboxOption[]
  /** Shown while nothing is chosen, as "Choose a time zone". */
  placeholder: string
  /** Names what is being searched, where the list is long enough to be. */
  searchPlaceholder: string
  /**
   * The option the app suggests, as the time zone of the person's device. It leads the list under
   * [suggestedLabel], and is taken out of its own group. A value among none of the options does
   * nothing.
   */
  suggestedValue?: string
  /** The heading of the suggested option, as "From your device". */
  suggestedLabel?: string
  /** Draws the error border; pair it with SaField's `error`. */
  invalid?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<SaComboboxProps>(), {
  suggestedValue: undefined,
  suggestedLabel: undefined,
  invalid: false,
  disabled: false
})

const model = defineModel<string>({ default: '' })

// Everything a caller says, `id` included, is said to the button, which is what SaField's `for`
// points at.
defineOptions({ inheritAttrs: false })

const { t } = useI18n()

// Names the sheet's close button, and is its title.
const closeName = computed(() => t('sa.combobox.close'))
const description = useFieldDescription()
const field = useFieldLabel()
const portalBody = usePortalBody()
const valueId = useId()

const open = ref(false)
// Whether the list opens as a sheet, read as it opens from the window the field is drawn in, which
// is a frame's own in the site's demos.
const sheet = ref(false)
const search = ref('')

const button = ref<HTMLButtonElement>()
const listbox = ref<InstanceType<typeof SaListbox>>()

const chosen = computed(() => props.options.find((option) => option.value === model.value))

/**
 * The value of the option emptying the field. No option the app passes holds it, since an empty
 * value is what nothing chosen is, and the list hands it back as nothing chosen.
 */
const CLEARED = ''

/**
 * The options in the order the list draws them: the way back to empty first, then the suggestion
 * under its heading, then the rest under their own. A search reads the options in the order the app
 * passed them, the suggestion among them, and the list's own matching drops "Clear" unless it is
 * what is typed.
 *
 * The set stays the same while a search is typed, only its order changing, since the list clears a
 * search whose set changes under it.
 */
const listed = computed<SaListboxOption[]>(() => {
  const clear: SaListboxOption[] =
    field?.value.optional && model.value !== ''
      ? [{ value: CLEARED, label: t('sa.combobox.clear') }]
      : []
  const suggested = props.options.find((option) => option.value === props.suggestedValue)
  if (search.value.trim() !== '' || !suggested) {
    return [...clear, ...props.options]
  }
  return [
    ...clear,
    { ...suggested, groupLabel: props.suggestedLabel },
    ...props.options.filter((option) => option !== suggested)
  ]
})

/**
 * The part of the screen the sheet fills: the visual viewport, which a phone's keyboard shrinks where
 * it leaves the layout viewport whole, as iOS Safari and Chrome on Android do. Filling the layout
 * viewport would leave the end of the list under the keyboard.
 */
const visible = ref<{ top: number; height: number }>()
let stopFollowing: (() => void) | undefined

function followVisibleViewport() {
  const viewport = button.value?.ownerDocument.defaultView?.visualViewport
  if (!viewport) {
    return
  }
  const update = () => {
    visible.value = { top: viewport.offsetTop, height: viewport.height }
  }
  update()
  viewport.addEventListener('resize', update)
  viewport.addEventListener('scroll', update)
  stopFollowing = () => {
    viewport.removeEventListener('resize', update)
    viewport.removeEventListener('scroll', update)
    visible.value = undefined
  }
}

watch(
  () => open.value && sheet.value,
  (shown) => {
    stopFollowing?.()
    stopFollowing = undefined
    if (shown) {
      followVisibleViewport()
    }
  }
)

onBeforeUnmount(() => stopFollowing?.())

function show() {
  const view = button.value?.ownerDocument.defaultView
  sheet.value = !!view?.matchMedia(saListGrowsQuery()).matches
  search.value = ''
  open.value = true
}

function onPopoverOpen(opened: boolean) {
  if (opened) {
    show()
  } else {
    open.value = false
  }
}

function onSheetOpen(opened: boolean) {
  if (!opened) {
    open.value = false
  }
}

function onSelect(values: string[]) {
  model.value = values[0] ?? ''
  open.value = false
}

// The overlay would focus the first thing it holds; the list knows where its focus belongs.
function onOpenAutoFocus(event: Event) {
  event.preventDefault()
  listbox.value?.focus()
}

// The sheet has no trigger of its own to give the focus back to.
function onSheetCloseAutoFocus(event: Event) {
  event.preventDefault()
  button.value?.focus()
}
</script>

<template>
  <PopoverRoot :open="open && !sheet" @update:open="onPopoverOpen">
    <PopoverTrigger as-child>
      <button
        ref="button"
        type="button"
        :aria-labelledby="field ? `${field.id} ${valueId}` : undefined"
        :aria-describedby="description"
        v-bind="$attrs"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        class="sa-control sa-control-focus sa-control-field flex w-full items-center gap-2 text-left enabled:cursor-pointer"
        :class="invalid ? 'border-danger' : ''"
      >
        <span :id="valueId" class="flex min-w-0 flex-1 items-center gap-2">
          <template v-if="chosen">
            <span class="truncate">{{ chosen.label }}</span>
            <!-- Read between the label and the meta, and dropped from the layout. -->
            {{ ' ' }}
            <span v-if="chosen.meta" class="shrink-0 font-mono text-sm text-gray-500">{{
              chosen.meta
            }}</span>
          </template>
          <span v-else class="truncate text-gray-500">{{ placeholder }}</span>
        </span>
        <ChevronUpDownIcon class="size-4 shrink-0 text-gray-500" />
      </button>
    </PopoverTrigger>

    <PopoverPortal :to="portalBody">
      <PopoverContent
        align="start"
        :side-offset="4"
        :collision-padding="16"
        class="sa-overlay-animated z-50 w-(--reka-popover-trigger-width) rounded-md"
        @open-auto-focus="onOpenAutoFocus"
      >
        <SaListbox
          ref="listbox"
          v-model:search="search"
          :options="listed"
          :selected="model === '' ? [] : [model]"
          :search-placeholder="searchPlaceholder"
          @select="onSelect"
        />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>

  <DialogRoot :open="open && sheet" @update:open="onSheetOpen">
    <DialogPortal :to="portalBody">
      <DialogOverlay class="sa-dialog-animated fixed inset-0 z-50 bg-nav/50" />
      <DialogContent
        class="sa-sheet-animated fixed inset-0 z-50 flex flex-col bg-white text-gray-700"
        :style="
          visible
            ? { top: `${visible.top}px`, bottom: 'auto', height: `${visible.height}px` }
            : undefined
        "
        :aria-describedby="undefined"
        @open-auto-focus="onOpenAutoFocus"
        @close-auto-focus="onSheetCloseAutoFocus"
      >
        <div class="flex shrink-0 items-center gap-2 border-b border-gray-200 py-1 pr-1 pl-4">
          <DialogTitle
            as="h2"
            class="min-w-0 flex-1 truncate text-base font-semibold text-gray-900"
          >
            {{ field?.text }}
          </DialogTitle>
          <DialogClose
            :aria-label="closeName"
            :title="closeName"
            class="flex size-control shrink-0 items-center justify-center rounded-md text-gray-500 outline-primary -outline-offset-2 hover:text-gray-700 focus-visible:outline-2"
          >
            <XMarkIcon class="size-5" />
          </DialogClose>
        </div>
        <SaListbox
          ref="listbox"
          v-model:search="search"
          fill
          :options="listed"
          :selected="model === '' ? [] : [model]"
          :search-placeholder="searchPlaceholder"
          @select="onSelect"
        />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
