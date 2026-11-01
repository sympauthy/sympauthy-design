// Generates the stylesheets of the package from tokens.json, the one source of every value.
//
//   dist/tokens.css        every token as a plain CSS variable (--primary, --ink-200…), light on :root,
//                          dark under prefers-color-scheme and [data-theme="dark"]; a page pinning
//                          data-theme="light" stays light. What the server answers at
//                          /branding/tokens.css, the deployment's colors written after it.
//   dist/tokens-light.css  the same without the dark roles: what the server starts from under
//                          ui.theme.dark-mode: off.
//   dist/theme.css         the Tailwind v4 @theme both apps import: Tailwind's gray scale redefined as
//                          the ink scale, and the roles the apps already name (primary, body, nav…),
//                          each reading its token so the stylesheet above reaches every utility.
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
// tokens.css has a rule for each: a theme added to tokens.json needs one here.
if (themes.join() !== 'light,dark') throw new Error(`Unexpected themes: ${themes.join(', ')}`)

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
  // Resolve aliases to literals, for theme.css's fallbacks.
  for (let i = 0; i < 16 && /^\{(.+)\}$/.test(v); i++) v = color(v.slice(1, -1), theme)
  return v
}

// ---------- tokens.css, tokens-light.css ----------
/** A theme's colors; only a token with its own value in that theme is restated past the first. */
const declarations = (theme, indent) =>
  [
    ...colors
      .filter((t) => theme === first || (typeof t.value === 'object' && t.value[theme]))
      .map((t) => `--${esc(t.name)}: ${css(valueIn(t, theme))};`),
    `color-scheme: ${theme};`
  ]
    .map((line) => indent + line)
    .join('\n')
const lightCss = `:root, [data-theme="light"] {\n${declarations('light', '  ')}\n}\n`
const darkCss =
  `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${declarations('dark', '    ')}\n  }\n}\n` +
  // :root raises it above the deployment's light values, written after it for a page pinned dark.
  `:root[data-theme="dark"], [data-theme="dark"] {\n${declarations('dark', '  ')}\n}\n`
let restCss = ''
const scalars = ['spacing', 'radius', 'size'].flatMap((f) => tokens[f]?.tokens ?? [])
restCss += `:root {\n${scalars.map((t) => `  --${esc(t.name)}: ${t.value};`).join('\n')}\n`
for (const [key, stack] of Object.entries(tokens.type.families)) {
  restCss += `  --font-${key}: ${fontStack(key, stack)};\n`
}
restCss += '}\n'
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
    restCss += `.${s.name} { ${decl.join(' ')} }\n`
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
  // The apps' cards are bg-white: white is the surface, which is what lets it turn dark.
  ['--color-white', 'surface'],
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
// The literal is the fallback: a page whose stylesheet did not load still draws SympAuthy's light.
themeCss +=
  TAILWIND.map(([v, role]) => `  ${v}: var(--${role}, ${color(role, first)});`).join('\n') + '\n\n'
themeCss += `  --font-sans: ${fontStack('sans', tokens.type.families.sans)};\n`
themeCss += `  --font-mono: ${fontStack('mono', tokens.type.families.mono)};\n\n`
themeCss += `  --container-page: ${size('page-width')};\n`
themeCss += `  --container-card: ${size('auth-card-width')};\n`
themeCss += `  --container-card-large: ${size('auth-card-width-large')};\n\n`
// min-h-control, min-w-control: the one height every control is drawn at.
themeCss += `  --spacing-control: ${size('control-height')};\n`
themeCss += '}\n'

writeFileSync(join(out, 'tokens.css'), HEADER + lightCss + darkCss + restCss)
writeFileSync(join(out, 'tokens-light.css'), HEADER + lightCss + restCss)
writeFileSync(join(out, 'theme.css'), themeCss)
console.log('Wrote dist/tokens.css, dist/tokens-light.css, dist/theme.css')
