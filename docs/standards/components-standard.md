---
description:
  How the page of a Common component is written — which components have one, its sections,
  its demo and its API.
paths:
  - 'pages/components/**'
  - 'src/components/**'
---

# Components standard

How the page of a Common component in [`pages/components/`](../../pages/components/index.md) is
written. Its code is in this repository, so its page can draw it, and an app imports from what the
page says. Values are [the foundations'](foundations-standard.md), and a page names them.

## Which pages exist

**Every component `src/index.ts` exports is named on a page's status line.** Parts drawn together
share a page: `FormField` and `FormInput` are Field, and a `ButtonStyle` is Button.

**One component is one page.** Keep its variants, its specification and its API together, with no
tabs and no subpages.

**A page's title is the component's name, and its file is that name in kebab-case.** The sidebar
label is the same name, word for word.

**A new page joins the Common group of the sidebar in `pages/.vitepress/config.ts` and of
`pages/components/index.md` in the same commit.** Both list the pages in the same order.

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
<p class="caps-note">
  Common · shipped in <code>@sympauthy/design</code> as <code>CommonAlert</code>
</p>
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
