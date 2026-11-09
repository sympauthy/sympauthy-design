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
npm install github:sympauthy/sympauthy-design#v0.11.0
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

## Contribute

Start at [the documentation](docs/index.md): it says what to read first, how the repository is laid
out, and how to run and check a change ([running locally](docs/design/running-locally.md)).

```sh
nvm use
npm install
npm run pages:dev     # builds the theme, then serves the pages with live demos
```

## License

GPL-3.0, like the rest of SympAuthy.
