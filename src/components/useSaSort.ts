import { computed, reactive, ref } from 'vue'

/** One key a list is ordered on, read from the largest value to the smallest under [descending]. */
export interface SaSortKey {
  field: string
  descending: boolean
}

/** One field a list can be ordered on. */
export interface SaSortField {
  field: string
  /** What the field is called on screen. */
  name: string
}

/**
 * The order of one list. This is what plugs a list into `SaTableHeader` and `SaTableSort`:
 * whoever holds the records holds one of these, says which fields it orders on, and reads [asked]
 * when it asks for them.
 */
export interface SaSort {
  /** The fields the list can be ordered on. */
  readonly fields: SaSortField[]
  /** The order a person asked for, which is empty until they do. */
  readonly asked: SaSortKey[]
  /** The order the list reads in: what was asked, or the list's own where nothing was. */
  readonly keys: SaSortKey[]
  sortsOn: (field: string) => boolean
  /** The direction [field] is read in, for the header of its column. */
  directionOf: (field: string) => 'ascending' | 'descending' | undefined
  /** Moves [field] on to its next order: ascending, then descending, then the list's own. */
  toggle: (field: string) => void
  /** Orders on [field] in the direction named. */
  set: (field: string, descending: boolean) => void
  /** Goes back to the list's own order. */
  clear: () => void
}

export interface SaSortOptions {
  /**
   * The fields the list can be ordered on. Read when needed rather than once, since a source may
   * only say so after the first records have arrived.
   */
  fields: () => SaSortField[]
  /** The order the list takes where nothing was asked, so that a column can say so. */
  defaultKeys?: () => SaSortKey[]
  /** Called when the order has changed, which is when to read the list again. */
  onChange?: () => void
  initial?: SaSortKey[]
}

/**
 * Holds the order of one list, for as long as the screen listing it lives. A header names one key at
 * a time, and [keys] is a list because a list's own order may have several.
 */
export function useSaSort(options: SaSortOptions): SaSort {
  const asked = ref<SaSortKey[]>(options.initial ?? [])

  const fields = computed(options.fields)
  const keys = computed(() =>
    asked.value.length > 0 ? asked.value : (options.defaultKeys?.() ?? [])
  )

  function sortsOn(field: string): boolean {
    return fields.value.some((candidate) => candidate.field === field)
  }

  function directionOf(field: string): 'ascending' | 'descending' | undefined {
    // Read from the order the list is in rather than the one asked, so that the column a list arrives
    // ordered on says so before anything is pressed.
    const key = keys.value.find((candidate) => candidate.field === field)
    if (!key) {
      return undefined
    }
    return key.descending ? 'descending' : 'ascending'
  }

  function set(field: string, descending: boolean) {
    if (!sortsOn(field)) {
      return
    }
    asked.value = [{ field, descending }]
    options.onChange?.()
  }

  function clear() {
    if (asked.value.length === 0) {
      return
    }
    asked.value = []
    options.onChange?.()
  }

  function toggle(field: string) {
    const only =
      asked.value.length === 1 && asked.value[0].field === field ? asked.value[0] : undefined
    if (!only) {
      set(field, false)
    } else if (!only.descending) {
      set(field, true)
    } else {
      clear()
    }
  }

  return reactive({ fields, asked, keys, sortsOn, directionOf, toggle, set, clear }) as SaSort
}
