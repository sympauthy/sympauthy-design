# Running locally

Setting the project up, the checks a change passes, trying a change inside an app, the files each
common change touches, and releasing. What the repository is made of is
[the architecture](architecture.md).

## Setting up

The project runs on the Node version `.nvmrc` names. Run `nvm use` before any `npm` or `node`
command, then install:

```sh
nvm use
npm install           # its prepare script builds dist/ from tokens.json
```

## Running the site

```sh
npm run pages:dev     # builds dist/, then serves the site with live demos
```

The site is at http://localhost:5173/sympauthy-design/, and reloads as a page or a component
changes. `dist/` is built once, when it starts: after a change to `tokens.json` or to
`scripts/build-theme.mjs`, run `npm run build` again and the page picks it up.

Look at what changed in light and in dark, with the switch in the site's bar, and at a phone's width:
a component whose layout changes at a breakpoint shows each width in its demo.

## Checking a change

CI runs these on every pull request, and a change passes them first:

| Command                | Checks                                                  |
| ---------------------- | ------------------------------------------------------- |
| `npm run build`        | `tokens.json` builds into the stylesheets               |
| `npm run type-check`   | the components, the theme helpers and the site's theme  |
| `npm run format:check` | the formatting of `src/`, `docs/`, `pages/`, `scripts/` |
| `npm run pages:build`  | every page compiles, demos included                     |

`npm run format` writes the formatting. There are no tests: a component is checked by drawing it on
its page.

## Trying a change in an app

Push the branch, then install it in the app as a tag would be:

```sh
npm install github:sympauthy/sympauthy-design#<branch>
```

npm builds `dist/` through `prepare`, as for a tag. The lockfile holds the branch's commit, so run
the same command again after each push. Put the app's tag back before its own change is merged.

Prefer this to a symlink, `npm link` or a `file:` path: the app would then resolve `vue` and
`reka-ui` from this repository's own `node_modules`, a second copy of each, and a provider of the
app's would reach no component of the package.

## What a change touches

- **A color, a size, a radius or a space** — `tokens.json`. The foundation page showing it reads
  the file and updates itself; check its text pairs in both themes.
- **A new Common component** — the component in `src/components/`, its export in `src/index.ts`,
  its registration in `pages/.vitepress/theme/index.ts`, its page in `pages/components/`, and the
  Common group of both `pages/.vitepress/config.ts` and `pages/components/index.md`.
- **A component's props, slots or events** — the component, and the API table of its page, in the
  same commit.
- **A shared class** — `src/components.css`.
- **A role a deployment may set** — `src/theme/roles.ts`, `tokens.json`, `src/theme/derive.ts`, the
  theme builder, and the server's role lists
  ([theming](theming.md#a-new-role-is-a-change-on-the-server-too)).
- **The derivation** — `src/theme/derive.ts` and `pages/public/theme-builder/index.html`, together.
- **The shape of the stylesheet the server answers** — `scripts/build-theme.mjs`, the server's
  `BrandStylesheetRenderer`, and `pages/branding.md`.
- **A new foundation page** — the page in `pages/foundations/`, and the Foundations group of both
  `pages/.vitepress/config.ts` and `pages/foundations/index.md`.
- **A new standard** — `docs/standards/<subject>-standard.md`, its symlink in `.claude/rules/`, and
  `docs/standards/index.md`.

## Releasing

1. Bump `version` in `package.json`, and the tag in the install lines of `README.md`,
   `pages/using-in-apps.md` and `CLAUDE.md`. Merge it to `main`.
2. Tag the merge: `git tag v<version> && git push --tags`.

Renovate then opens the bump in each app and in the server. The server renders its stylesheet from
the `tokens.json` of the version it declares, so a variable the new `theme.css` reads and an older
server does not answer falls back to its light value in the apps: before releasing a new token, check
which version the server declares, and release the server's bump with it.

---

← [How the system works](index.md)
