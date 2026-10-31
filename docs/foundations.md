# Foundations

One system for the two web apps SympAuthy ships: **sympauthy-flow**, the pages an end user signs in, signs up, verifies and confirms on, and **sympauthy-admin**, the operator's panel. Both are Vue 3 + Tailwind v4 and read the same tokens. They differ in density and nothing else: the flow is one card on a quiet page, read on a phone, at 16px; the admin is tables and records, read at a desk, at 14px. The pages [Flow pages](./flow), [Admin panel](./admin) and [Using in the apps](./using-in-apps) hold the rules specific to each.

Components are grouped the same way. **Common** holds what both apps draw (Button, Field, Alert, Card): each app keeps its own Vue component, and both follow the one spec. **Flow** holds what only the sign-in pages use (AuthCard, ConfirmRequest, CodeInput). **Admin** holds what only the panel uses (Sidebar, Table, RecordPage, Tag, ActionsDropdown, ConfirmDialog). A component moves to Common the day the second app needs it.

## Content fundamentals

- **Plain, direct, technical.** SympAuthy's voice is the one on its site: short factual sentences, no marketing. "A simple, self-hosted and open source OAuth 2.1/OpenID authorization server."
- **The flow speaks to the end user as "you"**, and names the client app by its name: "{client} has requested to set up two-factor authentication on your account." The admin speaks to an operator and explains every domain term through a `DocHelpTooltip` the first time a screen shows it.
- **Sentence case everywhere**: titles, buttons, tabs, menu items. Only `.field-label` is uppercase, and it is styled, never typed in capitals.
- **A button says what happens**: "Continue", "Verify", "Confirm", "Revoke grant". In flight it keeps that verb as a progress form: "Verifying...", "Signing in...". A confirmation pairs an explicit yes and no: "Yes, continue" / "No, cancel".
- **Write "sign in" and "sign up" as verbs, without a hyphen or exclamation mark** ("Sign in", "Don't have an account? Sign up"). The current bundle mixes "Sign-in", "Sign Up!" and "Login": converge on these two when a string is next touched.
- **An error says what went wrong and what to do next**: "You are not authorized to access the page. Please go back to your application and retry to sign-in." No apology, no error code alone.
- **No emoji, no exclamation marks** in the interface.

## Visual foundations

### Color

- **Ground and surface.** Pages sit on `ground` (Ivory); every card, table, dialog and input is `surface`. Never place a card on a card.
- **Text.** Body and headings in `ink-900`; labels, secondary cells and helper lines in `ink-500`; text inside controls and secondary buttons in `ink-700`. `ink-300` is never text: it is the `EmptyValue` dash and skeleton bars.
- **The ink scale is one family.** `ink-50` to `ink-900` share Bordeaux's hue (OKLCH ≈ 350°) and step down in even lightness; the color thins out toward the light end, so a tint reads as a warm gray and never as pink or beige. Add a step only on that same hue.
- **Lines.** Card borders, table rules and dividers are `ink-200`. A control's border is `ink-400`, because a field's edge has to hold 3:1 against `surface`; `ink-200` does not.
- **Bordeaux is the action color.** `primary` fills the one button a screen is for and colors links, the active tab, the spinner and the focus ring; `primary-hover` on hover; `on-primary` for its label. `primary-subtle` (Rosé) with `on-primary-subtle` is the quiet version: a consent summary, a selected row.
- **Gold is the key, not a status.** `gold` appears in the mark's keyhole and in brand moments (the sidebar's current-entry rule). Never use it for a warning, a badge or a button: warnings are `warning` amber.
- **Status colors come from Tailwind's scales and keep their meaning**: `danger` / `danger-subtle` / `danger-line` for a failure, `warning` / `warning-subtle` / `warning-line` for what must be read first. Tags pick a color by meaning: `tag-green` enabled, `tag-red` disabled or revoked, `tag-yellow` needs attention, `tag-blue` and `tag-purple` a classification, `ink-100` / `ink-700` for the rest. A status always carries its word: color is never the only signal.
- **Bordeaux is the only filled button.** A destructive button is soft: `danger-subtle` fill, `danger-line` border, `danger` label, `danger-hover` on hover, shaped exactly like a secondary button. A solid red beside Bordeaux would be two competing reds; the soft one reads as a warning, and its label always names the destruction ("Revoke grant", "Delete user"). It appears inside a `ConfirmDialog` only, opened from a menu entry that sits under a separator.

### Themes

