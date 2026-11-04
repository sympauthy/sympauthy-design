<script lang="ts" setup>
import type { Component } from 'vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import CommonTooltip from './CommonTooltip.vue'

export interface SidebarEntry {
  key: string
  label: string
  /** What the link is given, as `{ href }` or a router's `{ to }`. */
  link: Record<string, unknown>
  /** Whether this is the screen open, which only the app knows. */
  current?: boolean
  /** Draws the entry disabled, explained by a tooltip. It stays in place, so the shape never moves. */
  disabledReason?: string
}

export interface SidebarSection {
  label: string
  entries: SidebarEntry[]
}

/**
 * An app's navigation, on the dark ground that stays dark in every theme. The package knows no router
 * and no scopes, so an app derives the sections from its own and names its link in [linkAs].
 */
withDefaults(
  defineProps<{
    sections: SidebarSection[]
    /** Names the navigation, as "Main". */
    label: string
    /** Names the control closing the drawer below `lg:`. */
    closeLabel: string
    /** What draws a link: an element's name, or a component such as a router's link. */
    linkAs?: string | Component
  }>(),
  {
    linkAs: 'a'
  }
)

const emit = defineEmits<{
  close: []
}>()

// The focus ring is `primary` everywhere else, which a person could not make out on this ground.
const focusClasses = 'outline-nav-text -outline-offset-2 focus-visible:outline-2'
</script>

<template>
  <nav :aria-label="label" class="flex h-full flex-col bg-nav text-nav-text">
    <div class="flex h-14 items-center justify-between gap-2 border-b border-nav-divider px-4">
      <div class="flex min-w-0 items-center gap-2">
        <slot name="head" />
      </div>
      <button
        type="button"
        :aria-label="closeLabel"
        :title="closeLabel"
        class="-mr-3 flex size-control shrink-0 items-center justify-center text-nav-muted hover:text-nav-text lg:hidden"
        :class="focusClasses"
        @click="emit('close')"
      >
        <XMarkIcon class="size-5" />
      </button>
    </div>
    <ul class="mt-2 flex min-h-0 flex-1 flex-col overflow-y-auto">
      <template v-for="(section, index) in sections" :key="section.label">
        <li v-if="index > 0" class="my-2 border-t border-nav-divider" />
        <li class="px-4 py-2 text-xs font-semibold tracking-wider text-nav-muted uppercase">
          {{ section.label }}
        </li>
        <li v-for="entry in section.entries" :key="entry.key">
          <CommonTooltip v-if="entry.disabledReason" :text="entry.disabledReason" side="right">
            <span
              role="link"
              aria-disabled="true"
              tabindex="0"
              class="flex min-h-control cursor-not-allowed items-center px-4 text-sm text-nav-disabled"
              :class="focusClasses"
            >
              {{ entry.label }}
            </span>
          </CommonTooltip>
          <component
            :is="linkAs"
            v-else
            v-bind="entry.link"
            :aria-current="entry.current ? 'page' : undefined"
            class="relative flex min-h-control items-center px-4 text-sm transition-colors"
            :class="[
              focusClasses,
              entry.current
                ? 'bg-nav-active font-medium before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-gold'
                : 'hover:bg-nav-hover'
            ]"
          >
            {{ entry.label }}
          </component>
        </li>
      </template>
    </ul>
    <div v-if="$slots.foot" class="border-t border-nav-divider p-4">
      <slot name="foot" />
    </div>
  </nav>
</template>
