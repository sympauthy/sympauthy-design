# Link

<p class="caps-note">Common · shipped in <code>@sympauthy/design/components.css</code> as <code>.sa-link</code></p>

A link inside a sentence: `primary` and underlined at rest.

<div class="demo"><p>Already have an account? <a class="sa-link" href="#">Sign in</a>.</p></div>

## Usage

- **A link inside a sentence**, or standing alone under a form.
- **Not for** an action that changes something on the screen: use [Button](/components/button).
- **Not for** the name of another record, in a field or a cell: use [RecordLink](/components/record-link).
- **Not for** navigation that is a control of its own, such as a [Sidebar](/components/sidebar) entry or a tab: those are drawn by what holds them.

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
- [RecordLink](/components/record-link): the name of another record, in a field or a cell.
