# Field

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as `FormField` around `FormInput`</p>

<script setup>
import { ref } from 'vue'
const name = ref('Billing dashboard')
const uri = ref('https://billing.example.com/callback')
const email = ref('ada@example.com')
const password = ref('hunter2')
</script>

<div class="demo"><div class="stack">
  <FormField label="Client name" for="demo-name"><FormInput id="demo-name" v-model="name" /></FormField>
  <FormField label="Redirect URI" for="demo-uri" hint="Must match the URI the client sends exactly."><FormInput id="demo-uri" v-model="uri" mono /></FormField>
  <FormField label="Email" for="demo-email"><FormInput id="demo-email" v-model="email" type="email" /></FormField>
  <FormField label="Password" for="demo-pass" error="The password must contain at least 12 characters."><FormInput id="demo-pass" v-model="password" type="password" invalid /></FormField>
</div></div>

A labelled input, the same in both apps: `FormField` around `FormInput`, a select or a text area.

**One field in both apps.** The admin's forms and the flow's cards draw the same field, at the same size: a field is where density gives way to a thumb and a phone's keyboard.

**Anatomy**: label above in `flow-label` (14px/500 `ink-700`), then the control, then one line of help (`ink-500`) or of error (`danger`), both 14px. The field owns the label and the gap (`space-1.5`); the control owns its box.

**The control**: `.control`, so `control-height` (44px, see [Control height](/foundations/control-height)) tall, 16px text in `ink-900`, `surface`, `ink-400` border (3.2:1 on white), `radius-md`. 16px is the floor: below it iOS zooms the page when the field takes focus. Focus: `focus-ring` border plus a 1px ring of the same color, and nothing else. Invalid: `danger` border and `aria-invalid`, the message linked with `aria-describedby`.

**Pass `mono`** for anything read character by character: a URI, a token, a JSON document.

**Set `autocomplete`** on every field of the flow (`email`, `current-password`, `new-password`, `one-time-code`).

**The consumer provides** the label text, the value binding, and the error message from validation.
