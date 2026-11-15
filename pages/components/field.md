# Field

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaField</code> around <code>SaInput</code>, <code>SaPasswordInput</code>, <code>SaSelect</code> or <code>SaTextarea</code></p>

A labelled input, the same in both apps: `SaField` around `SaInput`, `SaPasswordInput`, `SaSelect` or `SaTextarea`.

<script setup>
import { ref } from 'vue'
import { SearchIcon } from '../.vitepress/theme/demo-icons'
const name = ref('Billing dashboard')
const uri = ref('https://billing.example.com/callback')
const search = ref('')
const email = ref('ada@example.com')
const password = ref('hunter2')
const newPassword = ref('correct-horse-battery')
const middleName = ref('')
const signUpPassword = ref('correct-horse-battery')
const clientId = ref('c3f1e0a2-7b4d-4e8a-9f21')
const theme = ref('auto')
const notes = ref('')
const claims = ref('{"email": true}')
</script>

## Demo

<div class="demo demo-surface"><div class="stack">
  <SaField label="Client name" for="demo-name"><SaInput id="demo-name" v-model="name" /></SaField>
  <SaField label="Redirect URI" for="demo-uri" hint="Must match the URI the client sends exactly."><SaInput id="demo-uri" v-model="uri" mono /></SaField>
  <SaField label="Search" for="demo-search"><SaInput id="demo-search" v-model="search" :icon="SearchIcon" placeholder="Name or email" /></SaField>
  <SaField label="Email" for="demo-email"><SaInput id="demo-email" v-model="email" type="email" autocomplete="email" /></SaField>
  <SaField label="Middle name" for="demo-middle" optional-label="(optional)"><SaInput id="demo-middle" v-model="middleName" autocomplete="additional-name" /></SaField>
  <SaField label="Password" for="demo-new-pass" hint="At least 12 characters."><SaPasswordInput id="demo-new-pass" v-model="newPassword" show-label="Show password" autocomplete="new-password" /></SaField>
  <SaField label="Password" for="demo-pass" error="The password must contain at least 12 characters."><SaPasswordInput id="demo-pass" v-model="password" show-label="Show password" autocomplete="new-password" invalid /></SaField>
  <SaField label="Password" for="demo-pass-off"><SaPasswordInput id="demo-pass-off" v-model="password" show-label="Show password" disabled /></SaField>
  <SaField label="Client ID" for="demo-id"><SaInput id="demo-id" v-model="clientId" mono disabled /></SaField>
  <SaField label="Theme" for="demo-theme" hint="Which theme a person sees first."><SaSelect id="demo-theme" v-model="theme"><option value="auto">Follow the device</option><option value="light">Light</option><option value="dark">Dark</option></SaSelect></SaField>
  <SaField label="Theme" for="demo-theme-bad" error="Choose a theme to continue."><SaSelect id="demo-theme-bad" v-model="theme" invalid><option value="auto">Follow the device</option></SaSelect></SaField>
  <SaField label="Theme" for="demo-theme-off"><SaSelect id="demo-theme-off" v-model="theme" disabled><option value="auto">Follow the device</option></SaSelect></SaField>
  <SaField label="Notes" for="demo-notes"><SaTextarea id="demo-notes" v-model="notes" placeholder="What this client is for" /></SaField>
  <SaField label="Claims" for="demo-claims" hint="A JSON document."><SaTextarea id="demo-claims" v-model="claims" :rows="4" mono /></SaField>
</div></div>

Submitting this form hides the password again, as a form of the flow does.

<div class="demo demo-surface"><form class="stack" @submit.prevent>
  <SaField label="Email" for="demo-sign-up-email"><SaInput id="demo-sign-up-email" v-model="email" type="email" autocomplete="email" /></SaField>
  <SaField label="Password" for="demo-sign-up-pass"><SaPasswordInput id="demo-sign-up-pass" v-model="signUpPassword" show-label="Show password" autocomplete="new-password" /></SaField>
  <div class="row"><SaButton type="submit" label="Create account" /></div>
