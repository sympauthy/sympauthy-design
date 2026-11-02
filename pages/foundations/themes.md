# Themes

Which theme each app draws, and how a page pins one.

## Usage

- **Light is the default and the first theme.** Every token has a Dark value, shown in [Color](/foundations/color#tokens).
- **The flow follows the device**: under `prefers-color-scheme: dark` it switches to the Dark values. An end user meets the flow inside an app that may already be dark, and a white flash on sign-in is jarring.
- **The admin stays light.** Its design-system standard defers dark mode; the Dark values are ready for when it adopts it.
- **The stylesheet decides, and a page can pin it.** `tokens.css` holds the Light values on `:root` and the Dark values under `prefers-color-scheme: dark` and `[data-theme="dark"]`. A page with `data-theme="light"` on `<html>` stays light, which is how the admin does.
- **The sidebar has one theme.** `accent` and `nav-*` carry a single value: the sidebar is dark on every page.

## Related

- [Sidebar](/components/sidebar): dark on every page.
