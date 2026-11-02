# Content

How the interface speaks: its voice, its case, and what a button or an error says.

## Usage

- **Plain, direct, technical.** SympAuthy's voice is the one on its site: short factual sentences, no marketing. "A simple, self-hosted and open source OAuth 2.1/OpenID authorization server."
- **The flow speaks to the end user as "you"**, and names the client app by its name: "{client} has requested to set up two-factor authentication on your account." The admin speaks to an operator and explains every domain term through a help tooltip the first time a screen shows it.
- **Sentence case everywhere**: titles, buttons, tabs, menu items. Only `.field-label` is uppercase, and it is styled, never typed in capitals.
- **A button says what happens**: "Continue", "Verify", "Confirm", "Revoke grant". In flight it keeps that verb as a progress form: "Verifying...", "Signing in...". A confirmation pairs an explicit yes and no: "Yes, continue" / "No, cancel".
- **Write "sign in" and "sign up" as verbs, without a hyphen or exclamation mark** ("Sign in", "Don't have an account? Sign up"). The current bundle mixes "Sign-in", "Sign Up!" and "Login": converge on these two when a string is next touched.
- **An error says what went wrong and what to do next**: "You are not authorized to access the page. Please go back to your application and retry to sign-in." No apology, no error code alone.
- **No emoji, no exclamation marks** in the interface.

## Related

- [Button](/components/button): labels and their progress forms.
- [Alert](/components/alert): how an error is shown.
- [ConfirmRequest](/components/confirm-request): the explicit yes and no.
