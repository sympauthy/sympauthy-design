---
description: Which components ship in the package, what they are built on, which words they hold,
  what they are named, and what one owes the site.
paths:
  - 'src/components/**'
  - 'src/components.css'
  - 'src/messages/**'
---

# Components standard

Which components ship in the package, what they are built on, which words they hold, and what they
and everything else the package exports are named. How the page of one is written is [the component
pages standard](component-pages-standard.md), and values are [the
foundations'](foundations-standard.md).

## Which components ship

**A component joins `src/components/` when more than one app draws it, or when it names nothing of
the one app drawing it and any app built like the admin would draw it.** Any other component lives
in its app, specified in `pages/components/` under that app's group.

**A component names nothing of an app when no entity, scope, route or sentence of that app reaches
it.** `SaTag` qualifies and `OriginTag` does not, since a claim's origin is the admin's own
term.

**A shipped component knows no store, no router and no auth.** Hand it the words naming what is on
the screen and the links it follows as props or slots. An app that needs more wraps it, as the
admin's button adds its scopes.

**A component an app wraps exports its props as `Sa…Props`, and the wrapper extends them.** The
wrapper then states only what it adds, so a prop the package gains reaches the app's screens with no
edit. Export them when the first wrapper appears, as one interface in the component's source, which
each app's compiler reads through `src/index.ts` to generate the wrapper's runtime props.

**A component exporting its props defaults every boolean to `false`.** A wrapper declares them too,
so Vue hands an absent one down as `false`, over any other default.

**A shipped component holds its contrast in light and dark, whatever the app drawing it pins.**
Check it in both themes when it moves, since a person or their device can choose either.

**An app deletes its copy when it installs the tag shipping the component.** Its screens import the
package's from `@sympauthy/design`, under its `Sa` name, and a kit of the app's does not re-export
it, so that a page of the site and the template drawing the component agree on what it is called.

## What a component is built on

**An overlay, a menu or a control made of several parts wraps a [reka-ui](https://reka-ui.com)
primitive.** The primitive brings the focus trap, the keyboard, the ARIA roles and the positioning,
and the styling stays Tailwind. Never hand-roll a click-outside, an Escape handler or focus
management.

**`reka-ui` is a peer dependency, so an app holds one copy of it.** A provider and the parts under
it meet through a key made once per copy, so an app's `TooltipProvider` reaches no tooltip from a
second copy. npm installs the peer itself, and warns when an app's own version is out of range.

**`vue-i18n` is a peer dependency too, and a component reads the app's global messages through
`useI18n()`.** The language an app renders in is then the language of the package's words, with no
second choice of language kept in step with it. A component that can draw one in any state calls
it as it mounts, and one that never can, as `SaButton`, calls nothing and needs no instance.

**An icon comes from `@heroicons/vue`, a plain dependency.** An icon holds no state, so a second
copy costs bytes and breaks nothing. Which set and size is [the Iconography
foundation](../../pages/foundations/iconography.md).

**A component's module runs nothing at its top level but declarations.** That keeps a component an
app does not import out of its bundle, through the one barrel in `src/index.ts`.

**A class the package draws is written in `src/components/`.** The `@source` of `src/components.css`
reads that directory and nothing else in `src/`, so that an app writes no path into `node_modules`.
A class written elsewhere reaches no app's stylesheet, and the build reports nothing.

**A rule of `src/components.css` is a class in the `components` layer, unless a stylesheet has to
apply it.** Tailwind applies only utilities, and a class cannot reach a pseudo-element, so
`sa-field-label` is declared with `@utility`. A template still writes it as a class, and a text
utility beside it still wins.

## Which words a component holds

**A word a component says the same on every screen is the package's, and no prop carries it.**
"Copied", "No, cancel", "Previous" and the conditions of a filter read the same wherever the
component is drawn, so the word is the component's: an app holding it holds one more wording of one
word. A screen never rewords one, so an app has one way to draw it.

**A word naming what is on the screen stays a prop.** What an action does, what a field holds, what
a search looks through, what a copy button copies and what an app suggests are the screen's, and so
is every `ariaLabel`. An app's own sentences, as "Sign in", stay in the app, since they name it.

**A prop is never a word and a switch at once.** A word left out would turn a behaviour off with
nothing to say so, so a behaviour is a boolean, `false` by default, as `SaField`'s `optional`.

**A word holding a count takes the count, and the package words it, plural included.** "Fix 3
fields to continue" says what to do on every form, so the count is all a form gives it.

**The package's words are written in `src/messages/`, under `sa.`, one module per language.**
`sa.` keeps them from an app's keys, as everything the package names starts with `Sa`. The English
is the shape every other language is typed against.

**A language the package holds is a branch of `loadSaMessages`, importing its own module.** A
bundler then splits each into a chunk of the app's build; an import whose path is built at runtime
is not split out of a dependency by every bundler. English is answered with no import, since it is
in an app's first load.

**A message is plain `vue-i18n` syntax, compiled by the app's `vue-i18n` the first time it is
drawn.** An app then writes no path into the package for its words, as for its classes.

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

## What a component owes the site

**Every component `src/index.ts` exports is named on a page's status line.** A new one takes a page
of the form [the component pages standard](component-pages-standard.md) sets, in the same commit.

**A component is registered for the pages in `pages/.vitepress/theme/index.ts`.** A page draws it
without importing it, so a component missing there is drawn by no demo.

**A change to a file in `src/components/` updates its page in the same commit.** Its API table
follows the source, which is the authority.

## What this standard does not cover

**What _built like the admin_ means, past tables, records and a sidebar.** No such third app exists
yet, so it is a judgement made per component, and the first one corrects it.

**`sideEffects` in `package.json`.** An app's bundler drops a component nothing imports without it,
and declaring it would mean listing the stylesheets an app imports for their effect.

**The stylesheet of a component an app does not import.** Tailwind reads all of `src/components/`
through the `@source` of `src/components.css`, so its classes reach every app's stylesheet whichever
components that app draws.

**A language past English.** The apps ship English alone, so the package does; the first app
shipping another brings it, and with it who translates the package's words.

**Checking.** Nothing verifies these rules; each is kept true by whoever edits the component. A
language is typed against the English, which catches a key it lacks. A component drawing a key no
language holds draws the key, caught by eye on its page; a key no component draws is caught by
nobody.

---

← [How the code is written](index.md)
