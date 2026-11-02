# How the code is written

The rules a change is held to. Each is named `<subject>-standard.md` and holds one subject; the
`paths` globs in its frontmatter are what load it, so a standard reaches an agent when a file it
governs is read, through the symlink in `.claude/rules/`. A standard governing what is not in the
tree carries no `paths` and is named from `CLAUDE.md` instead. What each part of the system does is
the other half — [how the system works](../design/index.md).

- **[Documentation standard](docs-standard.md)** — what holds of every document in `docs/`,
  whichever half it is in: what it names, how it is kept true, and the mechanics. The two halves
  then have one each — [the standards standard](docs-standards-standard.md) for how a rule here is
  written and what it states in place of the code that happens to follow it, and [the design
  documentation standard](docs-design-standard.md) for what a design document answers about the
  part it names and what it leaves to the code, to the standards and to the FAQ.
- **[Foundations standard](foundations-standard.md)** — how a page in `pages/foundations/` is
  written: which pages exist, the sections of one, and the token table it draws.
- **[Components standard](components-standard.md)** — how the page of a Common component is written:
  which components have one, its sections, its demo and its API.

---

← [Documentation](../index.md)
