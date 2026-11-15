<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import SaSpinner from './SaSpinner.vue'

/**
 * What a screen shows while it waits for what it was asked for, so that a slow fetch does not look
 * like a different kind of wait on each screen: a spinner and "Loading...".
 */
withDefaults(
  defineProps<{
    /** `md` heads what is being waited for, and `lg` stands alone in a card or a screen. */
    size?: 'md' | 'lg'
    /** Centred in the height it is given, for a wait that fills a page rather than heading one. */
    centered?: boolean
  }>(),
  {
    size: 'md',
    centered: false
  }
)

const { t } = useI18n()
</script>

<template>
  <div
    class="flex items-center text-sm text-gray-500"
    :class="[
      size === 'lg' ? 'flex-col gap-3 py-10' : 'gap-2',
      centered ? 'h-full justify-center' : ''
    ]"
  >
    <SaSpinner :size="size" class="text-primary">{{ t('sa.loadingState.label') }}</SaSpinner>
    <!-- The spinner announces the words, so the line a person reads is not announced twice. -->
    <span aria-hidden="true">{{ t('sa.loadingState.label') }}</span>
  </div>
</template>
