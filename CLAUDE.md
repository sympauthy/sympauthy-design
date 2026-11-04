# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## What this is

`@sympauthy/design`: the design system sympauthy-flow and sympauthy-admin are built with, and the
VitePress site documenting it, in `pages/` (deployed to
https://sympauthy.github.io/sympauthy-design/).

**`docs/` is the authority on how this repository is built** (start at
[`docs/index.md`](docs/index.md)), in two halves: [`docs/design/`](docs/design/index.md) describes
each part of the system, and [`docs/standards/`](docs/standards/index.md) holds the rules a change
is held to. Read the document governing a change before the code it governs, and put a new design
decision there before or alongside its code. The standards are symlinked into `.claude/rules/`, each
loaded when a file it governs is read. `pages/` is what the apps' authors and a deployment read.

**Treat an absence as a decision, not an oversight.** Every standard ends with what it deliberately
does not cover. If you end a deferral, say there why.

## Commands

Always run `nvm use` before any `npm` or `node` command.

```sh
npm run build         # tokens.json → dist/theme.css, tokens.css, tokens-light.css
npm run pages:dev     # build, then serve the pages
npm run pages:build
npm run type-check
npm run format
```

## Rules

- **`tokens.json` is the one source of every value.** Change a color, a size or a radius there and
  rebuild; never edit `dist/`, and never write a hex value in a component.
- **Components use Tailwind utilities and the shared rules of `src/components.css`**, so the apps'
  Tailwind compiles them. They know nothing of any app: no store, no router, no auth, no message
  bundle. An app that needs more (the admin's scopes) wraps the component.
- **A component joins `src/components/` when more than one app draws it, or when it names nothing
  of the one app drawing it and any app built like the admin would draw it** (the Common group;
  [the components standard](docs/standards/components-standard.md) owns the rule). Any other
  component is specified in `pages/components/` and lives in its app.
- **Flat.** No shadows; one card (`CommonCard`); `primary` is the only filled button.
- **Everything a person presses is at least `control-height` (44px)**, in both apps, so that it can be
  touched: a control through `.control` (`min-h-control`), anything else through `min-h-control`, and
  a small icon through a target around it. A link inside a sentence is the one exception. Never write
  a height on a control.
- **Every text pair holds 4.5:1** (3:1 for borders and focus rings) in light and dark. The theme
  builder and `derivePalette` enforce it for deployments' colors.
- **`src/theme/derive.ts` and `pages/public/theme-builder/index.html` carry the same derivation.**
  Change both, or neither.
- **A deployment's brand reaches the apps through the server's stylesheet.** `dist/tokens.css` is what
  it answers at `/branding/tokens.css`, and `themeToCss` is the shape of what it writes after it:
  changing either changes the server's contract (`pages/branding.md`). `applyTheme` writes the same
  rules, to try a theme no configuration has yet.

## Releases

- **Never published to npm.** The package is internal to SympAuthy: `private` stays `true`, and the
  apps install it by tag (`github:sympauthy/sympauthy-design#v0.3.0`). A release is a version bump
  merged to `main`, then the tag.

## Pull requests

Squash-merged, branch deleted on both sides:

```sh
gh pr merge <number> --squash --delete-branch
git checkout main && git pull --prune
```
