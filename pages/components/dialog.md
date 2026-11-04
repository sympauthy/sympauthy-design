# Dialog

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaDialog</code></p>

The shell of any dialog: a flat card on a scrim, with a title and a footer for its buttons.

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<div class="demo"><div class="row">
  <SaButton label="Create invitation" @click="open = true" />
  <SaDialog :open="open" title="Create invitation" @close="open = false">
    <SaField label="Email" for="demo-dialog-email"><SaInput id="demo-dialog-email" type="email" /></SaField>
    <template #actions>
      <SaButton label="Cancel" variant="secondary" @click="open = false" />
      <SaButton label="Create invitation" @click="open = false" />
    </template>
  </SaDialog>
</div></div>

## Usage

- **A task or a question that stops the screen behind it until it is answered**, such as a short form.
- **Not for** confirming something destructive: use [ConfirmDialog](/components/confirm-dialog), which is built on it.
- **Not for** an explanation: use [Popover](/components/popover).

## Look

- **Card**: `surface`, an `ink-200` border, `radius-lg` and no shadow, at most 448px wide and never taller than the screen, padded like [Card](/components/card).
- **Scrim**: `nav-ground` at 50%.
- **Title**: `panel-heading` in `ink-900`, as an `h3`.
- **Body**: 14px in `ink-700`.
- **Footer**: right-aligned, `space-3` between its buttons, `space-6` above them.

## Behavior

- **Open and closed**: the parent holds `open`. `close` is emitted when a person dismisses it, and never when the parent closes it.
- **Dismissing**: Escape and a click on the scrim close it, unless `dismissDisabled` is set, which a caller passes while a request runs.
- **Focus**: it is trapped inside, starts on the first control, and returns to what opened it.
- **Long content**: the card scrolls.
- **Motion**: the scrim and the card fade over 200ms, and not from above: the card is centred by a transform an animated one would undo. Neither moves under `prefers-reduced-motion`.

## Accessibility

- **The primitive sets the dialog role, traps focus and locks the page's scroll** (WCAG 2.4.3).
- **The title names the dialog.** Pass a `title` or a `title` slot, since a dialog with no name reads as nothing to a screen reader (WCAG 4.1.2).

## API

The consumer provides whether it is open, the title, the body and the buttons.

| Name              | Type      | Default     | Description                                         |
| ----------------- | --------- | ----------- | --------------------------------------------------- |
| `open`            | `boolean` |             | Required. Whether it is drawn.                      |
| `title`           | `string`  | `undefined` | The heading.                                        |
| `dismissDisabled` | `boolean` | `false`     | Blocks Escape and a click outside.                  |
| `@close`          | event     |             | A person dismissed it.                              |
| `#title`          | slot      |             | The heading, where it is more than a sentence.      |
| `#default`        | slot      |             | The body.                                           |
| `#actions`        | slot      |             | The footer's buttons, with the confirming one last. |

## Related

- [Card](/components/card): the box it draws.
- [ConfirmDialog](/components/confirm-dialog): built on it.
- [Focus, states and motion](/foundations/focus): its motion.
