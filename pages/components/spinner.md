# Spinner

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonSpinner</code></p>

A request in flight, drawn in the color of the text around it.

<div class="demo"><div class="stack text-primary">
  <div class="row"><CommonSpinner size="sm">Loading</CommonSpinner><CommonSpinner>Loading</CommonSpinner><CommonSpinner size="lg">Loading</CommonSpinner></div>
  <div class="row"><CommonSpinner>Waiting for a response from the server.</CommonSpinner><span class="text-gray-500">Waiting for a response from the server.</span></div>
</div></div>

## Usage

- **`size="sm"`**: inside a control.
- **`size="md"`**, the default: beside a line saying what is being waited for.
- **`size="lg"`**: alone on a screen that is nothing but the wait.
- **Not for** a button in flight: pass `submitting` or `loading` to [Button](/components/button), which draws its own.

## Look

- **Ring**: a full circle with one quarter open, in the text color around it. Set `primary` on what contains it, as [AuthCard](/components/auth-card) does.
- **Sizes**: 16px with a 2px ring at `sm`, 24px with a 4px ring at `md`, 32px with a 4px ring at `lg`.

## Behavior

- **Motion**: it turns, the one thing [Focus, states and motion](/foundations/focus) allows besides an overlay. It does not stop under `prefers-reduced-motion` yet.

## Accessibility

- **It takes `role="status"`, and its slot is what a screen reader announces** (WCAG 4.1.3). The slot is visually hidden: pass the words even when a line beside it says the same.

## API

The consumer provides the words a screen reader announces, and the text color it inherits.

| Name       | Type                   | Default | Description                       |
| ---------- | ---------------------- | ------- | --------------------------------- |
| `size`     | `'sm' \| 'md' \| 'lg'` | `'md'`  | Where it is drawn.                |
| `#default` | slot                   |         | Hidden words for a screen reader. |

## Related

- [Focus, states and motion](/foundations/focus): the one motion.
- [Button](/components/button): draws a small one in flight.
- [AuthCard](/components/auth-card): the large one, while waiting.
