<script lang="ts" setup>
import type { Component } from 'vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import SaTooltip from './SaTooltip.vue'

export interface SaSidebarEntry {
  key: string
  label: string
  /** What the link is given, as `{ href }` or a router's `{ to }`. */
  link: Record<string, unknown>
  /** Whether this is the screen open, which only the app knows. */
  current?: boolean
  /** Draws the entry disabled, explained by a tooltip. It stays in place, so the shape never moves. */
  disabledReason?: string
}

export interface SaSidebarSection {
  label: string
  entries: SaSidebarEntry[]
}

/**
 * An app's navigation, on the dark ground that stays dark in every theme. The package knows no router
 * and no scopes, so an app derives the sections from its own and names its link in [linkAs].
 */
withDefaults(
  defineProps<{
    sections: SaSidebarSection[]
    /** Names the navigation, as "Main". */
    label: string
    /** What the head's link is given, as an entry's. Without it the head is not a link. */
    homeLink?: Record<string, unknown>
    /** Names the control closing the drawer below `lg:`. */
    closeLabel: string
    /** What draws a link: an element's name, or a component such as a router's link. */
    linkAs?: string | Component
  }>(),
  {
    homeLink: undefined,
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
    <div
      class="flex h-14 items-center justify-between gap-1 border-b border-nav-divider px-4 max-lg:pr-3"
    >
      <!-- Stops short of the target around the control closing the drawer, which paints over it. -->
      <component
        :is="homeLink ? linkAs : 'div'"
        v-bind="homeLink"
        class="flex min-w-0 items-center gap-2.5 self-stretch text-nav-strong max-lg:mr-2"
        :class="homeLink ? focusClasses : undefined"
      >
        <slot name="head" />
      </component>
      <!-- The icon keeps its size, so the head keeps its width, and the pseudo-element around it is
           the target. -->
      <button
        type="button"
        :aria-label="closeLabel"
        :title="closeLabel"
        class="relative shrink-0 rounded-md text-nav-muted after:absolute after:top-1/2 after:left-1/2 after:size-control after:-translate-x-1/2 after:-translate-y-1/2 hover:text-nav-text lg:hidden"
        :class="focusClasses"
        @click="emit('close')"
      >
        <XMarkIcon class="size-5" />
      </button>
    </div>
    <ul class="flex min-h-0 flex-1 flex-col overflow-y-auto pt-2 pb-4">
      <template v-for="section in sections" :key="section.label">
        <li
          class="px-4 pt-5 pb-1.5 text-xs font-medium tracking-wider text-nav-muted uppercase first:pt-3"
        >
          {{ section.label }}
        </li>
        <li v-for="entry in section.entries" :key="entry.key">
          <SaTooltip v-if="entry.disabledReason" :text="entry.disabledReason" side="right">
            <span
              role="link"
              aria-disabled="true"
              tabindex="0"
              class="flex min-h-control cursor-not-allowed items-center px-4 text-sm font-medium text-nav-disabled"
              :class="focusClasses"
            >
              {{ entry.label }}
            </span>
          </SaTooltip>
          <component
            :is="linkAs"
            v-else
            v-bind="entry.link"
            :aria-current="entry.current ? 'page' : undefined"
            class="relative flex min-h-control items-center px-4 text-sm transition-colors"
            :class="[
              focusClasses,
              entry.current
                ? 'bg-nav-active font-semibold text-nav-strong before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-gold'
                : 'font-medium hover:bg-nav-hover'
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
