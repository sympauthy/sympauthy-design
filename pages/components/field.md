# Field

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>FormField</code> around <code>FormInput</code>, <code>FormSelect</code> or <code>FormTextarea</code></p>

A labelled input, the same in both apps: `FormField` around `FormInput`, `FormSelect` or `FormTextarea`.

<script setup>
import { ref } from 'vue'
import { SearchIcon } from '../.vitepress/theme/demo-icons'
const name = ref('Billing dashboard')
const uri = ref('https://billing.example.com/callback')
const search = ref('')
const email = ref('ada@example.com')
const password = ref('hunter2')
const clientId = ref('c3f1e0a2-7b4d-4e8a-9f21')
const theme = ref('auto')
const notes = ref('')
const claims = ref('{"email": true}')
</script>

<div class="demo"><div class="stack">
  <FormField label="Client name" for="demo-name"><FormInput id="demo-name" v-model="name" /></FormField>
  <FormField label="Redirect URI" for="demo-uri" hint="Must match the URI the client sends exactly."><FormInput id="demo-uri" v-model="uri" mono /></FormField>
  <FormField label="Search" for="demo-search"><FormInput id="demo-search" v-model="search" :icon="SearchIcon" placeholder="Name or email" /></FormField>
  <FormField label="Email" for="demo-email"><FormInput id="demo-email" v-model="email" type="email" autocomplete="email" /></FormField>
  <FormField label="Password" for="demo-pass" error="The password must contain at least 12 characters."><FormInput id="demo-pass" v-model="password" type="password" autocomplete="new-password" invalid /></FormField>
  <FormField label="Client ID" for="demo-id"><FormInput id="demo-id" v-model="clientId" mono disabled /></FormField>
  <FormField label="Theme" for="demo-theme" hint="Which theme a person sees first."><FormSelect id="demo-theme" v-model="theme"><option value="auto">Follow the device</option><option value="light">Light</option><option value="dark">Dark</option></FormSelect></FormField>
  <FormField label="Theme" for="demo-theme-bad" error="Choose a theme to continue."><FormSelect id="demo-theme-bad" v-model="theme" invalid><option value="auto">Follow the device</option></FormSelect></FormField>
  <FormField label="Theme" for="demo-theme-off"><FormSelect id="demo-theme-off" v-model="theme" disabled><option value="auto">Follow the device</option></FormSelect></FormField>
  <FormField label="Notes" for="demo-notes"><FormTextarea id="demo-notes" v-model="notes" placeholder="What this client is for" /></FormField>
  <FormField label="Claims" for="demo-claims" hint="A JSON document."><FormTextarea id="demo-claims" v-model="claims" :rows="4" mono /></FormField>
</div></div>

## Usage

- **One field in both apps.** The admin's forms and the flow's cards draw the same field, at the same size: a field is where density gives way to a thumb and a phone's keyboard.
- **`mono`**: anything read character by character, such as a URI, a token or a JSON document.
- **`icon`**: a field whose purpose the icon names.
- **`autocomplete`**: set it on every field of the flow (`email`, `current-password`, `new-password`, `one-time-code`).
- **`FormSelect`**: a choice among a list the build knows the length of. A list the deployment sizes is a [FormListbox](/components/form-listbox).
- **`FormTextarea`**: several lines of text, opening at the height `rows` gives it.
- **Not for** a value that is read rather than filled in: that is a `.field-label` over the value, as on [RecordPage](/components/record-page).

## Look

- **Label**: above the control, in `flow-label`.
- **Control**: `.control`, so `control-height` tall (see [Control height](/foundations/control-height)), with `surface`, an `ink-400` border and `radius-md`. Its text is 16px in `ink-900`: below that, iOS zooms the page when the field takes focus.
- **Placeholder**: `ink-500`.
- **Icon**: 16px in `ink-400`, on the control's leading edge.
- **Chevron**: a select draws a 16px chevron in `ink-500` in place of the browser's arrow, on the trailing edge.
- **Line under it**: one line of help in `ink-500`, or of error in `danger`, both 14px.
- **Gap**: `space-1.5`. The field owns the label and the gap, and the control owns its box.

