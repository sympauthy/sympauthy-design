# Link

<p class="caps-note">Common · shipped in <code>@sympauthy/design/components.css</code> as <code>.link</code></p>

A link inside a sentence: `primary` and underlined at rest.

<div class="demo"><p>Already have an account? <a class="link" href="#">Sign in</a>.</p></div>

## Usage

- **A link inside a sentence**, or standing alone under a form.
- **Not for** an action that changes something on the screen: use [Button](/components/button).
- **Not for** navigation that is a control of its own, such as a [Sidebar](/components/sidebar) entry, a tab, or the name of a record in a [Table](/components/table) row: those are drawn by what holds them.

## Look

- **Text**: `primary`, underlined, in the size of the sentence around it.

## Behavior

- **Hover**: `primary-hover`.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus).

## Accessibility

- **It is underlined at rest, so color is not its only signal inside a sentence** (WCAG 1.4.1).
- **The consumer draws an `a` with an `href`**, which is what makes it reach the keyboard.

## API

The consumer provides the `a` and its `href`. It is a class of `components.css`, with no props, slots or events.

## Related

- [Color](/foundations/color): `primary` as what colors a link.
- [Focus, states and motion](/foundations/focus): the outline.
