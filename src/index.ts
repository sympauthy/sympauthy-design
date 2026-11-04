// Components of the Common group: any app can draw them, from this one source.
export { default as BrandLogo } from './components/BrandLogo.vue'
export { default as CommonAlert } from './components/CommonAlert.vue'
export { default as CommonAppShell } from './components/CommonAppShell.vue'
export { default as CommonBreadcrumb, type BreadcrumbItem } from './components/CommonBreadcrumb.vue'
export { default as CommonButton } from './components/CommonButton.vue'
export { default as CommonCard } from './components/CommonCard.vue'
export { default as CommonDialog } from './components/CommonDialog.vue'
export { default as CommonMenu, type MenuItem } from './components/CommonMenu.vue'
export { default as CommonPagination } from './components/CommonPagination.vue'
export { default as CommonPopover } from './components/CommonPopover.vue'
export {
  default as CommonSidebar,
  type SidebarEntry,
  type SidebarSection
} from './components/CommonSidebar.vue'
export { default as CommonSkeleton } from './components/CommonSkeleton.vue'
export { default as CommonSpinner } from './components/CommonSpinner.vue'
export { default as CommonTable } from './components/CommonTable.vue'
export { default as CommonTag } from './components/CommonTag.vue'
export { default as CommonTooltip } from './components/CommonTooltip.vue'
export { default as CommonTooltipProvider } from './components/CommonTooltipProvider.vue'
export { default as ConfirmDialog } from './components/ConfirmDialog.vue'
export { default as CopyableValue } from './components/CopyableValue.vue'
export { default as CopyToClipboard } from './components/CopyToClipboard.vue'
export { default as EmptyValue } from './components/EmptyValue.vue'
export { default as FormField } from './components/FormField.vue'
export { default as FormInput } from './components/FormInput.vue'
export { default as FormListbox, type ListboxOption } from './components/FormListbox.vue'
export { default as FormSelect } from './components/FormSelect.vue'
export { default as FormTagsInput } from './components/FormTagsInput.vue'
export { default as FormTextarea } from './components/FormTextarea.vue'
export { default as LoadingState } from './components/LoadingState.vue'
export { default as PageActions } from './components/PageActions.vue'
export { PAGE_ACTIONS_OUTLET } from './components/pageActionsOutlet'
export { default as TableCell } from './components/TableCell.vue'
export { default as TableHeader } from './components/TableHeader.vue'
export { useAutoPageSize, type AutoPageSizeOptions } from './components/useAutoPageSize'
export {
  type ButtonStyle,
  dangerColoredButton,
  outlineColoredButton,
  primaryColoredButton,
  secondaryColoredButton
} from './components/ButtonStyle'

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
