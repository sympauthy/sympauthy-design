# Sidebar

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaSidebar</code></p>

An app's navigation: sections of entries on a ground that stays dark in every theme.

<script setup>
import { demoSections } from '../.vitepress/theme/demo-shell'
</script>

<div class="demo vp-raw"><ClientOnly><SaTooltipProvider>
  <div style="width: 256px; height: 420px">
    <SaSidebar :sections="demoSections" label="Main" close-label="Close the menu">
      <template #head><SaBrandLogo dark /><span class="truncate text-lg font-semibold">SympAuthy <span class="ml-1.5 font-medium text-nav-muted">Admin</span></span></template>
      <template #foot><span class="text-sm">Signed in as Ada</span></template>
    </SaSidebar>
  </div>
</SaTooltipProvider></ClientOnly></div>

## Usage

- **The order**: sections and entries from the most used to the least. The first entry is the page an app lands on.
- **`disabledReason`**: an entry a person's role cannot open. It is drawn rather than removed, so that the sidebar does not change shape with what someone was granted.
- **`#head`**: the deployment's logo and name, drawn with [BrandLogo](/components/brand-logo) passed `dark`.
- **`#foot`**: who is signed in, and signing out.
- **Not for** the views of one record: use [Tabs](/components/tabs).

## Look

- **Ground**: `nav-ground`, whatever the theme.
- **Head**: 56px, with a `nav-divider` rule under it.
- **Section label**: 12px at 600, uppercase, in `nav-muted`, with a `nav-divider` rule between sections.
- **Entry**: 14px in `nav-text`, `control-height` tall with 16px either side.
- **Current entry**: `nav-active` fill, `nav-text` at 500, and a 3px `gold` rule on its left edge: the only place gold marks state, echoing the key in the mark.

## Behavior

- **Hover**: `nav-hover`.
- **Focus**: a 2px outline in `nav-text`, inside the entry. `focus-ring` is `primary`, which a person could not make out on this ground. The control closing the drawer draws it around its icon.
- **Disabled**: `nav-disabled`. It keeps the keyboard's focus, and says why in a [Tooltip](/components/tooltip) on the right.
- **More than fits**: the entries scroll, and the head and foot stay.
- **Below `lg:`**: the control closing the drawer appears and emits `close`. It is a 20px icon with its target around it, so that the head keeps its width for the logo and the name.
- **Which is current**: only the app knows, and says so on each entry.

## Accessibility

- **`label` names the `nav`, and the current entry takes `aria-current="page"`** (WCAG 2.4.8).
- **A disabled entry is `role="link"` with `aria-disabled`**, set by the component, so that it stays reachable and its reason can be read.
- **`nav-text` holds 13.5:1 on `nav-ground`.**
- **An entry is at least `control-height` tall, and the target of the control closing the drawer is `control-height` square**, so that they can be touched (WCAG 2.5.5). That target overlaps the end of the head, which does nothing when pressed.

## API

The consumer provides the sections, what draws their links, and the words, since the component knows no router, no scopes and no message bundle. An app decides from its own scopes what is disabled, and from its route what is current. With a router, pass its link as `linkAs` and each entry's `{ to }` as its `link`.

| Name         | Type                  | Default | Description                                     |
| ------------ | --------------------- | ------- | ----------------------------------------------- |
| `sections`   | `SaSidebarSection[]`  |         | Required. Each a `label` and `entries`.         |
| `label`      | `string`              |         | Required. Names the navigation.                 |
| `closeLabel` | `string`              |         | Required. Names the control closing the drawer. |
| `linkAs`     | `string \| Component` | `'a'`   | What draws a link.                              |
| `@close`     | event                 |         | The control closing the drawer was pressed.     |
| `#head`      | slot                  |         | The logo and the name.                          |
| `#foot`      | slot                  |         | Who is signed in, and signing out.              |

An entry is a `key`, a `label`, a `link`, and optionally `current` and `disabledReason`.

## Related

- [AppShell](/components/app-shell): what holds it, and draws it as a drawer.
- [BrandLogo](/components/brand-logo): the logo in its head.
- [Tooltip](/components/tooltip): a disabled entry's reason.
- [Color](/foundations/color): the `nav-*` tokens.
