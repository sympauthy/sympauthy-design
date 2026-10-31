// Generates the stylesheets of the package from tokens.json, the one source of every value.
//
//   dist/tokens.css      every token as a plain CSS variable (--primary, --ink-200…), light on :root,
//                        dark under .dark (VitePress) and [data-theme="dark"]. For pages that are not
//                        Tailwind: the docs site, the theme builder.
//   dist/theme.css       the Tailwind v4 @theme both apps import: Tailwind's gray scale redefined as
//                        the ink scale, and the roles the apps already name (primary, body, nav…).
//   dist/theme-dark.css  the dark overrides, under prefers-color-scheme. The flow imports it; the admin
//                        does not. A deployment that turns dark mode off sets data-dark-mode="off" on
//                        <html> (applyTheme does), which this file respects.
//
// Run with `npm run build`. Nothing here is written by hand: edit tokens.json and rebuild.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokens = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'))
const out = join(root, 'dist')
mkdirSync(out, { recursive: true })

const HEADER =
  '/* @sympauthy/design — generated from tokens.json by scripts/build-theme.mjs. Do not edit. */\n'
const themes = tokens.color.themes.map((t) => t.id)
const [first] = themes

/** The value of a color token in one theme; a token without one inherits the first theme's. */
function valueIn(token, theme) {
  const v = token.value
  if (typeof v === 'string') return v
  return v[theme] ?? v[first]
}
/** `{other}` aliases become var(--other). */
const css = (v) => v.replace(/^\{(.+)\}$/, 'var(--$1)')
const esc = (name) => name.replace(/\./g, '\\.')
const colors = tokens.color.tokens
const color = (name, theme) => {
  const t = colors.find((c) => c.name === name)
  if (!t) throw new Error(`tokens.json has no color "${name}"`)
  let v = valueIn(t, theme)
  // Resolve aliases to literals for theme.css, which Tailwind reads at build time.
  for (let i = 0; i < 16 && /^\{(.+)\}$/.test(v); i++) v = color(v.slice(1, -1), theme)
  return v
}

// ---------- tokens.css ----------
let tokensCss = HEADER
for (const theme of themes) {
  const sel =
    theme === first
      ? `:root, [data-theme="${theme}"]`
      : theme === 'dark'
        ? `.dark, [data-theme="dark"]`
        : `[data-theme="${theme}"]`
  const lines = colors
    .filter((t) => theme === first || (typeof t.value === 'object' && t.value[theme]))
    .map((t) => `  --${esc(t.name)}: ${css(valueIn(t, theme))};`)
  tokensCss += `${sel} {\n${lines.join('\n')}\n}\n`
}
const scalars = ['spacing', 'radius', 'size'].flatMap((f) => tokens[f]?.tokens ?? [])
tokensCss += `:root {\n${scalars.map((t) => `  --${esc(t.name)}: ${t.value};`).join('\n')}\n`
for (const [key, stack] of Object.entries(tokens.type.families)) {
  tokensCss += `  --font-${key}: ${fontStack(key, stack)};\n`
}
tokensCss += '}\n'
for (const group of tokens.type.groups) {
  for (const s of group.styles) {
    const fam = s.family ?? group.family
    const decl = [
      `font-family: var(--font-${fam});`,
      `font-size: ${s.fontSize};`,
      `line-height: ${s.lineHeight};`,
      `font-weight: ${s.fontWeight};`,
      s.letterSpacing ? `letter-spacing: ${s.letterSpacing};` : ''
    ].filter(Boolean)
    tokensCss += `.${s.name} { ${decl.join(' ')} }\n`
  }
}

/** The variable fonts fontsource ships come first; the static family names stay as fallbacks. */
function fontStack(key, stack) {
  const variable = { sans: "'Plus Jakarta Sans Variable'", mono: "'JetBrains Mono Variable'" }[key]
  return variable ? `${variable}, ${stack}` : stack
}

// ---------- theme.css (Tailwind v4) ----------
// Role in tokens.json → the Tailwind variable both apps already use.
const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
const TAILWIND = [
  ...STEPS.map((s) => [`--color-gray-${s}`, `ink-${s}`]),
  ['--color-body', 'ground'],
  ['--color-primary', 'primary'],
  ['--color-primary-hover', 'primary-hover'],
  ['--color-on-primary', 'on-primary'],
  ['--color-primary-subtle', 'primary-subtle'],
  ['--color-on-primary-subtle', 'on-primary-subtle'],
  ['--color-gold', 'gold'],
  ['--color-disabled', 'disabled'],
  ['--color-on-disabled', 'on-disabled'],
  ['--color-danger', 'danger'],
  ['--color-nav', 'nav-ground'],
  ['--color-nav-text', 'nav-text'],
  ['--color-nav-muted', 'nav-muted'],
  ['--color-nav-disabled', 'nav-disabled'],
  ['--color-nav-hover', 'nav-hover'],
  ['--color-nav-active', 'nav-active'],
  ['--color-nav-divider', 'nav-divider']
]
const size = (name) => tokens.size.tokens.find((t) => t.name === name).value
let themeCss = HEADER + '@theme {\n'
themeCss += TAILWIND.map(([v, role]) => `  ${v}: ${color(role, first)};`).join('\n') + '\n\n'
themeCss += `  --font-sans: ${fontStack('sans', tokens.type.families.sans)};\n`
themeCss += `  --font-mono: ${fontStack('mono', tokens.type.families.mono)};\n\n`
themeCss += `  --container-page: ${size('page-width')};\n`
themeCss += `  --container-card: ${size('auth-card-width')};\n`
themeCss += `  --container-card-large: ${size('auth-card-width-large')};\n`
themeCss += '}\n'

// ---------- theme-dark.css (flow only) ----------
const darkRoles = TAILWIND.filter(([, role]) => !role.startsWith('nav-') && role !== 'gold')
let darkCss = HEADER
darkCss += '@media (prefers-color-scheme: dark) {\n  :root:not([data-dark-mode="off"]) {\n'
darkCss += darkRoles.map(([v, role]) => `    ${v}: ${color(role, 'dark')};`).join('\n') + '\n'
// The flow's cards are bg-white: white itself becomes the dark surface.
darkCss += `    --color-white: ${color('surface', 'dark')};\n`
darkCss += '    color-scheme: dark;\n  }\n}\n'

writeFileSync(join(out, 'tokens.css'), tokensCss)
writeFileSync(join(out, 'theme.css'), themeCss)
writeFileSync(join(out, 'theme-dark.css'), darkCss)
console.log('Wrote dist/tokens.css, dist/theme.css, dist/theme-dark.css')
