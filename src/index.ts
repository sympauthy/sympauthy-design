// Components of the Common group: both apps draw them, from this one source.
export { default as CommonAlert } from './components/CommonAlert.vue'
export { default as CommonButton } from './components/CommonButton.vue'
export { default as CommonCard } from './components/CommonCard.vue'
export { default as CommonSpinner } from './components/CommonSpinner.vue'
export { default as FormField } from './components/FormField.vue'
export { default as FormInput } from './components/FormInput.vue'
export {
  type ButtonStyle,
  dangerColoredButton,
  outlineColoredButton,
  primaryColoredButton,
  secondaryColoredButton
} from './components/ButtonStyle'

// Branding: a deployment's colors, applied at load.
export { applyTheme, themeToCss, type ApplyThemeOptions, type UiTheme } from './theme/apply'
export {
  contrast,
  derivePalette,
  normalizeHex,
  SYMPAUTHY_PRIMARY,
  type DerivedPalette,
  type GrayTint
} from './theme/derive'
export {
  FLOW_ROLES,
  NAV_ROLES,
  TAILWIND_VARIABLE,
  type FlowRole,
  type NavRole,
  type Role
} from './theme/roles'
