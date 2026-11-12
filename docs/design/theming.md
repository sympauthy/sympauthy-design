# Theming

How a deployment's colors replace SympAuthy's in the apps, and what keeps every text pair legible
whatever they are. What a deployment configures and what the server answers for it is the contract
in [Branding a deployment](../../pages/branding.md); this document covers how the parts in this
repository carry it, and what a change to them has to keep. How a value reaches a page at all is
[the architecture](architecture.md#how-a-value-reaches-a-page).

## What a deployment may change

**A deployment changes colors, through roles, and nothing else of the look.** A role is a named use
of a color — the action color, the ground, a step of the ink scale, a part of the admin's sidebar —
and setting one changes every place that use appears. `src/theme/roles.ts` is the authoritative list.
Spacing, radii and control sizes are not roles, since they carry the system's accessibility
promises, and neither are the status colors, since red means a failure whatever the brand.

**The sidebar's roles hold one value, in every theme.** The admin's sidebar stays dark on a light
page and on a dark one, so `accent` and the `nav-*` roles are configured once, under the light
theme, and a dark value for them is refused.

**A role left out keeps SympAuthy's value.** The server derives nothing: a deployment writing only
`primary` keeps SympAuthy's hover and label colors beside it. That keeps the server's behaviour
obvious, and puts the work of a coherent palette where the colors are chosen.

## What keeps a brand legible

**The theme builder derives a whole palette from one color, and checks every pair it writes.**
`derivePalette` keeps the ink scale's lightness and chroma at every step and turns it to the brand's
hue, and darkens a primary too light to carry white labels, saying so. The builder then checks the
pairs the apps draw — text against 4.5:1, a field's border against 3:1 — in each theme it writes.
The server checks nothing, so this is the one place a deployment's legibility is held, and a palette
edited by hand is the deployment's to check.

**SympAuthy's own palette is tuned by hand, and the derivation returns it unchanged.** Passing
SympAuthy's Bordeaux to `derivePalette` gives the colors of `tokens.json`, not a derived
approximation of them. A change to those colors is checked against the same pairs, in both themes,
by whoever makes it.

**The derivation is written twice: `src/theme/derive.ts` and
`pages/public/theme-builder/index.html`.** The builder is one standalone page served as a static file
of the site, and imports nothing from the package, so it carries its own copy of every step. Change
both, or neither.

## How a theme reaches a page

**In production the stylesheet is linked, and no script writes a color.** Each app links the
server's stylesheet from its `index.html`, so it is in place before any script runs and SympAuthy's
colors never flash first. The page's theme is the stylesheet's to decide: it follows the device, and
a page pins it with `data-theme`, as the admin does with the theme its operator chose.

**`applyTheme` is for a theme no server answers yet.** It writes the same rules as the server into a
`<style>` at the end of `<head>`, for a theme still being built; nothing in production calls it,
since it runs after the page has booted. `themeToCss` returns those rules as text, and is the
reference for what the server writes. It forgives what the server refuses, since a theme being typed
is often not valid yet.

**`fetchBrand` reads what a stylesheet cannot tell a script: the name and the dark mode.** It never
rejects: after a short wait, or on any failure, it answers no name and dark mode off, and the page
draws as SympAuthy's.

## A new role is a change on the server too

**The server lists the roles it accepts, and refuses any other key.** An unknown key under
`ui.theme` takes the server's readiness down, so a role added here is also added to the server's
lists before any deployment can set it. No CI compares the two lists, so a version bump of the
server goes green while the key is still refused.

**The builder leaves out a role every palette it derives sets to SympAuthy's value.** The builder
on the site is always the newest, while a deployment's server may be older, so a key it need not
write is one it must not: `nav-strong` is white in every derived palette, and a deployment setting
it writes it by hand, on a server that knows it.

## What implements it

- **`src/theme/roles.ts`** — the roles, which theme each one has, and the token each writes.
- **`src/theme/derive.ts`** and **`pages/public/theme-builder/index.html`** — the derivation and the
  contrast checks.
- **`src/theme/apply.ts`** — `applyTheme` and `themeToCss`.
- **`src/theme/brand.ts`** — `fetchBrand` and the paths under `/branding`.
- **On the server**, in `sympauthy`: the role lists in `config/model/UIConfig.kt`, checked by
  `UIConfigValidator`, and the stylesheet written by `BrandStylesheetRenderer`.

## What this document does not settle

**Porting the theme builder to a page importing `derive.ts`.** It would end the second copy; no one
has done it.

**A check that the server's role lists match `roles.ts`.** Nothing compares them across the two
repositories.

**A dark admin.** The admin pins light; the dark values of every role are ready for when it stops.

---

← [How the system works](index.md)
