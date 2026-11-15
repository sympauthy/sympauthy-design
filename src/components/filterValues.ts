import { computed, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { saFilterValues, type SaFilterField, type SaFilterValue } from './saFilter'

/**
 * The set a filter over [field] picks its value from, a boolean's two worded with the package's
 * words, so that the sentence a filter reads and the list its value is picked from agree.
 */
export function useFilterValues(field: () => SaFilterField): ComputedRef<SaFilterValue[] | null> {
  const { t } = useI18n()
  return computed(() => saFilterValues(field(), t('sa.tableFilters.yes'), t('sa.tableFilters.no')))
}
