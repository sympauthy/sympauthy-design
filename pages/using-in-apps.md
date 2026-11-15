# Using in the apps

`@sympauthy/design` is how sympauthy-flow and sympauthy-admin reach this system. It is a Tailwind v4 theme, a few shared rules, and the Common components as Vue source. Templates keep writing `bg-primary`, `text-gray-500`, `border-gray-200`: the package redefines what those utilities resolve to.

## Install

```sh
npm install github:sympauthy/sympauthy-design#v0.11.0
```

The package is internal to SympAuthy, so it is not on npm: the apps install it from this repository by version tag, with no token. npm builds `dist/` on install through the `prepare` script, so do not install with `--ignore-scripts`.

## Stylesheet

In `sympauthy-flow/src/styles/style.css` and `sympauthy-admin/src/app/styles/style.css`:

```css
@import 'tailwindcss';
@import '@sympauthy/design/theme.css';
@import '@sympauthy/design/components.css';
```

`components.css` tells Tailwind where the components are, so an app writes no `@source` for them. Import it outside any `layer()`: inside one, the build fails with `` `@source` cannot be nested ``. An app's stylesheet declares none of the classes `components.css` carries, and no `@theme` block of its own.

`.sa-field-label` can also be applied. A label drawn in a pseudo-element, which no class can reach, takes `@apply sa-field-label` in the app's stylesheet, and so cannot drift from the labels the components draw. The other rules of `components.css` are classes, which Tailwind refuses to apply.

`theme.css` names the roles and reads each from a token, so `bg-primary` is `var(--primary)`. The tokens themselves come from the server, linked in `index.html` ahead of the app's own stylesheet:

```html
<link rel="stylesheet" href="/branding/tokens.css" vite-ignore />
<link rel="icon" href="/branding/icon" vite-ignore />
```

The icon replaces the app's own `favicon.ico`. `vite-ignore` keeps Vite from bundling the links, which it would otherwise fail to resolve. A link in the page is in place before any script runs, so a deployment's colors never flash SympAuthy's first. A flow hosted on another origin links the server's full URLs.

In development, proxy `/branding` to the server next to `/api` in `vite.config.ts`. Without the stylesheet the page still draws, in SympAuthy's light colors, which `theme.css` carries as fallbacks; it has no dark theme until the link resolves.

## Fonts

```ts
// main.ts
import '@sympauthy/design/fonts.css'
```

Both faces come from the package's `@fontsource-variable` dependencies, served by the app itself. Never link Google Fonts: the flow is a sign-in page, and a third-party request there tells a font host who is signing in.

## Components

```ts
import { SaButton, SaCard } from '@sympauthy/design'
```

npm installs what the components are built on with the package: `reka-ui` as a peer dependency and `@heroicons/vue` as a dependency. An app that imports `reka-ui` itself keeps to a version in the package's range: npm still installs one copy outside it, and only warns, so the package's components run on a version they were not built for. A component an app does not import adds nothing to its JavaScript.

The package ships `.vue` and `.ts` source; each app's Vite build compiles it. Exclude it from pre-bundling so it is compiled like the app's own files:

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: { exclude: ['@sympauthy/design'] }
})
```

A screen imports the package's components from `@sympauthy/design` itself, under their `Sa` names, so that a page of this site and the template drawing a component agree on what it is called. An app's own kit holds only what the app adds: the admin's `shared/ui` re-exports nothing of the package's. The admin's button is one of those, a thin wrapper: its props extend `SaButtonProps` with `requiredScopes`, and it computes the missing scopes, passes `refused` to `SaButton`, and wraps it in a tooltip that names them.

## The package's words

A component says some words the same on every screen: "Copied", "No, cancel", "Previous", "Show password", "Nothing matches", the conditions of a table's filters. Those are the package's, and an app passes none of them. It passes only the words naming what is on its screen: a label, a placeholder, what a copy button copies, what a confirmation confirms.

The package draws its words through the app's `vue-i18n`, a peer dependency like `reka-ui`, so the language the app renders in is the language of the components too. The package accepts `vue-i18n` 11, in the composition mode: `legacy: false`, or the default of `@intlify/unplugin-vue-i18n`. Install it before drawing a component that says one of the package's words; drawn without it, such a component fails as it mounts, with `vue-i18n`'s error that no instance is installed. A component saying none of them, as `SaButton` or `SaCard`, needs nothing.

The words sit under `sa.` in the app's messages, so that they never meet an app's own keys. Add them to each language the app holds, beside its own:

```ts
// i18n.ts
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { loadSaMessages, SA_MESSAGES_EN } from '@sympauthy/design'

export const i18n = createI18n({ legacy: false, locale, fallbackLocale: 'en', messages })

// English is in the first load, with no fetch, since it is the language both apps fall back to.
i18n.global.mergeLocaleMessage('en', SA_MESSAGES_EN)

// Every other language the app holds, as it loads it: here all of them, before the app mounts.
export async function addSaMessages(): Promise<void> {
  for (const language of i18n.global.availableLocales) {
    const words = await loadSaMessages(language)
    if (words) {
      i18n.global.mergeLocaleMessage(language, words)
    }
  }
}
```

`loadSaMessages(locale)` answers the package's words in a language, already under `sa`: English with no fetch, and any other language from a chunk of its own in the app's build. A regional tag is answered with its language, `fr-CA` with `fr`, and a language the package does not hold with `undefined`. `SA_LOCALES` lists the languages it holds; only English ships for now, as in both apps.

- **Add the package's words only to a language the app holds itself.** Otherwise a language the package lacks would draw its words in English inside a translated screen. A new language is a release of the package, then of the app.
- **An app loading its languages lazily loads the package's with each**, before switching to it. One loading every language up front, as both apps do today, loads the package's the same way.
- **Keep `vue-i18n`'s message compiler.** It compiles a plain message the first time it is used, so the package's words need no step of the app's build and no path into `node_modules`. `@intlify/unplugin-vue-i18n` keeps it unless `dropMessageCompiler` is set.
- **A word missing from the messages draws its key**, as `sa.copy.copied`. `vue-i18n` warns of one in development unless `missingWarn` is off, as both apps set it.

## The deployment's brand

The stylesheet and the icon need no code. The logos are linked from the server too, and only the name and the dark mode are fetched:

```vue
<script setup lang="ts">
import { SaBrandLogo, fetchBrand } from '@sympauthy/design'

const brand = await fetchBrand()
</script>

<template>
  <SaBrandLogo size="lg" :follow-device="brand.darkMode === 'auto'" />
  <span>{{ brand.displayName ?? 'SympAuthy' }}</span>
</template>
```

The `await` needs a `<Suspense>` above the component; an app without one fetches the brand once at boot and hands it down. `fetchBrand` never rejects: after 3 seconds, or on any failure, it answers no name and `off`, and the page draws as SympAuthy's.

This is the flow's logo, which follows the device. The dark mode is what keeps the dark logo off a light page: under `off`, the device's preference must not choose it. A page whose theme a person chooses passes `dark` from the theme it applied instead, since `followDevice` reads the device and not that choice: the admin passes it on `ground` and `surface`, and `dark` on its sidebar, which stays on `nav-ground` in every theme.

See [Branding a deployment](./branding) for what the server answers.
