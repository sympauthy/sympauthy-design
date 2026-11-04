# Breadcrumb

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaBreadcrumb</code> and <code>SaPageActions</code></p>

The bar naming the screen: its ancestors as links, the screen itself, and what can be done there.

<script setup>
const items = [{ key: 'users', label: 'Users', link: { href: '#users' } }, { key: 'ada', label: 'Ada Lovelace' }]
const top = [{ key: 'users', label: 'Users' }]
const modes = [{ mode: 'phone' }, { mode: 'tablet', label: 'Tablet and desktop' }]
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <ClientOnly>
    <SaBreadcrumb :items="items" label="Where you are" />
    <SaPageActions><SaButton label="Create user" /></SaPageActions>
  </ClientOnly>
</div></div>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="frame in modes" :key="frame.mode" v-bind="frame" flush>
    <SaBreadcrumb :items="items" label="Where you are" />
    <DemoPageActions><SaButton label="Create user" /></DemoPageActions>
  </DemoFrame>
</div></div>

## Usage

- **Every screen inside an [AppShell](/components/app-shell)**, in its `#bar`.
- **`SaPageActions`**: what a screen lets a person do, written where the action belongs in the screen's own file and drawn in the bar, so that it sits in the same place on every screen and does not move when a filter appears under it. A collection's action is a [Button](/components/button), and a record's are a [Menu](/components/menu).
- **Not for** a process with steps: nothing here says how far along a person is.

## Look

- **Bar**: 56px tall, `surface`, an `ink-200` rule under it, its column lined up with the page's at `page-width`.
- **Ancestor**: 14px `ink-500`, at least `control-height` square, inside the taller bar.
- **Screen**: 14px at 600 in `ink-900`, cut with an ellipsis where it does not fit.
- **Between them**: a 16px chevron in `ink-400`, `space-2` either side.
- **Below `sm:`**: no ancestors and no chevrons, and the screen takes `panel-heading`. Below `lg:` the [AppShell](/components/app-shell) puts the control opening its drawer before it.
- **Actions**: at the right end, `space-2` apart, taking no room when there are none.

## Behavior

- **Hover**: an ancestor darkens to `ink-700`.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus).
- **No items**: it draws nothing.

## Content

- **The last item names the screen**: a record's name once it has arrived, and its identifier until then (see [Content](/foundations/content)).

## Accessibility

- **`label` names the `nav` holding the ancestors.** A screen with no ancestors draws no `nav`.
- **The last item is the page's `h1`**, set by the component, so that a screen writes no heading of its own (WCAG 1.3.1). It is last on the row and beside the `nav` rather than in it, so that skipping the navigation does not skip it, and the [AppShell](/components/app-shell) names its `main` with it.
- **Below `sm:` the ancestors are out of reach of the keyboard and of a screen reader.** The way back is the drawer.
- **The chevrons draw no words.**

## API

The consumer provides the items and what draws their links, since the component knows no router. With one, derive the items from it, pass its link as `linkAs` and each item's `{ to }` as its `link`.

### SaBreadcrumb

| Name     | Type                  | Default | Description                                                       |
| -------- | --------------------- | ------- | ----------------------------------------------------------------- |
| `items`  | `SaBreadcrumbItem[]`  |         | Required. Each a `key`, a `label` and a `link`, but for the last. |
| `label`  | `string`              |         | Required. Names the `nav` holding the ancestors.                  |
| `linkAs` | `string \| Component` | `'a'`   | What draws a link.                                                |

### SaPageActions

| Name       | Type | Default | Description                       |
| ---------- | ---- | ------- | --------------------------------- |
| `#default` | slot |         | What the screen lets a person do. |

`SA_PAGE_ACTIONS_OUTLET` is exported as well: the `id` of the element it draws into.

## Related

- [AppShell](/components/app-shell): where it goes.
- [Button](/components/button) and [Menu](/components/menu): what goes in `SaPageActions`.