## Behavior

- **Focus**: the one focus ring through `.control-focus` (see [Focus, states and motion](/foundations/focus)).
- **Invalid** (`invalid`): a `danger` border. `FormField`'s `error` replaces the hint while set; pass both.
- **Disabled** (`disabled`): an `ink-50` fill, `ink-500` text and a `not-allowed` cursor.

## Content

- **An error says what went wrong and what to do next** (see [Content](/foundations/content)).
- **A hint says what the label cannot**: a format or a consequence.

## Accessibility

- **The label names the control** (WCAG 1.3.1). Pass the control's `id` as `FormField`'s `for`, which also lets a click on the label focus it.
- **`invalid` sets `aria-invalid`** (WCAG 3.3.1).
- **The line under a control is linked to it with `aria-describedby`** (WCAG 1.3.1). `FormField` gives the line an `id` and the control reads it, so a screen reader reads an error or a hint with the field. A caller's own `aria-describedby` replaces it on `FormInput` and `FormSelect`.
- **The border's contrast** is held on [Color](/foundations/color#accessibility).

## API

The consumer provides the label text, the value binding, the control's `id`, and the error message from validation.

### FormField

| Name       | Type     | Default | Description                                              |
| ---------- | -------- | ------- | -------------------------------------------------------- |
| `label`    | `string` |         | Required. What is being filled in.                       |
| `for`      | `string` |         | The `id` of the control.                                 |
| `hint`     | `string` |         | A line under the control, for what the label cannot say. |
| `error`    | `string` |         | Replaces the hint while set, in `danger`.                |
| `#default` | slot     |         | The control.                                             |
| `#help`    | slot     |         | Drawn beside the label, for a help tooltip.              |

### FormInput

Everything else reaches the `<input>`, such as `id`, `placeholder`, `autocomplete` or `disabled`, except `class` and `style`, which reach its wrapper so that a caller can size it.

| Name      | Type        | Default  | Description                                   |
| --------- | ----------- | -------- | --------------------------------------------- |
| `type`    | `string`    | `'text'` | The input's type.                             |
| `icon`    | `Component` |          | Drawn inside the field, on its leading edge.  |
| `mono`    | `boolean`   | `false`  | For a value read character by character.      |
| `invalid` | `boolean`   | `false`  | Draws the error border; pair it with `error`. |
| `v-model` | `string`    | `''`     | The value.                                    |

### FormSelect

Everything else reaches the `<select>`, except `class` and `style`, which reach its wrapper so that a caller can size it.

| Name       | Type      | Default | Description                                   |
| ---------- | --------- | ------- | --------------------------------------------- |
| `invalid`  | `boolean` | `false` | Draws the error border; pair it with `error`. |
| `v-model`  | `string`  | `''`    | The value.                                    |
| `#default` | slot      |         | The `option` elements.                        |

### FormTextarea

Everything else reaches the `<textarea>`.

| Name      | Type      | Default | Description                                   |
| --------- | --------- | ------- | --------------------------------------------- |
| `rows`    | `number`  | `2`     | The height it opens at.                       |
| `mono`    | `boolean` | `false` | For a value read character by character.      |
| `invalid` | `boolean` | `false` | Draws the error border; pair it with `error`. |
| `v-model` | `string`  | `''`    | The value.                                    |

## Related

- [Control height](/foundations/control-height): the box every control shares.
- [Type](/foundations/type): `flow-label`.
- [Focus, states and motion](/foundations/focus): the ring on a control.
- [AuthCard](/components/auth-card): the flow's fields in a card.
- [FormListbox](/components/form-listbox): a choice among a list the deployment sizes.
- [FormTagsInput](/components/form-tags-input): several values, entered one at a time.
- [CodeInput](/components/code-input): the flow's one-time code, in place of a field.
