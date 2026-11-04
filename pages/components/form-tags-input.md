# FormTagsInput

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>FormTagsInput</code></p>

Several values entered one at a time, each becoming a tag as it is entered.

<script setup>
import { ref } from 'vue'
const uris = ref(['https://billing.example.com/callback'])
const none = ref([])
</script>

<div class="demo"><div class="stack">
  <FormField label="Redirect URIs" hint="Press Enter after each one."><FormTagsInput v-model="uris" remove-label="Remove" placeholder="Add a URI" aria-label="Redirect URIs" /></FormField>
  <FormField label="Redirect URIs" error="Add at least one URI."><FormTagsInput v-model="none" remove-label="Remove" placeholder="Add a URI" aria-label="Redirect URIs" invalid /></FormField>
</div></div>

## Usage

- **A list a person types**, so that they need not know the separator it travels under.
- **Not for** a choice among known values: use [FormListbox](/components/form-listbox).
- **Not for** a status: a tag in this field is a value being entered. Use [Tag](/components/tag).

## Look

- **Box**: `.control`, so it starts at `control-height` and grows as the tags wrap.
- **Tag**: 12px in `ink-700` on `ink-100`, `radius-md`, `space-1` apart, with a 12px cross in `ink-500`.
- **Field**: the rest of the row, with the 16px text of every field.

## Behavior

- **Enter or leaving the field**: enters what was typed. A value already in the list is not entered twice.
- **Backspace**: in the empty field, selects then removes the last tag.
- **Focus**: the ring is on the box, through `.control-focus-within`, whichever part has focus.
- **Invalid** (`invalid`): a `danger` border.
- **`flush()`**: enters what is typed. A caller closing an overlay around the field calls it, since an overlay dismissed on the pointer going down takes the field away before it can lose focus.

## Accessibility

- **`removeLabel` names each cross**, and the primitive handles the keyboard (WCAG 4.1.2).
- **Pass `ariaLabel`**, since `FormField`'s label points at no single control here. A line under it in `FormField` is linked with `aria-describedby`.
- **The target of a cross is `control-height` square**, while the icon stays 12px (WCAG 2.5.5). It may overlap the word beside it, which does nothing when pressed.

## API

The consumer provides the words, since the component reads no message bundle. Other attributes reach the box.

| Name          | Type       | Default     | Description                                   |
| ------------- | ---------- | ----------- | --------------------------------------------- |
| `removeLabel` | `string`   |             | Required. Names the control removing a value. |
| `placeholder` | `string`   | `undefined` | Named in the empty field.                     |
| `ariaLabel`   | `string`   | `undefined` | Names the field.                              |
| `invalid`     | `boolean`  | `false`     | Draws the error border; pair it with `error`. |
| `v-model`     | `string[]` | `[]`        | The values.                                   |
| `flush()`     | method     |             | Enters what is typed.                         |

## Related

- [Field](/components/field): the field it goes in.
- [FormListbox](/components/form-listbox): a choice among known values.
- [Tag](/components/tag): a status, drawn differently on purpose.
