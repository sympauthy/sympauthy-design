# AppShell

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonAppShell</code></p>

The frame of an app built like the admin: a sidebar, a bar naming the screen, and the page.

<script setup>
import { ref } from 'vue'
import { demoSections } from '../.vitepress/theme/demo-shell'
const open = ref(false)
const items = [{ key: 'users', label: 'Users', link: { href: '#users' } }, { key: 'ada', label: 'Ada Lovelace' }]
</script>

<div class="demo vp-raw" style="padding: 0; overflow: hidden"><div style="height: 420px; transform: translateZ(0)"><ClientOnly><CommonTooltipProvider>
  <CommonAppShell v-model:sidebar-open="open" class="h-full!" open-menu-label="Open the menu">
    <template #sidebar>
      <CommonSidebar :sections="demoSections" label="Main" close-label="Close the menu" @close="open = false">
        <template #head><span class="truncate text-lg font-semibold">SympAuthy</span></template>
        <template #foot><span class="text-sm">Signed in as Ada</span></template>
      </CommonSidebar>
    </template>
    <template #title>SympAuthy</template>
    <template #bar><CommonBreadcrumb :items="items" label="Where you are" /></template>
    <CommonCard>The page.</CommonCard>
  </CommonAppShell>
</CommonTooltipProvider></ClientOnly></div></div>

## Usage

- **An app of tables and records**, read at a desk and on a phone.
- **`#sidebar`**: a [Sidebar](/components/sidebar).
- **`#bar`**: a [Breadcrumb](/components/breadcrumb).
- **`#title`**: what heads a phone's screen, where the sidebar is out of sight: the deployment's logo and name.
- **Not for** a screen outside the app's navigation, such as a sign-in callback. Draw that without it.
- **Not for** the sign-in pages: they are one card on a quiet page ([Layout](/foundations/layout)).

## Look

- **Sidebar**: `sidebar-width`, permanent from `lg:`.
- **Below `lg:`**: the sidebar is a drawer over a scrim of `nav-ground` at 50%, opened from a 56px head in `surface` with an `ink-200` rule.
- **Bar**: pinned to the top of the column.
- **Page**: `ground`, padded `space-4` then `space-6` from `lg:`, centred and stopping at `page-width`.

## Behavior

- **Opening the drawer**: the control in the head.
- **Closing the drawer**: the sidebar's own control, the scrim, or Escape while focus is inside. An app closes it when it navigates, since the package knows no router.
- **Closed**: the drawer is out of reach of the keyboard.
- **Scrolling**: the bar and the page scroll in one box, so that both centre on the same line.
- **Motion**: the drawer slides over 300ms, and not under `prefers-reduced-motion`.

## Accessibility

- **`openMenuLabel` names the control opening the drawer**, which draws no words (WCAG 4.1.2). Its target is `control-height` square.
- **The drawer does not trap focus**, so the keyboard can leave it for the page under the scrim. It closes on Escape while focus is inside.

## API

The consumer provides the sidebar, the bar, the page and the words, and closes the drawer when it navigates.

| Name                  | Type      | Default | Description                             |
| --------------------- | --------- | ------- | --------------------------------------- |
| `openMenuLabel`       | `string`  |         | Required. Names the control opening it. |
| `v-model:sidebarOpen` | `boolean` | `false` | Whether the drawer is open below `lg:`. |
| `#sidebar`            | slot      |         | The sidebar.                            |
| `#title`              | slot      |         | What heads a phone's screen.            |
| `#bar`                | slot      |         | The bar naming the screen.              |
| `#default`            | slot      |         | The page.                               |

## Related

- [Sidebar](/components/sidebar): what goes in `#sidebar`.
- [Breadcrumb](/components/breadcrumb): what goes in `#bar`.
- [Layout](/foundations/layout): the widths it changes at.
