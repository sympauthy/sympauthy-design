import { inject, type ComputedRef, type InjectionKey } from 'vue'

/** What `SaField` tells the control it holds of its label. */
export interface FieldLabel {
  /** The `id` of the `<label>`, for a control naming itself with it and with what it shows. */
  id: string
  /** The words of the label, for a control drawing them again or naming a part of itself. */
  text: string
  /** Whether the field is marked optional, which a control offering a way back to empty reads. */
  optional: boolean
}

/**
 * The label of the field a control is drawn in. `SaField` provides it and a control reads it, so an
 * app writes the label and the optional mark once, on the field, whichever control it holds.
 */
export const FIELD_LABEL: InjectionKey<ComputedRef<FieldLabel>> = Symbol('field-label')

export const useFieldLabel = () => inject(FIELD_LABEL, undefined)
