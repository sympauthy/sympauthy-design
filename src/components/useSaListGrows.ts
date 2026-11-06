import { onScopeDispose, readonly, ref, type Ref } from 'vue'
import tokens from '../../tokens.json'

/**
 * The media query below which a list grows as it is scrolled rather than paging: the phone's, under
 * `breakpoint-sm`.
 */
export function saListGrowsQuery(): string {
  const breakpoint = tokens.breakpoint.tokens.find((token) => token.name === 'breakpoint-sm')!
  return `(width < ${breakpoint.value})`
}

/**
 * Whether a list grows as it is scrolled, below `sm:`, rather than paging. A list that grows adds
 * each page it is handed below the rows it holds, and one that pages swaps them, so the caller reads
 * this to know which of the two a page it asks for is. Answered at once, so that the first request
 * is already the right one, and kept up as the window crosses the breakpoint.
 */
export function useSaListGrows(): Readonly<Ref<boolean>> {
  const grows = ref(false)
  if (typeof window === 'undefined') {
    return readonly(grows)
  }

  const query = window.matchMedia(saListGrowsQuery())
  const update = () => {
    grows.value = query.matches
  }
  update()
  query.addEventListener('change', update)
  onScopeDispose(() => query.removeEventListener('change', update))
  return readonly(grows)
}
