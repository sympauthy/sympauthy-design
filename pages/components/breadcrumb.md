# Breadcrumb

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaBreadcrumb</code> and <code>SaPageActions</code></p>

The bar naming the screen: its ancestors as links, the screen itself, and what can be done there.

<script setup>
import { EllipsisHorizontalIcon } from '../.vitepress/theme/demo-icons'
const items = [{ key: 'users', label: 'Users', link: { href: '#users' } }, { key: 'ada', label: 'Ada Lovelace' }]
const one = [{ key: 'create', label: 'Create user' }]
const actions = [{ key: 'refresh', label: 'Refresh' }, { key: 'logout', label: 'Force logout', danger: true }]
const part = [{ key: 'users', label: 'Users', link: { href: '#users' } }, { key: 'ada', label: 'Ada Lovelace', link: { href: '#ada' } }, { key: 'claims', label: 'Claims' }]
const top = [{ key: 'users', label: 'Users' }]
const modes = [
  { frame: { mode: 'phone', label: 'Phone, a collection' }, items: top, single: true },
  { frame: { mode: 'phone', label: 'Phone, a record' }, items },
  { frame: { mode: 'phone', label: 'Phone, a part of a record' }, items: part },
  { frame: { mode: 'tablet', label: 'Tablet and desktop, a collection' }, items: top, single: true },
  { frame: { mode: 'tablet', label: 'Tablet and desktop, a part of a record' }, items: part }
]
const backLabel = (parent) => `Back to ${parent}`
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <ClientOnly>
    <SaBreadcrumb :items="items" label="Where you are" />
    <SaPageActions><SaButton label="Create user" /></SaPageActions>
  </ClientOnly>
</div></div>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="demo in modes" :key="demo.frame.label" v-bind="demo.frame" flush>
    <SaBreadcrumb :items="demo.items" label="Where you are" :back-label="backLabel" />
    <DemoPageActions>
      <SaMenu v-if="demo.single" label="Actions" :items="one" :collapsed-icon="EllipsisHorizontalIcon">
        <template #expanded><SaButton label="Create user" /></template>
      </SaMenu>
      <SaMenu v-else label="Actions" :items="actions" :collapsed-icon="EllipsisHorizontalIcon" />
    </DemoPageActions>
  </DemoFrame>
</div></div>

## Usage

- **Every screen inside an [AppShell](/components/app-shell)**, in its `#bar`.
- **`SaPageActions`**: what a screen lets a person do, written where the action belongs in the screen's own file and drawn in the bar, so that it sits in the same place on every screen and does not move when a filter appears under it. A collection's action is a [Button](/components/button), and a record's are a [Menu](/components/menu). Below `sm:` it is always a Menu's mark with no border, even for a single action.
- **Not for** a process with steps: nothing here says how far along a person is.

## Look

- **Bar**: 56px tall, `surface`, an `ink-200` rule under it, its column lined up with the page's at `page-width`.
- **Ancestor**: 14px `ink-500`, at least `control-height` square, inside the taller bar.
- **Screen**: 14px at 600 in `ink-900`, cut with an ellipsis where it does not fit.
- **Between them**: a 16px chevron in `ink-400`, `space-2` either side.
- **Below `sm:`**: no ancestors and no chevrons, and the screen takes `panel-heading`. Below `lg:` the [AppShell](/components/app-shell) puts the control opening its drawer before it.
- **Below `sm:`, with an ancestor**: a `control-height` square holding a 24px left chevron in `ink-600` links to the nearest ancestor, in place of the AppShell's control. That ancestor's name stands over the screen's, in 12px `ink-500`, cut with an ellipsis ([Navigation](/foundations/navigation)).
- **Actions**: at the right end, `space-2` apart, taking no room when there are none. Below `sm:`, the mark of a [Menu](/components/menu), with no border.

## Behavior

- **Hover**: an ancestor darkens to `ink-700`.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus).
- **No items**: it draws nothing.
- **An ancestor with no link**: draws no link back below `sm:`, and the AppShell keeps its control.

## Content

- **The last item names the screen**: a record's name once it has arrived, and its identifier until then (see [Content](/foundations/content)).

## Accessibility

- **`label` names the `nav` holding the ancestors.** A screen with no ancestors draws no `nav`.
- **The last item is the page's `h1`**, set by the component, so that a screen writes no heading of its own (WCAG 1.3.1). It is last on the row and beside the `nav` rather than in it, so that skipping the navigation does not skip it, and the [AppShell](/components/app-shell) names its `main` with it.
- **Below `sm:` only the nearest ancestor is in reach of the keyboard and of a screen reader.** It is the way back, in a `nav` named by `label`. The ones before it are one step further back.
- **`backLabel` names the link back**, which draws no words (WCAG 4.1.2). Without it the link takes the ancestor's name.
- **The chevrons draw no words.**

## API

The consumer provides the items and what draws their links, since the component knows no router. With one, derive the items from it, pass its link as `linkAs` and each item's `{ to }` as its `link`. Where a phone opens a view that a wider screen draws as a tab, the consumer adds that view as the last item below `sm:` only.

### SaBreadcrumb

| Name        | Type                         | Default     | Description                                                       |
| ----------- | ---------------------------- | ----------- | ----------------------------------------------------------------- |
| `items`     | `SaBreadcrumbItem[]`         |             | Required. Each a `key`, a `label` and a `link`, but for the last. |
| `label`     | `string`                     |             | Required. Names the `nav` holding the ancestors.                  |
| `linkAs`    | `string \| Component`        | `'a'`       | What draws a link.                                                |
| `backLabel` | `(parent: string) => string` | `undefined` | Names the link back below `sm:`.                                  |

### SaPageActions

| Name       | Type | Default | Description                       |
| ---------- | ---- | ------- | --------------------------------- |
| `#default` | slot |         | What the screen lets a person do. |

`SA_PAGE_ACTIONS_OUTLET` is exported as well: the `id` of the element it draws into.

## Related

- [Navigation](/foundations/navigation): what decides the ancestors and the way back.
- [AppShell](/components/app-shell): where it goes.
- [Button](/components/button) and [Menu](/components/menu): what goes in `SaPageActions`.
