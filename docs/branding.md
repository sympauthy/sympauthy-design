<script setup>
import { withBase } from 'vitepress'
</script>

# Branding a deployment

SympAuthy is self-hosted, and its sign-in pages are the first thing your users see of it. A deployment can replace SympAuthy's Bordeaux with its own color, name and logo, from the server's configuration, without rebuilding the sign-in pages or the admin.

<p><a class="VPButton medium brand" :href="withBase('/theme-builder/')" target="_self" style="display: inline-block; padding: 0 20px; line-height: 38px; text-decoration: none">Open the theme builder</a></p>

The builder takes one color, derives every shade the apps need from it, previews the sign-in pages in light and dark and the admin panel, checks every text pair against WCAG AA, and writes the configuration.

## The configuration

```yaml
ui:
  display-name: Acme
  logo-url: https://auth.acme.example/branding/logo.svg
  theme:
    dark-mode: auto # auto: the sign-in pages follow the device · off: always light
    light:
      primary: '#0f766e'
      primary-hover: '#0f645d'
      # … every role the builder writes
    dark: # sign-in pages only
      primary: '#84c2ba'
      # …
```

Each key can also be set as an environment variable (`UI_DISPLAY_NAME`, `UI_THEME_LIGHT_PRIMARY`, …): Micronaut maps them onto the same `ui.*` keys.

### What can be changed

| Key | What it colors |
| --- | --- |
| `primary`, `primary-hover`, `on-primary` | the main button, links, the focus ring, the current tab |
| `primary-subtle`, `on-primary-subtle` | tinted boxes: a consent summary, a selection |
| `ground`, `surface` | the page behind the cards, and the cards themselves |
| `ink-50` … `ink-900` | the grays: borders, labels, text |
| `accent`, `nav-*` (light only) | the admin sidebar |

Status colors (errors, warnings, tags) are not configurable: red means a failure whatever the brand.

### Rules the server applies

- A value that is not a 6-digit hex color is ignored, and the default stays.
- A theme that names only `light.primary` gets every other role derived from it, the way the builder does.
- `dark-mode: off` keeps the sign-in pages light on every device. The admin is always light.

## How it reaches the pages

The server hands `ui.theme` to the sign-in pages and the admin with the rest of their configuration. Each app calls `applyTheme` from `@sympauthy/design`, which writes the colors as CSS variables in one `<style>` at the end of `<head>`. Every utility both apps use reads those variables, so that is the whole rebrand.

::: warning Status
SympAuthy reads `ui.display-name` today. `ui.logo-url` and `ui.theme` are the contract this page proposes: the server has to expose them to the two apps, and both apps have to call `applyTheme`.
:::
