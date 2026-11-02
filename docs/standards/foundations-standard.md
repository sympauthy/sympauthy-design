---
description: How a page in `pages/foundations/` is written — which pages exist, the sections of one,
  and the token table it draws.
paths:
  - 'pages/foundations/**'
  - 'pages/.vitepress/theme/TokenTable.vue'
---

# Foundations standard

How a page in [`pages/foundations/`](../../pages/foundations/index.md) is written. The rest of the
site has no standard, and [the documentation standard](docs-standard.md) says so. These pages have
one because a person reads them side by side and expects the same answer in the same place on each,
and because they name values `tokens.json` owns.

## Which pages exist

**A foundation gets a page when what it decides holds across components.** What one component
decides is on that component's page in `pages/components/`.

**One foundation is one page.** Keep its rules and its tokens together, with no tabs and no
subpages.

**A page's title is its sidebar label, word for word.**

**A new page joins the sidebar in `pages/.vitepress/config.ts` and the overview
`pages/foundations/index.md` in the same commit.** Both list the pages in the same order, and the
overview gives each a one-line summary.

**The overview files a page by what it decides.**

| Group   | Holds                            |
| ------- | -------------------------------- |
| Content | How the interface speaks         |
| Visual  | What the interface is drawn with |
| Brand   | What identifies SympAuthy itself |

## Sections of a page

**A page carries these sections, in this order, under these headings.** Leave out a section when
the last column does not hold of the page.

| Section            | Holds                                        | Written                 |
| ------------------ | -------------------------------------------- | ----------------------- |
| Opening sentence   | What the foundation decides                  | Always                  |
| `## Usage`         | The rules                                    | Always                  |
| `## Tokens`        | The `TokenTable`, and nothing else           | Where the page owns any |
| `## Accessibility` | The requirements this foundation answers for | Where one applies       |
| `## Related`       | Links to the components it decides for       | Where one applies       |

**A rule in `## Usage` is a bullet leading in bold.** A table belongs there too when it maps a rule
across components.

**A rule states what spans tokens.** A token's own purpose is written once, in its `usage` in
`tokens.json`, and the table shows it.

**A rule names a token and leaves out its value.** Write `control-height`, never 44px; the table
carries the value. A number no token holds, or one an outside source sets, is written as it is.

## Token tables

**A token table is `<TokenTable>`, reading `tokens.json`.** Never type a token's value into
Markdown.

**Every color, type style, space, radius and size token is listed on one page.**

| Page           | Table                                                      |
| -------------- | ---------------------------------------------------------- |
| Color          | `<TokenTable group="color" />`                             |
| Type           | `<TokenTable group="type" />`                              |
| Spacing        | `<TokenTable group="spacing" />`                           |
| Shape          | `<TokenTable group="radius" />`                            |
| Control height | `<TokenTable group="size" :only="['control-height']" />`   |
| Layout         | `<TokenTable group="size" :except="['control-height']" />` |

**A row shows the token's name, its `usage`, its value and its specimen.** A color shows its value
once per theme `tokens.json` names.

**A specimen draws the value itself.**

| Group   | Specimen                   |
| ------- | -------------------------- |
| color   | A swatch                   |
| type    | Its `sample`, in the style |
| spacing | A bar at the true width    |
| radius  | A box with that corner     |
| size    | None                       |

## Accessibility and related

**A requirement is stated once, on the page it applies to.** Another page that relies on it links
there.

**A requirement cites its WCAG success criterion where one exists.** Write the number in brackets
after the rule.

**`## Related` is a bullet per component, linked, with what this foundation decides for it.** Link
with the site's absolute path, and link only a component page that says so.

## What this standard does not cover

**An accessibility page.** Each requirement stays on the page it applies to, so that one question
has one answer. Write one when a requirement applies to no foundation.

**Do and don't pairs.** A rule says _never_ in words, and no format is set for the first page that
needs to show one.

**The font families.** `tokens.json` holds them as font stacks with no scale to draw, and the Type
page names each in its rules.

**A changelog per page.** The history stays in git, as [the documentation
standard](docs-standard.md) has it.

**The other pages of the site.** The component pages and the guides have no standard yet.

**The overview's own shape.** It introduces the system and lists the pages, so the sections above do
not hold of it.

**Checking.** Nothing verifies these rules. `TokenTable` keeps the values true, and everything else
is kept true by whoever edits the page.

---

← [How the code is written](index.md)
