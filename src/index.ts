// Components of the Common group: any app can draw them, from this one source.
export { SA_PAGE_ACTIONS_OUTLET } from './components/pageActionsOutlet'
export { default as SaAlert } from './components/SaAlert.vue'
export { default as SaAppShell } from './components/SaAppShell.vue'
export { default as SaBrandLogo } from './components/SaBrandLogo.vue'
export { default as SaBreadcrumb, type SaBreadcrumbItem } from './components/SaBreadcrumb.vue'
export {
  default as SaButton,
  type SaButtonProps,
  type SaButtonVariant
} from './components/SaButton.vue'
export { default as SaCard } from './components/SaCard.vue'
export { default as SaConfirmDialog } from './components/SaConfirmDialog.vue'
export { default as SaCopyableValue } from './components/SaCopyableValue.vue'
export { default as SaCopyButton } from './components/SaCopyButton.vue'
export { default as SaDefinitionList } from './components/SaDefinitionList.vue'
export { default as SaDefinitionRow } from './components/SaDefinitionRow.vue'
export { default as SaDetailSection } from './components/SaDetailSection.vue'
export { default as SaDialog } from './components/SaDialog.vue'
export { default as SaEmptyValue } from './components/SaEmptyValue.vue'
export { default as SaField } from './components/SaField.vue'
export { default as SaInput } from './components/SaInput.vue'
export { default as SaListbox, type SaListboxOption } from './components/SaListbox.vue'
export { default as SaLoadingState } from './components/SaLoadingState.vue'
export { default as SaMenu, type SaMenuItem } from './components/SaMenu.vue'
export { default as SaPageActions } from './components/SaPageActions.vue'
export { default as SaPagination } from './components/SaPagination.vue'
export { default as SaPopover } from './components/SaPopover.vue'
export { default as SaRadioGroup } from './components/SaRadioGroup.vue'
export { default as SaSelect } from './components/SaSelect.vue'
export {
  default as SaSidebar,
  type SaSidebarEntry,
  type SaSidebarSection
} from './components/SaSidebar.vue'
export { default as SaSidebarAccount } from './components/SaSidebarAccount.vue'
export { default as SaSkeleton } from './components/SaSkeleton.vue'
export { default as SaSpinner } from './components/SaSpinner.vue'
export { default as SaRecordLink, type SaRecordLinkProps } from './components/SaRecordLink.vue'
export { default as SaRecordViews, type SaRecordView } from './components/SaRecordViews.vue'
export { default as SaSummaryCard } from './components/SaSummaryCard.vue'
export { default as SaSummaryField } from './components/SaSummaryField.vue'
export { default as SaTable } from './components/SaTable.vue'
export { default as SaTableActions } from './components/SaTableActions.vue'
export { default as SaTableCell } from './components/SaTableCell.vue'
export { default as SaTableEnd } from './components/SaTableEnd.vue'
export { default as SaTableFilterPicker } from './components/SaTableFilterPicker.vue'
export { default as SaTableFilters } from './components/SaTableFilters.vue'
export { default as SaTableHeader } from './components/SaTableHeader.vue'
export { default as SaTableRecord } from './components/SaTableRecord.vue'
export { default as SaTableSort, type SaSortLabels } from './components/SaTableSort.vue'
export { default as SaTabs, type Tab } from './components/SaTabs.vue'
export { default as SaTag, type SaTagVariant } from './components/SaTag.vue'
export { default as SaTagsInput } from './components/SaTagsInput.vue'
export { default as SaTextarea } from './components/SaTextarea.vue'
export { default as SaTooltip } from './components/SaTooltip.vue'
export { default as SaTooltipProvider } from './components/SaTooltipProvider.vue'
export { useSaAutoPageSize, type SaAutoPageSizeOptions } from './components/useSaAutoPageSize'
export { useSaListGrows } from './components/useSaListGrows'
export {
  useSaSort,
  type SaSort,
  type SaSortField,
  type SaSortKey,
  type SaSortOptions
} from './components/useSaSort'
export {
  useSaFilters,
  type SaFilterStart,
  type SaFilters,
  type SaFiltersOptions
} from './components/useSaFilters'
export {
  SA_FILTER_OPERATORS,
  SA_FILTER_TYPES,
  saFilterDefaultOperator,
  saFilterIsComplete,
  saFilterIsMultiValued,
  saFilterIsValueless,
  saFilterKnownFields,
  saFilterValues,
  type SaFilterCriterion,
  type SaFilterField,
  type SaFilterFieldDescription,
  type SaFilterLabels,
  type SaFilterOperator,
  type SaFilterPatch,
  type SaFilterType,
  type SaFilterValue
} from './components/saFilter'

// Branding: what the server answers under /branding, and a theme tried in the page before it is.
export { brandingUrls, fetchBrand, type Brand, type BrandingUrls } from './theme/brand'
export { applyTheme, themeToCss, type ApplyThemeOptions, type UiTheme } from './theme/apply'
export {
  contrast,
  derivePalette,
  normalizeHex,
  SYMPAUTHY_PRIMARY,
  type DerivedPalette,
  type GrayTint
} from './theme/derive'
export {
  FLOW_ROLES,
  NAV_ROLES,
  tokenVariable,
  type FlowRole,
  type NavRole,
  type Role
} from './theme/roles'
