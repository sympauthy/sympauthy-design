# How the system works

What the design system is and how each of its parts works, a document per part. This is the design
documentation, written the way [the design documentation
standard](../standards/docs-design-standard.md) asks: what the part does, what a reader has to open
to change it, and why it was settled that way. The rules a change is held to are the other half —
[how the code is written](../standards/index.md).

- **[Architecture](architecture.md)** — what the apps and the server each take from the repository,
  how a value written once in `tokens.json` reaches a page, how a component reaches an app, and the
  layout of the tree.
- **[Theming](theming.md)** — what a deployment may change, what keeps its colors legible, the
  derivation written twice, and why a new role is a change on the server too.
- **[The site](site.md)** — what the site in `pages/` is for, how it draws the real components and
  the real values, the theme builder, and how it is published.

## Neither a design document nor a rule

One document here describes no part of the system, and [the design documentation
standard](../standards/docs-design-standard.md) does not govern it.

- **[Running locally](running-locally.md)** — setting the project up, the checks a change passes,
  trying a change in an app, the files each common change touches, and releasing.

---

← [Documentation](../index.md)
