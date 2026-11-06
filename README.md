# SympAuthy Design

The design system of [SympAuthy](https://github.com/sympauthy/sympauthy): the tokens, the Tailwind
theme, the shared Vue components and the branding helpers that
[sympauthy-flow](https://github.com/sympauthy/sympauthy-flow) and
[sympauthy-admin](https://github.com/sympauthy/sympauthy-admin) are built with, and the site that
documents them.

- **Docs:** https://sympauthy.github.io/sympauthy-design/
- **Theme builder:** https://sympauthy.github.io/sympauthy-design/theme-builder/
- **Package:** `@sympauthy/design`, installed from this repository (it is not on npm)

## Use it in an app

```sh
npm install github:sympauthy/sympauthy-design#v0.8.0
```

```css
@import 'tailwindcss';
@import '@sympauthy/design/theme.css';
@import '@sympauthy/design/components.css';
```

```ts
import '@sympauthy/design/fonts.css'
import { SaButton, fetchBrand } from '@sympauthy/design'
```

The full guide is [Using in the apps](pages/using-in-apps.md).

## What is in here

```
tokens.json              every value of the system, the one source
scripts/build-theme.mjs  tokens.json → dist/theme.css, tokens.css, tokens-light.css
src/
  components/            the Common components (Alert, Button, Card, Field and the rest)
  theme/                 branding: /branding, applyTheme, derivePalette, the overridable roles
  components.css         .sa-control, .sa-menu, .sa-popover… shared by both apps
  fonts.css              self-hosted Plus Jakarta Sans and JetBrains Mono
logos/                   the mark: SVG, favicons, app icons
docs/                    how this repository is built: its design and its standards
pages/                   the VitePress site, deployed to GitHub Pages
  public/theme-builder/  the theme builder, a standalone page
```

`dist/` is generated and not committed: edit `tokens.json` and run `npm run build`, never the CSS.
The `prepare` script builds it when an app installs the package.

## Develop

```sh
nvm use
npm install
npm run pages:dev     # builds the theme, then serves the pages with live demos
npm run type-check
npm run format
```

## Release

1. Bump `version` in `package.json` and merge.
2. `git tag v0.8.0 && git push --tags`.

The tag is the release: the package is internal to SympAuthy, so nothing is published to a registry,
and `private` in `package.json` makes `npm publish` refuse. Renovate in both apps opens the version
bump.

## Not done yet

- **Server support for branding.** SympAuthy reads `ui.display-name`; the server answering `/branding`
  is [sympauthy#200](https://github.com/sympauthy/sympauthy/issues/200), and both apps then link it.
- **The theme builder carries its own copy of the derivation** (it is one standalone HTML page).
  Keep it in step with `src/theme/derive.ts`, or port it to a Vue page that imports it.
- **Flow and Admin components** are specified in the pages but implemented in each app; only the
  Common group ships here.

## License

GPL-3.0, like the rest of SympAuthy.
