/**
 * What a filter asks of the field it names. The set is closed: a source of filters says which of
 * these a field admits, and leaves the words to whatever draws them.
 */
export const SA_FILTER_OPERATORS = [
  'eq',
  'ne',
  'lt',
  'lte',
  'gt',
  'gte',
  'in',
  'contains',
  'starts_with',
  'is_null'
] as const

export type SaFilterOperator = (typeof SA_FILTER_OPERATORS)[number]

/** What kind of value a field holds, which decides the operator it opens on and its control. */
export const SA_FILTER_TYPES = [
  'string',
  'email',
  'phone_number',
  'timezone',
  'uuid',
  'enum',
  'boolean',
  'number',
  'date',
  'date_time'
] as const

export type SaFilterType = (typeof SA_FILTER_TYPES)[number]

/** One value of a field whose set is closed. */
export interface SaFilterValue {
  value: string
  name: string
}

/** One field a list can be filtered on. */
export interface SaFilterField {
  field: string
  /** What the field is called on screen. */
  name: string
  type: SaFilterType
  /** The operators it admits, from the most used to the least. */
  operators: SaFilterOperator[]
  /** The set its value is picked from, where the set is closed. */
  values?: SaFilterValue[] | null
}

/** A field as a source describes it, before anything has checked that it can be drawn. */
export interface SaFilterFieldDescription {
  field: string
  name: string
  type: string
  operators: string[]
  values?: SaFilterValue[] | null
}

/**
 * One filter narrowing a list: a field, an operator that field admits, and the value the two are
 * asked of.
 *
 * [id] identifies the filter and never leaves the screen. A field may carry more than one filter,
 * which is how a range is asked for, so the field is not what addresses one.
 */
export interface SaFilterCriterion {
  id: number
  field: string
  operator: SaFilterOperator
  /** Under `in`, the values picked; under `is_null`, ignored; otherwise one value. */
  value: string
  values: string[]
}

/** What changes of a filter. */
export type SaFilterPatch = Partial<Omit<SaFilterCriterion, 'id'>>

/**
 * The operator a field of this type opens on, which is the one its values are most often asked by:
 * a person typing part of a name means `contains`, and a date is nearly always a lower bound.
 */
const DEFAULT_OPERATORS: Record<SaFilterType, SaFilterOperator> = {
  string: 'contains',
  email: 'contains',
  phone_number: 'contains',
  timezone: 'eq',
  uuid: 'eq',
  enum: 'eq',
  boolean: 'eq',
  number: 'gte',
  date: 'gte',
  date_time: 'gte'
}

/**
 * The operator a filter over a field of [type] opens on, taken from [admitted] when the type's own
 * default is not one of them: a field narrowing the set its type admits may not admit it.
 */
export function saFilterDefaultOperator(
  type: SaFilterType,
  admitted: SaFilterOperator[]
): SaFilterOperator {
  const preferred = DEFAULT_OPERATORS[type]
  return admitted.includes(preferred) ? preferred : (admitted[0] ?? 'eq')
}

/** Whether an operator takes no value at all: a row either carries a value for the field or not. */
export function saFilterIsValueless(operator: SaFilterOperator): boolean {
  return operator === 'is_null'
}

/** Whether an operator takes several values. */
export function saFilterIsMultiValued(operator: SaFilterOperator): boolean {
  return operator === 'in'
}

/**
 * Whether a filter can be answered as it stands, which is what keeps one a person has opened and
 * not yet filled from narrowing the list to nothing.
 */
export function saFilterIsComplete(criterion: SaFilterCriterion): boolean {
  if (saFilterIsValueless(criterion.operator)) {
    return true
  }
  if (saFilterIsMultiValued(criterion.operator)) {
    return criterion.values.length > 0
  }
  return criterion.value !== ''
}

/**
 * The set a filter over [field] picks its value from, or `null` where the field takes any value it
 * is given. A boolean has a set of two without publishing one, and [yes] and [no] are the words the
 * app draws it with.
 */
export function saFilterValues(
  field: SaFilterField,
  yes: string,
  no: string
): SaFilterValue[] | null {
  if (field.values && field.values.length > 0) {
    return field.values
  }
  if (field.type === 'boolean') {
    return [
      { value: 'true', name: yes },
      { value: 'false', name: no }
    ]
  }
  return null
}

/**
 * The fields of [descriptions] that can be drawn: those whose type is known and which admit at least
 * one known operator.
 *
 * A source newer than the package may describe a field it has no control for. Dropping that field
 * leaves every other one usable, where trusting it would put a filter on screen that cannot be
 * filled, and refusing them all would blank the toolbar.
 */
export function saFilterKnownFields(descriptions: SaFilterFieldDescription[]): SaFilterField[] {
  const fields: SaFilterField[] = []
  for (const description of descriptions) {
    const type = SA_FILTER_TYPES.find((known) => known === description.type)
    if (!type) {
      continue
    }
    const operators = SA_FILTER_OPERATORS.filter((known) => description.operators.includes(known))
    if (operators.length === 0) {
      continue
    }
    fields.push({ ...description, type, operators })
  }
  return fields
}

/**
 * The words the filters of a table draw, since the package reads no message bundle. An app builds
 * this once, and the same object reaches `SaTableFilters` and `SaTableFilterPicker`.
 */
export interface SaFilterLabels {
  /** Names the list of filters, as "Active filters". */
  list: string
  /** The control removing them all, as "Clear filters". */
  clear: string
  /** The control adding one, as "Add filter". */
  add: string
  /** Names what is searched among the fields, as "Search fields". */
  searchFields: string
  /** Names what is searched among a field's values, as "Search values". */
  searchValues: string
  /** Said when a search matches nothing, as "Nothing matches". */
  noMatch: string
  /** The field choosing the operator, as "Condition". */
  operator: string
  /** The field holding the value, as "Value". */
  value: string
  /** Read where a filter has no value yet, as "Choose…". */
  selectValue: string
  /** The field entering several values, as "Add a value". */
  addValue: string
  /** The control removing one of those values, as "Remove". */
  removeValue: string
  /** The two values of a boolean. */
  yes: string
  no: string
  /** Names the control removing a filter, as "Remove the Status filter". */
  removeFilter: (fieldName: string) => string
  /** What an operator reads, which can differ by type: "is before" over a date, not "is less than". */
  operatorName: (operator: SaFilterOperator, type: SaFilterType) => string
}
