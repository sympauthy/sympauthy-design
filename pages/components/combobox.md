# Combobox

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaCombobox</code></p>

One value among many, picked from a field that opens a searchable list on request: a popover under the field from `sm:`, and a sheet the height of the screen below it.

<script setup>
import { ref } from 'vue'
const zones = [
  { value: 'Africa/Abidjan', label: 'Abidjan', secondary: 'Africa', meta: '+00:00', groupLabel: 'Africa' },
  { value: 'Africa/Algiers', label: 'Algiers', secondary: 'Africa', meta: '+01:00', groupLabel: 'Africa' },
  { value: 'Africa/Nairobi', label: 'Nairobi', secondary: 'Africa', meta: '+03:00', groupLabel: 'Africa' },
  { value: 'America/New_York', label: 'New York', secondary: 'America', meta: '-05:00', groupLabel: 'America' },
  { value: 'America/Paramaribo', label: 'Paramaribo', secondary: 'America', meta: '-03:00', groupLabel: 'America' },
  { value: 'America/Sao_Paulo', label: 'São Paulo', secondary: 'America', meta: '-03:00', groupLabel: 'America' },
  { value: 'Asia/Kolkata', label: 'Kolkata', secondary: 'Asia', meta: '+05:30', groupLabel: 'Asia' },
  { value: 'Asia/Tokyo', label: 'Tokyo', secondary: 'Asia', meta: '+09:00', groupLabel: 'Asia' },
  { value: 'Europe/London', label: 'London', secondary: 'Europe', meta: '+00:00', groupLabel: 'Europe' },
  { value: 'Europe/Paris', label: 'Paris', secondary: 'Europe', meta: '+01:00', groupLabel: 'Europe' }
]
const languages = [
  { value: 'de', label: 'Deutsch', meta: 'de' },
  { value: 'en', label: 'English', meta: 'en' },
  { value: 'es', label: 'Español', meta: 'es' },
  { value: 'fr', label: 'Français', meta: 'fr' }
]
const zone = ref('')
const language = ref('fr')
const optionalZone = ref('Asia/Tokyo')
const invalidZone = ref('')
const frames = [{ mode: 'phone' }, { mode: 'tablet', label: 'Tablet and desktop' }]
const framedZone = ref({ phone: '', tablet: '' })
</script>

<div class="demo"><div class="stack">
  <SaField label="Time zone" for="demo-zone"><SaCombobox id="demo-zone" v-model="zone" :options="zones" placeholder="Choose a time zone" search-placeholder="Search a city, region or offset" no-match-label="No time zone matches this search." close-label="Close" suggested-value="Europe/Paris" suggested-label="From your device" /></SaField>
  <SaField label="Language" for="demo-language"><SaCombobox id="demo-language" v-model="language" :options="languages" placeholder="Choose a language" search-placeholder="Search a language" no-match-label="No language matches this search." close-label="Close" /></SaField>
  <SaField label="Time zone" for="demo-zone-optional" optional-label="(optional)"><SaCombobox id="demo-zone-optional" v-model="optionalZone" :options="zones" placeholder="Choose a time zone" search-placeholder="Search a city, region or offset" no-match-label="No time zone matches this search." close-label="Close" clear-label="Clear" /></SaField>
  <SaField label="Time zone" for="demo-zone-invalid" error="Choose your time zone."><SaCombobox id="demo-zone-invalid" v-model="invalidZone" :options="zones" placeholder="Choose a time zone" search-placeholder="Search a city, region or offset" no-match-label="No time zone matches this search." close-label="Close" invalid /></SaField>
  <SaField label="Time zone" for="demo-zone-disabled"><SaCombobox id="demo-zone-disabled" model-value="Europe/Paris" :options="zones" placeholder="Choose a time zone" search-placeholder="Search a city, region or offset" no-match-label="No time zone matches this search." close-label="Close" disabled /></SaField>
</div></div>

<div class="demo vp-raw"><div class="flex flex-wrap gap-4">
  <DemoFrame v-for="frame in frames" :key="frame.mode" v-bind="frame" :height="560" :crop="frame.mode === 'tablet' ? 420 : undefined">
    <SaField label="Time zone" :for="`demo-zone-${frame.mode}`"><SaCombobox :id="`demo-zone-${frame.mode}`" v-model="framedZone[frame.mode]" :options="zones" placeholder="Choose a time zone" search-placeholder="Search a city, region or offset" no-match-label="No time zone matches this search." close-label="Close" suggested-value="Europe/Paris" suggested-label="From your device" /></SaField>
  </DemoFrame>
</div></div>

## Usage

- **One value of a form, chosen among many**, such as a time zone or a language: the field shows the choice, and the list opens on request.
- **`suggestedValue`**: the option the app has a reason to suggest, such as the time zone of the person's device. It leads the list under `suggestedLabel`.
- **`clearLabel`**: a field marked optional, which a person who touched it can leave empty again. A required field offers no way back to empty.
- **Not for** a list drawn open, on a page with room for it, or where several are chosen: use [Listbox](/components/listbox), as the admin's preferences do.
- **Not for** a few options the build knows: use `SaSelect` or a [RadioGroup](/components/radio-group).

