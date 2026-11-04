---
description:
  Which components ship in the package, what they are built on, and how the page of one is written
  — its sections, its demo and its API.
paths:
  - 'pages/components/**'
  - 'src/components/**'
  - 'src/components.css'
---

# Components standard

Which components ship in the package, what they are built on, and how the page of a Common
component in [`pages/components/`](../../pages/components/index.md) is written. Its code is in this
repository, so its page can draw it, and an app imports from what the page says. Values are [the
foundations'](foundations-standard.md), and a page names them.

## Which components ship

**A component joins `src/components/` when more than one app draws it, or when it names nothing of
the one app drawing it and any app built like the admin would draw it.** Any other component lives
in its app, specified in `pages/components/` under that app's group.

**A component names nothing of an app when no entity, scope, route or sentence of that app reaches
it.** `SaTag` qualifies and `OriginTag` does not, since a claim's origin is the admin's own
term.

**A shipped component knows no store, no router, no auth and no message bundle.** Hand it the words
it draws and the links it follows as props or slots. An app that needs more wraps it, as the admin's
button adds its scopes.

**A component an app wraps exports its props as `Sa…Props`, and the wrapper extends them.** The
wrapper then states only what it adds, so a prop the package gains reaches the app's screens with no
edit. Export them when the first wrapper appears, as one interface in the component's source, which
each app's compiler reads through `src/index.ts` to generate the wrapper's runtime props.

**A component exporting its props defaults every boolean to `false`.** A wrapper declares them too,
so Vue hands an absent one down as `false`, over any other default.

**A shipped component holds its contrast in light and dark, whatever the app drawing it pins.**
Check it in both themes when it moves, since the admin is pinned light and never saw the other.

**An app deletes its copy when it installs the tag shipping the component.** Re-export the package's
where the app has a kit, so its screens keep their imports.

## What a component is built on

**An overlay, a menu or a control made of several parts wraps a [reka-ui](https://reka-ui.com)
primitive.** The primitive brings the focus trap, the keyboard, the ARIA roles and the positioning,
and the styling stays Tailwind. Never hand-roll a click-outside, an Escape handler or focus
management.

**`reka-ui` is a peer dependency, so an app holds one copy of it.** A provider and the parts under
it meet through a key made once per copy, so an app's `TooltipProvider` reaches no tooltip from a
second copy. npm installs the peer itself, and warns when an app's own version is out of range.

**An icon comes from `@heroicons/vue`, a plain dependency.** An icon holds no state, so a second
copy costs bytes and breaks nothing. Which set and size is [the Iconography
foundation](../../pages/foundations/iconography.md).

**A component's module runs nothing at its top level but declarations.** That keeps a component an
app does not import out of its bundle, through the one barrel in `src/index.ts`.

**A class the package draws is written in `src/components/`.** The `@source` of `src/components.css`
reads that directory and nothing else in `src/`, so that an app writes no path into `node_modules`.
A class written elsewhere reaches no app's stylesheet, and the build reports nothing.

## What a thing is named

**Everything the package names starts with `Sa`.** A component is `SaButton`, a type `SaMenuItem`, a
composable `useSaAutoPageSize`, a constant `SA_PAGE_ACTIONS_OUTLET` and a class of `components.css`
`.sa-control`. An app's own component then never has to be imported under another name.

**A component is `Sa` and a noun naming what it is.** A part is `Sa`, its parent and the part:
`SaTableCell`. Its file is that name.

**A variant is a prop holding a word, as `variant="danger"`.** Export the type of its values as
`Sa…Variant`, never a set of class names for a caller to pass.

**A token's name takes no prefix, and neither do the type styles it builds.** `control-height` and
`panel-body` are the design system's values, and the server's stylesheet answers them.

## Which pages exist

**Every component `src/index.ts` exports is named on a page's status line.** Parts drawn together
share a page: `SaField` and `SaInput` are Field.

**One component is one page.** Keep its variants, its specification and its API together, with no
tabs and no subpages.

**A page's title is the component's name without `Sa`, and its file is that name in kebab-case.** The
sidebar label is the same name, word for word.

**A new page joins the Common group of the sidebar in `pages/.vitepress/config.ts` and of
`pages/components/index.md` in the same commit.**

**Every group of both lists its pages in alphabetical order of their names, ignoring case.** Put a
new or moved page in its place, so that nobody has to decide where it goes.

**A component that moves into `src/components/` takes a page of this form in the same commit.** Move
it to the Common group of the sidebar and the index.

## Sections of a page

**A page carries these sections, in this order, under these headings.** Leave out a section when
the last column does not hold of the page.

| Section            | Holds                                                      | Written             |
| ------------------ | ---------------------------------------------------------- | ------------------- |
| Status line        | What it ships as                                           | Always              |
| Opening sentence   | What the component is                                      | Always              |
| Demo               | The real component, in each variant and state              | Always              |
| `## Usage`         | When to use it, each variant's purpose, and what not to    | Always              |
| `## Look`          | Its parts, their order, and the tokens they take           | Always              |
| `## Behavior`      | Its states and interactions                                | Where it has any    |
| `## Content`       | What its words must say                                    | Where it fixes them |
| `## Accessibility` | Its role, its label and its keyboard                       | Where one applies   |
| `## API`           | What the consumer provides, and every prop, slot and event | Always              |
| `## Related`       | Links to what it is built on or sits beside                | Where one applies   |

**A rule in a section is a bullet leading in bold.** Under `## Look` and `## Behavior` the bold is
the name of the part or the state.

**A page says what the component does.** Where the code breaks a rule the system holds, the page
says so in the rule's place. A change to a file in `src/components/` updates its page in the same
commit.

### The opening

**The status line is a `caps-note` directly under the title.** Write `<code>` inside it, since
Markdown is not read inside the paragraph.

```html
<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>SaAlert</code></p>
```

**A demo draws the real component in a `.demo`, in every variant and state its props offer.** Import
what it needs; never redraw a shipped component in markup.

**A demo says what the interface would say.** Its labels and sentences follow [the Content
foundation](../../pages/foundations/content.md).

### Usage

**`## Usage` says when to reach for the component, then what each variant is for.** A variant is a
bullet leading in its name.

**What a component is not for is written, with what to use instead.** Lead the bullet with _Not
for_, and link the alternative where one exists.

### Look

**`## Look` names a token and leaves out its value.** Write `control-height`, never 44px; a number
no token holds is written as it is.

**A page's text names no Tailwind utility.** The classes of `src/components.css` are named, and
everything else is said in tokens and sizes. A demo's own markup may use utilities.

**What a foundation decides is linked, not restated.** A component states only what it adds or what
it departs from, and a departure says why.

### Behavior

**`## Behavior` names each state the component has.** The set to go through is hover, focus,
disabled, loading, invalid and empty, then what moves and what the keyboard does beyond the
browser's default.

### Content

**`## Content` holds what this component's words must say.** What holds of every word in the
interface is [the Content foundation](../../pages/foundations/content.md), and the section links it.

### Accessibility

**`## Accessibility` says the role, how the component is labelled, and what the keyboard does.**
State the ARIA a specification requires and who sets it, the component or the consumer.

**A requirement cites its WCAG success criterion where one exists.** Write the number in brackets
after the rule, and link a threshold a foundation already holds.

### API

**`## API` opens with a sentence saying what the consumer provides.** Start it _The consumer
provides_, and name what an app must wrap the component to add.

**A table lists every prop, slot and event, in its source's order.** The source in `src/components/`
is the authority, and the table is corrected to match it. Parts sharing a page take a table each,
under a `###` naming the part.

```markdown
| Name    | Type                    | Default    | Description                 |
| ------- | ----------------------- | ---------- | --------------------------- |
| `color` | `'danger' \| 'warning'` | `'danger'` | The meaning of the message. |
```

### Related

**`## Related` is a bullet per page, linked, saying how it relates.** Link with the site's absolute
path, and list what the component is built on before what is built on it.

## What this standard does not cover

**What _built like the admin_ means, past tables, records and a sidebar.** No such third app exists
yet, so it is a judgement made per component, and the first one corrects it.

**`sideEffects` in `package.json`.** An app's bundler drops a component nothing imports without it,
and declaring it would mean listing the stylesheets an app imports for their effect.

**The stylesheet of a component an app does not import.** Tailwind reads all of `src/components/`
through the `@source` of `src/components.css`, so its classes reach every app's stylesheet whichever
components that app draws.

**A component in another repository.** Flow and Admin components live in their apps, so this
repository can neither draw nor check them. Their pages stay as those apps' specifications, and
nothing here shapes them.

**A maturity label.** A Common component ships or has no page, and no _experimental_ or _stable_ is
set: the package is internal, and its tags say what an app has installed.

**Code examples.** A page shows a demo and not its source, and no format is set for the first that
needs one.

**Do and don't pairs.** A rule says _never_ in words, and no format is set for the first page that
needs to show one.

**Accessibility test results.** Nothing records which assistive technology a component was tried
with, and no page claims it.

**A generated prop table.** The tables are typed by hand: the shipped set is small, and generating
them would add a dependency to the site.

**A changelog per page.** The history stays in git, as [the documentation
standard](docs-standard.md) has it.

**The guides.** They have no standard yet.

**Checking.** Nothing verifies these rules; each is kept true by whoever edits the page or the
component.

---

← [How the code is written](index.md)