</form></div>

## Usage

- **One field in both apps.** The admin's forms and the flow's cards draw the same field, at the same size: a field is where density gives way to a thumb and a phone's keyboard.
- **`mono`**: anything read character by character, such as a URI, a token or a JSON document.
- **`icon`**: a field whose purpose the icon names.
- **`autocomplete`**: set it on every field of the flow (`email`, `current-password`, `new-password`, `one-time-code`).
- **`optionalLabel`**: a field a person may leave empty, as "(optional)". A form marks the fewer kind, so a required field is never starred.
- **`SaPasswordInput`**: every password, new or current. A person who can check what they typed is not asked to type it twice, so a form never asks to confirm a password.
- **`#trailing`**: one mark on `SaInput`'s trailing edge, the size of an icon, such as `SaPasswordInput`'s toggle.
- **`SaSelect`**: a choice among a list the build knows the length of. A list the deployment sizes is a [Listbox](/components/listbox).
- **`SaTextarea`**: several lines of text, opening at the height `rows` gives it.
- **Not for** a long list of values to choose one from, such as a time zone: use [Combobox](/components/combobox).
- **Not for** an action about a field, such as "Forgot password?": it goes under the form, as a [Link](/components/link) or a [Button](/components/button) with `variant="text"`. A target that small beside a label is hard to press.
- **Not for** a value that is read rather than filled in: that is a `.sa-field-label` over the value, as on [RecordPage](/components/record-page).

## Look

- **Label**: above the control, in `flow-label`.
- **Optional mark**: `optionalLabel` after the label, in the label's size at 400 and `ink-500`.
- **Control**: `.sa-control`, so `control-height` tall (see [Control height](/foundations/control-height)), with `surface`, an `ink-400` border and `radius-md`. Its text is 16px in `ink-900`: below that, iOS zooms the page when the field takes focus.
- **Placeholder**: `ink-500`.
- **Icon**: 16px in `ink-400`, on the control's leading edge.
- **Trailing mark**: 16px, `space-3` in from the control's trailing edge, which keeps the typed text clear of it.
- **Password toggle**: an eye in `ink-500`, `ink-700` on hover, slashed while the password is shown. It is pressed over a `control-height` square that is not drawn (see [Control height](/foundations/control-height)).
- **Chevron**: a select draws a 16px chevron in `ink-500` in place of the browser's arrow, on the trailing edge.
- **Line under it**: one line of help in `ink-500`, or of error in `danger`, both 14px. An error line draws a 16px exclamation mark before its message, `space-1` from it, so that a person scanning a long form tells its errors from its hints at a glance.
- **Gap**: `space-1.5`. The field owns the label and the gap, and the control owns its box.

## Behavior

- **Focus**: the one focus ring through `.sa-control-focus` (see [Focus, states and motion](/foundations/focus)).
- **Invalid** (`invalid`): a `danger` border. `SaField`'s `error` replaces the hint while set; pass both.
- **Disabled** (`disabled`): an `ink-50` fill, `ink-500` text and a `not-allowed` cursor. A password's toggle is disabled with its input, in `ink-400`.
- **Shown password**: pressing the toggle shows what was typed, and pressing it again hides it. It never changes `autocomplete`. When the form holding it is submitted the password is hidden again, with nothing for the app to do; outside a `<form>` it stays as the person left it.

## Content

- **An error says what went wrong and what to do next** (see [Content](/foundations/content)).
- **A hint says what the label cannot**: a format or a consequence.
- **`optionalLabel` is the one word in brackets**, as "(optional)".
- **`showLabel` names what the toggle does when it is not pressed**, as "Show password". It never changes.

## Accessibility

