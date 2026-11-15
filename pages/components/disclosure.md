# Disclosure

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaDisclosure</code></p>

A section a person opens on purpose: a head naming it, and what it holds under it.

<script setup>
import { ref } from 'vue'
const open = ref(true)
</script>

## Demo

<div class="demo"><div class="stack">
  <SaDisclosure label="Technical details">
    <p>Error: <code>auth.interactive_flow_session.concurrent_modification</code></p>
  </SaDisclosure>
  <SaDisclosure v-model:open="open" label="Show QR code">
    <p>Scan this code with your authenticator app.</p>
  </SaDisclosure>
</div></div>

## Usage

- **What most people never need on the screen they are reading**, such as the technical details of an error page, the QR code on a phone that cannot scan its own screen, or a record's raw JSON.
- **Not for** views of one thing a person moves between: use [Tabs](/components/tabs).
- **Not for** an explanation beside a term: use [Popover](/components/popover).
- **Not for** what every person needs to complete the screen: show it.

## Look

- **Head**: a button `control-height` tall and as wide as the section, holding a 16px chevron in `ink-500` and the label, `space-2` apart, in `panel-strong` and `ink-700`, `ink-900` on hover.
- **Chevron**: points to the label's trailing side while the section is shut, and down while it is open.
- **Content**: under the head, in `ink-700`, lined up with the label rather than the chevron.

## Behavior

- **Opening**: pressing the head, or Enter or Space on it, opens the section and shuts it again.
- **Motion**: neither the chevron nor the section moves as it opens: the chevron turns at once, and the section appears in place (see [Focus, states and motion](/foundations/focus)).
- **Focus**: the 2px `focus-ring` outline of a button, for the keyboard alone.
- **Shut**: what the section holds is not drawn, and the keyboard does not reach it.

## Accessibility

- **The primitive sets `aria-expanded` and `aria-controls` on the head** (WCAG 4.1.2), so a screen reader hears whether the section is open.
- **The label names the head**, and the chevron draws no words.

## API

The consumer provides the label and the content. `SaDisclosureProps` is exported for an app wrapping it.

| Name           | Type      | Default | Description                  |
| -------------- | --------- | ------- | ---------------------------- |
| `label`        | `string`  |         | Required. Names the section. |
| `v-model:open` | `boolean` | `false` | Whether the section is open. |
| `#default`     | slot      |         | What the section holds.      |

## Related

- [Focus, states and motion](/foundations/focus): why nothing moves.
- [Control height](/foundations/control-height): the head's height.
- [Tabs](/components/tabs): views of one thing.
