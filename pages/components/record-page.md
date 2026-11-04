# RecordPage

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SummaryCard</code>, <code>SummaryField</code>, <code>DetailSection</code>, <code>DefinitionList</code> and <code>DefinitionRow</code></p>

The shape of one record: a summary card, then sections of fields.

<script setup>
const copied = { label: 'Copy client ID', copiedLabel: 'Client ID copied', failedLabel: 'Your browser refused to copy the client ID' }
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-6">
  <SummaryCard>
    <SummaryField label="Client ID" mono><CopyableValue value="c3f1e0a2-7b4d-4e8a-9f21-5d0c8a7e6b13" v-bind="copied" /></SummaryField>
    <SummaryField label="Type">Confidential</SummaryField>
    <SummaryField label="Status"><CommonTag color="green">Active</CommonTag></SummaryField>
  </SummaryCard>
  <DetailSection title="Authorization">
    <DefinitionList>
      <DefinitionRow label="Redirect URI" mono>https://billing.example.com/callback</DefinitionRow>
      <DefinitionRow label="Scopes"><div class="flex flex-wrap gap-1"><CommonTag color="blue">openid</CommonTag><CommonTag color="blue">email</CommonTag></div></DefinitionRow>
      <DefinitionRow label="Webhook"><EmptyValue label="Not set" /></DefinitionRow>
    </DefinitionList>
  </DetailSection>
</div></div>

## Usage

- **`SummaryCard` and `SummaryField`**: what identifies the record, first on the page. It carries no heading and no actions, since the bar above names the record and holds what can be done to it.
- **`DetailSection`**: a titled part of the record, under the summary.
- **`DefinitionList` and `DefinitionRow`**: the fields of a section.
- **`mono`**: a value read character by character, such as an identifier, an address or a token.
- **Not for** a list of records: use [Table](/components/table).
- **Not for** values being filled in: use [Field](/components/field).

## Look

- **Summary card**: a [Card](/components/card) holding its fields in three columns from `sm:` and one below it, `space-4` apart.
- **Summary field**: a `.field-label` over its value, `space-1` apart, in 14px `ink-900`. A `mono` value is cut with an ellipsis.
- **Section title**: `admin-heading` in `ink-900`, as an `h2`, `space-4` above its content.
- **Definition list**: a flush [Card](/components/card), with its rows split by `ink-200`.
- **Definition row**: `space-3` by `space-4`, `space-6` from `sm:`. Its `.field-label` sits beside the value from `sm:`, one third to two thirds, and above it below `sm:`. A long value breaks anywhere rather than scrolling the page.
- **A missing value**: an [EmptyValue](/components/empty-value).

## Accessibility

- **The fields are a real definition list**, so a label is read with its value (WCAG 1.3.1).
- **A section title is an `h2`**, so the page's outline holds. An app heads the page itself with the record's name.

## API

The consumer provides the record's values, its titles and labels, and any help beside them.

### SummaryCard and DefinitionList

| Name       | Type | Default | Description                           |
| ---------- | ---- | ------- | ------------------------------------- |
| `#default` | slot |         | `SummaryField`s, or `DefinitionRow`s. |

### SummaryField

| Name       | Type      | Default | Description                                 |
| ---------- | --------- | ------- | ------------------------------------------- |
| `label`    | `string`  |         | Required. The name of the value.            |
| `mono`     | `boolean` | `false` | For a value read character by character.    |
| `#default` | slot      |         | The value: a tag, a link or an identifier.  |
| `#help`    | slot      |         | Drawn beside the label, for an explanation. |

### DetailSection

| Name       | Type     | Default | Description                                 |
| ---------- | -------- | ------- | ------------------------------------------- |
| `title`    | `string` |         | Required. The section's title.              |
| `#default` | slot     |         | Its content.                                |
| `#help`    | slot     |         | Drawn beside the title, for an explanation. |

### DefinitionRow

| Name       | Type      | Default     | Description                              |
| ---------- | --------- | ----------- | ---------------------------------------- |
| `label`    | `string`  | `undefined` | The name of the value.                   |
| `mono`     | `boolean` | `false`     | For a value read character by character. |
| `#default` | slot      |             | The value.                               |
| `#label`   | slot      |             | The name, where it is more than a word.  |

## Related

- [Tabs](/components/tabs): the views of a record, under its summary.
- [Card](/components/card): the box each is drawn in.
- [CopyableValue](/components/copyable-value): the identifier in a summary.
- [EmptyValue](/components/empty-value): a value the record lacks.
