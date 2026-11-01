/**
 * Tries a theme in the page, before any configuration has it: a deployment's colors reach the apps
 * through the stylesheet at /branding/tokens.css, in place before any script runs (see
 * docs/branding.md). This is for what has no configuration yet, such as a theme still being built:
 *
 *   applyTheme(theme, { dark: true }) // flow
 *   applyTheme(theme, { dark: false }) // admin: the admin stays light
 *
 * It writes what the server writes after its tokens, so the page needs those tokens, linked from a
 * server or imported from `@sympauthy/design/tokens.css`. A role left out then keeps SympAuthy's
 * value, as on the server. To start from one color, pass derivePalette's result.
 *
 * It is more forgiving than the server, since a theme being typed is often not valid yet: what the
 * server refuses (a color that is not `#rrggbb`, a wrong dark mode, `accent` or `nav-*` under `dark`,
 * `dark` alongside `off`) is ignored here, so a theme that shows here can still be refused there.
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

/** What `data-theme` held before this file pinned a page, to put back when the pin is lifted. */
const pins = new WeakMap<Document, string | undefined>()

/** The tokens carry the dark roles whatever is tried here, so a page kept light has to pin. */
function pinLight(doc: Document, pin: boolean): void {
  const { dataset } = doc.documentElement
  if (pin) {
    if (dataset.theme === 'light') return
    pins.set(doc, dataset.theme)
    dataset.theme = 'light'
  } else if (pins.has(doc)) {
    const before = pins.get(doc)
    pins.delete(doc)
    if (before) dataset.theme = before
    else delete dataset.theme
  }
}

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
  if (dark && block(dark, FLOW_ROLES, '')) {
    css += `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n`
    css += `${block(dark, FLOW_ROLES, '    ')}\n  }\n}\n`
    css += `:root[data-theme="dark"], [data-theme="dark"] {\n${block(dark, FLOW_ROLES, '  ')}\n}\n`
  }
  return css
}

export function applyTheme(input: unknown, options: ApplyThemeOptions): void {
  const doc = options.document ?? document
  pinLight(doc, !options.dark || read(input)?.darkMode === 'off')

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