- **Light is the default and the first theme.** Every token has a Dark value.
- **The flow follows the device**: under `prefers-color-scheme: dark` it switches to the Dark values. An end user meets the flow inside an app that may already be dark, and a white flash on sign-in is jarring.
- **The admin stays light.** Its design-system standard defers dark mode; the Dark values are ready for when it adopts it.

### Type

- **Plus Jakarta Sans** for everything (`font-sans`), **JetBrains Mono** for identifiers, tokens, JSON and code digits (`font-mono`). Self-host both (see [Using in the apps](/using-in-apps)): an authorization server's sign-in page must not call a third-party font host.
- **Flow**: `flow-brand` for the name above the card, `flow-title` for the card's h1, `flow-body` for everything read, `flow-label` for field labels (the admin's too), `flow-small` for the footer, helper and error lines, `flow-code` for a code digit.
- **Admin**: four sizes and no others. `admin-label` (12px, uppercase, `ink-500`) and `admin-tag`; `admin-body` and `admin-strong` for everything read; `admin-heading` for a section or dialog title; `admin-screen-title` for a screen outside the shell. Identifiers are `admin-mono`.
- **The wordmark** is "Symp" at 500 and "Authy" at 800, one word, in `ink-900` on light ground and white on `nav-ground`. Never set it in capitals or split it.

### Spacing

- **A layout is spaced in `space-1`, `space-2`, `space-3`, `space-4`, `space-6`**; `space-1.5` exists only inside a control (icon to label). `space-8` is the flow page's top padding and nothing else.
- Steps by role: tags `space-1` apart, controls in a row `space-2`, dialog buttons `space-3`, blocks of one screen `space-4`, sections of a record `space-6`. Cards pad `space-4`, then `space-6` from `sm:`.

### Cards, radius and depth

- **The system is flat. Nothing casts a shadow**: not a card, a menu, a popover or a dialog. A surface is set apart by its `ink-200` border, and an open dialog also by its scrim.
- **There is one card**: `surface`, a 1px `ink-200` border, `radius-lg`, padded `space-4` then `space-6` from `sm:`. The flow's auth card, an admin `CommonCard`, a `SummaryCard`, a `DetailSection`'s card and the box around a table are all this card; they differ only in width and in whether the content is flush (a table, a definition list) or padded.
- **A radius says what the thing is**: `radius-md` for a control, button, menu, alert or tag; `radius-lg` for a card, dialog or popover; `radius-full` for a spinner. Nothing else.

### Focus, states and motion

- **One focus ring**: a control takes a `focus-ring` border plus a 1px ring of the same color; links and buttons take a 2px `focus-ring` outline offset by 2px. No halo, in either app.
- **Disabled is visible and explained.** A disabled button is `disabled` with `on-disabled`. In the admin a control the token cannot use stays in place, marked `aria-disabled`, and says why in a `HintTooltip`.
- **Loading keeps the label**: a button in flight shows a spinner and its progress verb, and is `cursor: wait`.
- **One motion**: an overlay arrives in 120ms from 4px above, and leaves in 100ms. The spinner turns. Nothing else animates; honor `prefers-reduced-motion`.

### Layout

- **The flow** centres one card, at most `auth-card-width` (480px), or `auth-card-width-large` (680px) for a form of collected claims, between the brand header and the "Powered by SympAuthy" footer.
- **The admin** is a `sidebar-width` sidebar (a drawer below `lg:`), a sticky breadcrumb bar, and a main column that stops at `page-width` and centres. It supports 360px and up, with `sm:` and `lg:` as its only breakpoints.

## Iconography

- **Heroicons, 20px solid set** (`@heroicons/vue/20/solid`), imported by name. `size-4` in a button, cell or menu; `size-3` beside a 12px label; `size-5` in an alert; `size-5`/`size-6` for the sidebar's own controls.
- An icon inside a button is passed as its `icon` prop; never draw an icon as an emoji or a character.

## The mark

- **The mark is the keyhole between braces**: configuration as code, with the key at its heart. Use the files in `logos/` of `@sympauthy/design`; never redraw, recolor or rotate them.
- `sympauthy-icon.svg` (Bordeaux tile, white braces, gold keyhole) is the default, on `ground` or `surface`. `sympauthy-icon-dark.svg` (gold tile, Cassis braces, Bordeaux keyhole) sits on `nav-ground` or any Cassis surface.
- **Below 32px use `sympauthy-favicon.svg`**, which has heavier braces and a larger keyhole so it still reads at 16px. `sympauthy-icon-square.svg` is the full-bleed version for app icons that a platform masks.
- The tile's corner radius is 25% of its side. Keep clear space of a quarter of the tile on every side.
