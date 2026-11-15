import { SA_MESSAGES_EN, type SaMessages } from './en'

export { SA_MESSAGES_EN, type SaMessages }

/** The languages the package holds its words in, each a language tag without its region. */
export const SA_LOCALES = ['en'] as const

export type SaLocale = (typeof SA_LOCALES)[number]

/**
 * The package's words in [locale], already under `sa`, for an app to add beside its own messages in
 * that language. A regional tag is answered with its language, `fr-CA` with `fr`, and a language the
 * package does not hold with `undefined`, so that an app adds nothing for it.
 *
 * English is answered with no fetch, since it is in an app's first load. Every other language is
 * imported by a branch of its own, which a bundler splits into a chunk of its own: an import whose
 * path is built at runtime is not split out of a dependency by every bundler.
 */
export async function loadSaMessages(locale: string): Promise<SaMessages | undefined> {
  const language = locale.split(/[-_]/)[0]?.toLowerCase()
  switch (language) {
    case 'en':
      return SA_MESSAGES_EN
    default:
      return undefined
  }
}
