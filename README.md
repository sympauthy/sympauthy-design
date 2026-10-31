# SympAuthy Design

The design system of [SympAuthy](https://github.com/sympauthy/sympauthy): the tokens, the Tailwind
theme, the shared Vue components and the branding helpers that
[sympauthy-flow](https://github.com/sympauthy/sympauthy-flow) and
[sympauthy-admin](https://github.com/sympauthy/sympauthy-admin) are built with, and the site that
documents them.

- **Docs:** https://sympauthy.github.io/sympauthy-design/
- **Theme builder:** https://sympauthy.github.io/sympauthy-design/theme-builder/
- **Package:** `@sympauthy/design`

## Use it in an app

```sh
npm install @sympauthy/design
```

```css
@import 'tailwindcss';
@import '@sympauthy/design/theme.css';
@import '@sympauthy/design/theme-dark.css'; /* sympauthy-flow only */
@import '@sympauthy/design/components.css';
@source '../../node_modules/@sympauthy/design/src';
```

```ts
import '@sympauthy/design/fonts.css'
import { applyTheme, CommonButton } from '@sympauthy/design'
```

The full guide is [Using in the apps](docs/using-in-apps.md).

## What is in here

```
tokens.json              every value of the system, the one source
scripts/build-theme.mjs  tokens.json → dist/theme.css, theme-dark.css, tokens.css
src/
  components/            the Common components (Card, Button, Field, Alert, Spinner)
  theme/                 branding: derivePalette, applyTheme, the overridable roles
  components.css         .control, .menu, .popover… shared by both apps
  fonts.css              self-hosted Plus Jakarta Sans and JetBrains Mono
logos/                   the mark: SVG, favicons, app icons
docs/                    the VitePress site, deployed to GitHub Pages
  public/theme-builder/  the theme builder, a standalone page
```

`dist/` is generated: edit `tokens.json` and run `npm run build`, never the CSS.

## Develop

```sh
nvm use
npm install
npm run docs:dev      # builds the theme, then serves the docs with live demos
npm run type-check
npm run format
```

## Release

1. Bump `version` in `package.json` and merge.
2. `git tag v0.2.0 && git push --tags`.

The Publish workflow builds the theme and publishes to npm (it needs an `NPM_TOKEN` secret with
publish rights on the `@sympauthy` scope). Renovate in both apps opens the version bump.

## Not done yet

- **Server support for branding.** SympAuthy reads `ui.display-name`; `ui.logo-url` and `ui.theme`
  need exposing to the apps, and both apps need to call `applyTheme`.
- **The theme builder carries its own copy of the derivation** (it is one standalone HTML page).
  Keep it in step with `src/theme/derive.ts`, or port it to a Vue page that imports it.
- **Flow and Admin components** are specified in the docs but implemented in each app; only the
  Common group ships here.

## License

GPL-3.0, like the rest of SympAuthy.
