# Sidebar

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaSidebar</code> and <code>SaSidebarAccount</code></p>

An app's navigation: sections of entries on a ground that stays dark in every theme.

<script setup>
import { demoSections, framedSections } from '../.vitepress/theme/demo-shell'
const modes = [{ mode: 'phone', label: 'Phone and tablet' }, { mode: 'desktop' }]
</script>

<div class="demo vp-raw"><ClientOnly><SaTooltipProvider>
  <div style="width: 256px; height: 560px">
    <SaSidebar :sections="demoSections" label="Main" close-label="Close the menu" :home-link="{ href: '#users' }">
      <template #head><SaBrandLogo dark size="md" /><span class="truncate text-lg tracking-tight"><span class="font-medium">Symp</span><span class="font-extrabold">Authy</span></span><span class="text-xs font-medium tracking-wider text-nav-muted uppercase">Admin</span></template>
      <template #foot><SaSidebarAccount name="Ada Lovelace" detail="ada@example.com" sign-out-label="Sign out" /></template>
    </SaSidebar>
  </div>
</SaTooltipProvider></ClientOnly></div>

<div class="demo vp-raw"><div class="flex flex-wrap gap-4">
  <DemoFrame v-for="frame in modes" :key="frame.mode" v-bind="frame" :crop="256" :height="420" flush>
    <div class="h-screen w-sidebar">
      <SaSidebar :sections="framedSections" label="Main" close-label="Close the menu" :home-link="{ href: '#users' }">
        <template #head><SaBrandLogo dark size="md" /><span class="truncate text-lg tracking-tight"><span class="font-medium">Symp</span><span class="font-extrabold">Authy</span></span><span class="text-xs font-medium tracking-wider text-nav-muted uppercase">Admin</span></template>
        <template #foot><SaSidebarAccount name="Ada Lovelace" sign-out-label="Sign out" /></template>
      </SaSidebar>
    </div>
  </DemoFrame>
</div></div>

## Usage

- **The order**: sections and entries from the most used to the least. The first entry is the page an app lands on.
- **`disabledReason`**: an entry a person's role cannot open. It is drawn rather than removed, so that the sidebar does not change shape with what someone was granted.
- **`#head`**: the deployment's logo and name, drawn with [BrandLogo](/components/brand-logo) passed `dark` and `size="md"`.
- **`homeLink`**: makes the head a link to the page the app lands on.
- **`#foot`**: who is signed in, and signing out: a `SaSidebarAccount`.
- **Not for** the views of one record: use [Tabs](/components/tabs).

## Look

- **Ground**: `nav-ground`, whatever the theme.
- **Head**: 56px in `nav-strong`, with a `nav-divider` rule under it.
- **Section**: set apart by space alone, 20px above its label.
- **Section label**: 12px at 500, uppercase, in `nav-muted`.
- **Entry**: 14px at 500 in `nav-text`, `control-height` tall with 16px either side.
- **Current entry**: `nav-active` fill, `nav-strong` at 600, and a 3px `gold` rule on its left edge: the only place gold marks state, echoing the key in the mark.
- **Foot**: a `nav-divider` rule above it, and 16px around what it holds.
- **Account**: the name, 14px at 500 in `nav-strong`, over the detail, 12px in `nav-muted`, each cut short on one line. Under them by 12px, the sign-out control fills the width: `control-height` tall, 14px at 500 in `nav-text`, with an icon and a `nav-muted` border, which holds 3:1 on `nav-ground` and on `nav-hover`.

## Behavior

- **Hover**: `nav-hover`, on an entry and on the sign-out control.
- **Focus**: a 2px outline in `nav-text`, inside what has it. `focus-ring` is `primary`, which a person could not make out on this ground. The control closing the drawer draws it around its icon.
- **Disabled**: `nav-disabled`. It keeps the keyboard's focus, and says why in a [Tooltip](/components/tooltip) on the right.
- **More than fits**: the entries scroll, and the head and foot stay.
- **Below `lg:`**: the control closing the drawer appears and emits `close`. It is a 20px icon with its target around it, so that the head keeps its width for the logo and the name.
- **Which is current**: only the app knows, and says so on each entry.

## Accessibility

- **`label` names the `nav`, and the current entry takes `aria-current="page"`** (WCAG 2.4.8).
- **A disabled entry is `role="link"` with `aria-disabled`**, set by the component, so that it stays reachable and its reason can be read.
- **`nav-text` holds 13.5:1 on `nav-ground`.**
- **An entry and the sign-out control are at least `control-height` tall, and the target of the control closing the drawer is `control-height` square**, so that they can be touched (WCAG 2.5.5). The head's link stops short of that target.

## API

The consumer provides the sections, what draws their links, the head and the foot, and the words, since the component knows no router, no scopes and no message bundle. An app decides from its own scopes what is disabled, and from its route what is current. With a router, pass its link as `linkAs` and each entry's `{ to }` as its `link`.

| Name         | Type                  | Default | Description                                                       |
| ------------ | --------------------- | ------- | ----------------------------------------------------------------- |
| `sections`   | `SaSidebarSection[]`  |         | Required. Each a `label` and `entries`.                           |
| `label`      | `string`              |         | Required. Names the navigation.                                   |
| `homeLink`   | `object`              |         | What the head's link is given. Without it the head is not a link. |
| `closeLabel` | `string`              |         | Required. Names the control closing the drawer.                   |
| `linkAs`     | `string \| Component` | `'a'`   | What draws a link.                                                |
| `@close`     | event                 |         | The control closing the drawer was pressed.                       |
| `#head`      | slot                  |         | The logo and the name.                                            |
| `#foot`      | slot                  |         | Who is signed in, and signing out.                                |

An entry is a `key`, a `label`, a `link`, and optionally `current` and `disabledReason`.

### SaSidebarAccount

The consumer provides who is signed in and the words, and signs out when told to.

| Name           | Type     | Default | Description                                 |
| -------------- | -------- | ------- | ------------------------------------------- |
| `name`         | `string` |         | Required. Who is signed in.                 |
| `detail`       | `string` |         | What tells them apart, such as their email. |
| `signOutLabel` | `string` |         | Required. What the sign-out control says.   |
| `@sign-out`    | event    |         | The sign-out control was pressed.           |

## Related

- [Navigation](/foundations/navigation): what the sidebar leads to.
- [AppShell](/components/app-shell): what holds it, and draws it as a drawer.
- [BrandLogo](/components/brand-logo): the logo in its head.
- [Tooltip](/components/tooltip): a disabled entry's reason.
- [Color](/foundations/color): the `nav-*` tokens.
