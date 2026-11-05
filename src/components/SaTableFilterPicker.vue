<script lang="ts" setup>
import { computed, ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import SaButton from './SaButton.vue'
import SaListbox from './SaListbox.vue'
import { usePortalBody } from './portalBody'
import type { SaFilterLabels } from './saFilter'
import type { SaFilters } from './useSaFilters'

/**
 * The control adding a filter to a table: the fields it filters on, searched rather than read down.
 * It goes in the table's `#toolbar` slot, and draws nothing where no field can be filtered on.
 *
 * It is a popover over a `SaListbox` and not a menu because a menu has nowhere to type: its
 * keystrokes are its own typeahead. The list is the source's as well, and one publishing a field per
 * claim renders a menu taller than the screen, so it scrolls and it is searched.
 */
const props = defineProps<{
  filters: SaFilters
  labels: SaFilterLabels
}>()

const portalBody = usePortalBody()

const open = ref(false)
// Set where the list closed because a field was picked, which is the one close that has somewhere
// else to send the focus.
const handedOver = ref(false)

const options = computed(() =>
  props.filters.fields.map((field) => ({ value: field.field, label: field.name }))
)

/**
 * Clears the hand-over as the list opens.
 *
 * The flag means something only between a pick and the close that follows it. A close that never
 * delivers its focus event, a pick answering no filter or a teardown mid-animation, would leave it
 * latched, and the next Escape would find its trigger unfocused.
 */
function onOpenChange(opened: boolean) {
  open.value = opened
  if (opened) {
    handedOver.value = false
  }
}

// Nothing stays chosen: the list adds a filter and closes, and a field already filtered is offered
// again because two filters over one field is how a range is asked for.
function onSelect(values: string[]) {
  const field = values[0]
  if (!field) {
    return
  }
  handedOver.value = true
  open.value = false
  props.filters.add(field)
}

/**
 * Leaves the focus where the filter this list just created put it.
 *
 * A popover closing without having been dismissed from outside focuses its trigger again, and that
 * focus lands outside the popover of the filter the pick opened, which reads it as an interaction
 * outside itself and closes, taking a filter nobody has filled in yet with it. Escape and a click
 * outside are not that: nothing was created, and the trigger is where the focus belongs.
 */
function onCloseAutoFocus(event: Event) {
  if (!handedOver.value) {
    return
  }
  handedOver.value = false
  event.preventDefault()
}
</script>

<template>
  <PopoverRoot v-if="options.length > 0" :open="open" @update:open="onOpenChange">
    <PopoverTrigger as-child>
      <SaButton variant="secondary" :label="props.labels.add" :icon="PlusIcon" />
    </PopoverTrigger>

    <PopoverPortal :to="portalBody">
      <PopoverContent
        align="end"
        :side-offset="4"
        :collision-padding="16"
        class="sa-overlay-animated z-50 w-64 max-w-[calc(100vw-2rem)] rounded-md"
        @close-auto-focus="onCloseAutoFocus"
      >
        <SaListbox
          :options="options"
          :selected="[]"
          :search-placeholder="props.labels.searchFields"
          :no-match-label="props.labels.noMatch"
          :aria-label="props.labels.add"
          @select="onSelect"
        />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
