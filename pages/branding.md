<script setup>
import { withBase } from 'vitepress'
</script>

# Branding a deployment

SympAuthy is self-hosted, and its sign-in pages are the first thing your users see of it. A deployment can replace SympAuthy's Bordeaux with its own colors, name and images from the server's configuration, without rebuilding the sign-in pages or the admin.

<p><a class="VPButton medium brand" :href="withBase('/theme-builder/')" target="_self" style="display: inline-block; padding: 0 20px; line-height: 38px; text-decoration: none">Open the theme builder</a></p>

The builder takes one color, derives every shade the apps need from it, previews the sign-in pages in light and dark and the admin panel, checks every text pair against WCAG AA, and writes the configuration.

::: warning Status
SympAuthy reads `ui.display-name` today. The other keys and `/branding` are the contract of [sympauthy#200](https://github.com/sympauthy/sympauthy/issues/200), and the apps link it once the server ships it.
:::

## The configuration

```yaml
ui:
  display-name: Acme
  icon: /etc/sympauthy/branding/icon.svg
  logo: https://cdn.acme.example/logo.svg
  logo-dark: http://assets.internal/logo-dark.svg
  theme:
    dark-mode: auto # auto: the pages follow the device · "off", quoted: always light
    light:
      primary: '#0f766e'
      primary-hover: '#0f645d'
      # … every role the builder writes
    dark:
      primary: '#84c2ba'
      # …
```

Each key can also be set as an environment variable (`UI_DISPLAY_NAME`, `UI_THEME_LIGHT_PRIMARY`, …): Micronaut maps them onto the same `ui.*` keys.

### What can be changed

| Key                                      | What it colors                                          |
| ---------------------------------------- | ------------------------------------------------------- |
| `primary`, `primary-hover`, `on-primary` | the main button, links, the focus ring, the current tab |
| `primary-subtle`, `on-primary-subtle`    | tinted boxes: a consent summary, a selection            |
| `ground`, `surface`                      | the page behind the cards, and the cards themselves     |
| `ink-50` … `ink-900`                     | the grays: borders, labels, text                        |
| `accent`, `nav-*` (light only)           | the admin sidebar                                       |

The builder leaves out `nav-strong`, which is white in every palette it derives. Set it by hand for a light sidebar, on a server that declares a design system from 0.5.0, since an older one refuses the key.

Only colors can be changed. Status colors (errors, warnings, tags) stay too: red means a failure whatever the brand.

### Rules the server applies

- **It serves what is configured, and derives nothing.** A role left out keeps SympAuthy's value, even when `primary` is changed: a deployment writing only `primary` keeps SympAuthy's `primary-hover` and `on-primary`. Write the full set the builder gives you.
- **It does not check contrast.** The builder does, so a palette edited by hand is yours to check.
- **It refuses wrong configuration.** A color that is not `#rrggbb`, `accent` or `nav-*` under `dark`, and `dark` alongside `dark-mode: off` each take readiness down, and the startup banner names the key.
- `dark-mode: "off"` keeps the pages light on every device. The admin is always light. Quote it: unquoted, YAML reads `off` as `false`, which the server refuses.

### Images

An image's value is a file path, or a URL starting with `http://` or `https://`. The server reads it at startup and answers it itself, so a third party never learns that a sign-in is starting. A new image takes a restart. SVG and PNG are accepted, up to 1 MiB.

| Key         | For                        | When not configured                               |
| ----------- | -------------------------- | ------------------------------------------------- |
| `icon`      | the favicon and small mark | `logos/sympauthy-favicon.svg`                     |
| `logo`      | light grounds              | `logos/sympauthy-icon.svg`                        |
| `logo-dark` | dark grounds               | `logo` if set, or `logos/sympauthy-icon-dark.svg` |

## How it reaches the pages

The server answers the brand under `/branding`, to anyone, without authentication, whether or not the admin is on. A reverse proxy has to forward it next to `/api`, `/flow` and `/admin`.

| Path                       | Answers                            |
| -------------------------- | ---------------------------------- |
| `GET /branding/tokens.css` | the stylesheet                     |
| `GET /branding/icon`       | the favicon and small mark         |
| `GET /branding/logo`       | the logo for light grounds         |
| `GET /branding/logo-dark`  | the logo for dark grounds          |
| `GET /branding/brand.json` | the display name and the dark mode |

Every answer carries an `ETag` and `Cache-Control: no-cache`, so a rebrand shows at once after a restart.

Each app links the stylesheet from its `index.html`. Being linked, it is in place before any script runs, so SympAuthy's colors never flash first. `theme.css` reads every Tailwind role from a token (`--color-primary: var(--primary, #7b1e3a)`), so a token written in the stylesheet reaches every utility of both apps. [Using in the apps](./using-in-apps#the-deployment-s-brand) shows the page's side, with `brandingUrls` and `fetchBrand`.

`brand.json` answers what the stylesheet cannot tell a script, with `display_name` absent when none is configured and `Access-Control-Allow-Origin: *` so a flow on another origin can read it:

```json
{ "display_name": "Acme", "dark_mode": "auto" }
```

### The stylesheet the server builds

The design system ships what the server starts from, of the version the server ships:

| `dark-mode` | Starts from             | Holds                                                                                         |
| ----------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| `auto`      | `dist/tokens.css`       | Light on `:root`, Dark under `prefers-color-scheme: dark` and `[data-theme="dark"]`, the rest |
| `off`       | `dist/tokens-light.css` | Light on `:root`, the rest                                                                    |

The server writes the configured colors after it, under the same selectors. Each role's token is its own name, but for `accent`, which is `--gold`:

```css
:root,
[data-theme='light'] {
  --primary: #0f766e;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --primary: #84c2ba;
  }
}
:root[data-theme='dark'],
[data-theme='dark'] {
  --primary: #84c2ba;
}
```

With nothing configured, the answer is the design system's file unchanged. `themeToCss` in `@sympauthy/design` writes exactly these rules, and is the reference for them.

SympAuthy's images are the files of `logos/` named in [the table above](#images).

## Trying a theme before it is configured

`applyTheme` writes those same rules in a `<style>` at the end of `<head>`, so a page shows a theme that no server answers yet. The page still needs the tokens, linked from a server or imported from `@sympauthy/design/tokens.css`: without them, what the theme leaves out falls back to `theme.css`'s light values, which a dark theme cannot read against. It is what a theme still being built needs, and the builder's CSS variables tab prints the same rules for pasting in the devtools. Nothing in production calls it: it runs after the page has booted, so the page would show SympAuthy's colors first.

```ts
import { applyTheme, derivePalette } from '@sympauthy/design'

const { light, dark } = derivePalette('#0f766e')
applyTheme({ light, dark }, { dark: true }) // { dark: false } in the admin
```

A role left out keeps SympAuthy's value, as on the server. `{ dark: false }` keeps the page light, pinning it if the page has not. A pin it added is lifted when it no longer applies, and a pin the page set stays.

It is more forgiving than the server, since a theme being typed is often not valid yet, so a theme that shows here can still be refused there:

| Value                                  | The server | `applyTheme`                                |
| -------------------------------------- | ---------- | ------------------------------------------- |
| a color that is not `#rrggbb`          | refuses    | reads `#0f7` and `0f766e`, ignores the rest |
| a `dark-mode` other than `auto`, `off` | refuses    | treats it as `auto`                         |
| `accent` or `nav-*` under `dark`       | refuses    | ignores it                                  |
| `dark` alongside `dark-mode: "off"`    | refuses    | ignores `dark`                              |

The builder only writes what the server accepts.
