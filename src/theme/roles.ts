/**
 * The colors a deployment may override (`ui.theme.light.*`, `ui.theme.dark.*`), and the token each
 * one writes over in the stylesheet. Everything not listed here stays SympAuthy's: status colors
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
  'nav-divider',
  'nav-strong'
] as const

export type FlowRole = (typeof FLOW_ROLES)[number]
export type NavRole = (typeof NAV_ROLES)[number]
export type Role = FlowRole | NavRole

export type LightPalette = Record<Role, string>
export type DarkPalette = Record<FlowRole, string>

/** A role's token is its own name, but for `accent`, which the stylesheet calls `--gold`. */
export const tokenVariable = (role: Role): string => (role === 'accent' ? '--gold' : `--${role}`)

const ROLES: ReadonlySet<string> = new Set<Role>([...FLOW_ROLES, ...NAV_ROLES])
export const isRole = (name: string): name is Role => ROLES.has(name)
