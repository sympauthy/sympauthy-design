/**
 * The colors a deployment may override (`ui.theme.light.*`, `ui.theme.dark.*`), and the Tailwind
 * variable each one sets in the apps. Everything not listed here stays SympAuthy's: status colors
 * keep their meaning whatever the brand.
 */
export const INK_STEPS = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900'
] as const

/** The roles the sign-in pages read, in both themes. */
export const FLOW_ROLES = [
  'primary',
  'primary-hover',
  'on-primary',
  'primary-subtle',
  'on-primary-subtle',
  'ground',
  'surface',
  ...INK_STEPS.map((s) => `ink-${s}` as const)
] as const

/** The roles only the admin sidebar reads (light theme only). */
export const NAV_ROLES = [
  'accent',
  'nav-ground',
  'nav-text',
  'nav-muted',
  'nav-disabled',
  'nav-hover',
  'nav-active',
  'nav-divider'
] as const

export type FlowRole = (typeof FLOW_ROLES)[number]
export type NavRole = (typeof NAV_ROLES)[number]
export type Role = FlowRole | NavRole

export type LightPalette = Record<Role, string>
export type DarkPalette = Record<FlowRole, string>

export const TAILWIND_VARIABLE: Record<Role, string> = {
  primary: '--color-primary',
  'primary-hover': '--color-primary-hover',
  'on-primary': '--color-on-primary',
  'primary-subtle': '--color-primary-subtle',
  'on-primary-subtle': '--color-on-primary-subtle',
  ground: '--color-body',
  surface: '--color-white',
  'ink-50': '--color-gray-50',
  'ink-100': '--color-gray-100',
  'ink-200': '--color-gray-200',
  'ink-300': '--color-gray-300',
  'ink-400': '--color-gray-400',
  'ink-500': '--color-gray-500',
  'ink-600': '--color-gray-600',
  'ink-700': '--color-gray-700',
  'ink-800': '--color-gray-800',
  'ink-900': '--color-gray-900',
  accent: '--color-gold',
  'nav-ground': '--color-nav',
  'nav-text': '--color-nav-text',
  'nav-muted': '--color-nav-muted',
  'nav-disabled': '--color-nav-disabled',
  'nav-hover': '--color-nav-hover',
  'nav-active': '--color-nav-active',
  'nav-divider': '--color-nav-divider'
}
