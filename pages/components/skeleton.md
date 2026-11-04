# Skeleton

<p class="caps-note">Common · shipped in <code>@sympauthy/design</code> as <code>CommonSkeleton</code></p>

The place of a value that has not arrived, the size of what will replace it.

<div class="demo"><div class="stack">
  <CommonCard>
    <div class="flex flex-col gap-3">
      <CommonSkeleton class="h-4 w-48" />
      <CommonSkeleton class="h-4 w-32" />
      <CommonSkeleton class="size-24" />
    </div>
  </CommonCard>
</div></div>

## Usage

- **A value on its way, on a screen that is already drawn**, so that the screen does not move when it arrives.
- **Not for** a screen with nothing on it yet: use [LoadingState](/components/loading-state), which says what is being waited for.
- **Not for** a value the record does not carry: use [EmptyValue](/components/empty-value).

## Look

- **Box**: `ink-300`, `radius-md`, sized by the consumer to what will replace it.

## Behavior

- **Motion**: it pulses, as [Focus, states and motion](/foundations/focus) allows, and holds still under `prefers-reduced-motion`.
- **Pointer**: the progress cursor over it.

## Accessibility

- **It is hidden from a screen reader**, since it carries no words. The consumer marks what is loading with `aria-busy` where a person needs telling.
- **It stops under `prefers-reduced-motion`** (WCAG 2.3.3).

## API

The consumer provides its size, through `class`. It has no props, slots or events.

## Related

- [LoadingState](/components/loading-state): the wait of a whole screen.
- [EmptyValue](/components/empty-value): the other use of `ink-300`.
- [Focus, states and motion](/foundations/focus): the motion.
