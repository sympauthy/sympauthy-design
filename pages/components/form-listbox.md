# FormListbox

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>FormListbox</code></p>

A choice among options whose number the build does not know, which scrolls rather than grows.

<script setup>
import { ref } from 'vue'
const short = [{ value: 'email', label: 'Email' }, { value: 'name', label: 'Name' }, { value: 'phone', label: 'Phone number' }]
const long = ['Birthdate', 'Email', 'Family name', 'Gender', 'Given name', 'Locale', 'Middle name', 'Nickname', 'Phone number', 'Picture', 'Time zone', 'Website'].map((label) => ({ value: label, label }))
const one = ref(['email'])
const several = ref(['Email', 'Locale'])
</script>

<div class="demo"><div class="stack">
  <FormListbox :options="short" :selected="one" search-placeholder="Search claims" no-match-label="No claim matches this search." aria-label="Claim" @select="one = $event" />
  <FormListbox :options="long" :selected="several" multiple search-placeholder="Search claims" no-match-label="No claim matches this search." aria-label="Claims" @select="several = $event" />
</div></div>

## Usage

- **A list a deployment sizes**, such as its claims, where a [select](/components/field) would render a menu taller than the screen.
- **`multiple`**: several may be chosen, each toggled on its own.
- **Not for** a list the build knows the length of: use `FormSelect` on [Field](/components/field).
- **Not for** actions: a list of what can be done is a [menu](/components/actions-dropdown).
- **Not for** values a person types: use [FormTagsInput](/components/form-tags-input).

## Look

- **Box**: `surface`, an `ink-400` border and `radius-md`, like every control.
- **List**: at most 224px tall, then it scrolls.
- **Option**: `.menu-item` in `ink-700`, at least `control-height` tall, cut with an ellipsis where it does not fit, with a 16px check in `primary` once chosen.
- **Search**: a `.control` over the list, under an `ink-200` rule.

## Behavior

- **Search**: appears once the list holds 8 options. Under that, the answer is already in sight. It clears when the options change.
- **Hover and keyboard**: the highlighted option is `ink-100`. The arrow keys move through the options, and Enter or Space chooses one.
- **Empty**: when the search matches nothing, `noMatchLabel` takes the options' place.

## Content

- **`noMatchLabel` says that the search found nothing**, not that something failed (see [Content](/foundations/content)).

## Accessibility

- **The primitive sets the listbox and option roles, and the keyboard** (WCAG 4.1.2).
- **Pass `ariaLabel`**, since `FormField`'s label points at no single control here. A line under it in `FormField` is linked with `aria-describedby`.

## API

The consumer provides the options, what is chosen and the words, since the component reads no message bundle.

| Name                | Type              | Default     | Description                                               |
| ------------------- | ----------------- | ----------- | --------------------------------------------------------- |
| `options`           | `ListboxOption[]` |             | Required. Each a `value` and a `label`.                   |
| `selected`          | `string[]`        |             | Required. What is chosen: at most one, unless `multiple`. |
| `searchPlaceholder` | `string`          |             | Required. Names what is searched.                         |
| `noMatchLabel`      | `string`          |             | Required. Said when the search matches nothing.           |
| `multiple`          | `boolean`         | `false`     | Lets several be chosen.                                   |
| `ariaLabel`         | `string`          | `undefined` | Names the list.                                           |
| `@select`           | event             |             | What is chosen now, as a list whether one or several.     |

## Related

- [Field](/components/field): the select, and the field it goes in.
- [FormTagsInput](/components/form-tags-input): values a person types.
- [ActionsDropdown](/components/actions-dropdown): the same line, for actions.
