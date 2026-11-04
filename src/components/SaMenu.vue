<script lang="ts" setup>
import type { Component } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'reka-ui'
import SaButton, { type SaButtonVariant } from './SaButton.vue'

export interface SaMenuItem {
  key: string
  label: string
  icon?: Component
  danger?: boolean
  /** Draws the item disabled, with this reason under its label. */
  disabledReason?: string
}

/**
 * The actions of one record or one page, behind a button. A caller lists them from the most used to
 * the least, with what destroys last, and the menu draws a rule before the first of those.
 */
withDefaults(
  defineProps<{
    /** What the button says, as "Actions". */
    label: string
    items: SaMenuItem[]
    variant?: SaButtonVariant
  }>(),
  {
    variant: 'secondary'
  }
)

const emit = defineEmits<{
  select: [key: string]
}>()

function startsDanger(index: number, items: SaMenuItem[]): boolean {
  return index > 0 && items[index].danger === true && items[index - 1].danger !== true
}
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <SaButton :variant="variant" :label="label" :trailing-icon="ChevronDownIcon" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        align="end"
        :side-offset="4"
        class="sa-menu sa-overlay-animated min-w-48"
      >
        <template v-for="(item, index) in items" :key="item.key">
          <DropdownMenuSeparator v-if="startsDanger(index, items)" class="my-1 h-px bg-gray-200" />
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
              class="mt-0.5 size-4 shrink-0 self-start"
              :class="item.disabledReason || item.danger ? '' : 'text-gray-500'"
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
