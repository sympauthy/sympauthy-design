<script lang="ts" setup>
import { computed, ref } from 'vue'
import sympauthyLogo from '../../logos/sympauthy-icon.svg'
import sympauthyLogoDark from '../../logos/sympauthy-icon-dark.svg'
import { brandingUrls } from '../theme/brand'

/**
 * The deployment's logo, as the server answers it, and SympAuthy's where it answers none. It is
 * drawn beside the deployment's name, so it says nothing of its own to a screen reader.
 *
 * Either the ground under it chooses the file, or the device's preference does: a page pinned light
 * must not draw the dark logo because the device is dark.
 */
const props = withDefaults(
  defineProps<{
    /** Drawn on a dark ground whatever the theme, as the sidebar's. */
    dark?: boolean
    /** Follows the device's preference, for a page whose brand allows dark mode. Ignores [dark]. */
    followDevice?: boolean
    /** `sm` beside a name, `md` in a sidebar's head, `lg` heading a screen outside an app's shell. */
    size?: 'sm' | 'md' | 'lg'
    /** The server's origin, for an app hosted on another one. */
    server?: string
  }>(),
  {
    dark: false,
    followDevice: false,
    size: 'sm',
    server: ''
  }
)

const urls = computed(() => brandingUrls(props.server))
const failed = ref(false)

const lightSrc = computed(() => (failed.value ? sympauthyLogo : urls.value.logo))
const darkSrc = computed(() => (failed.value ? sympauthyLogoDark : urls.value.logoDark))

// A deployment's logo has any shape. At the size drawn beside the name it takes half the row at
// most, so a wide one leaves the name room and is scaled rather than squashed.
const classes = computed(() => [
  'w-auto shrink-0 object-contain',
  props.size === 'lg' ? 'h-10' : [props.size === 'md' ? 'h-8' : 'h-6', 'max-w-1/2']
])
</script>

<template>
  <picture v-if="followDevice" class="shrink-0">
    <source media="(prefers-color-scheme: dark)" :srcset="darkSrc" />
    <img :src="lightSrc" alt="" :class="classes" @error="failed = true" />
  </picture>
  <img v-else :src="dark ? darkSrc : lightSrc" alt="" :class="classes" @error="failed = true" />
</template>
