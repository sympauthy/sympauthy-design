# TableEnd

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaTableEnd</code> and <code>useSaListGrows</code></p>

The end of a phone's list, which grows as it is scrolled: the rows standing for the next page while it loads, the line saying the list is whole, or the failure and its retry.

<script setup>
import { reactive } from 'vue'
const names = ['address', 'birthdate', 'email', 'email_verified', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name', 'nickname', 'phone_number', 'phone_number_verified', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo', 'country', 'department', 'employee_id', 'is_sympauthy_admin']
const claims = names.map((name, i) => ({ name, collected: `0${(i % 9) + 1}/11/2026` }))
const TOTAL = claims.length
const growing = reactive({ shown: 8, loading: false })
function more() {
  growing.loading = true
  setTimeout(() => {
    growing.shown = Math.min(growing.shown + 8, TOTAL)
    growing.loading = false
  }, 1200)
}
const failing = reactive({ loading: false, error: 'More claims could not be loaded.', shown: 3 })
function retry() {
  failing.error = null
  failing.loading = true
  setTimeout(() => {
    failing.loading = false
    failing.error = 'More claims could not be loaded.'
  }, 1200)
}
</script>

<div class="demo vp-raw"><div class="flex flex-col gap-4">
  <DemoFrame mode="phone" label="Phone, growing as it is scrolled" :height="520">
    <SaTable>
      <template #header>
        <SaTableHeader>Claim</SaTableHeader>
        <SaTableHeader fit>Collected at</SaTableHeader>
      </template>
      <template #rows>
        <tr v-for="claim in claims.slice(0, growing.shown)" :key="claim.name">
          <SaTableCell primary>{{ claim.name }}</SaTableCell>
          <SaTableCell label="Collected at" fit>{{ claim.collected }}</SaTableCell>
        </tr>
        <SaTableEnd :more="growing.shown < TOTAL" :loading="growing.loading" :total="TOTAL" @more="more" />
      </template>
    </SaTable>
  </DemoFrame>
  <DemoFrame mode="phone" label="Phone, a page on its way">
    <SaTable>
      <template #header><SaTableHeader>Claim</SaTableHeader><SaTableHeader fit>Collected at</SaTableHeader></template>
      <template #rows>
        <tr v-for="claim in claims.slice(0, 3)" :key="claim.name">
          <SaTableCell primary>{{ claim.name }}</SaTableCell>
          <SaTableCell label="Collected at" fit>{{ claim.collected }}</SaTableCell>
        </tr>
        <SaTableEnd more loading :total="TOTAL" />
      </template>
    </SaTable>
  </DemoFrame>
  <DemoFrame mode="phone" label="Phone, whole">
    <SaTable>
      <template #header><SaTableHeader>Client</SaTableHeader><SaTableHeader fit>Granted</SaTableHeader></template>
      <template #rows>
        <tr>
          <SaTableCell primary>Back office</SaTableCell>
          <SaTableCell label="Granted" fit>02/11/2026</SaTableCell>
        </tr>
        <SaTableEnd :total="1" />
      </template>
    </SaTable>
  </DemoFrame>
  <DemoFrame mode="phone" label="Phone, failed">
    <SaTable>
      <template #header><SaTableHeader>Claim</SaTableHeader><SaTableHeader fit>Collected at</SaTableHeader></template>
      <template #rows>
        <tr v-for="claim in claims.slice(0, failing.shown)" :key="claim.name">
          <SaTableCell primary>{{ claim.name }}</SaTableCell>
          <SaTableCell label="Collected at" fit>{{ claim.collected }}</SaTableCell>
        </tr>
        <SaTableEnd more :loading="failing.loading" :error="failing.error" :total="TOTAL" @more="retry" />
      </template>
    </SaTable>
  </DemoFrame>
</div></div>

## Usage

- **The last row of a collection's `#rows` below `sm:`**, where the list grows as it is scrolled rather than paging. A button at the end of a list lands somewhere else on every screen, and a pager makes a phone hop from page to page, so nothing at the end of the list is pressed but a retry.
- **`useSaListGrows`**: whether the list grows, below `sm:`. A list that grows adds each page below the rows it holds, where one that pages swaps them, so the caller reads it to know which a page it asks for is, and draws a [Pagination](/components/pagination) in the table's `#footer` only while it does not.
- **A first page that more than fills a phone**, as the admin's 20 rows. A shorter one asks for the next as soon as the screen opens.
- **Not for** a list from `sm:`: it pages, through [Pagination](/components/pagination), so that an operator can jump around a long one. From `sm:` it draws nothing.
- **Not for** the first page of a list: [Table](/components/table)'s `loading` draws the wait in place of the rows. The next page is this component's `loading`, never the table's, or the rows already read would go.

## Look

- **Rows**: the table's own, so a part of it takes the padding of a row and the `ink-200` rule between two.
- **Placeholders**: two rows, each a [Skeleton](/components/skeleton) for the record's name over a shorter one for its values, while the server holds more.
- **End**: one line, 12px in `ink-500` and centred, once the list is whole. A list whose `total` is `null` draws none.
- **Failed**: a `danger` [Alert](/components/alert) holding the sentence, and a `secondary` [Button](/components/button) for the retry at its end.
- **From `sm:`**: nothing.

## Behavior

- **Asking**: the next page is asked for once the end comes within a screen of the bottom of the window, so that its rows usually arrive before anybody reaches it. A page that leaves the end in reach asks for the one after it at once.
- **Loading**: the placeholders stay where they are, and the rows that arrive take their place, so nothing moves.
- **Whole**: the placeholders go, and the line says so.
- **Failed**: the placeholders give way to the alert, and nothing is asked for again until the retry is pressed.
- **Returning**: a person who opens a row and comes back finds the rows loaded and the scroll where they left them, which the caller keeps, since the component holds no rows.

## Content

- **The end says how many rows the list holds, worded from `total`**: "All 23 records shown", or "1 record" for a list of one. "Loading more records..." says what is on its way, and "Retry" asks again. All are the package's, the same under every list.
- **The error says what could not be added** (see [Content](/foundations/content)).

## Accessibility

- **One status region says a page is on its way, then that the list is whole** (WCAG 4.1.3). It is there from the first page, since a screen reader is only told of a region already there. The placeholders are hidden from it.
- **The failure is an alert, announced at once**, and the retry is a button (WCAG 4.1.3).
- **The retry reaches `control-height`** (see [Control height](/foundations/control-height)).

## API

The consumer provides whether more rows remain, how many the list holds, the state of the page asked for and its error. The component draws its other words from the package's, in the app's language (see [Using in the apps](/using-in-apps#the-package-s-words)). It holds no rows: the caller adds each page to its own, and keeps them for a person coming back.

### SaTableEnd

| Name      | Type             | Default | Description                                                          |
| --------- | ---------------- | ------- | -------------------------------------------------------------------- |
| `more`    | `boolean`        | `false` | The server holds rows past the last one drawn.                       |
| `loading` | `boolean`        | `false` | True from `@more` until its page is added.                           |
| `error`   | `string \| null` | `null`  | Why the last page could not be added.                                |
| `total`   | `number \| null` |         | Required. The rows the list holds; `null` where the server says not. |
| `@more`   | event            |         | The next page is wanted: once in reach, and on the retry.            |

### useSaListGrows

Takes nothing, and returns a read-only `Ref<boolean>`: true below `sm:`, kept up as the window crosses it.

## Related

- [Table](/components/table): whose rows it ends.
- [Skeleton](/components/skeleton) and [Alert](/components/alert): what it draws.
- [Pagination](/components/pagination): what pages the same list from `sm:`.
