# Link

<p class="caps-note">Common · shipped in <code>@sympauthy/design/components.css</code> as <code>.sa-link</code>, and in <code>@sympauthy/design</code> as <code>SaLink</code></p>

A link, `primary` and underlined at rest: `.sa-link` inside a sentence, and `SaLink` standing on its own, as easy to press as a button.

## Demo

<div class="demo"><div class="stack">
  <p>Already have an account? <a class="sa-link" href="#">Sign in</a>.</p>
  <SaButton label="Sign in" size="large" />
  <div><SaLink label="Forgot password?" :link="{ href: '#' }" /></div>
</div></div>

## Usage

- **`.sa-link`**: a link inside a sentence, or in a list of links. Its target is its text's height, as every link's may be (see [Control height](/foundations/control-height)).
- **`SaLink`**: a link standing on its own, such as "Forgot password?" under a form.
- **Not for** an action that changes something on the screen: use [Button](/components/button), with `variant="text"` where it reads as a link, such as "Resend code".
- **Not for** the name of another record, in a field or a cell: use [RecordLink](/components/record-link).
- **Not for** navigation that is a control of its own, such as a [Sidebar](/components/sidebar) entry or a tab: those are drawn by what holds them.

## Look

- **Text**: `primary`, underlined. `.sa-link` takes the size of the sentence around it; `SaLink` is `panel-strong`, as a [Button](/components/button) beside it is.
- **`SaLink`'s target**: a `control-height` box around the text that is not drawn and does not open up its line, as [RecordLink](/components/record-link)'s, with no chevron.

## Behavior

- **Hover**: `primary-hover`.
- **Focus**: the 2px `focus-ring` outline of [Focus, states and motion](/foundations/focus).

## Accessibility

- **It is underlined at rest, so color is not its only signal inside a sentence** (WCAG 1.4.1).
- **The consumer draws an `a` with an `href`, or hands `SaLink` its `link`**, which is what makes it reach the keyboard.
- **`.sa-link`'s target is its text's, which WCAG 2.5.8 exempts inside a sentence**; links in a list are set 24px apart (see [Control height](/foundations/control-height)).
- **`SaLink`'s target reaches `control-height`**, which no link is held to: a link standing alone under a form is pressed as often as the button beside it.

## API

The consumer provides the `a` and its `href` for `.sa-link`, a class of `components.css` with no props, slots or events.

### SaLink

The consumer provides the words and the link, since the component knows no router. An app with one passes its link component as `linkAs`, and the route as `link`. `SaLinkProps` is exported for an app wrapping it.

| Name     | Type                      | Default | Description                                                        |
| -------- | ------------------------- | ------- | ------------------------------------------------------------------ |
| `label`  | `string`                  |         | Required. Where the link leads.                                    |
| `link`   | `Record<string, unknown>` |         | Required. Given to the link, as `{ href }` or a router's `{ to }`. |
| `linkAs` | `string \| Component`     | `'a'`   | What draws the link, such as a router's link.                      |

## Related

- [Color](/foundations/color): `primary` as what colors a link.
- [Focus, states and motion](/foundations/focus): the outline.
- [RecordLink](/components/record-link): the name of another record, in a field or a cell, whose target `SaLink` shares.
- [Button](/components/button): `variant="text"`, an action with this look.
- [Control height](/foundations/control-height): the target.
