<script lang="ts" setup>
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/20/solid'

/**
 * Who is signed in, and signing out, for a sidebar's foot. The package knows no auth, so an app hands
 * it the words and signs out when told to.
 */
withDefaults(
  defineProps<{
    name: string
    /** What tells them apart, such as their email. */
    detail?: string
    signOutLabel: string
  }>(),
  {
    detail: undefined
  }
)

const emit = defineEmits<{
  signOut: []
}>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex min-w-0 flex-col">
      <span :title="name" class="truncate text-sm font-medium text-nav-strong">{{ name }}</span>
      <span v-if="detail" :title="detail" class="truncate text-xs text-nav-muted">{{
        detail
      }}</span>
    </div>
    <button
      type="button"
      class="flex min-h-control items-center justify-center gap-1.5 rounded-md border border-nav-muted text-sm font-medium outline-nav-text -outline-offset-2 transition-colors hover:bg-nav-hover focus-visible:outline-2"
      @click="emit('signOut')"
    >
      <ArrowRightStartOnRectangleIcon class="size-4" />
      {{ signOutLabel }}
    </button>
  </div>
</template>
