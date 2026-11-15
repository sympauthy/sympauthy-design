<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/20/solid'
import SaInput from './SaInput.vue'

/**
 * A password a person can check before sending it: an `SaInput` of type `password` whose trailing
 * slot holds the toggle showing what was typed. A person who can read what they typed is not asked
 * to type it twice.
 */
export interface SaPasswordInputProps {
  /**
   * Names the toggle, as "Show password". It is its one name, and `aria-pressed` says whether the
   * password is shown, so that a screen reader never hears the name change under it.
   */
  showLabel: string
  /** Draws the error border; pair it with SaField's `error`. */
  invalid?: boolean
  /** Disables the input and its toggle with it. */
  disabled?: boolean
}

withDefaults(defineProps<SaPasswordInputProps>(), {
  invalid: false,
  disabled: false
})

const model = defineModel<string>({ default: '' })

// Everything a caller says is said to the input, as on SaInput.
defineOptions({ inheritAttrs: false })

const shown = ref(false)
const toggle = ref<HTMLButtonElement>()

// A password left shown is hidden again as its form is sent, so that the next screen, or the same
// one coming back with an error, does not open on it. The toggle is a button of that form, which is
// how it finds it; outside a form the password stays as the person left it.
let form: HTMLFormElement | null = null
const hide = () => {
  shown.value = false
}

onMounted(() => {
  form = toggle.value?.form ?? null
  form?.addEventListener('submit', hide)
})

onBeforeUnmount(() => form?.removeEventListener('submit', hide))
</script>

<template>
  <!-- Some browsers draw a reveal button of their own in a password field, which would be a second
       toggle beside this one. -->
  <SaInput
    v-bind="$attrs"
    v-model="model"
    :type="shown ? 'text' : 'password'"
    :invalid="invalid"
    :disabled="disabled"
    class="[&_input::-ms-reveal]:hidden"
  >
    <template #trailing>
      <!-- The icon stays small inside the field, and the pseudo-element around it is the target. -->
      <button
        ref="toggle"
        type="button"
        :aria-label="showLabel"
        :aria-pressed="shown"
        :disabled="disabled"
        class="relative flex rounded-md text-gray-500 outline-primary after:absolute after:top-1/2 after:left-1/2 after:size-control after:-translate-x-1/2 after:-translate-y-1/2 hover:text-gray-700 focus-visible:outline-2 disabled:cursor-not-allowed disabled:text-gray-400"
        @click="shown = !shown"
      >
        <EyeSlashIcon v-if="shown" class="size-4" />
        <EyeIcon v-else class="size-4" />
      </button>
    </template>
  </SaInput>
</template>
