# Flow pages

The pages of **sympauthy-flow**: sign in, sign up, collect and validate claims, multi-factor enrollment and challenge, confirm a request, and the error page. An end user lands here from somebody else's app, often on a phone, and wants to get back to it. Every page answers one question with one card.

## Anatomy of a page

1. **Brand header** (`BasePage`): the mark at 40px, then the wordmark in `flow-brand`, then the tagline in `flow-small` and `ink-500`. Centred.
2. **The auth card** (`TitleContentCard` on `BaseCard`): the system's one flat card (`surface`, 1px `ink-200` border, `radius-lg`, padded `space-4` then `space-6` from `sm:`, no shadow), at most `auth-card-width`. Its h1 is `flow-title`, centred. Everything inside is `flow-body`, stacked with `space-4` gaps.
3. **Footer**: "Powered by SympAuthy." in `flow-small`, `ink-500`, the name a `primary` link.

The page is `ground` with `space-8` above the header and a `space-6` gap between the three parts. Nothing else goes on the page: no sidebar, no navigation, no illustration.

## Inside the card

- **One primary action per card**, full width, `control-height-flow` (44px), `flow-body` at 600. It is the last control of the form.
- **A secondary path is a link or an outline button**, never a second filled button: "Forgot password?" is a `primary` link under the password field; "No, cancel" on the confirm page is an outline button under "Yes, continue".
- **Identity providers come first, then a divider, then the password form.** Each provider is an outline button carrying the provider's name ("Continue with Google"); the divider reads "or". This replaces the current two cards side by side: one card keeps a single h1 and reads top to bottom on a phone.
- **Fields** are the [Field](/components/field) both apps share: labelled above in `flow-label`, 44px tall, 16px text, `ink-400` border, `focus-ring` border and 1px ring on focus. The error line under a field is `flow-small` in `danger`, and the field takes `aria-invalid`.
- **A code** (claims validation, TOTP) is six digit boxes in `flow-code`, 64px tall, `radius-md`, a gap in the middle after the third. Pasting a whole code fills every box.
- **A consent or request summary** (confirm page) sits in a `primary-subtle` box with `on-primary-subtle` text and a shield icon, above the warning sentence.
- **A failure** is a `danger` alert at the top of the card body; the form stays below it.
- **Waiting on the server**: a `sa-spinner--lg` in `primary`, centred, over "Waiting for a response from the server." in `flow-small` and `ink-500`. Skeleton bars in a field are `ink-300`.

## Page by page

| Page | Card | Primary action | Notes |
| --- | --- | --- | --- |
| Sign in | default | Continue | Providers, divider, email/password, "Forgot password?", then "Don't have an account? Sign up" under the card |
| Sign up | default | Continue | Same shape; "Already have an account? Sign in" |
| Collect claims | large (680px) | Continue | Title "Before you continue"; claim groups (identity, address) as fieldsets with a `flow-label` legend |
| Validate claims | default | Verify | Explains where the code was sent ("by email"); code input; resend link with its countdown |
| MFA selection | default | (choice) | Each method a full-width outline button with its icon; "Skip" as a link when enrollment is optional |
| TOTP enroll | default | Confirm | QR code on `surface` with a 1px `ink-200` frame; the manual key in `font-mono` with a copy button; then the code input |
| TOTP challenge | default | Verify | Code input only |
| Confirm | default | Yes, continue | Request summary box, re-authentication notice, warning sentence; "No, cancel" outline under it |
| Error | default | none | `danger` alert with the description; details in `flow-small` |

## Themes

The flow follows `prefers-color-scheme`. In Dark, `ground` and `surface` turn to Cassis, `primary` becomes the light rose `#e89aae` with `on-primary` Cassis text, and the mark switches to `sympauthy-icon-dark.svg`.
