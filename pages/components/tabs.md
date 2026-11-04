# Tabs

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonTabs</code></p>

The views one thing is read through, each its own link.

<script setup>
const tabs = [
  { key: 'claims', label: 'Claims', link: { href: '#claims' }, current: true },
  { key: 'consents', label: 'Consents', link: { href: '#consents' } },
  { key: 'mfa', label: 'Second factors', link: { href: '#mfa' } },
  { key: 'providers', label: 'Providers', link: { href: '#providers' } }
]
const many = ['Claims', 'Consents', 'Second factors', 'Providers', 'Sessions', 'Grants', 'Invitations', 'Security contexts'].map((label, i) => ({ key: label, label, link: { href: `#${i}` }, current: i === 0 }))
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-6">
  <CommonTabs :tabs="tabs" label="Views of this user" />
  <CommonTabs :tabs="many" label="More views of this user">
    <template #help="{ tab }"><span v-if="tab.key === 'Consents'" class="ml-1 text-xs text-gray-500">(new)</span></template>
  </CommonTabs>
</div></div>

## Usage

- **Several views of one record or screen**, each with an address of its own, so that a view can be linked to and survives a reload.
- **Not for** a process with an order: tabs can be read in any order.
- **Not for** hiding part of a form: a person would lose sight of what they filled in.

## Look

- **Strip**: an `ink-200` rule under it, `space-1` between tabs.
- **Tab**: 14px at 500 in `ink-500`, 8px by 16px, over a 2px line.
- **Current tab**: `primary` text and a 2px `primary` line.

## Behavior

- **Hover**: `ink-800` text and an `ink-300` line.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus).
- **More than fits**: the strip scrolls sideways rather than dropping a tab.
- **Which is current**: only the app knows, and says so on each tab.

## Content

- **A tab names its view in a word or two** (see [Content](/foundations/content)).

## Accessibility

- **They are links in a `nav`, not an ARIA tab list**, because each one goes to an address (WCAG 4.1.2). `label` names the `nav`.
- **The current one takes `aria-current="page"`**, set by the component.
- **A tab is navigation rather than a control, so it is not `control-height`.** Its target is 38px tall (WCAG 2.5.8), and a strip of them stays compact above the record.

## API

The consumer provides the tabs, what draws their links, and which one is current, since the component knows no router. With one, pass its link as `linkAs` and each tab's `{ to }` as its `link`.

| Name     | Type                  | Default | Description                                                |
| -------- | --------------------- | ------- | ---------------------------------------------------------- |
| `tabs`   | `Tab[]`               |         | Required. Each a `key`, a `label`, a `link` and `current`. |
| `label`  | `string`              |         | Required. Names the strip.                                 |
| `linkAs` | `string \| Component` | `'a'`   | What draws a link.                                         |
| `#help`  | slot                  |         | Beside a tab's link, given `{ tab }`, for an explanation.  |

## Related

- [RecordPage](/components/record-page): what sits above and below them.
- [Link](/components/link): a link inside a sentence.
