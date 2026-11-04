# Color

What each color is for: the grounds, the ink scale, the brand's two colors and the status colors.

## Usage

- **Ground and surface.** Pages sit on `ground` (Ivory); every card, table, dialog and input is `surface`. Never place a card on a card.
- **Text.** Body and headings in `ink-900`; labels, secondary cells and helper lines in `ink-500`; text inside controls and secondary buttons in `ink-700`. `ink-300` is never text: it is the dash of a missing value, and skeleton bars. A dash a person cannot make out reads as an empty field, which is what it means, so nothing is lost and it is exempt from the text pairs below.
- **The ink scale is one family.** `ink-50` to `ink-900` share Bordeaux's hue (OKLCH ≈ 350°) and step down in even lightness; the color thins out toward the light end, so a tint reads as a warm gray and never as pink or beige. Add a step only on that same hue.
- **Lines.** Card borders, table rules and dividers are `ink-200`. A control's border is `ink-400`, because a person has to see a field's edge (see [Accessibility](#accessibility)).
- **Bordeaux is the action color.** `primary` fills the one button a screen is for and colors links, the active tab, the spinner and the focus ring; `primary-hover` on hover; `on-primary` for its label. `primary-subtle` (Rosé) with `on-primary-subtle` is the quiet version: a consent summary, a selected row.
- **Gold is the key, not a status.** `gold` appears in the mark's keyhole and in brand moments (the sidebar's current-entry rule). Never use it for a warning, a badge or a button: warnings are `warning` amber.
- **Status colors come from Tailwind's scales and keep their meaning**: `danger` / `danger-subtle` / `danger-line` for a failure, `warning` / `warning-subtle` / `warning-line` for what must be read first. Tags pick a color by meaning, and `ink-100` / `ink-700` when none fits.
- **Bordeaux is the only filled button.** A destructive button is soft: `danger-subtle` fill, `danger-line` border, `danger` label, `danger-hover` on hover, shaped exactly like a secondary button. A solid red beside Bordeaux would be two competing reds; the soft one reads as a warning, and its label always names the destruction ("Revoke grant", "Delete user"). It appears inside a `SaConfirmDialog` only, opened from a menu entry that sits under a separator.

## Tokens

<TokenTable group="color" />

## Accessibility

- **Every text pair holds 4.5:1, in light and dark** (WCAG 1.4.3).
- **A border a person has to see, and a focus ring, hold 3:1** (WCAG 1.4.11). A field's edge is that case: `ink-400` holds it against `surface`, and `ink-200` does not.
- **Color is never the only signal** (WCAG 1.4.1). A status always carries its word.
- **A deployment's colors are held to the same.** The theme builder and `derivePalette` derive colors that hold them; a palette edited by hand is the deployment's to check (see [Branding a deployment](/branding)).

## Related

- [Button](/components/button): `primary`, and the soft destructive button.
- [Alert](/components/alert): the `danger` and `warning` families.
- [Tag](/components/tag): a color for each meaning.
- [ConfirmRequest](/components/confirm-request): `primary-subtle` as the consent summary.
- [Sidebar](/components/sidebar): `nav-*`, and the one place gold marks an entry.
