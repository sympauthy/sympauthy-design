<script lang="ts" setup>
import SaAlert from './SaAlert.vue'
import SaButton, { type SaButtonVariant } from './SaButton.vue'
import SaDialog from './SaDialog.vue'

/**
 * The question a destructive action asks before it reaches the server. Cancel comes first, so focus
 * starts on it and Enter never destroys by accident.
 */
withDefaults(
  defineProps<{
    open: boolean
    /** Repeats the verb of the title, as "Revoke grant", never "OK" or "Yes". */
    confirmLabel: string
    cancelLabel: string
    confirmVariant?: SaButtonVariant
    /** Holds the confirmation back while what it would act on is not yet chosen. */
    confirmDisabled?: boolean
    /** While the call runs: the buttons wait, and the dialog cannot be dismissed. */
    loading?: boolean
    /** Why the call failed, kept on the dialog so that it can be tried again. */
    error?: string | null
  }>(),
  {
    confirmVariant: 'danger',
    confirmDisabled: false,
    loading: false,
    error: null
  }
)

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <SaDialog :open="open" :dismiss-disabled="loading" @close="emit('cancel')">
    <template #title>
      <slot name="title" />
    </template>

    <slot />

    <SaAlert v-if="error" color="danger" class="mt-4">
      {{ error }}
    </SaAlert>

    <template #actions>
      <SaButton
        variant="secondary"
        :label="cancelLabel"
        :disabled="loading"
        @click="emit('cancel')"
      />
      <SaButton
        :variant="confirmVariant"
        :label="confirmLabel"
        :submitting="loading"
        :disabled="confirmDisabled"
        @click="emit('confirm')"
      />
    </template>
  </SaDialog>
</template>
