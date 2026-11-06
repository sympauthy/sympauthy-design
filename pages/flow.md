# Flow pages

The pages of **sympauthy-flow**: sign in, sign up, collect and validate claims, multi-factor enrollment and challenge, confirm a request, and the error page. A person lands here from somebody else's app, often on a phone, and wants to get back to it. Every page answers one question with one card.

This page says which component draws each part of a page, and what a page puts in its card. How each component looks is on its own page.

## Anatomy of a page

Every page is an [AuthCard](/components/auth-card): the brand header, one card, then the "Powered by SympAuthy" footer, centred on `ground`. Its widths are [Layout](/foundations/layout)'s. Nothing else goes on the page: no sidebar, no navigation, no illustration.

## Inside the card

- **One primary action per card**, a full-width [Button](/components/button), and the last control of the form.
- **A secondary path is a link or an outline button**, never a second filled button: "Forgot password?" is a `primary` link under the password field; "No, cancel" on the confirm page is an outline button under "Yes, continue".
- **Identity providers come first, then a divider, then the password form.** Each provider is an outline button carrying the provider's name ("Continue with Google"); the divider reads "or". One card keeps a single h1, and reads top to bottom on a phone.
- **A field** is the [Field](/components/field) both apps share. Its error line sits under it, and the field takes `aria-invalid`.
- **A code** (claims validation, TOTP) is a [CodeInput](/components/code-input). Pasting a whole code fills every box.
- **A consent or request summary** is a [ConfirmRequest](/components/confirm-request), above the warning sentence.
- **A failure** is a `danger` [Alert](/components/alert) at the top of the card body; the form stays below it.
- **Waiting on the server** is a [LoadingState](/components/loading-state) saying "Waiting for a response from the server.", and a value still arriving is a [Skeleton](/components/skeleton).

## Page by page

| Page            | Card    | Primary action | Notes                                                                                                               |
| --------------- | ------- | -------------- | ------------------------------------------------------------------------------------------------------------------- |
| Sign in         | default | Continue       | Providers, divider, email/password, "Forgot password?", then "Don't have an account? Sign up" under the card        |
| Sign up         | default | Continue       | Same shape; "Already have an account? Sign in"                                                                      |
| Collect claims  | large   | Continue       | Title "Before you continue"; claim groups (identity, address) as fieldsets with a `flow-label` legend               |
| Validate claims | default | Verify         | Explains where the code was sent ("by email"); code input; resend link with its countdown                           |
| MFA selection   | default | (choice)       | Each method a full-width outline button with its icon; "Skip" as a link when enrollment is optional                 |
| TOTP enroll     | default | Confirm        | QR code on `surface` with an `ink-200` frame; the manual key in `font-mono` with a copy button; then the code input |
| TOTP challenge  | default | Verify         | Code input only                                                                                                     |
| Confirm         | default | Yes, continue  | Request summary box, re-authentication notice, warning sentence; "No, cancel" outline under it                      |
| Error           | default | none           | `danger` alert with the description; details in `flow-small`                                                        |

## Themes

The flow follows the device's theme ([Themes](/foundations/themes)), and its mark switches to `sympauthy-icon-dark.svg` in dark ([The mark](/foundations/mark)).
