# Menu

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonMenu</code></p>

The actions of one record or one page, behind a button.

<script setup>
import { ref } from 'vue'
import { PlusIcon } from '../.vitepress/theme/demo-icons'
const items = [
  { key: 'enroll', label: 'Enroll a factor', icon: PlusIcon },
  { key: 'link', label: 'Link a provider', disabledReason: 'Your role does not allow linking providers.' },
  { key: 'logout', label: 'Force logout', danger: true }
]
const chosen = ref('')
</script>

<div class="demo"><div class="row" style="justify-content: flex-end">
  <span class="text-gray-500">{{ chosen ? `Chose ${chosen}` : '' }}</span>
  <CommonMenu label="Actions" :items="items" @select="chosen = $event" />
</div></div>

## Usage

- **Several actions on one record**, read together.
- **The order**: from the most used to the least, with what destroys last.
- **`danger`**: an action that destroys. It opens a [ConfirmDialog](/components/confirm-dialog) rather than acting.
- **`disabledReason`**: an action that exists but cannot be used, drawn rather than removed.
- **Not for** one or two actions: use a [Button](/components/button) each.
- **Not for** a choice of a value: use `FormListbox`.

## Look

- **Trigger**: a secondary [Button](/components/button) with a chevron after its label.
- **Box**: `.menu`, at least 192px wide, 4px from its trigger.
- **Item**: `.menu-item` in `ink-700`, at least `control-height` tall, with a 16px icon in `ink-500`.
- **Separator**: an `ink-200` rule before the first `danger` item, which the menu draws itself.
- **`danger` item**: `danger` text, on `danger-hover` when highlighted.
- **Disabled item**: `ink-400`, with its reason under the label in 12px `ink-500`.

## Behavior

- **Hover and keyboard**: the highlighted item is `ink-100` with `ink-900` text.
- **Keyboard**: the arrow keys move through the items, Enter chooses one, Escape closes it. A disabled item is skipped.
- **Choosing**: closes the menu and emits `select`.
- **Motion**: `.overlay-animated`.

## Content

- **An item is a verb and its object**, as "Force logout" (see [Content](/foundations/content)).
- **A reason says why the action is not available**, since a menu is read while it is open and has no tooltip to hover.

## Accessibility

- **The primitive sets the menu roles, the keyboard and where focus goes** (WCAG 4.1.2).
- **A disabled item's text stays under 4.5:1**, as disabled controls may (WCAG 1.4.3). The reason under it holds the contrast.

## API

The consumer provides the label, the items in order, and what each does, since the component knows no scopes. An app that decides from its own rules what is disabled wraps it, as the admin's `ActionsDropdown` does.

| Name          | Type          | Default                  | Description                                                             |
| ------------- | ------------- | ------------------------ | ----------------------------------------------------------------------- |
| `label`       | `string`      |                          | Required. What the button says.                                         |
| `items`       | `MenuItem[]`  |                          | Required. Each a `key`, `label`, `icon`, `danger` and `disabledReason`. |
| `buttonStyle` | `ButtonStyle` | `secondaryColoredButton` | The trigger's style.                                                    |
| `@select`     | event         |                          | The `key` of the item chosen.                                           |

## Related

- [ActionsDropdown](/components/actions-dropdown): the admin's wrapper, adding scopes.
- [ConfirmDialog](/components/confirm-dialog): what a `danger` item opens.
- [Button](/components/button): the trigger.
