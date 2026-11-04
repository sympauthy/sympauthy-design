import { inject, type ComputedRef, type InjectionKey } from 'vue'

/**
 * The `id` of the line under a field, while it has one. `SaField` provides it and a control reads
 * it, so a screen reader reads the error or the hint with the control whichever control it is.
 */
export const FIELD_DESCRIPTION: InjectionKey<ComputedRef<string | undefined>> =
  Symbol('field-description')

export const useFieldDescription = () => inject(FIELD_DESCRIPTION, undefined)
