/**
 * Tries a theme in the page, without the server: a deployment's colors reach it through the
 * stylesheet at /branding/tokens.css, in place before any script runs (see docs/branding.md). This
 * is for what has no configuration yet, such as a theme still being built:
 *
 *   applyTheme(theme, { dark: true }) // flow
 *   applyTheme(theme, { dark: false }) // admin: the admin stays light
 *
 * It writes what the server writes over its tokens, so what it shows is what the configuration
 * will: a role left out keeps SympAuthy's value. To start from one color, pass derivePalette's
 * result. It differs in one way: a value that is not a hex color, which the server refuses, is
 * ignored here, since a theme being typed is often not one yet.
 */
import { normalizeHex } from './derive'
import { FLOW_ROLES, isRole, NAV_ROLES, tokenVariable, type FlowRole, type Role } from './roles'

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
    if (hex && isRole(role)) out[role] = hex
  }
  return Object.keys(out).length ? out : undefined
}

/** The rules written after the tokens: the same selectors, so a value lands where its default is. */
export function themeToCss(input: unknown, options: Pick<ApplyThemeOptions, 'dark'>): string {
  const theme = read(input)
  const block = (
    palette: Record<string, string> | undefined,
    roles: readonly Role[],
    indent: string
  ) =>
    roles
      .filter((r) => palette?.[r])
      .map((r) => `${indent}${tokenVariable(r)}: ${palette?.[r]};`)
      .join('\n')

  let css = ''
  const light = block(theme?.light, [...FLOW_ROLES, ...NAV_ROLES], '  ')
  if (light) css += `:root, [data-theme="light"] {\n${light}\n}\n`
  const dark = options.dark && theme?.darkMode !== 'off' ? theme?.dark : undefined
  if (dark) {
    css += `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n`
    css += `${block(dark, FLOW_ROLES, '    ')}\n  }\n}\n`
    css += `:root[data-theme="dark"], [data-theme="dark"] {\n${block(dark, FLOW_ROLES, '  ')}\n}\n`
  }
  return css
}

export function applyTheme(input: unknown, options: ApplyThemeOptions): void {
  const doc = options.document ?? document
  // The tokens carry the dark roles whatever is tried here, so turning dark off pins the page.
  if (options.dark) {
    if (read(input)?.darkMode === 'off') doc.documentElement.dataset.theme = 'light'
    else delete doc.documentElement.dataset.theme
  }

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
  // Last in <head>, after the stylesheets, so these values win.
  doc.head.appendChild(style)
}
