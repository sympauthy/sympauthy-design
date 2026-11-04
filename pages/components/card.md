# Card

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaCard</code></p>

The one card of both apps: a flat box that every other boxed component is built on.

<div class="demo"><div class="stack">
  <SaCard><p>Padded, the default: the card owns the room around its content.</p></SaCard>
  <SaCard :padded="false">
    <p class="border-b border-gray-200 px-4 py-3">Flush: rows run edge to edge</p>
    <p class="px-4 py-3">A table, a definition list</p>
  </SaCard>
</div></div>

## Usage

- **Padded**, the default: for content that does not draw its own rows.
- **Flush** (`:padded="false"`): for content that pads its own rows, like a table or a definition list.
- **Not for** a card inside a card: lay the content out inside the one card.
- **Not for** a different look: never give it a shadow, a colored border or a different radius.

## Look

- **Box**: `surface`, a 1px `ink-200` border, `radius-lg`, no shadow (see [Shape](/foundations/shape)).
- **Padding**: `space-4`, then `space-6` from `sm:`; none when flush.
- **Width**: it takes the width its parent gives it, and only the flow states a maximum.

## API

The consumer provides the content, and whether it is padded or flush.

| Name       | Type      | Default | Description                             |
| ---------- | --------- | ------- | --------------------------------------- |
| `padded`   | `boolean` | `true`  | Off for content that pads its own rows. |
| `#default` | slot      |         | The content.                            |

## Related

- [Shape](/foundations/shape): why it is flat, and what `radius-lg` means.
- [AuthCard](/components/auth-card): adds a maximum width and the flow's type.
- [RecordPage](/components/record-page): its summary and section boxes.
- [Table](/components/table): the box around a table.
- [ConfirmDialog](/components/confirm-dialog): a padded card on a scrim.
