/**
 * What the server answers under /branding, read the same way by both apps (see docs/branding.md).
 * The stylesheet and the images are linked from the page; only the name and the dark mode are fetched.
 */
export interface Brand {
  /** Absent when the deployment configures none: the app shows SympAuthy's own. */
  displayName?: string
  /** `off` keeps the page light, so the dark logo must not be picked by the device's preference. */
  darkMode: 'auto' | 'off'
}

export interface BrandingUrls {
  stylesheet: string
  icon: string
  logo: string
  logoDark: string
  brand: string
}

/** `server` is the server's origin for a flow hosted on another one, empty otherwise. */
export function brandingUrls(server = ''): BrandingUrls {
  const root = `${server.replace(/\/$/, '')}/branding`
  return {
    stylesheet: `${root}/tokens.css`,
    icon: `${root}/icon`,
    logo: `${root}/logo`,
    logoDark: `${root}/logo-dark`,
    brand: `${root}/brand.json`
  }
}

/** Never rejects: a sign-in page is still drawn, as SympAuthy's, when `/branding` cannot be read. */
export async function fetchBrand(server = ''): Promise<Brand> {
  try {
    const response = await fetch(brandingUrls(server).brand)
    if (!response.ok) throw new Error(`${response.status}`)
    const { display_name: displayName, dark_mode: darkMode } = await response.json()
    return {
      ...(typeof displayName === 'string' ? { displayName } : {}),
      darkMode: darkMode === 'off' ? 'off' : 'auto'
    }
  } catch (error) {
    console.warn('Could not read the deployment’s brand', error)
    return { darkMode: 'auto' }
  }
}