## Look

- **Field**: `.sa-control`, so `control-height` tall, with the box, the border and the text of every [Field](/components/field) control. It shows the chosen option's label and its meta in the mono face and `ink-500`, or `placeholder` in `ink-500` while nothing is chosen, and a 16px up-and-down chevron in `ink-500` on its trailing edge. The label is cut with an ellipsis where it does not fit; the meta never is.
- **List**: a [Listbox](/components/listbox), with its options, its search and its headings.
- **Popover**, from `sm:`: under the field, as wide as it, `space-1` from it.
- **Sheet**, below `sm:`: the full width of the screen and the height a phone's keyboard leaves of it, on `surface` over the scrim a [Dialog](/components/dialog) has. Its head is the field's label in 16px/600 `ink-900`, beside a close button: a 20px cross in `ink-500` in a `control-height` square, over an `ink-200` rule. The list fills the height under the search rather than stopping at 224px.
- **Suggestion**: the suggested option under its own heading, at the top, and not again in its group.
- **Clear**: an option at the very top, worded by `clearLabel`, once a value is chosen in an optional field.

## Behavior

- **Focus**: the one focus ring of a control, through `.sa-control-focus` (see [Focus, states and motion](/foundations/focus)).
- **Opening**: pressing the field, or a click on its label, opens the list. The search has focus; a list too short to show one opens with focus on the chosen option, or on the first where none is chosen. The list is scrolled to the choice.
- **Choosing**: an option closes the list, writes `v-model` and returns focus to the field. "Clear" empties `v-model`, and the field shows its `placeholder` again.
- **Closing**: Escape, a press outside the popover, or the sheet's close button closes the list without changing the value, and focus returns to the field.
- **Sheet's slide**: it slides up from the bottom over 300ms, and back down as it closes. Under `prefers-reduced-motion` it appears in place.
- **Searching**: the headings go, the suggestion's with them, and the matches follow the order the app passed the options in. "Clear" is matched as any option is, so it goes unless its word is typed. When the search matches nothing, `noMatchLabel` takes the options' place.
- **Mode**: whether the list opens as a popover or a sheet is read as it opens, from the width of the window.
- **Invalid** (`invalid`): a `danger` border.
- **Disabled** (`disabled`): the field's disabled look, and it does not open.

## Content

- **`placeholder` says what to choose**, as "Choose a time zone".
- **`suggestedLabel` says why the suggestion comes first**, as "From your device".
- **`noMatchLabel` says that the search found nothing**, not that something failed (see [Content](/foundations/content)).

## Accessibility

- **The field is a button, named by the field's label and then what it shows**, the label's words and its optional mark without the help beside them, as "Time zone Paris +01:00", so a screen reader hears the choice and a person speaking to their device can say the label (WCAG 2.5.3). `SaField`'s `for` points at it, so pass the same `id` to both.
- **The list is named by the field's label**, which `SaField` tells it. The line under the field is linked to the button with `aria-describedby`.
- **The sheet is a dialog**, titled by the field's label: it holds the focus while it is open, and the page under it is out of reach, as for a [Dialog](/components/dialog) (WCAG 2.4.3).
- **`closeLabel` names the sheet's close button**, whose cross draws no words (WCAG 4.1.2).
- **The sheet keeps the list above a phone's keyboard**: it fills what the keyboard leaves of the screen, and follows it as the keyboard opens and closes, rather than opening under the field.

## API

The consumer provides the options, the value binding and the words, since the component reads no message bundle, and draws it in a `SaField`, whose label and optional mark it reads. Every other attribute, `id` included, reaches the button. `SaComboboxProps` is exported for an app wrapping it.

| Name                | Type                | Default | Description                                                                  |
| ------------------- | ------------------- | ------- | ---------------------------------------------------------------------------- |
| `options`           | `SaListboxOption[]` |         | Required. The options, as [Listbox](/components/listbox) takes them.         |
| `placeholder`       | `string`            |         | Required. Shown while nothing is chosen.                                     |
| `searchPlaceholder` | `string`            |         | Required. Names what is searched.                                            |
| `noMatchLabel`      | `string`            |         | Required. Said when the search matches nothing.                              |
| `closeLabel`        | `string`            |         | Required. Names the sheet's close button.                                    |
| `suggestedValue`    | `string`            |         | The option leading the list. A value among none of the options does nothing. |
| `suggestedLabel`    | `string`            |         | The heading of the suggested option.                                         |
| `clearLabel`        | `string`            |         | The option emptying the field. Required in a field marked optional.          |
| `invalid`           | `boolean`           | `false` | Draws the error border; pair it with `error`.                                |
| `disabled`          | `boolean`           | `false` | Unavailable.                                                                 |
| `v-model`           | `string`            | `''`    | The value chosen, `''` while none is.                                        |

## Related

- [Listbox](/components/listbox): the list it opens.
- [Field](/components/field): the field it goes in, which gives it its label.
- [Dialog](/components/dialog): the scrim and the focus the sheet holds.
- [TableFilters](/components/table-filters): a popover over a listbox, opened from a button.
- [Focus, states and motion](/foundations/focus): the sheet's slide.
