# Listbox

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaListbox</code></p>

A choice among options whose number the build does not know, which scrolls rather than grows.

<script setup>
import { ref } from 'vue'
const short = [{ value: 'email', label: 'Email' }, { value: 'name', label: 'Name' }, { value: 'phone', label: 'Phone number' }]
const long = ['Birthdate', 'Email', 'Family name', 'Gender', 'Given name', 'Locale', 'Middle name', 'Nickname', 'Phone number', 'Picture', 'Time zone', 'Website'].map((label) => ({ value: label, label }))
const one = ref(['email'])
const several = ref(['Email', 'Locale'])
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
const zone = ref(['Europe/Paris'])
const narrowZone = ref(['America/Sao_Paulo'])
</script>

<div class="demo"><div class="stack">
  <SaListbox :options="short" :selected="one" search-placeholder="Search claims" no-match-label="No claim matches this search." aria-label="Claim" @select="one = $event" />
  <SaListbox :options="long" :selected="several" multiple search-placeholder="Search claims" no-match-label="No claim matches this search." aria-label="Claims" @select="several = $event" />
  <SaField label="Time zone"><SaListbox :options="zones" :selected="zone" search-placeholder="Search a city, region or offset" no-match-label="No time zone matches this search." @select="zone = $event" /></SaField>
  <div style="max-width: 15rem"><SaListbox :options="zones" :selected="narrowZone" search-placeholder="Search time zones" no-match-label="No time zone matches this search." aria-label="Time zone" @select="narrowZone = $event" /></div>
</div></div>

## Usage

- **A list a deployment sizes**, such as its claims, where a [select](/components/field) would render a menu taller than the screen.
- **`multiple`**: several may be chosen, each toggled on its own.
- **`secondary`**: what tells two labels apart or places one, as the region of a city.
- **`meta`**: a short value read character by character, as an offset or a language's code.
- **`groupLabel`**: options a person scans by what they share, as the time zones of a region.
- **`fill`**: a list that is the whole of a sheet, as [Combobox](/components/combobox)'s below `sm:`.
- **Not for** one value of a form, chosen among many: use [Combobox](/components/combobox), which opens this list on request. A list drawn open stays a listbox's, on a page with room for it or where several are chosen.
- **Not for** a list the build knows the length of: use `SaSelect` on [Field](/components/field).
- **Not for** actions: a list of what can be done is a [menu](/components/actions-dropdown).
- **Not for** values a person types: use [TagsInput](/components/tags-input).

## Look

- **Box**: `surface`, an `ink-400` border and `radius-md`, like every control.
- **List**: at most 224px tall, then it scrolls.
- **Option**: `.sa-menu-item` in `ink-700`, at least `control-height` tall. It reads the label, the secondary text, the meta, then a 16px check in `primary` once chosen, whose place is kept while it is not. An `icon` is 12px, after the label.
- **Secondary text**: after the label and a middle dot, in `ink-500`.
- **Meta**: the mono face in `ink-500`, toward the option's trailing end.
- **Cut short**: the label and the secondary text are cut with an ellipsis where the row runs out of room; the meta never is.
- **Group heading**: `.sa-field-label`, over the options sharing it, drawn each time `groupLabel` changes. An option with no `groupLabel` sits under no heading.
- **`fill`**: no box of its own, and the list fills the height under the search.
- **Search**: a `.sa-control` over the list, under an `ink-200` rule.

## Behavior

- **Search**: appears once the list holds 8 options, an option of empty value, which stands for nothing chosen, not counted. Under that, the answer is already in sight. It matches the label, the secondary text and the meta, so "+01:00" finds Paris and "new york" finds New York. It clears when the set of options changes, and not when the same options come in another order.
- **Order**: the options are shown in the order they are passed. While a search is typed the headings go, and the matches keep that order.
- **Hover and keyboard**: the highlighted option is `ink-100`. The arrow keys move through the options, and Enter or Space chooses one.
- **Empty**: when the search matches nothing, `noMatchLabel` takes the options' place.

## Content

- **`noMatchLabel` says that the search found nothing**, not that something failed (see [Content](/foundations/content)).

## Accessibility

- **The primitive sets the listbox and option roles, and the keyboard** (WCAG 4.1.2).
- **In a `SaField`, the field's label names the list.** `SaField` tells it its label, since the `<label>` points at no single control here. A line under it in `SaField` is linked with `aria-describedby`.
- **Anywhere else, pass `ariaLabel`**, which also takes the place of the field's label where both are given.
- **A group is named by its heading**, which the primitive links to it.

## API

The consumer provides the options, what is chosen and the words, since the component reads no message bundle.

| Name                | Type                | Default     | Description                                                                                                                                                           |
| ------------------- | ------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`           | `SaListboxOption[]` |             | Required. Each a `value` and a `label`, and optionally a `secondary` text, a `meta`, a `groupLabel`, and an `icon` with the `iconLabel` saying it to a screen reader. |
| `selected`          | `string[]`          |             | Required. What is chosen: at most one, unless `multiple`.                                                                                                             |
| `searchPlaceholder` | `string`            |             | Required. Names what is searched.                                                                                                                                     |
| `noMatchLabel`      | `string`            |             | Required. Said when the search matches nothing.                                                                                                                       |
| `multiple`          | `boolean`           | `false`     | Lets several be chosen.                                                                                                                                               |
| `ariaLabel`         | `string`            | `undefined` | Names the list, outside a `SaField`.                                                                                                                                  |
| `fill`              | `boolean`           | `false`     | Fills the height of what holds it, with no box of its own.                                                                                                            |
| `v-model:search`    | `string`            | `''`        | What is typed in the search, for a caller ordering the options by whether one is.                                                                                     |
| `@select`           | event               |             | What is chosen now, as a list whether one or several.                                                                                                                 |
| `focus()`           | method              |             | Focuses the search, or the chosen option where there is none, and scrolls the list to the choice.                                                                     |

## Related

- [Field](/components/field): the select, and the field it goes in.
- [Combobox](/components/combobox): a field opening this list on request, in a popover or a sheet.
- [TagsInput](/components/tags-input): values a person types.
- [ActionsDropdown](/components/actions-dropdown): the same line, for actions.
