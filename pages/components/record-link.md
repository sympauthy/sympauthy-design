# RecordLink

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaRecordLink</code></p>

The name of another record, linking to it, with a chevron saying that it opens another screen.

<script setup>
const sessions = [
  { started: '02/11/2026 13:33', user: 'katherine.johnson@example.com', client: 'admin' },
  { started: '01/11/2026 22:53', user: 'ada@example.com', client: 'c3f1e0a2-7b4d-4e8a-9f21-5d0c8a7e6b13' }
]
</script>

<div class="demo"><div class="stack">
  <SaSummaryCard>
    <SaSummaryField label="User"><SaRecordLink name="katherine.johnson@example.com" :link="{ href: '#' }" /></SaSummaryField>
    <SaSummaryField label="Client"><SaRecordLink name="admin" :link="{ href: '#' }" mono /></SaSummaryField>
    <SaSummaryField label="Acting client's grant"><SaRecordLink name="16332984-3d12-4c34-9fb7-34da951b4ea4" :link="{ href: '#' }" mono truncate /></SaSummaryField>
  </SaSummaryCard>
  <div style="max-width: 14rem">
    <SaRecordLink name="katherine.johnson@example.com" :link="{ href: '#' }" />
  </div>
  <div style="max-width: 14rem">
    <SaRecordLink name="katherine.johnson@example.com" :link="{ href: '#' }" truncate />
  </div>
</div></div>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="mode in ['phone', 'desktop']" :key="mode" :mode="mode">
    <SaTable loading-label="Loading sessions.">
      <template #header>
        <SaTableHeader>Started</SaTableHeader>
        <SaTableHeader>User</SaTableHeader>
        <SaTableHeader>Client</SaTableHeader>
      </template>
      <template #rows>
        <tr v-for="session in sessions" :key="session.started">
          <SaTableCell primary>{{ session.started }}</SaTableCell>
          <SaTableCell label="User" truncate><SaRecordLink :name="session.user" :link="{ href: '#' }" truncate /></SaTableCell>
          <SaTableCell label="Client" truncate><SaRecordLink :name="session.client" :link="{ href: '#' }" mono truncate /></SaTableCell>
        </tr>
      </template>
    </SaTable>
  </DemoFrame>
</div></div>

## Usage

- **A field or a cell naming another record**: the user a grant was given to, the client a session signed in at, the grant a client acted through.
- **The name of the record a row is**: [Table](/components/table)'s `SaTableRecord`, which draws one with the identifier under it.
- **`truncate`**: a name cut with an ellipsis rather than wrapped, where a line holds one value, such as a cell under a `truncate` column or a summary field.
- **`mono`**: a name read character by character, such as a client's ID or a grant's.
- **Not for** a link inside a sentence: use [Link](/components/link).
- **Not for** what acts on this screen: use [Button](/components/button).

## Look

- **Text**: `primary` at 600, underlined 3px under the text, in the size of what holds it.
- **Chevron**: a 14px right chevron, `space-1` after the name, in the link's color. It never shrinks.
- **Wrapped**: the name breaks anywhere, an email or an ID included, and the chevron stays beside its last line.
- **`truncate`**: the name keeps to one line and is cut with an ellipsis. The chevron follows what is shown.
- **`truncate`, in a table below `sm:`**: the name wraps down the row, as the value of a cell does there.

## Behavior

- **Hover**: `primary-hover`.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus).

## Accessibility

- **The name is the link's text, and the chevron draws no words.** A screen reader reads the whole name, even when it is cut.
- **It is underlined at rest, so color is not its only signal** (WCAG 1.4.1).
- **Its target reaches `control-height`, and its line keeps to the text around it** (see [Control height](/foundations/control-height)). `truncate` cuts the name inside the link, so the target is not cut with it.
- **A parent cutting what it holds would cut the target with it, so the link cuts itself.** Under a [Table](/components/table) cell's `truncate`, pass `truncate` to the link too, and the cell lets it overflow. A summary field's `mono` cuts its value, so a link takes `mono` itself and the field does not.

## API

The consumer provides the name and the link, since the component knows no router. An app with one passes its link component as `linkAs`, and the route as `link`.

| Name       | Type                      | Default | Description                                                        |
| ---------- | ------------------------- | ------- | ------------------------------------------------------------------ |
| `name`     | `string`                  |         | Required. What the record is called.                               |
| `link`     | `Record<string, unknown>` |         | Required. Given to the link, as `{ href }` or a router's `{ to }`. |
| `linkAs`   | `string \| Component`     | `'a'`   | What draws the link, such as a router's link.                      |
| `truncate` | `boolean`                 | `false` | Cut with an ellipsis rather than wrapped.                          |
| `mono`     | `boolean`                 | `false` | For a name read character by character.                            |

`SaRecordLinkProps` is exported for an app wrapping it.

## Related

- [Link](/components/link): a link inside a sentence.
- [Table](/components/table): the record a row is, and a cell cutting what it holds.
- [RecordPage](/components/record-page): the summary card and the fields holding it.
- [Control height](/foundations/control-height): the target.
