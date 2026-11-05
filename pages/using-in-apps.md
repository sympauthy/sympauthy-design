# Using in the apps

`@sympauthy/design` is how sympauthy-flow and sympauthy-admin reach this system. It is a Tailwind v4 theme, a few shared rules, and the Common components as Vue source. Templates keep writing `bg-primary`, `text-gray-500`, `border-gray-200`: the package redefines what those utilities resolve to.

## Install

```sh
npm install github:sympauthy/sympauthy-design#v0.7.0
```

The package is internal to SympAuthy, so it is not on npm: the apps install it from this repository by version tag, with no token. npm builds `dist/` on install through the `prepare` script, so do not install with `--ignore-scripts`.

## Stylesheet

In `sympauthy-flow/src/styles/style.css` and `sympauthy-admin/src/app/styles/style.css`:

```css
@import 'tailwindcss';
@import '@sympauthy/design/theme.css';
@import '@sympauthy/design/components.css';
```

`components.css` tells Tailwind where the components are, so an app writes no `@source` for them. Import it outside any `layer()`: inside one, the build fails with `` `@source` cannot be nested ``. Remove from the admin's stylesheet what `components.css` now carries (`.sa-control`, `.sa-field-label`, `.sa-control-focus`, `.sa-control-focus-within`, `.sa-menu`, `.sa-menu-item`, `.sa-popover`, `.sa-overlay-animated`, `.sa-table-as-cards`, `.sa-table-pinned-header`) and its own `@theme` block.

`.sa-field-label` can also be applied. A label drawn in a pseudo-element, which no class can reach, takes `@apply sa-field-label` in the app's stylesheet, and so cannot drift from the labels the components draw. The other rules of `components.css` are classes, which Tailwind refuses to apply.

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

This is the flow's logo, which follows the device. The dark mode is what keeps the dark logo off a light page: under `off`, the device's preference must not choose it. A page that pins a theme chooses by its ground instead, with no `<source>`: the admin draws `urls.logo` on `ground` and `surface`, and `urls.logoDark` on its sidebar, which stays on `nav-ground` in every theme.

See [Branding a deployment](./branding) for what the server answers.

## Changes the migration brings

