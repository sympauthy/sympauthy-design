# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## What this is

`@sympauthy/design`: the design system sympauthy-flow and sympauthy-admin are built with, and the
VitePress site documenting it (deployed to https://sympauthy.github.io/sympauthy-design/).

## Commands

Always run `nvm use` before any `npm` or `node` command.

```sh
npm run build         # tokens.json → dist/theme.css, tokens.css, tokens-light.css
npm run docs:dev      # build, then serve the docs
npm run docs:build
npm run type-check
npm run format
```

## Rules

- **`tokens.json` is the one source of every value.** Change a color, a size or a radius there and
  rebuild; never edit `dist/`, and never write a hex value in a component.
- **Components use Tailwind utilities and the shared rules of `src/components.css`**, so the apps'
  Tailwind compiles them. They know nothing of either app: no store, no router, no auth. An app
  that needs more (the admin's scopes) wraps the component.
- **A component joins `src/components/` only when both apps draw it** (the Common group). A
  component one app uses is specified in `docs/components/` and lives in that app.
- **Flat.** No shadows; one card (`CommonCard`); `primary` is the only filled button.
- **Every control is `control-height` (44px)**, in both apps, through `.control` (`min-h-control`).
  Never write a height on a control.
- **Every text pair holds 4.5:1** (3:1 for borders and focus rings) in light and dark. The theme
  builder and `derivePalette` enforce it for deployments' colors.
- **`src/theme/derive.ts` and `docs/public/theme-builder/index.html` carry the same derivation.**
  Change both, or neither.
- **A deployment's brand reaches the apps through the server's stylesheet.** `dist/tokens.css` is what
  it answers at `/branding/tokens.css`, and `themeToCss` is the shape of what it writes after it:
  changing either changes the server's contract (`docs/branding.md`). `applyTheme` writes the same
  rules, to try a theme no configuration has yet.

## Releases

- **Never published to npm.** The package is internal to SympAuthy: `private` stays `true`, and the
  apps install it by tag (`github:sympauthy/sympauthy-design#v0.2.0`). A release is a version bump
  merged to `main`, then the tag.

## Pull requests

Squash-merged, branch deleted on both sides:

```sh
gh pr merge <number> --squash --delete-branch
git checkout main && git pull --prune
```
