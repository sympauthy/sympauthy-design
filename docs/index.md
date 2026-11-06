# SympAuthy Design — documentation

`@sympauthy/design` is the design system
[sympauthy-flow](https://github.com/sympauthy/sympauthy-flow) and
[sympauthy-admin](https://github.com/sympauthy/sympauthy-admin) are built with: the tokens, the
Tailwind theme, the shared Vue components and the branding helpers. The
[SympAuthy](https://github.com/sympauthy/sympauthy) server builds its `/branding` stylesheet from it
too.

These documents are the authority on how this repository is built. They are read before the code
they govern, and a new decision is written here before or alongside the change that implements it.
What they are _not_ is the guide to using the system: which token, component and layout an app
reaches for, and how a deployment brands itself, is [the site in `pages/`](../pages/index.md).

## Where to start

Somebody making a first change here reads, in this order:

1. **[Architecture](design/architecture.md)** — what the repository is made of, and how a value in
   `tokens.json` reaches the apps and the server.
2. **[Running locally](design/running-locally.md)** — setting the project up, the checks a change
   passes, trying it in an app, and the files each common change touches.
3. **The standard governing the files being changed**, from [how the code is
   written](standards/index.md). An agent is handed it when it reads one of those files; a person
   opens it.
4. **The page of the site describing what is being changed**, in `pages/foundations/` or
   `pages/components/`, since a change to a component updates its page in the same commit.

[Theming](design/theming.md) and [the site](design/site.md) are read before changing either.

## The two halves

They come in two kinds, and the folder is which kind a document is. The two are read at different
moments — a design document by somebody about to change the part it describes, a rule by somebody
about to break it — and each kind has a standard of its own saying how one is written, over [the one
that holds of both](standards/docs-standard.md).

- **[How the system works](design/index.md)**, in `design/` — a document per part of the system:
  what it does, what implements it, and why it was settled that way. [Running
  locally](design/running-locally.md) lives there too, held to the mechanics and to nothing else.
- **[How the code is written](standards/index.md)**, in `standards/` — the rules a change is held
  to, one subject per document, each named `<subject>-standard.md`. A standard reaches an agent
  when a file it governs is read, through the symlink in `.claude/rules/`.

## Goals

- **One system for every SympAuthy app.** The apps share the values, and the components that more
  than one of them draws or that any app built like the admin would. A component tied to one app
  lives in that app.
- **One source for every value.** A color, a size or a radius is written once, in `tokens.json`,
  and everything else is built from it.
- **A brand is configuration.** A deployment changes its colors, images and name without rebuilding
  an app, and the system holds what that must not break.
- **Legible whatever the brand.** Every text pair holds its contrast in light and dark, for
  SympAuthy's own colors and for what the theme builder derives from a deployment's.
