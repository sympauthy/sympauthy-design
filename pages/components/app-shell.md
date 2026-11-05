# AppShell

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaAppShell</code></p>

The frame of an app built like the admin: a sidebar, a bar naming the screen, and the page.

<script setup>
import { reactive } from 'vue'
import { framedSections } from '../.vitepress/theme/demo-shell'
import { EllipsisHorizontalIcon } from '../.vitepress/theme/demo-icons'
const actions = [{ key: 'refresh', label: 'Refresh' }, { key: 'logout', label: 'Force logout', danger: true }]
const items = [{ key: 'users', label: 'Users', link: { href: '#users' } }, { key: 'ada', label: 'Ada Lovelace' }]
const top = [{ key: 'users', label: 'Users' }]
const frames = reactive([
  { mode: 'phone', label: 'Phone, no ancestors', open: false, items: top },
  { mode: 'phone', label: 'Phone, with ancestors', open: false, items },
  { mode: 'phone', label: 'Phone, drawer open', open: true, items: top, class: 'col-span-2' },
  { mode: 'tablet', label: 'Tablet', open: false, items, class: 'col-span-2' },
  { mode: 'desktop', label: 'Desktop', open: false, items, class: 'col-span-2' }
])
</script>

<div class="demo vp-raw"><div class="grid grid-cols-2 gap-4">
  <DemoFrame v-for="frame in frames" :key="frame.label" :mode="frame.mode" :label="frame.label" :class="frame.class" :height="480" flush>
    <SaAppShell v-model:sidebar-open="frame.open" open-menu-label="Open the menu">
      <template #sidebar>
        <SaSidebar :sections="framedSections" label="Main" close-label="Close the menu" @close="frame.open = false">
          <template #head><span class="truncate text-lg font-semibold">SympAuthy</span></template>
          <template #foot><SaSidebarAccount name="Ada Lovelace" detail="ada@example.com" sign-out-label="Sign out" /></template>
        </SaSidebar>
      </template>
      <template #bar><SaBreadcrumb :items="frame.items" label="Where you are" /></template>
      <DemoPageActions><SaMenu label="Actions" :items="actions" :collapsed-icon="EllipsisHorizontalIcon" /></DemoPageActions>
      <SaCard>The page.</SaCard>
    </SaAppShell>
  </DemoFrame>
</div></div>

## Usage

- **An app of tables and records**, read at a desk and on a phone.
- **`#sidebar`**: a [Sidebar](/components/sidebar).
- **`#bar`**: a [Breadcrumb](/components/breadcrumb). Below `lg:` the control opening the drawer stands before it, but below `sm:` a screen with ancestors has the breadcrumb's link back in its place ([Navigation](/foundations/navigation)).
- **Not for** a screen outside the app's navigation, such as a sign-in callback. Draw that without it.
- **Not for** the sign-in pages: they are one card on a quiet page ([Layout](/foundations/layout)).

## Look

- **Sidebar**: `sidebar-width`, permanent from `lg:`.
- **Below `lg:`**: the sidebar is a drawer over a scrim of `nav-ground` at 50%, opened from a control at the start of the bar. The bar is at least 56px there, in `surface` with an `ink-200` rule, on a screen whose breadcrumb draws nothing too.
- **Bar**: pinned to the top of the column.
- **Page**: `ground`, padded `space-4` then `space-6` from `lg:`, centred and stopping at `page-width`.

## Behavior

- **Opening the drawer**: the control in the bar. Below `sm:` a screen with ancestors has none, and the way to the drawer is back up to a screen without.
- **Closing the drawer**: the sidebar's own control, the scrim, or Escape while focus is inside. An app closes it when it navigates, since the package knows no router.
- **Closed**: the drawer is out of reach of the keyboard.
- **Scrolling**: the bar and the page scroll in one box, so that both centre on the same line.
- **Motion**: the drawer slides over 300ms, and not under `prefers-reduced-motion`.

## Accessibility

- **`main` is named by the [Breadcrumb](/components/breadcrumb)'s heading**, set by the component (WCAG 1.3.1).
- **`openMenuLabel` names the control opening the drawer**, which draws no words (WCAG 4.1.2). Its target is `control-height` square.
- **The drawer does not trap focus**, so the keyboard can leave it for the page under the scrim. It closes on Escape while focus is inside.

## API

The consumer provides the sidebar, the bar, the page and the words, and closes the drawer when it navigates.

| Name                  | Type      | Default | Description                             |
| --------------------- | --------- | ------- | --------------------------------------- |
| `openMenuLabel`       | `string`  |         | Required. Names the control opening it. |
| `v-model:sidebarOpen` | `boolean` | `false` | Whether the drawer is open below `lg:`. |
| `#sidebar`            | slot      |         | The sidebar.                            |
| `#bar`                | slot      |         | The bar naming the screen.              |
| `#default`            | slot      |         | The page.                               |

## Related

- [Sidebar](/components/sidebar): what goes in `#sidebar`.
- [Breadcrumb](/components/breadcrumb): what goes in `#bar`.
- [Layout](/foundations/layout): the widths it changes at.
- [Navigation](/foundations/navigation): when the drawer's control gives way to a link back.
