# The site

The VitePress site in `pages/`, deployed to https://sympauthy.github.io/sympauthy-design/: what it
is for, how it draws the real components and the real values, and what a change to the package owes
it. How a page of it is written is [the foundations standard](../standards/foundations-standard.md)
and [the component pages standard](../standards/component-pages-standard.md); this document covers
how the site is built.

## What the site is for

**The site is the guide to using the system, for an app's author and for a deployment.** It holds
the foundations, a page per component, the guides to installing the package and to branding a
deployment, and the theme builder. What it does not hold is how this repository is built, which is
`docs/`.

**A Common component's page is its specification and its demo at once.** The page draws the real
component, imported from `src/`, in every variant and state, so a demo that renders is a component
that compiles. A Flow or Admin component is specified there and implemented in its app, so its page
is words alone.

**The site shows `main`, and an app runs a tag.** Every push to `main` deploys the site, so between
a merge and its release the site describes what no tag ships yet.

## How a page draws the real thing

**Every Common component is registered for the pages in `pages/.vitepress/theme/index.ts`.** A page
writes `<SaButton>` without importing it, so a component exported from `src/index.ts` is drawn by
no page until it is registered there too.

**A demo is drawn with the apps' styles alone.** The site's Vite compiles Tailwind, so the demos
use the utilities and the shared classes the apps use. Inside `.vp-raw`, VitePress's own prose
styles are kept out, since they would draw a table of records as prose.

**A breakpoint is shown in a frame.** `DemoFrame` teleports the component into an iframe as wide as
a device, since a breakpoint reads the viewport and a narrower box does not change it. What it
cannot draw — an overlay that opens on the page rather than in the frame — is [the component pages
standard](../standards/component-pages-standard.md#the-opening)'s to list.

**A token table reads `tokens.json`.** `TokenTable` draws a group of tokens with their usage, their
value in each theme and a specimen of it, so no page types a value.

**The site wears the system's own tokens.** Its theme imports `dist/tokens.css` and the fonts, and
`brand.css` points VitePress's variables at them, which is why `pages:dev` builds the theme first.
The site's dark switch sets the `data-theme` the tokens read, so a demo turns dark with the page.

## The theme builder

**The theme builder is a static page, outside VitePress.** `pages/public/theme-builder/index.html`
is copied as it is, and imports nothing from the package ([theming](theming.md#what-keeps-a-brand-legible)
says what that costs). GitHub Pages answers its folder with it; in development a plugin in
`pages/.vitepress/config.ts` does the same.

## What implements it

- **`pages/.vitepress/config.ts`** — the sidebar, the navigation, Tailwind and the isolation of the
  demos' styles.
- **`pages/.vitepress/theme/`** — the registration of the components, `TokenTable`, `DemoFrame`,
  `DemoPageActions`, and the site's own styles.
- **`.github/workflows/pages.yml`** — the deployment, on every push to `main`. CI builds the site on
  every pull request too, so a page that fails to compile fails the pull request.

## What this document does not settle

**A version selector.** The site shows `main` alone, and no page says which tag first shipped what
it describes.

**Automated checks of the demos.** Nothing tests a demo visually or for accessibility; a component
is checked by looking at its page in both themes and in each frame.

---

← [How the system works](index.md)
