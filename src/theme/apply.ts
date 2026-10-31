/**
 * Applies a deployment's branding (`ui.theme` of the server's configuration) to the page, at load,
 * without rebuilding the app: both apps style everything through Tailwind variables, so setting
 * those variables on :root is the whole rebrand.
 *
 *   // flow: main.ts, once the configuration has been fetched
 *   applyTheme(configuration.ui?.theme, { dark: true })
 *   // admin: the admin stays light
 *   applyTheme(configuration.ui?.theme, { dark: false })
 *
 * A value that is not a 6-digit hex color is ignored. A theme that names a primary color and
 * leaves other roles out gets them derived from it, so a hand-written `light: { primary: … }` is
 * enough.
 */
import { derivePalette, normalizeHex } from './derive'
import { FLOW_ROLES, NAV_ROLES, TAILWIND_VARIABLE, type FlowRole, type Role } from './roles'

export interface UiTheme {
  /** `auto` follows the device on the sign-in pages; `off` keeps them light. Default `auto`. */
  darkMode?: 'auto' | 'off'
  light?: Partial<Record<Role, string>>
  dark?: Partial<Record<FlowRole, string>>
}

export interface ApplyThemeOptions {
  /** Whether this app has a dark theme at all (the flow does, the admin does not). */
  dark: boolean
  /** The document to apply to; tests pass their own. */
  document?: Document
}

const STYLE_ID = 'sympauthy-theme'

/** The server's configuration may use kebab-case (YAML) or camelCase (JSON) keys. */
function read(theme: unknown): UiTheme | undefined {
  if (!theme || typeof theme !== 'object') return undefined
  const t = theme as Record<string, unknown>
  const mode = t.darkMode ?? t['dark-mode']
  return {
    darkMode: mode === 'off' ? 'off' : 'auto',
    light: clean(t.light),
    dark: clean(t.dark)
  }
}

function clean(colors: unknown): Record<string, string> | undefined {
  if (!colors || typeof colors !== 'object') return undefined
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(colors as Record<string, unknown>)) {
    const role = key.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()).replace(/^ink(\d)/, 'ink-$1')
    const hex = typeof value === 'string' ? normalizeHex(value) : null
    if (hex && role in TAILWIND_VARIABLE) out[role] = hex
  }
  return Object.keys(out).length ? out : undefined
}

export function themeToCss(input: unknown, options: Pick<ApplyThemeOptions, 'dark'>): string {
  const theme = read(input)
  if (!theme?.light && !theme?.dark) return ''
  const base = theme.light?.primary ? derivePalette(theme.light.primary) : null
  const light = { ...(base?.light ?? {}), ...theme.light }
  const dark = { ...(base?.dark ?? {}), ...theme.dark }

  const block = (palette: Record<string, string>, roles: readonly Role[], indent: string) =>
    roles
      .filter((r) => palette[r])
      .map((r) => `${indent}${TAILWIND_VARIABLE[r]}: ${palette[r]};`)
      .join('\n')

  let css = `:root {\n${block(light, [...FLOW_ROLES, ...NAV_ROLES], '  ')}\n}\n`
  if (options.dark && theme.darkMode !== 'off' && Object.keys(dark).length) {
    css += '@media (prefers-color-scheme: dark) {\n  :root:not([data-dark-mode="off"]) {\n'
    css += block(dark, FLOW_ROLES, '    ')
    if (dark.surface) css += `\n    --color-white: ${dark.surface};`
    css += '\n  }\n}\n'
  }
  return css
}

export function applyTheme(input: unknown, options: ApplyThemeOptions): void {
  const doc = options.document ?? document
  const theme = read(input)
  if (theme?.darkMode === 'off') doc.documentElement.dataset.darkMode = 'off'
  else delete doc.documentElement.dataset.darkMode

  const css = themeToCss(input, options)
  let style = doc.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!css) {
    style?.remove()
    return
  }
  if (!style) {
    style = doc.createElement('style')
    style.id = STYLE_ID
  }
  style.textContent = css
  // Last in <head>, after the app's own stylesheet, so the deployment's values win.
  doc.head.appendChild(style)
}
