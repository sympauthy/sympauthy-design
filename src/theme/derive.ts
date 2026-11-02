/**
 * One brand color in, a full palette out: what the theme builder shows and writes. The server does
 * not derive: a role a configuration leaves out keeps SympAuthy's value.
 *
 * The grays reuse SympAuthy's own lightness and chroma at every step, turned to the brand's hue
 * (or to no hue, for `neutral`). A primary too light to carry white labels is darkened until it
 * does, and the result says so. SympAuthy's Bordeaux returns the hand-tuned palette of tokens.json.
 *
 * Keep pages/public/theme-builder/index.html in step with this file: it carries the same steps.
 */
import { FLOW_ROLES, INK_STEPS, type DarkPalette, type LightPalette } from './roles'

export type GrayTint = 'tinted' | 'neutral'

export interface DerivedPalette {
  light: LightPalette
  dark: DarkPalette
  /** Set when the primary color had to be darkened for white labels to read. */
  adjusted: { from: string; to: string; ratio: number } | null
}

interface Oklch {
  L: number
  C: number
  H: number
}

// ---------- OKLCH <-> sRGB ----------
const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
const toGamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055)

export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '')
  if (h.length === 3) h = [...h].map((x) => x + x).join('')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number]
}

export function toOklch(hex: string): Oklch {
  const [r, g, b] = hexToRgb(hex).map(toLinear)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return { L, C: Math.hypot(A, B), H: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 }
}

function oklchToRgb(L: number, C: number, H: number): number[] {
  const a = C * Math.cos((H * Math.PI) / 180)
  const b = C * Math.sin((H * Math.PI) / 180)
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3)
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3)
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3)
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  ].map(toGamma)
}

const inGamut = (rgb: number[]) => rgb.every((v) => v >= -0.0005 && v <= 1.0005)

