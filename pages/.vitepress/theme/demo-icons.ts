import { h, type FunctionalComponent } from 'vue'

/** Heroicons' 20px solid paths, for the demos. */
function icon(d: string): FunctionalComponent {
  return () =>
    h('svg', { viewBox: '0 0 20 20', fill: 'currentColor', 'aria-hidden': 'true' }, [
      h('path', { d, 'fill-rule': 'evenodd', 'clip-rule': 'evenodd' })
    ])
}

export const PlusIcon = icon(
  'M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z'
)

export const ChevronDownIcon = icon(
  'M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
)

export const SearchIcon = icon(
  'M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z'
)
