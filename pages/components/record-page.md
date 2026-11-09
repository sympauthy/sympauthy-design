# RecordPage

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaSummaryCard</code>, <code>SaSummaryField</code>, <code>SaDetailSection</code>, <code>SaDefinitionList</code>, <code>SaDefinitionRow</code> and <code>SaRecordViews</code></p>

The shape of one record: a summary card, then sections of fields.

<script setup>
const modes = [{ mode: 'phone' }, { mode: 'tablet', label: 'Tablet and desktop' }]
const views = [
  { key: 'claims', label: 'Claims', description: 'What this server knows about the user.', link: { href: '#claims' } },
  { key: 'mfa', label: 'MFA methods', description: 'Second factors the user set up to sign in.', link: { href: '#mfa' } },
  { key: 'audit', label: 'Audit', link: { href: '#audit' } }
]
const copied = { label: 'Copy client ID', copiedLabel: 'Client ID copied', failedLabel: 'Your browser refused to copy the client ID' }
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame v-for="frame in modes" :key="frame.mode" v-bind="frame">
    <div class="flex flex-col gap-6">
    <SaSummaryCard>
      <SaSummaryField label="Client ID" mono><SaCopyableValue value="c3f1e0a2-7b4d-4e8a-9f21-5d0c8a7e6b13" v-bind="copied" /></SaSummaryField>
      <SaSummaryField label="Type">Confidential</SaSummaryField>
      <SaSummaryField label="Status"><SaTag color="green">Active</SaTag></SaSummaryField>
    </SaSummaryCard>
    <SaDetailSection title="Authorization">
      <SaDefinitionList>
        <SaDefinitionRow label="Redirect URI" mono>https://billing.example.com/callback</SaDefinitionRow>
        <SaDefinitionRow label="Scopes"><div class="flex flex-wrap gap-1"><SaTag color="blue">openid</SaTag><SaTag color="blue">email</SaTag></div></SaDefinitionRow>
        <SaDefinitionRow label="Webhook"><SaEmptyValue label="Not set" /></SaDefinitionRow>
      </SaDefinitionList>
    </SaDetailSection>
    </div>
  </DemoFrame>
</div></div>

<div class="demo vp-raw"><SaRecordViews :views="views" label="Views of this user" /></div>

## Usage

- **`SaSummaryCard` and `SaSummaryField`**: what identifies the record, first on the page. It carries no heading and no actions, since the bar above names the record and holds what can be done to it.
- **`SaDetailSection`**: a titled part of the record, under the summary.
- **`SaDefinitionList` and `SaDefinitionRow`**: the fields of a section.
- **`SaRecordViews`**: the views of a record on a phone, under its summary, each opening a screen of its own. A wider screen draws them as [Tabs](/components/tabs).
- **`mono`**: a value read character by character, such as an identifier, an address or a token.
- **A list in a section**, such as the redirect URIs of a client: a [Table](/components/table) without its header row, which the section's title names.
- **Not for** a list of records: use [Table](/components/table).
- **Not for** values being filled in: use [Field](/components/field).

## Look

- **Summary card**: a [Card](/components/card) holding its fields in three columns from `sm:` and one below it, `space-4` apart.
- **Summary field**: a `.sa-field-label` over its value, `space-1` apart, in 14px `ink-900`. A `mono` value is cut with an ellipsis.
- **Section title**: `panel-heading` in `ink-900`, as an `h2`, `space-4` above its content.
- **Definition list**: a flush [Card](/components/card), with its rows split by `ink-200`.
- **Definition row**: `space-3` by `space-4`, `space-6` from `sm:`. Its `.sa-field-label` sits beside the value from `sm:`, one third to two thirds, and above it below `sm:`. A long value breaks anywhere rather than scrolling the page.
- **Record views**: a flush [Card](/components/card), with its rows split by `ink-200`. Each row is at least `control-height` tall, `space-4` from the card's left edge and `space-3` from its right: the view's name in `panel-strong`, what it holds under it in `panel-body` and `ink-500`, then a 16px right chevron in `primary`.
- **A missing value**: an [EmptyValue](/components/empty-value).

## Behavior

- **Hover**: a view's row takes `ink-50`.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus), inside the row.

## Accessibility

- **`SaRecordViews` is a `nav` named by `label`, holding a list of links.**
- **The fields are a real definition list**, so a label is read with its value (WCAG 1.3.1).
- **A section title is an `h2`**, so the page's outline holds. The [Breadcrumb](/components/breadcrumb) heads the page with the record's name.

## API

The consumer provides the record's values, its titles and labels, and any help beside them.

### SaSummaryCard and SaDefinitionList

| Name       | Type | Default | Description                               |
| ---------- | ---- | ------- | ----------------------------------------- |
| `#default` | slot |         | `SaSummaryField`s, or `SaDefinitionRow`s. |

### SaSummaryField

| Name       | Type      | Default | Description                                 |
| ---------- | --------- | ------- | ------------------------------------------- |
| `label`    | `string`  |         | Required. The name of the value.            |
| `mono`     | `boolean` | `false` | For a value read character by character.    |
| `#default` | slot      |         | The value: a tag, a link or an identifier.  |
| `#help`    | slot      |         | Drawn beside the label, for an explanation. |

### SaDetailSection

| Name       | Type     | Default | Description                                 |
| ---------- | -------- | ------- | ------------------------------------------- |
| `title`    | `string` |         | Required. The section's title.              |
| `#default` | slot     |         | Its content.                                |
| `#help`    | slot     |         | Drawn beside the title, for an explanation. |

### SaDefinitionRow

| Name       | Type      | Default     | Description                              |
| ---------- | --------- | ----------- | ---------------------------------------- |
| `label`    | `string`  | `undefined` | The name of the value.                   |
| `mono`     | `boolean` | `false`     | For a value read character by character. |
| `#default` | slot      |             | The value.                               |
| `#label`   | slot      |             | The name, where it is more than a word.  |

### SaRecordViews

| Name     | Type                  | Default | Description                                                      |
| -------- | --------------------- | ------- | ---------------------------------------------------------------- |
| `views`  | `SaRecordView[]`      |         | Required. Each a `key`, a `label`, a `description` and a `link`. |
| `label`  | `string`              |         | Required. Names the `nav`.                                       |
| `linkAs` | `string \| Component` | `'a'`   | What draws a link.                                               |

## Related

- [Navigation](/foundations/navigation): how a phone reaches a record's views and comes back.
- [Tabs](/components/tabs): the views of a record, under its summary, on a wider screen.
- [Card](/components/card): the box each is drawn in.
- [CopyableValue](/components/copyable-value): the identifier in a summary.
- [EmptyValue](/components/empty-value): a value the record lacks.
