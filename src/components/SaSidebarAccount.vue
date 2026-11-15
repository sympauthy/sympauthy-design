<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/20/solid'

/**
 * Who is signed in, and signing out, for a sidebar's foot. The package knows no auth, so an app hands
 * it who is signed in and signs out when told to.
 */
withDefaults(
  defineProps<{
    name: string
    /** What tells them apart, such as their email. */
    detail?: string
  }>(),
  {
    detail: undefined
  }
)

const emit = defineEmits<{
  signOut: []
}>()

const { t } = useI18n()
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
      {{ t('sa.sidebarAccount.signOut') }}
    </button>
  </div>
</template>
