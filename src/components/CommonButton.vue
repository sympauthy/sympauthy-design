<script lang="ts" setup>
import { computed, useAttrs, type Component } from 'vue'
import { type ButtonStyle, primaryColoredButton } from './ButtonStyle'
import CommonSpinner from './CommonSpinner.vue'

/**
 * Every button of both apps. Ported from sympauthy-admin's `CommonButton`, without its knowledge of
 * scopes: an app that refuses a button for a reason (the admin, for a missing scope) passes
 * `refused` and wraps the button in its own tooltip saying why.
 */
interface Props {
  buttonStyle?: ButtonStyle
  /**
   * What the button does. Written here rather than in the default slot so that the button in
   * flight keeps saying it, and so that a button whose label is collapsed still carries it as a
   * title.
   */
  label?: string
  /** Drawn before the label, naming the action a second way. */
  icon?: Component
  /** Drawn after the label, for a button that opens something rather than doing it. */
  trailingIcon?: Component
  /**
   * Drops the label below `sm:`, leaving the icon alone and keeping the label as the title. For a
   * control of a toolbar. Pass an [icon] with it, or there is nothing left to press.
   */
  collapseLabel?: boolean
  /**
   * `control` (the admin: 14px/500, as wide as its label) or `large` (the flow's auth card: full
   * width, 16px/600). Both are `control-height` tall.
   */
  size?: 'control' | 'large'
  loading?: boolean
  submitting?: boolean
  disabled?: boolean
  /**
   * Drawn disabled but kept focusable (`aria-disabled`), its click dropped: for a button whose
   * reason for being unavailable the app explains in a tooltip around it.
   */
  refused?: boolean
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  buttonStyle: () => primaryColoredButton,
  label: undefined,
  icon: undefined,
  trailingIcon: undefined,
  collapseLabel: false,
  size: 'control',
  loading: false,
  submitting: false,
  disabled: false,
  refused: false
})

const attrs = useAttrs()

// A refused button stays focusable and takes the pointer, which is what lets the app's tooltip
// open on it: it is `aria-disabled` rather than `disabled`, so the caller's click handler is what
// it drops, and a click it receives does nothing — inside a form, not even submit.
const buttonAttrs = computed(() => {
  if (!props.refused) return attrs
  const rest = Object.fromEntries(Object.entries(attrs).filter(([name]) => name !== 'onClick'))
  return { ...rest, 'aria-disabled': 'true', onClick: (event: Event) => event.preventDefault() }
})

const computedDisabled = computed(
  () => !props.refused && (props.loading || props.submitting || props.disabled)
)

const computedClasses = computed(() => {
  if (props.disabled || props.refused) return props.buttonStyle.disabledClasses
  if (props.loading) return props.buttonStyle.loadingClasses
  if (props.submitting) return props.buttonStyle.submittingClasses
  return props.buttonStyle.activeClasses
})

const sizeClasses = computed(() =>
  props.size === 'large' ? 'w-full text-base font-semibold' : 'font-medium'
)

// A state names its own slot, so a caller can say `Saving…` where the label alone would not do.
const stateSlot = computed(() => {
  if (props.submitting) return 'submitting'
  if (props.loading) return 'loading'
  return 'default'
})
</script>

<template>
  <button
    v-bind="buttonAttrs"
    :class="[computedClasses, sizeClasses]"
    :disabled="computedDisabled"
    :title="props.label"
    class="control flex items-center justify-center gap-1.5 transition-colors"
  >
    <CommonSpinner v-if="loading || submitting" size="sm" />
    <component :is="props.icon" v-else-if="props.icon" class="size-4 shrink-0" />
    <span :class="props.collapseLabel ? 'hidden sm:inline' : ''">
      <slot :name="stateSlot">{{ props.label }}</slot>
    </span>
    <component :is="props.trailingIcon" v-if="props.trailingIcon" class="size-4 shrink-0" />
  </button>
</template>
