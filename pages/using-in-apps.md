# Using in the apps

`@sympauthy/design` is how sympauthy-flow and sympauthy-admin reach this system. It is a Tailwind v4 theme, a few shared rules, and the Common components as Vue source. Templates keep writing `bg-primary`, `text-gray-500`, `border-gray-200`: the package redefines what those utilities resolve to.

## Install

```sh
npm install github:sympauthy/sympauthy-design#v0.3.0
```

The package is internal to SympAuthy, so it is not on npm: the apps install it from this repository by version tag, with no token. npm builds `dist/` on install through the `prepare` script, so do not install with `--ignore-scripts`.

## Stylesheet

In `sympauthy-flow/src/styles/style.css` and `sympauthy-admin/src/app/styles/style.css`:

```css
@import 'tailwindcss';
@import '@sympauthy/design/theme.css';
@import '@sympauthy/design/components.css';
@source '../../node_modules/@sympauthy/design/src'; /* so Tailwind sees the components' classes */
```

Adjust the `@source` path to the stylesheet's depth (`../../../` from `src/app/styles/`). Remove from the admin's stylesheet what `components.css` now carries (`.control`, `.field-label`, `.control-focus`, `.control-focus-within`, `.menu`, `.menu-item`, `.popover`, `.overlay-animated`) and its own `@theme` block. Keep its table-as-cards rules: they are the admin's.

`theme.css` names the roles and reads each from a token, so `bg-primary` is `var(--primary)`. The tokens themselves come from the server, linked in `index.html` ahead of the app's own stylesheet:

```html
<link rel="stylesheet" href="/branding/tokens.css" vite-ignore />
<link rel="icon" href="/branding/icon" vite-ignore />
```

The icon replaces the app's own `favicon.ico`. `vite-ignore` keeps Vite from bundling the links, which it would otherwise fail to resolve. A link in the page is in place before any script runs, so a deployment's colors never flash SympAuthy's first. A flow hosted on another origin links the server's full URLs.

The admin stays light by pinning it, on the same page:

```html
<html lang="en" data-theme="light"></html>
```

In development, proxy `/branding` to the server next to `/api` in `vite.config.ts`. Without the stylesheet the page still draws, in SympAuthy's light colors, which `theme.css` carries as fallbacks; it has no dark theme until the link resolves.

## Fonts

```ts
// main.ts
import '@sympauthy/design/fonts.css'
```

Both faces come from the package's `@fontsource-variable` dependencies, served by the app itself. Never link Google Fonts: the flow is a sign-in page, and a third-party request there tells a font host who is signing in.

## Components

```ts
import { CommonButton, CommonCard, outlineColoredButton } from '@sympauthy/design'
```

npm installs what the components are built on with the package: `reka-ui` as a peer dependency and `@heroicons/vue` as a dependency. An app that imports `reka-ui` itself keeps to a version in the package's range: npm still installs one copy outside it, and only warns, so the package's components run on a version they were not built for. A component an app does not import adds nothing to its JavaScript.

The package ships `.vue` and `.ts` source; each app's Vite build compiles it. Exclude it from pre-bundling so it is compiled like the app's own files:

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: { exclude: ['@sympauthy/design'] }
})
```

In the admin, keep `shared/ui/index.ts` as the kit every screen imports from, and re-export the package's components there. The admin's `CommonButton` becomes a thin wrapper: it computes the missing scopes, passes `refused` to the package's button, and wraps it in a tooltip that names them.

## The deployment's brand

The stylesheet and the icon need no code. The logos are linked from the server too, and only the name and the dark mode are fetched:

```vue
<script setup lang="ts">
import { BrandLogo, fetchBrand } from '@sympauthy/design'

const brand = await fetchBrand()
</script>

<template>
  <BrandLogo large :follow-device="brand.darkMode === 'auto'" />
  <span>{{ brand.displayName ?? 'SympAuthy' }}</span>
