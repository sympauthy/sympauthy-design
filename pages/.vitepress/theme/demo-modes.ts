import tokens from '../../../tokens.json'

const breakpoint = (name: string) =>
  parseFloat(tokens.breakpoint.tokens.find((token) => token.name === name)!.value) * 16

/**
 * The widths a demo is drawn at. Well past their breakpoints: a frame exactly at one drops below it
 * at some display scales, by rounding.
 */
export const MODES = {
  phone: { width: 390, label: 'Phone' },
  tablet: { width: breakpoint('breakpoint-sm') + 128, label: 'Tablet' },
  desktop: { width: breakpoint('breakpoint-lg') + 64, label: 'Desktop' }
}

export type DemoMode = keyof typeof MODES

/** One tab of a `DemoModes`: a mode, how its frame is drawn, and whatever its demo reads of it. */
export interface DemoModeFrame {
  mode: DemoMode
  /** Names the tab, where that is more than its mode, as "Tablet and desktop". */
  label?: string
  height?: number
  crop?: number
  flush?: boolean
  [key: string]: unknown
}
