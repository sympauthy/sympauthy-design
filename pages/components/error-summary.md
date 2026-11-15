# ErrorSummary

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaErrorSummary</code></p>

Every invalid field of a long form, listed at its top and linking to each, which takes the focus each time a submit fails.

<script setup>
import { computed, ref } from 'vue'
const familyName = ref('')
const website = ref('example.com')
const nickname = ref('')
const birthdate = ref('')
const submitted = ref(false)
const fieldErrors = computed(() => ({
  'demo-summary-family': familyName.value.trim() === '' ? 'Enter your last name.' : undefined,
  'demo-summary-website': website.value.startsWith('https://') ? undefined : 'Enter a web address that starts with https://.'
}))
const errors = computed(() =>
  submitted.value
    ? Object.entries(fieldErrors.value)
        .filter(([, message]) => message)
        .map(([id, message]) => ({ for: id, message }))
    : []
)
const title = computed(() => (errors.value.length === 1 ? 'Fix 1 field to continue' : `Fix ${errors.value.length} fields to continue`))
const shownError = (id) => (submitted.value ? fieldErrors.value[id] : undefined)
function onSubmit() {
  submitted.value = true
}
</script>

<div class="demo vp-raw"><form class="stack" novalidate @submit.prevent="onSubmit">
  <SaErrorSummary :title="title" :errors="errors" />
  <SaField label="Last name" for="demo-summary-family" :error="shownError('demo-summary-family')"><SaInput id="demo-summary-family" v-model="familyName" autocomplete="family-name" :invalid="!!shownError('demo-summary-family')" /></SaField>
  <SaField label="Nickname" for="demo-summary-nickname" optional-label="(optional)"><SaInput id="demo-summary-nickname" v-model="nickname" autocomplete="nickname" /></SaField>
  <SaField label="Website" for="demo-summary-website" :error="shownError('demo-summary-website')"><SaInput id="demo-summary-website" v-model="website" type="url" autocomplete="url" :invalid="!!shownError('demo-summary-website')" /></SaField>
  <SaField label="Birthdate" for="demo-summary-birthdate" optional-label="(optional)"><SaInput id="demo-summary-birthdate" v-model="birthdate" autocomplete="bday" /></SaField>
  <div class="row"><SaButton type="submit" label="Continue" /></div>
</form></div>

## Usage

- **A form of more than three fields**, such as the claims the flow collects: a submit pressed at its bottom fails where its first errors are out of sight.
- **Not for** a form of three fields or fewer: its errors are in sight when its submit is pressed, so it keeps its fields' own error lines alone.
- **Not for** a failure that is not a field's, such as a request the server refused: use [Alert](/components/alert).

## Look

- **Box**: an [Alert](/components/alert) of `danger`: full width, `space-3` padding, a 1px `danger-line` border, `radius-md`, on `danger-subtle`.
- **Icon**: a 16px exclamation mark in `danger`, before the title, as on a [Field](/components/field)'s error line.
- **Title**: 14px/600 in `danger`.
- **Entries**: one link per error under the title, 14px in `danger`, underlined at rest, each `control-height` tall so that it can be pressed.
- **Empty**: with no errors it draws nothing.

## Behavior

- **Failed submit**: each time the form holding it is submitted and errors remain, it takes the focus, not only the first time, so a person who scrolled down after a first failure sees the second too. It watches its form, with nothing for the app to do, and reads the errors once the form's submit handler has run: set them there, from the app's own validation.
- **Errors changing**: a change to `errors` with no submit moves no focus, and outside a `<form>` it never takes focus.
- **Following an entry**: moves focus to the field, and leaves the URL as it was.
- **Hover**: an entry's underline goes.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus), on the box as it takes focus and on each entry.

## Content

- **`title` is written whole, the count included**, and says what to do: "Fix 3 fields to continue".
- **An entry repeats its field's own error line word for word**, which says what to do next (see [Content](/foundations/content)).

## Accessibility

- **It carries no `role="alert"`, nor any other live region.** The focus it takes is what a screen reader announces, once; a live region would announce it a second time (WCAG 3.3.1).
- **It is a group named by its title**, so a screen reader reaching it reads the title first.
- **Each entry is a link to `#` and its field's `id`**, since it points at a place on the page, and following it focuses the field (WCAG 2.4.3).

## API

The consumer provides the title and the errors, each the `id` of its field's control and that field's message, since the component reads no message bundle. `SaErrorSummaryProps` and `SaErrorSummaryError` are exported for an app wrapping it.

| Name     | Type                    | Default | Description                                                       |
| -------- | ----------------------- | ------- | ----------------------------------------------------------------- |
| `title`  | `string`                |         | Required. The title, count included.                              |
| `errors` | `SaErrorSummaryError[]` |         | Required. Each a `for`, the `id` of the control, and a `message`. |

## Related

- [Alert](/components/alert): the box it is drawn as.
- [Field](/components/field): the fields it links to, and their error lines.
- [Content](/foundations/content): what an error says.
