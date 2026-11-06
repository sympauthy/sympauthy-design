# Architecture

The design system is one repository that the SympAuthy apps and the SympAuthy server build from:
the apps take its theme, its shared rules and its Common components, and the server takes its tokens
and its marks to answer a deployment's brand. This document covers what each of them takes, how a
value written once reaches a page, and how a version reaches each of them. How a deployment's colors
are laid over SympAuthy's is [theming](theming.md), and how the site documenting the system is built
is [the site](site.md).

## What each consumer takes

**An app takes the theme, the shared rules and the Common components, and compiles them itself.**
It imports a Tailwind theme, a stylesheet of shared classes, the fonts and Vue components, all as
source, and its own build turns them into its pages. Nothing here is compiled for it, so what a
contributor edits is what an app runs.

**The server takes `tokens.json` and the files of `logos/`.** From them it writes the stylesheet and
the images it answers under `/branding`, with the deployment's configuration laid over them. It
reads none of the CSS built here, so the shape of that stylesheet is written twice: once by this
repository's build, once by the server's renderer.

**Every consumer takes a version tag, and each moves on its own.** An app installs the package by
tag, and the server's build downloads the archive of the tag it declares. Renovate opens each bump,
so a release reaches a consumer only once that consumer merges it, and the server may run an older
version than the apps. A change one consumer needs from another — a new role, which the server
refuses until it knows it — is released with that lag in mind ([theming](theming.md#a-new-role-is-a-change-on-the-server-too)).

**The package is never published to a registry.** It is internal to SympAuthy, and a tag on `main`
is the release; `private` in `package.json` makes `npm publish` refuse.

## One file holds every value

**`tokens.json` is the one source of every color, size, radius, space, type style and
breakpoint.** It is built into the stylesheets here, read by the server's renderer, and read by the
site's token tables, so a value written anywhere else is one the next change to the file misses.
Each token carries its `usage`, which the site shows beside it.

**The stylesheets are generated, and `dist/` is not committed.** npm runs the build as `prepare` when
an app installs a tag, so an app never needs a built copy in git. A change to the CSS is a change to
`tokens.json` or to the script that builds it.

## How a value reaches a page

**A utility names a role, the role reads a variable, and the variable comes from the server.** The
theme redefines the utilities the apps already write — `bg-primary`, the `gray-*` scale as the ink
scale — as reads of CSS variables, each with SympAuthy's light value as its fallback. The variables
are the stylesheet the server answers, which each app links ahead of its own. That indirection is
what lets a deployment rebrand with no rebuild: an app's compiled CSS holds no color.

**The server mirrors the build script rather than reading `dist/`.** Its renderer writes from
`tokens.json` what the build writes for `tokens.css`, then the configured colors, and leaves the dark
values out when the deployment turns dark mode off. A change to the shape of that stylesheet is
therefore made in both repositories, and [Branding a deployment](../../pages/branding.md) is the
contract the two keep.

```
tokens.json
├── scripts/build-theme.mjs ──→ dist/theme.css    Tailwind's @theme: utility → var(--token, fallback)
│                           ──→ dist/tokens.css   the variables, light and dark
├── the server's renderer ────→ /branding/tokens.css   the same variables, then the deployment's colors
└── TokenTable.vue ───────────→ the token tables of the site
```

## How a component reaches an app

**A component ships as `.vue` and `.ts` source, and each app's Vite compiles it.** `src/index.ts` is
the one barrel an app imports from, and an app excludes the package from pre-bundling so it is
compiled like the app's own files. A component's module declares and runs nothing, so a component an
app does not import stays out of its bundle.

**The app's Tailwind compiles the components' classes.** `src/components.css` carries the shared
classes, `.sa-control` and the rest, and an `@source` naming `src/components/`, so an app importing
it scans the components with its own Tailwind and writes no path into `node_modules`. A class
written outside that directory reaches no app's stylesheet, and no build reports it.

**What a component is built on is installed beside it.** `reka-ui` is a peer dependency, so that an
app holds one copy and a provider reaches every component under it; `@heroicons/vue` is a plain
dependency, since an icon holds no state. The fonts come from `@fontsource-variable` and are served
by the app itself, since a sign-in page must not tell a font host who is signing in.

## Where a change starts

**Values start in `tokens.json`, components in `src/components/`, branding in `src/theme/`.** The
rest of the tree is the site and what the server and the apps read as files. [Running
locally](running-locally.md#what-a-change-touches) lists the files each common change touches.

```
tokens.json              every value of the system
scripts/build-theme.mjs  tokens.json → dist/theme.css, tokens.css, tokens-light.css
src/
  index.ts               the barrel: every component, composable, type and helper an app imports
  components/            the Common components, Sa… each, and their composables
  components.css         the shared classes (.sa-control, .sa-menu…) and the @source of the components
  fonts.css              self-hosted Plus Jakarta Sans and JetBrains Mono
  theme/                 the roles, the derivation, applyTheme and fetchBrand
logos/                   the mark: SVG, favicons, app icons
pages/                   the VitePress site
  .vitepress/theme/      what draws the demos and the token tables
  public/theme-builder/  the theme builder, one standalone page
docs/                    how this repository is built: its design and its standards
.claude/rules/           a symlink per standard, so that an agent is handed it
```

## What this document does not settle

**`dist/tokens-light.css`.** It is built and exported, and nothing in SympAuthy reads it since the
server writes its light-only stylesheet itself. Whether it stays is open.

**A check that the server's renderer and the build script agree.** Nothing compares what they write;
whoever changes one changes the other.

**Tests.** The repository has none. CI builds the theme, type-checks, checks the formatting and
builds the site, and a component is checked by drawing it on its page.

---

← [How the system works](index.md)
