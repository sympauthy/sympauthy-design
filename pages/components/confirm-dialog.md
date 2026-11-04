# ConfirmDialog

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaConfirmDialog</code></p>

The question a destructive action asks before it reaches the server.

<script setup>
import { ref } from 'vue'
const open = ref(false)
const failing = ref(false)
</script>

<div class="demo"><div class="row">
  <SaButton label="Revoke grant" @click="open = true" />
  <SaButton label="Revoke grant, with an error" @click="failing = true" />
  <SaConfirmDialog :open="open" confirm-label="Revoke grant" cancel-label="Cancel" @confirm="open = false" @cancel="open = false">
    <template #title>Revoke this grant?</template>
    The client is signed out of this account at once. This cannot be undone.
  </SaConfirmDialog>
  <SaConfirmDialog :open="failing" confirm-label="Revoke grant" cancel-label="Cancel" error="The server did not answer. Try again in a moment." @confirm="failing = false" @cancel="failing = false">
    <template #title>Revoke this grant?</template>
    The client is signed out of this account at once. This cannot be undone.
  </SaConfirmDialog>
</div></div>

## Usage

- **Every destructive action**, before it reaches the server.
- **`confirmVariant`**: `danger`, the default, for what destroys. Pass another [Button](/components/button) variant for a confirmation that destroys nothing.
- **Not for** a form with several fields: use [Dialog](/components/dialog).

## Look

- **Shell**: [Dialog](/components/dialog)'s.
- **Footer**: a secondary Cancel first, the confirming button last.
- **Error**: a `danger` [Alert](/components/alert), `space-4` under the body.

## Behavior

- **Focus**: it starts on Cancel, so Enter never destroys by accident.
- **Dismissing**: Escape and the scrim cancel.
- **Loading** (`loading`): the confirming button shows it is `submitting`, Cancel is disabled, and it cannot be dismissed.
- **Error** (`error`): the alert appears and the dialog stays, so that the action can be tried again.

## Content

- **The title asks the question with the verb**, as "Revoke this grant?".
- **The body says what happens to whom, and whether it can be undone.**
- **The confirming button repeats the verb**, as "Revoke grant", never "OK" or "Yes" (see [Content](/foundations/content)).

## Accessibility

- **The title names the dialog**, through [Dialog](/components/dialog) (WCAG 4.1.2). Always fill the `title` slot.
- **An error is announced** through the alert's `role="alert"` (WCAG 4.1.3).

## API

The consumer provides the title, the consequence, both labels and the handlers, since the component reads no message bundle.

| Name              | Type              | Default    | Description                                         |
| ----------------- | ----------------- | ---------- | --------------------------------------------------- |
| `open`            | `boolean`         |            | Required. Whether it is drawn.                      |
| `confirmLabel`    | `string`          |            | Required. Repeats the title's verb.                 |
| `cancelLabel`     | `string`          |            | Required. What backs out.                           |
| `confirmVariant`  | `SaButtonVariant` | `'danger'` | The confirming button's variant.                    |
| `confirmDisabled` | `boolean`         | `false`    | Holds it back until what it acts on is chosen.      |
| `loading`         | `boolean`         | `false`    | While the call runs.                                |
| `error`           | `string \| null`  | `null`     | Why the call failed.                                |
| `@confirm`        | event             |            | The confirming button was pressed.                  |
| `@cancel`         | event             |            | Cancel, Escape or the scrim.                        |
| `#title`          | slot              |            | The question.                                       |
| `#default`        | slot              |            | What happens to whom, and whether it can be undone. |

## Related

- [Dialog](/components/dialog): what it is built on.
- [Button](/components/button): the soft `danger` style.
- [Alert](/components/alert): its error.
- [Menu](/components/menu): where most destructive actions start.
