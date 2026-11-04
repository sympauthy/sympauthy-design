# EmptyValue

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>EmptyValue</code></p>

The dash drawn where a record does not carry a value.

<div class="demo"><div class="stack">
  <CommonCard>
    <p class="field-label">Email</p>
    <p class="mt-1"><EmptyValue label="Not set" /></p>
  </CommonCard>
</div></div>

## Usage

- **A field the record does not carry**, in a table cell, a summary or a definition list.
- **Not for** a list with nothing in it: an empty collection says so in a sentence.
- **Not for** a value still on its way: use [Skeleton](/components/skeleton).

## Look

- **Dash**: an em dash in `ink-300`, in the body face even beside a `mono` value, where it would read as part of that value.
- **Contrast**: `ink-300` stays under 4.5:1 on purpose. A dash a person cannot make out reads as an empty field, which is what it means ([Color](/foundations/color)).

## Accessibility

- **The dash is hidden from a screen reader, and `label` is what one reads instead.** Without a `label`, the field reads as empty.

## API

The consumer provides, where it has one, the word a screen reader reads.

| Name    | Type     | Default     | Description                             |
| ------- | -------- | ----------- | --------------------------------------- |
| `label` | `string` | `undefined` | What the dash means to a screen reader. |

## Related

- [Color](/foundations/color): what `ink-300` is for.
- [Skeleton](/components/skeleton): a value that has not arrived yet.
- [Table](/components/table): where most of them are read.
- [RecordPage](/components/record-page): a row whose value is missing.