</template>
```

The `await` needs a `<Suspense>` above the component; an app without one fetches the brand once at boot and hands it down. `fetchBrand` never rejects: after 3 seconds, or on any failure, it answers no name and `off`, and the page draws as SympAuthy's.

This is the flow's logo, which follows the device. The dark mode is what keeps the dark logo off a light page: under `off`, the device's preference must not choose it. A page that pins a theme chooses by its ground instead, with no `<source>`: the admin draws `urls.logo` on `ground` and `surface`, and `urls.logoDark` on its sidebar, which stays on `nav-ground` in every theme.

See [Branding a deployment](./branding) for what the server answers.

## Changes the migration brings

- **Controls get a visible border.** `.control` now states `border-gray-400` (3:1 on white). The old compatibility rule painted every border `gray-200` (1.3:1), too faint to find a field by.
- **One flat card.** The flow's card (`rounded-xl shadow-lg`, `p-3 md:p-5`) becomes `CommonCard`: `rounded-lg border border-gray-200 bg-white p-4 sm:p-6`. No shadow anywhere: remove `shadow-lg` from menus, popovers and dialogs, give dialogs the card's border, and drop `shadow-sm` from inputs.
- **A soft danger button.** `dangerColoredButton` is `border-red-200 bg-red-50 text-red-700`: `primary` is the only filled button.
- **One control height.** Every control is 44px in both apps: the admin's buttons, selects and dropdown triggers grow from 38px. Drop `min-h-9.5` and `min-h-11` from the apps' own controls: `.control` carries `min-h-control`.
- **One field.** The admin's fields grow to the flow's: 44px, 16px text, a 14px/500 `gray-700` label and a 14px help line. The flow's labels go from 600 `gray-900` to the same 500 `gray-700`, and its inputs drop the `ring-4 ring-primary-subtle` halo. `FormField` and `FormInput` no longer take a `size`.
- **Disabled buttons** read `gray-500` on a `gray-100` fill (5.3:1) instead of white on `gray-400` (2.5:1).
- **One mobile breakpoint.** The flow's claim groups step at `md:`, past the card around them at `sm:`: change them to `sm:`. The admin's `@media (max-width: 639px)` becomes `@media (width < theme(--breakpoint-sm))`.
- **The small parts move to the package.** The admin deletes its `CommonTag`, `EmptyValue`, `LoadingState`, `CopyToClipboard`, `CopyableValue` and `BrandLogo`, and re-exports the package's from `shared/ui`. The words become props: `LoadingState` takes a `label`, and the copy controls take `label`, `copiedLabel` and `failedLabel` where `title` was. `LoadingState` draws its spinner in `primary` and its line in `gray-500`. The flow's `BasePage` draws `BrandLogo` and its `TitleContentCard` draws `LoadingState`.
- **The overlays move to the package.** The admin deletes `BaseDialog`, `ConfirmDialog`, `HintTooltip` and `HelpTooltip`, re-exports `CommonDialog` as `BaseDialog` and so on so that its screens keep their imports, and mounts `CommonTooltipProvider` in place of reka-ui's in `App.vue`. `ActionsDropdown` becomes a wrapper over `CommonMenu` that turns `requiredScopes` into `disabledReason`. `ConfirmDialog` requires `confirmLabel` and `cancelLabel`, `CommonPopover` takes a `label` for its icon, and the `ⓘ` character becomes the icon. An app drawing `CommonTooltip` mounts one `CommonTooltipProvider` at its root. The flow's `CommonModal` becomes `CommonDialog`, which brings a focus trap and Escape to its time zone picker, and about 24 KB gzip to its bundle, loaded with the rest of the flow.
- **The app shell moves to the package.** The admin's `AdminLayout`, `SidebarNav` and `BreadcrumbNav` become small wrappers over `CommonAppShell`, `CommonSidebar` and `CommonBreadcrumb`: they keep the router, the scopes and the words, and pass `RouterLink` as `linkAs`. `AdminLayout` still closes the drawer on a route change. `PageActions` and `PAGE_ACTIONS_OUTLET` are re-exported.
- **One link.** `.link` comes from `components.css`, underlined at rest: the flow drops its `@utility link`, and the admin's `DocLink` draws it instead of underlining on hover.
- **One skeleton.** The flow's `animate-pulse` blocks become `CommonSkeleton`, in `gray-300` where some were `gray-100`, and they hold still under `prefers-reduced-motion`.
- **Flow clean-ups.** `src/assets/base.css` and `src/assets/main.css` are the Vue starter's files and nothing imports them: delete them. The `btn` utility gives way to `CommonButton`.

| Was                                                              | Now                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| `--color-primary: blue-800` / hover `blue-900`                   | Bordeaux `#7b1e3a` / `#631530`                           |
| Tailwind gray (cool)                                             | the warm ink scale, under the same `gray-*` names        |
| admin sidebar `bg-gray-800`, active `bg-gray-900`                | `bg-nav`, active `bg-nav-active` with a `gold` left rule |
| flow `--color-body: gray-100`                                    | Ivory `#fbf7f4`                                          |
| system font                                                      | Plus Jakarta Sans, JetBrains Mono                        |
| flow `rounded-sm` controls, admin `rounded-md`                   | `rounded-md` in both                                     |
| admin controls 38px, flow 44px                                   | `control-height` (44px) in both                          |
| admin fields 38px/14px, flow 44px/16px with a halo               | 44px/16px in both, no halo                               |
| flow card `rounded-xl shadow-lg`, admin card `rounded-lg border` | `CommonCard` in both                                     |
| danger button `bg-red-600 text-white`                            | `border-red-200 bg-red-50 text-red-700`                  |
