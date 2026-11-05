<script lang="ts" setup>
import { computed, type Component } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'reka-ui'
import { usePortalBody } from './portalBody'
import SaButton, { type SaButtonVariant } from './SaButton.vue'

export interface SaMenuItem {
  key: string
  label: string
  icon?: Component
  danger?: boolean
  /** Draws a rule before the item, for a group the menu cannot tell from `danger`. */
  startsGroup?: boolean
  /** Draws the item disabled, with this reason under its label. */
  disabledReason?: string
}

/**
 * The actions of one record or one page, behind a button. A caller lists them from the most used to
 * the least, with what destroys last, and the menu draws a rule before the first of those. Its
 * `#expanded` slot is what stands in its place from `sm:`, for a screen whose one action a phone has
 * no room to spell out.
 */
withDefaults(
  defineProps<{
    /** What the button says, as "Actions". */
    label: string
    items: SaMenuItem[]
    variant?: SaButtonVariant
    /** Draws the button as this mark alone, naming it with [label], for the actions of a row. */
    icon?: Component
    /** Draws the button as this mark alone below `sm:`, for the actions of a screen on a phone. */
    collapsedIcon?: Component
  }>(),
  {
    variant: 'secondary',
    icon: undefined,
    collapsedIcon: undefined
  }
)

const emit = defineEmits<{
  select: [key: string]
}>()

// A phone's bar and rows draw the mark on their own ground, and it shows its box only while open.
const MARK_BELOW_SM =
  'max-sm:border-transparent max-sm:bg-transparent max-sm:data-[state=open]:border-gray-400 max-sm:data-[state=open]:bg-gray-200'

const portalBody = usePortalBody()
// A modal menu locks the page's body whichever document it opens in, and a frame on that page goes
// dead with it, the menu's own items included.
const modal = computed(() => !portalBody.value || portalBody.value.ownerDocument === document)

function startsGroup(index: number, items: SaMenuItem[]): boolean {
  if (index === 0) {
    return false
  }
  return (
    items[index].startsGroup === true ||
    (items[index].danger === true && items[index - 1].danger !== true)
  )
}
</script>

<template>
  <!-- `contents`, so that what it holds still lines up in the row around the menu. -->
  <div v-if="$slots.expanded" class="contents max-sm:hidden">
    <slot name="expanded" />
  </div>
  <DropdownMenuRoot :modal="modal">
    <DropdownMenuTrigger as-child>
      <SaButton
        v-if="icon"
        :class="MARK_BELOW_SM"
        :variant="variant"
        :label="label"
        :icon="icon"
        icon-only
      />
      <SaButton
        v-else
        :class="[collapsedIcon ? MARK_BELOW_SM : '', { 'sm:hidden': $slots.expanded }]"
        :variant="variant"
        :label="label"
        :collapsed-icon="collapsedIcon"
        :trailing-icon="ChevronDownIcon"
      />
    </DropdownMenuTrigger>
    <DropdownMenuPortal :to="portalBody">
      <DropdownMenuContent
        align="end"
        :side-offset="4"
        class="sa-menu sa-overlay-animated min-w-48"
      >
        <template v-for="(item, index) in items" :key="item.key">
          <DropdownMenuSeparator v-if="startsGroup(index, items)" class="my-1 h-px bg-gray-200" />
          <DropdownMenuItem
            class="sa-menu-item"
            :class="
              item.disabledReason
                ? 'cursor-not-allowed text-gray-400'
                : item.danger
                  ? 'text-danger data-[highlighted]:bg-danger-hover'
                  : 'text-gray-700 data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900'
            "
            :disabled="item.disabledReason !== undefined"
            @select="emit('select', item.key)"
          >
            <component
              :is="item.icon"
              v-if="item.icon"
              class="size-4 shrink-0"
              :class="[
                item.disabledReason ? 'mt-0.5 self-start' : '',
                item.disabledReason || item.danger ? '' : 'text-gray-500'
              ]"
            />
            <!-- The reason sits under the label rather than in a tooltip: a menu is read while it is
                 open, and a hover over one of its items is a highlight, not a question. -->
            <span class="flex flex-col">
              {{ item.label }}
              <span v-if="item.disabledReason" class="text-xs text-gray-500">
                {{ item.disabledReason }}
              </span>
            </span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