- **Everything is renamed, once.** Every component, type, composable and class of the package starts with `Sa`, and there are no aliases. `Common*` becomes `Sa*`, and `FormField`, `FormInput`, `FormSelect`, `FormTextarea`, `FormListbox`, `FormRadioGroup` and `FormTagsInput` lose `Form`: `SaField`, `SaInput` and so on. `CopyToClipboard` becomes `SaCopyButton`. `TableCell`, `BrandLogo`, `LoadingState` and the rest take the prefix as they are. Classes follow: `.control` is `.sa-control`, `.link` is `.sa-link`, `.field-label` is `.sa-field-label`, and likewise for each class of `components.css`. A token's name does not change: `min-h-control` stays.
- **A button takes `variant`.** `:button-style="dangerColoredButton"` becomes `variant="danger"`, and `SaMenu` and `SaConfirmDialog` take `variant` and `confirmVariant`. The `*ColoredButton` constants and `ButtonStyle` are gone; `SaButtonVariant` is the type.
- **Controls get a visible border.** `.sa-control` now states `border-gray-400` (3:1 on white). The old compatibility rule painted every border `gray-200` (1.3:1), too faint to find a field by.
- **One flat card.** The flow's card (`rounded-xl shadow-lg`, `p-3 md:p-5`) becomes `SaCard`: `rounded-lg border border-gray-200 bg-white p-4 sm:p-6`. No shadow anywhere: remove `shadow-lg` from menus, popovers and dialogs, give dialogs the card's border, and drop `shadow-sm` from inputs.
- **A soft danger button.** `variant="danger"` is `border-danger-line bg-danger-subtle text-danger`: `primary` is the only filled button.
- **One control height.** Every control is 44px in both apps: the admin's buttons, selects and dropdown triggers grow from 38px. Drop `min-h-9.5` and `min-h-11` from the apps' own controls: `.sa-control` carries `min-h-control`.
- **One field.** The admin's fields grow to the flow's: 44px, 16px text, a 14px/500 `gray-700` label and a 14px help line. The flow's labels go from 600 `gray-900` to the same 500 `gray-700`, and its inputs drop the `ring-4 ring-primary-subtle` halo. `FormField` and `FormInput` no longer take a `size`.
- **Disabled buttons** read `gray-500` on a `gray-100` fill (5.3:1) instead of white on `gray-400` (2.5:1).
- **One mobile breakpoint.** The flow's claim groups step at `md:`, past the card around them at `sm:`: change them to `sm:`. The admin's `@media (max-width: 639px)` becomes `@media (width < theme(--breakpoint-sm))`.
- **The small parts move to the package.** The admin deletes its `CommonTag`, `EmptyValue`, `LoadingState`, `CopyToClipboard`, `CopyableValue` and `BrandLogo`, and its screens import the package's. The words become props: `SaLoadingState` takes a `label`, and the copy controls take `label`, `copiedLabel` and `failedLabel` where `title` was. `SaLoadingState` draws its spinner in `primary` and its line in `gray-500`. The flow's `BasePage` draws `SaBrandLogo` and its `TitleContentCard` draws `SaLoadingState`.
- **The form controls move to the package.** The admin deletes its `FormSelect`, `FormTextarea`, `FormListbox` and `FormTagsInput`, and its screens import the package's. `SaListbox` takes `searchPlaceholder` and `noMatchLabel`, and `SaTagsInput` takes `removeLabel`, in place of the words it read from the bundle. A control of an app's own takes `.sa-control-field`, or `.sa-control-text` for a bare input inside a box something else draws, instead of writing out its 16px text.
- **The overlays move to the package.** The admin deletes `BaseDialog`, `ConfirmDialog`, `HintTooltip` and `HelpTooltip`, its screens import the package's in their place, and it mounts `SaTooltipProvider` in place of reka-ui's in `App.vue`. `ActionsDropdown` becomes a wrapper over `SaMenu` that turns `requiredScopes` into `disabledReason`. `SaConfirmDialog` requires `confirmLabel` and `cancelLabel`, `SaPopover` takes a `label` for its icon, and the `ⓘ` character becomes the icon. An app drawing `SaTooltip` mounts one `SaTooltipProvider` at its root. The flow's `CommonModal` becomes `SaDialog`, which brings a focus trap and Escape to its time zone picker, and about 24 KB gzip to its bundle, loaded with the rest of the flow.
- **The app shell moves to the package.** The admin's `AdminLayout`, `SidebarNav` and `BreadcrumbNav` become small wrappers over `SaAppShell`, `SaSidebar` and `SaBreadcrumb`: they keep the router, the scopes and the words, and pass `RouterLink` as `linkAs`. `AdminLayout` still closes the drawer on a route change. A screen imports `SaPageActions` from the package.
- **The table moves to the package.** The admin deletes `TableHeader`, `TableCell`, `PaginatedTable`, `useAutoPageSize` and its table rules. `PaginatedTable` splits into `SaTable`, which takes `loadingLabel`, and a `SaPagination` in its `#footer`, which takes the pager's words. Every step of the pager grows from 32px to `control-height`, and the admin's standard drops its rule that a pager is not a `.control`. A table gains its card and its row highlight, as this system always specified.
- **A list is one card.** `SaTable` draws the card at every width, and its `#footer` is the card's foot. A collection's search and buttons move to `#toolbar`, and its record's name becomes a `SaTableRecord`. Below `sm:` a row stays in the card rather than being one of its own, so the admin's page layout standard changes with it.
- **Ordering moves to the package.** The admin deletes `CollectionSortHeader`, and `useCollection` holds a `useSaSort` in place of `toggleSort`, `sortsOn`, `sortKeys` and `criteria.sort`. `fields` is the capability document's `sorts`, `defaultKeys` is `collectionSortKeys` over its `default_sort`, and `onChange` asks the first page again at once. A header gets `sorting` and `field` and its `#help` slot, and a real button, so the keyboard reaches it where a click on the cell did not. `collectionQueryParams` reads `asked`, and a `SaTableSort` joins the toolbar, since a phone had no way to order a list.
- **Filters move to the package.** The admin deletes `CollectionFilterControl`, `CollectionFilterValue`, `CollectionFieldPicker`, `CollectionFilter.ts` and `CollectionOperatorUtils.ts`, and `useCollection` holds a `useSaFilters` in place of `addFilter`, `updateFilter`, `removeFilter` and `criteria.filters`. `fields` is `saFilterKnownFields` over the capability document's `filters`, and `onChange` is what asks the first page again. What stays the admin's is the wire: `collectionQueryParams` reads `complete`, and `SaFilterLabels` is built from its bundle.
- **The record page moves to the package.** The admin deletes `SummaryCard`, `SummaryField`, `DetailSection`, `DefinitionList` and `DefinitionRow`, and its screens import the package's. `RecordTabs` becomes a wrapper over `SaTabs`: it passes `RouterLink` as `linkAs`, each tab's `{ to }` as its `link`, says which is `current`, and draws its help in the `#help` slot.
- **A phone's way back.** Below `sm:` `SaBreadcrumb` links a screen with ancestors to the nearest, in place of the drawer's control, and names it over the screen's own name. `BreadcrumbNav` passes `backLabel`, and adds a record's open view as the last item below `sm:`, since a wider screen draws it as a tab.
- **A phone's views of a record.** `SaRecordViews` lists them under the summary, each opening a screen of its own, where a wider screen draws `SaTabs`. `ActionsDropdown` passes `SaMenu` a `collapsedIcon`, so that the bar's trigger is a mark with no border on a phone, and `startsGroup` for a rule after a help link. A screen with one action passes its button in `#expanded`, as Invitations does, and a row's mark loses its border on a phone too.
- **A radio group.** The admin's `LogoutDialog` draws `SaRadioGroup` in place of its two raw radio inputs, with the disabled option's reason as its `disabledReason`.
- **One link.** `.sa-link` comes from `components.css`, underlined at rest: the flow drops its `@utility link`, and the admin's `DocLink` draws it instead of underlining on hover.
- **One skeleton.** The flow's `animate-pulse` blocks become `SaSkeleton`, in `gray-300` where some were `gray-100`, and they hold still under `prefers-reduced-motion`.
- **No `@source` for the package.** Delete the line pointing into `node_modules` from the app's stylesheet: `components.css` now declares its own. A line left behind changes nothing.
- **Flow clean-ups.** `src/assets/base.css` and `src/assets/main.css` are the Vue starter's files and nothing imports them: delete them. The `btn` utility gives way to `SaButton`.

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
| flow card `rounded-xl shadow-lg`, admin card `rounded-lg border` | `SaCard` in both                                         |
| danger button `bg-red-600 text-white`                            | `border-danger-line bg-danger-subtle text-danger`        |
