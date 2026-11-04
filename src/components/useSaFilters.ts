import { computed, reactive, ref } from 'vue'
import {
  saFilterDefaultOperator,
  saFilterIsComplete,
  type SaFilterCriterion,
  type SaFilterField,
  type SaFilterOperator,
  type SaFilterPatch
} from './saFilter'

/**
 * The filters of one list. This is what plugs a list into `SaTableFilters` and
 * `SaTableFilterPicker`: whoever holds the records holds one of these, says which fields exist, and
 * reads [complete] when it asks for them.
 */
export interface SaFilters {
  /** The fields that can be filtered on. */
  readonly fields: SaFilterField[]
  /** Every filter on screen, including one still waiting for its value. */
  readonly criteria: SaFilterCriterion[]
  /** The filters that can be answered, which are the only ones that narrow anything. */
  readonly complete: SaFilterCriterion[]
  /** The filter [add] last created, which opens on its value. */
  readonly added: number | null
  /** Adds a filter over [field] and answers its id, or nothing where no such field exists. */
  add: (field: string) => number | undefined
  update: (id: number, patch: SaFilterPatch) => void
  remove: (id: number) => void
  clear: () => void
  /** Whether a filter narrows [field], for the header of its column. */
  isFiltered: (field: string) => boolean
}

/** A filter a list starts with, already applied, such as one a link asked for. */
export interface SaFilterStart {
  field: string
  operator: SaFilterOperator
  value?: string
  values?: string[]
}

export interface SaFiltersOptions {
  /**
   * The fields that can be filtered on. Read when needed rather than once, since a source may only
   * say so after the first records have arrived.
   */
  fields: () => SaFilterField[]
  /** Called when the answer the filters give has changed, which is when to read the list again. */
  onChange?: () => void
  initial?: SaFilterStart[]
}

/**
 * Holds what narrows one list, for as long as the screen listing it lives.
 *
 * [onChange] is called only where the answer moves. A filter that could not be answered before or
 * after a change was left out of the request both times, so asking again would ask what is already
 * on screen, and take the person back to the first page to do it.
 */
export function useSaFilters(options: SaFiltersOptions): SaFilters {
  let nextId = 0

  const criteria = ref<SaFilterCriterion[]>(
    (options.initial ?? []).map((start) => ({
      id: nextId++,
      field: start.field,
      operator: start.operator,
      value: start.value ?? '',
      values: start.values ?? []
    }))
  )
  const added = ref<number | null>(null)

  const fields = computed(options.fields)
  const complete = computed(() => criteria.value.filter(saFilterIsComplete))

  function add(field: string): number | undefined {
    const known = fields.value.find((candidate) => candidate.field === field)
    if (!known) {
      return undefined
    }
    const criterion: SaFilterCriterion = {
      id: nextId++,
      field,
      operator: saFilterDefaultOperator(known.type, known.operators),
      value: '',
      values: []
    }
    criteria.value.push(criterion)
    added.value = criterion.id
    // A filter just opened holds no value and narrows nothing, unless its operator takes none: a
    // field first opening on `is_null` can be answered the moment it is added.
    if (saFilterIsComplete(criterion)) {
      options.onChange?.()
    }
    return criterion.id
  }

  function update(id: number, patch: SaFilterPatch) {
    const criterion = criteria.value.find((candidate) => candidate.id === id)
    if (!criterion) {
      return
    }
    const wasComplete = saFilterIsComplete(criterion)
    Object.assign(criterion, patch)
    if (wasComplete || saFilterIsComplete(criterion)) {
      options.onChange?.()
    }
  }

  function remove(id: number) {
    const criterion = criteria.value.find((candidate) => candidate.id === id)
    if (!criterion) {
      return
    }
    criteria.value = criteria.value.filter((candidate) => candidate.id !== id)
    // One that could never be answered was never asked, and dropping it widens nothing. A filter
    // opened and left closes this way, so this is the path most removals take.
    if (saFilterIsComplete(criterion)) {
      options.onChange?.()
    }
  }

  function clear() {
    const narrowed = complete.value.length > 0
    criteria.value = []
    if (narrowed) {
      options.onChange?.()
    }
  }

  function isFiltered(field: string): boolean {
    return complete.value.some((criterion) => criterion.field === field)
  }

  return reactive({
    fields,
    criteria,
    complete,
    added,
    add,
    update,
    remove,
    clear,
    isFiltered
  }) as SaFilters
}
