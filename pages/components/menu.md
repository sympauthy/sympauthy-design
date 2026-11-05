# Menu

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaMenu</code></p>

The actions of one record or one page, behind a button.

<script setup>
import { ref } from 'vue'
import { EllipsisHorizontalIcon, PlusIcon } from '../.vitepress/theme/demo-icons'
const items = [
  { key: 'enroll', label: 'Enroll a factor', icon: PlusIcon },
  { key: 'link', label: 'Link a provider', icon: PlusIcon, disabledReason: 'Your role does not allow linking providers.' },
  { key: 'logout', label: 'Force logout', icon: PlusIcon, danger: true }
]
const chosen = ref('')
const modes = [{ mode: 'phone' }, { mode: 'tablet', label: 'Tablet and desktop' }]
const one = [{ key: 'create', label: 'Create invitation', icon: PlusIcon }]
const grouped = [
  { key: 'about', label: 'About claims', icon: PlusIcon },
  { key: 'enroll', label: 'Enroll a factor', icon: PlusIcon, startsGroup: true },
  { key: 'logout', label: 'Force logout', icon: PlusIcon, danger: true }
]
</script>

<div class="demo"><div class="row" style="justify-content: flex-end">
  <span class="text-gray-500">{{ chosen ? `Chose ${chosen}` : '' }}</span>
  <SaMenu label="Actions" :items="items" @select="chosen = $event" />
</div></div>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="frame in modes" :key="frame.mode" :mode="frame.mode" :label="frame.label" :height="240">
    <div class="flex justify-end gap-2">
      <SaMenu label="Actions" :items="one" :collapsed-icon="EllipsisHorizontalIcon">
        <template #expanded><SaButton label="Create invitation" :icon="PlusIcon" /></template>
      </SaMenu>
      <SaMenu label="Actions" :items="grouped" :collapsed-icon="EllipsisHorizontalIcon" />
    </div>
  </DemoFrame>
</div></div>

## Usage

- **Several actions on one record**, read together.
- **`icon`**: the actions of a row in a [Table](/components/table), where a word in every row would repeat down the column.
- **`collapsedIcon`**: the actions of a screen, in a [Breadcrumb](/components/breadcrumb)'s bar, where a phone has no room for the word beside the screen's name.
- **`#expanded`**: a screen with one action, which is a [Button](/components/button) from `sm:` and still this menu's mark on a phone, so that a phone's actions are in the same place and the same shape on every screen.
- **The order**: from the most used to the least, with what destroys last.
- **`danger`**: an action that destroys. It opens a [ConfirmDialog](/components/confirm-dialog) rather than acting.
- **`startsGroup`**: an item opening a group that is not about destroying, such as the actions after a link to the screen's help.
- **`disabledReason`**: an action that exists but cannot be used, drawn rather than removed.
- **Not for** one or two actions on a screen read at a desk or in a row: use a [Button](/components/button) each. A phone's bar is the exception, through `#expanded`.
- **Not for** a choice of a value: use a [Listbox](/components/listbox).

## Look

- **Trigger**: a secondary [Button](/components/button) with a chevron after its label. Given an `icon`, it is that mark alone and no chevron. Given a `collapsedIcon`, it is that mark alone below `sm:`, and its label and chevron from `sm:`. Given `#expanded`, it is gone from `sm:`, and what the slot holds stands in its place.
- **A mark below `sm:`**: no border and no fill, on the ground around it. While open it takes an `ink-400` border on `ink-200`.
- **Box**: `.sa-menu`, at least 192px wide, 4px from its trigger.
- **Item**: `.sa-menu-item` in `ink-700`, at least `control-height` tall, with a 16px icon in `ink-500`.
- **Separator**: an `ink-200` rule before the first `danger` item, which the menu draws itself, and before an item with `startsGroup`.
- **`danger` item**: `danger` text, on `danger-hover` when highlighted.
- **Disabled item**: `ink-400`, with its reason under the label in 12px `ink-500`.

## Behavior

- **Hover and keyboard**: the highlighted item is `ink-100` with `ink-900` text.
- **Keyboard**: the arrow keys move through the items, Enter chooses one, Escape closes it. A disabled item is skipped.
- **Choosing**: closes the menu and emits `select`.
- **Motion**: `.sa-overlay-animated`.

## Content

- **An item is a verb and its object**, as "Force logout" (see [Content](/foundations/content)).
- **A reason says why the action is not available**, since a menu is read while it is open and has no tooltip to hover.

## Accessibility

- **`label` stays the name of a trigger drawn as a mark** (WCAG 4.1.2), as its `title` too.
- **The primitive sets the menu roles, the keyboard and where focus goes** (WCAG 4.1.2).
- **A disabled item's text stays under 4.5:1**, as disabled controls may (WCAG 1.4.3). The reason under it holds the contrast.

## API

The consumer provides the label, the items in order, and what each does, since the component knows no scopes. An app that decides from its own rules what is disabled wraps it, as the admin's `ActionsDropdown` does.

| Name            | Type              | Default               | Description                                                                            |
| --------------- | ----------------- | --------------------- | -------------------------------------------------------------------------------------- |
| `label`         | `string`          |                       | Required. What the button says.                                                        |
| `items`         | `SaMenuItem[]`    |                       | Required. Each a `key`, `label`, `icon`, `danger`, `startsGroup` and `disabledReason`. |
| `variant`       | `SaButtonVariant` | `variant="secondary"` | The trigger's style.                                                                   |
| `icon`          | `Component`       | `undefined`           | Draws the trigger as this mark alone, named by `label`.                                |
| `collapsedIcon` | `Component`       | `undefined`           | Draws the trigger as this mark alone below `sm:`, named by `label`.                    |
| `#expanded`     | slot              |                       | Stands in the trigger's place from `sm:`.                                              |
| `@select`       | event             |                       | The `key` of the item chosen.                                                          |

## Related

- [Navigation](/foundations/navigation): why a phone's bar is always a mark.
- [ActionsDropdown](/components/actions-dropdown): the admin's wrapper, adding scopes.
- [ConfirmDialog](/components/confirm-dialog): what a `danger` item opens.
- [Button](/components/button): the trigger.
