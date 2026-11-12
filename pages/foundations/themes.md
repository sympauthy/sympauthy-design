# Themes

Which theme each app draws, and how a page sets one.

## Usage

- **Light is the default and the first theme.** Every token has a Dark value, shown in [Color](/foundations/color#tokens).
- **The flow follows the device**: under `prefers-color-scheme: dark` it switches to the Dark values. An end user meets the flow inside an app that may already be dark, and a white flash on sign-in is jarring.
- **The admin draws the theme its operator chose**: light, dark, or following the device, which is the default, on its preferences page. It sets `data-theme` on `<html>` to `light` or `dark`, and removes it to follow the device, before the first paint.
- **A deployment whose `dark-mode` is `off` is drawn light** in every app, since its stylesheet carries no Dark values. The admin pins it with `data-theme="light"` whatever its operator chose.
- **The stylesheet decides, and a page can pin it.** `tokens.css` holds the Light values on `:root` and the Dark values under `prefers-color-scheme: dark` and `[data-theme="dark"]`. A page with `data-theme` on `<html>` draws that theme whatever the device: `light` keeps a light-only deployment light.
- **The sidebar has one theme.** `accent` and `nav-*` carry a single value: the sidebar is dark on every page.

## Related

- [Sidebar](/components/sidebar): dark on every page.
