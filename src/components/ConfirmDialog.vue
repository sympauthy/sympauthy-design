<script lang="ts" setup>
import { dangerColoredButton, secondaryColoredButton, type ButtonStyle } from './ButtonStyle'
import CommonAlert from './CommonAlert.vue'
import CommonButton from './CommonButton.vue'
import CommonDialog from './CommonDialog.vue'

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
    confirmStyle?: ButtonStyle
    /** Holds the confirmation back while what it would act on is not yet chosen. */
    confirmDisabled?: boolean
    /** While the call runs: the buttons wait, and the dialog cannot be dismissed. */
    loading?: boolean
    /** Why the call failed, kept on the dialog so that it can be tried again. */
    error?: string | null
  }>(),
  {
    confirmStyle: () => dangerColoredButton,
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
  <CommonDialog :open="open" :dismiss-disabled="loading" @close="emit('cancel')">
    <template #title>
      <slot name="title" />
    </template>

    <slot />

    <CommonAlert v-if="error" color="danger" class="mt-4">
      {{ error }}
    </CommonAlert>

    <template #actions>
      <CommonButton
        :button-style="secondaryColoredButton"
        :label="cancelLabel"
        :disabled="loading"
        @click="emit('cancel')"
      />
      <CommonButton
        :button-style="confirmStyle"
        :label="confirmLabel"
        :submitting="loading"
        :disabled="confirmDisabled"
        @click="emit('confirm')"
      />
    </template>
  </CommonDialog>
</template>
