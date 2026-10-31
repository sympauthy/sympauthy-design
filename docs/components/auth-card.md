# AuthCard

<p class="caps-note">Flow · specified here, implemented in the app</p>

The page every flow screen is: brand header, one auth card, footer. It maps to the flow's `BasePage` around a `TitleContentCard` (`BaseCard`).

**Brand header**: the mark at 40px beside the wordmark (`flow-brand`, "Symp" 500 + "Authy" 800), the tagline under it in `flow-small` / `ink-500`.

**Card**: a padded `Card`, unchanged. The auth card only adds a maximum width of `auth-card-width` (480px), or `auth-card-width-large` (680px) for a claims form, stacks its content at `space-4`, and sets `flow-body`. h1 in `flow-title`, centred.

**Order inside a sign-in or sign-up card**: identity providers as outline buttons, an "or" divider (`ink-200` rules, `ink-500` word), the fields, then the one primary button, then the switch line ("Don't have an account? Sign up"). Leave out the providers and the divider when the server has none configured.

**States**: loading replaces the content with a 32px `primary` spinner over "Waiting for a response from the server."; a failure puts a danger `Alert` above the form.

**The consumer provides** the title, the content slot, and the `loading` / `error` state.