- **The label names the control** (WCAG 1.3.1). Pass the control's `id` as `SaField`'s `for`, which also lets a click on the label focus it.
- **`invalid` sets `aria-invalid`** (WCAG 3.3.1).
- **The line under a control is linked to it with `aria-describedby`** (WCAG 1.3.1). `SaField` gives the line an `id` and the control reads it, so a screen reader reads an error or a hint with the field. A caller's own `aria-describedby` replaces it on `SaInput` and `SaSelect`.
- **`optionalLabel` is inside the `<label>`**, so a screen reader reads it with the label: "Middle name (optional)" (WCAG 3.3.2).
- **The error line's icon draws no words**: the message says what went wrong, and the icon is what sets it apart from a hint by more than its color (WCAG 1.4.1).
- **The password's toggle has one name, `showLabel`, and `aria-pressed` says whether the password is shown**, so a screen reader hears "Show password, pressed" rather than a name changing under it (WCAG 4.1.2). Browsers drawing a reveal button of their own in a password field have it hidden, so the field holds one toggle.
- **`SaField` tells the control it holds its label and whether it is optional**, as it tells it the `id` of the line under it. A [Combobox](/components/combobox) heads its sheet with the label and offers to clear an optional field; a [Listbox](/components/listbox) is named by it.
- **The border's contrast** is held on [Color](/foundations/color#accessibility).

## API

The consumer provides the label text, the value binding, the control's `id`, and the error message from validation.

### SaField

| Name            | Type     | Default | Description                                              |
| --------------- | -------- | ------- | -------------------------------------------------------- |
| `label`         | `string` |         | Required. What is being filled in.                       |
| `for`           | `string` |         | The `id` of the control.                                 |
| `hint`          | `string` |         | A line under the control, for what the label cannot say. |
| `error`         | `string` |         | Replaces the hint while set, in `danger`.                |
| `optionalLabel` | `string` |         | Marks the field optional, drawn after the label.         |
| `#default`      | slot     |         | The control.                                             |
| `#help`         | slot     |         | Drawn beside the label, for a help tooltip.              |

### SaInput

Everything else reaches the `<input>`, such as `id`, `placeholder`, `autocomplete` or `disabled`, except `class` and `style`, which reach its wrapper so that a caller can size it.

| Name        | Type        | Default  | Description                                         |
| ----------- | ----------- | -------- | --------------------------------------------------- |
| `type`      | `string`    | `'text'` | The input's type.                                   |
| `icon`      | `Component` |          | Drawn inside the field, on its leading edge.        |
| `mono`      | `boolean`   | `false`  | For a value read character by character.            |
| `invalid`   | `boolean`   | `false`  | Draws the error border; pair it with `error`.       |
| `v-model`   | `string`    | `''`     | The value.                                          |
| `#trailing` | slot        |          | One mark the size of an icon, on the trailing edge. |

### SaPasswordInput

Everything else reaches the `<input>`, as on `SaInput`, `autocomplete` included. `SaPasswordInputProps` is exported for an app wrapping it.

| Name        | Type      | Default | Description                                     |
| ----------- | --------- | ------- | ----------------------------------------------- |
| `showLabel` | `string`  |         | Required. Names the toggle, as "Show password". |
| `invalid`   | `boolean` | `false` | Draws the error border; pair it with `error`.   |
| `disabled`  | `boolean` | `false` | Disables the input and its toggle.              |
| `v-model`   | `string`  | `''`    | The password.                                   |

### SaSelect

Everything else reaches the `<select>`, except `class` and `style`, which reach its wrapper so that a caller can size it.

| Name       | Type      | Default | Description                                   |
| ---------- | --------- | ------- | --------------------------------------------- |
| `invalid`  | `boolean` | `false` | Draws the error border; pair it with `error`. |
| `v-model`  | `string`  | `''`    | The value.                                    |
| `#default` | slot      |         | The `option` elements.                        |

### SaTextarea

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
- [Combobox](/components/combobox): one value among many, opened from a field.
- [Listbox](/components/listbox): a choice among a list the deployment sizes, drawn open.
- [ErrorSummary](/components/error-summary): every error of a long form, at its top.
- [TagsInput](/components/tags-input): several values, entered one at a time.
- [CodeInput](/components/code-input): the flow's one-time code, in place of a field.