/** The sRGB hex of an OKLCH color, its chroma reduced until it fits the gamut. */
export function oklchToHex(L: number, C: number, H: number): string {
  L = Math.min(1, Math.max(0, L))
  let rgb = oklchToRgb(L, C, H)
  if (!inGamut(rgb)) {
    let lo = 0
    let hi = C
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2
      if (inGamut(oklchToRgb(L, mid, H))) lo = mid
      else hi = mid
    }
    rgb = oklchToRgb(L, lo, H)
  }
  return (
    '#' +
    rgb
      .map((v) =>
        Math.round(Math.min(1, Math.max(0, v)) * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  )
}

const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex).map(toLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2 contrast ratio between two hex colors. */
export function contrast(a: string, b: string): number {
  const x = luminance(a)
  const y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

/** Moves a color's lightness in `direction` until it reaches `min` contrast against `ground`. */
function until(c: Oklch, ground: string, min: number, direction: 1 | -1): Oklch & { hex: string } {
  let L = c.L
  let out = oklchToHex(L, c.C, c.H)
  for (let i = 0; i < 200 && contrast(out, ground) < min && L > 0.02 && L < 0.99; i++) {
    L += 0.005 * direction
    out = oklchToHex(L, c.C, c.H)
  }
  return { L, C: c.C, H: c.H, hex: out }
}

// ---------- SympAuthy's own palette ----------
export const SYMPAUTHY_PRIMARY = '#7b1e3a'

const SYMPAUTHY: { light: LightPalette; dark: DarkPalette } = {
  light: {
    primary: '#7b1e3a',
    'primary-hover': '#631530',
    'on-primary': '#ffffff',
    'primary-subtle': '#f6e3e8',
    'on-primary-subtle': '#7b1e3a',
    ground: '#fbf7f4',
    surface: '#ffffff',
    'ink-50': '#f6f2f4',
    'ink-100': '#ede6e9',
    'ink-200': '#dfd5d9',
    'ink-300': '#c3b7bc',
    'ink-400': '#9b8c92',
    'ink-500': '#6b5a60',
    'ink-600': '#574850',
    'ink-700': '#45363c',
    'ink-800': '#33242a',
    'ink-900': '#1f1418',
    accent: '#e9b949',
    'nav-ground': '#1f1418',
    'nav-text': '#f3d9df',
    'nav-muted': '#b9a7ae',
    'nav-disabled': '#7d6b71',
    'nav-hover': '#33242a',
    'nav-active': '#4a1f2d',
    'nav-divider': '#33242a'
  },
  dark: {
    primary: '#e89aae',
    'primary-hover': '#f0b5c4',
    'on-primary': '#1f1418',
    'primary-subtle': '#4a1f2d',
    'on-primary-subtle': '#f3d9df',
    ground: '#171013',
    surface: '#1f1418',
    'ink-50': '#2a1e23',
    'ink-100': '#33262b',
    'ink-200': '#44353b',
    'ink-300': '#5c4b51',
    'ink-400': '#7d6b71',
    'ink-500': '#b9a7ae',
    'ink-600': '#cdbec3',
    'ink-700': '#e3d7da',
    'ink-800': '#f0e8ea',
    'ink-900': '#fbf7f4'
  }
}

/** Lightness and chroma of each gray step of SympAuthy's scale, light then dark. */
const INK_PROFILE: Record<'light' | 'dark', Array<[number, number]>> = {
  light: [
    [0.965, 0.005],
    [0.931, 0.0085],
    [0.882, 0.0122],
    [0.791, 0.0152],
    [0.655, 0.0198],
    [0.486, 0.0239],
    [0.42, 0.0238],
    [0.351, 0.0234],
    [0.281, 0.0249],
    [0.207, 0.0194]
  ],
  dark: [
    [0.252, 0.0206],
    [0.286, 0.0213],
    [0.348, 0.0235],
    [0.432, 0.0247],
    [0.547, 0.0243],
    [0.746, 0.0229],
    [0.815, 0.0182],
    [0.89, 0.0138],
    [0.938, 0.009],
    [0.978, 0.0059]
  ]
}
/** Bordeaux's chroma: the reference the grays' tint is scaled against. */
const REFERENCE_CHROMA = 0.128

export function normalizeHex(value: string): string | null {
  let v = value.trim().toLowerCase()
  if (!v.startsWith('#')) v = '#' + v
  if (/^#[0-9a-f]{3}$/.test(v)) v = '#' + [...v.slice(1)].map((x) => x + x).join('')
  return /^#[0-9a-f]{6}$/.test(v) ? v : null
}

export function derivePalette(primaryHex: string, tint: GrayTint = 'tinted'): DerivedPalette {
  const input = normalizeHex(primaryHex)
  if (!input) throw new Error(`Not a hex color: ${primaryHex}`)
  if (input === SYMPAUTHY_PRIMARY && tint === 'tinted') {
    return { light: { ...SYMPAUTHY.light }, dark: { ...SYMPAUTHY.dark }, adjusted: null }
  }

  const p = toOklch(input)
  const k = tint === 'neutral' ? 0 : Math.min(p.C / REFERENCE_CHROMA, 1.2)
  const grayHue = (p.H + 348) % 360
  const ink = (mode: 'light' | 'dark') =>
    Object.fromEntries(
      INK_STEPS.map((s, i) => [
        `ink-${s}`,
        oklchToHex(INK_PROFILE[mode][i][0], INK_PROFILE[mode][i][1] * k, grayHue)
      ])
    )

  const light = { ...ink('light') } as LightPalette
  const dark = { ...ink('dark') } as DarkPalette
  light.ground = oklchToHex(0.981, 0.004 * k, grayHue)
  light.surface = '#ffffff'
  dark.ground = oklchToHex(0.183, 0.013 * k, grayHue)
  dark.surface = oklchToHex(0.207, 0.0194 * k, grayHue)

  // Light: the color carries white labels and reads as a link on white.
  let primary = { ...p, hex: oklchToHex(p.L, p.C, p.H) }
  let adjusted: DerivedPalette['adjusted'] = null
  const before = contrast(primary.hex, '#ffffff')
  if (before < 4.5) {
    primary = until(primary, '#ffffff', 4.6, -1)
    adjusted = { from: input, to: primary.hex, ratio: before }
  }
  light.primary = primary.hex
  light['on-primary'] = '#ffffff'
  light['primary-hover'] = oklchToHex(primary.L - 0.057, primary.C * 0.875, primary.H)
  light['primary-subtle'] = oklchToHex(0.932, Math.min(primary.C * 0.17, 0.03), primary.H)
  light['on-primary-subtle'] =
    contrast(primary.hex, light['primary-subtle']) >= 4.8
      ? primary.hex
      : until(primary, light['primary-subtle'], 4.8, -1).hex

  // Dark: a light tint of the color, with dark labels on it.
  const dp = until({ L: 0.769, C: Math.min(p.C * 0.75, 0.12), H: p.H }, dark.surface, 4.6, 1)
  dark.primary = dp.hex
  dark['on-primary'] = contrast(light['ink-900'], dp.hex) >= 4.5 ? light['ink-900'] : '#000000'
  dark['primary-hover'] = oklchToHex(Math.min(dp.L + 0.062, 0.95), dp.C * 0.74, dp.H)
  dark['primary-subtle'] = oklchToHex(0.306, Math.min(p.C * 0.53, 0.07), p.H)
  dark['on-primary-subtle'] = oklchToHex(0.908, Math.min(p.C * 0.23, 0.03), p.H)

  // Admin sidebar (light only): a dark ground from the grays, the dark tint as its accent.
  light.accent = dark.primary
  light['nav-ground'] = light['ink-900']
  light['nav-text'] = dark['on-primary-subtle']
  light['nav-muted'] = dark['ink-500']
  light['nav-disabled'] = dark['ink-400']
  light['nav-hover'] = light['ink-800']
  light['nav-active'] = dark['primary-subtle']
  light['nav-divider'] = light['ink-800']

  return { light, dark, adjusted }
}

/** Every role a flow page reads, for callers that check a palette is complete. */
export const REQUIRED_DARK_ROLES = FLOW_ROLES
