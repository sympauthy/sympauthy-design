# Using in the apps

`@sympauthy/design` is how sympauthy-flow and sympauthy-admin reach this system. It is a Tailwind v4 theme, a few shared rules, and the Common components as Vue source. Templates keep writing `bg-primary`, `text-gray-500`, `border-gray-200`: the package redefines what those utilities resolve to.

## Install

```sh
npm install @sympauthy/design
```

## Stylesheet

In `sympauthy-flow/src/styles/style.css` and `sympauthy-admin/src/app/styles/style.css`:

```css
@import 'tailwindcss';
@import '@sympauthy/design/theme.css';
@import '@sympauthy/design/theme-dark.css'; /* flow only: the admin stays light */
@import '@sympauthy/design/components.css';
@source '../../node_modules/@sympauthy/design/src'; /* so Tailwind sees the components' classes */
```

Adjust the `@source` path to the stylesheet's depth (`../../../` from `src/app/styles/`). Remove from the admin's stylesheet what `components.css` now carries (`.control`, `.field-label`, `.control-focus`, `.control-focus-within`, `.menu`, `.menu-item`, `.popover`, `.overlay-animated`) and its own `@theme` block. Keep its table-as-cards rules: they are the admin's.

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

The package ships `.vue` and `.ts` source; each app's Vite build compiles it. Exclude it from pre-bundling so it is compiled like the app's own files:

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: { exclude: ['@sympauthy/design'] }
})
```

In the admin, keep `shared/ui/index.ts` as the kit every screen imports from, and re-export the package's components there. The admin's `CommonButton` becomes a thin wrapper: it computes the missing scopes, passes `refused` to the package's button, and wraps it in its `HintTooltip`.

## Branding at load

Both apps apply the deployment's `ui.theme` once the configuration has arrived:

```ts
import { applyTheme } from '@sympauthy/design'

applyTheme(configuration.ui?.theme, { dark: true }) // flow
applyTheme(configuration.ui?.theme, { dark: false }) // admin
```

See [Branding a deployment](./branding) for the configuration it reads.

## Changes the migration brings

- **Controls get a visible border.** `.control` now states `border-gray-400` (3:1 on white). The old compatibility rule painted every border `gray-200` (1.3:1), too faint to find a field by.
- **One flat card.** The flow's `BaseCard` (`rounded-xl shadow-lg`, `p-3 md:p-5`) becomes `CommonCard`: `rounded-lg border border-gray-200 bg-white p-4 sm:p-6`. No shadow anywhere: remove `shadow-lg` from menus, popovers and `BaseDialog`, give `BaseDialog` the card's border, and drop `shadow-sm` from inputs.
- **A soft danger button.** `dangerColoredButton` is `border-red-200 bg-red-50 text-red-700`: `primary` is the only filled button.
- **One field.** The admin's fields grow to the flow's: 44px, 16px text, a 14px/500 `gray-700` label and a 14px help line. The flow's labels go from 600 `gray-900` to the same 500 `gray-700`, and its inputs drop the `ring-4 ring-primary-subtle` halo. `FormField` and `FormInput` no longer take a `size`.
- **Disabled buttons** read `gray-500` on a `gray-100` fill (5.3:1) instead of white on `gray-400` (2.5:1).
- **Flow clean-ups.** `src/assets/base.css` and `src/assets/main.css` are the Vue starter's files and nothing imports them: delete them. The `btn` utility gives way to `CommonButton`.

| Was | Now |
| --- | --- |
| `--color-primary: blue-800` / hover `blue-900` | Bordeaux `#7b1e3a` / `#631530` |
| Tailwind gray (cool) | the warm ink scale, under the same `gray-*` names |
| admin sidebar `bg-gray-800`, active `bg-gray-900` | `bg-nav`, active `bg-nav-active` with a `gold` left rule |
| flow `--color-body: gray-100` | Ivory `#fbf7f4` |
| system font | Plus Jakarta Sans, JetBrains Mono |
| flow `rounded-sm` controls, admin `rounded-md` | `rounded-md` in both |
| admin fields 38px/14px, flow 44px/16px with a halo | 44px/16px in both, no halo |
| flow card `rounded-xl shadow-lg`, admin card `rounded-lg border` | `CommonCard` in both |
| danger button `bg-red-600 text-white` | `border-red-200 bg-red-50 text-red-700` |
