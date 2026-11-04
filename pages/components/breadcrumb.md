# Breadcrumb

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonBreadcrumb</code> and <code>PageActions</code></p>

The bar naming the screen: its ancestors as links, the screen itself, and what can be done there.

<script setup>
const items = [{ key: 'users', label: 'Users', link: { href: '#users' } }, { key: 'ada', label: 'Ada Lovelace' }]
const top = [{ key: 'users', label: 'Users' }]
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <ClientOnly>
    <CommonBreadcrumb :items="items" label="Where you are" />
    <PageActions><CommonButton label="Create user" /></PageActions>
  </ClientOnly>
</div></div>

## Usage

- **Every screen inside an [AppShell](/components/app-shell)**, in its `#bar`.
- **`PageActions`**: what a screen lets a person do, written where the action belongs in the screen's own file and drawn in the bar, so that it sits in the same place on every screen and does not move when a filter appears under it. A collection's action is a [Button](/components/button), and a record's are a [Menu](/components/menu).
- **Not for** a process with steps: nothing here says how far along a person is.

## Look

- **Bar**: 56px tall, `surface`, an `ink-200` rule under it, its column lined up with the page's at `page-width`.
- **Ancestor**: 14px `ink-500`, `control-height` tall, inside the taller bar.
- **Screen**: 14px at 600 in `ink-900`, cut with an ellipsis where it does not fit.
- **Between them**: a 16px chevron in `ink-400`, `space-2` either side.
- **Actions**: at the right end, `space-2` apart, taking no room when there are none.

## Behavior

- **Hover**: an ancestor darkens to `ink-700`.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus).
- **No items**: it draws nothing.

## Content

- **The last item names the screen**: a record's name once it has arrived, and its identifier until then (see [Content](/foundations/content)).

## Accessibility

- **`label` names the `nav`, and the last item takes `aria-current="page"`** (WCAG 2.4.8).
- **The chevrons draw no words.**

## API

The consumer provides the items and what draws their links, since the component knows no router. With one, derive the items from it, pass its link as `linkAs` and each item's `{ to }` as its `link`.

### CommonBreadcrumb

| Name     | Type                  | Default | Description                                                       |
| -------- | --------------------- | ------- | ----------------------------------------------------------------- |
| `items`  | `BreadcrumbItem[]`    |         | Required. Each a `key`, a `label` and a `link`, but for the last. |
| `label`  | `string`              |         | Required. Names the bar.                                          |
| `linkAs` | `string \| Component` | `'a'`   | What draws a link.                                                |

### PageActions

| Name       | Type | Default | Description                       |
| ---------- | ---- | ------- | --------------------------------- |
| `#default` | slot |         | What the screen lets a person do. |

`PAGE_ACTIONS_OUTLET` is exported as well: the `id` of the element it draws into.

## Related

- [AppShell](/components/app-shell): where it goes.
- [Button](/components/button) and [Menu](/components/menu): what goes in `PageActions`.
