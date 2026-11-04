import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import '../../../src/fonts.css'
import '../../../dist/tokens.css'
import './brand.css'
import './demos.css'
import TokenTable from './TokenTable.vue'
import {
  BrandLogo,
  CommonAlert,
  CommonAppShell,
  CommonBreadcrumb,
  CommonButton,
  CommonCard,
  CommonDialog,
  CommonMenu,
  CommonPagination,
  CommonPopover,
  CommonSidebar,
  CommonSkeleton,
  CommonSpinner,
  CommonTable,
  CommonTabs,
  CommonTag,
  CommonTooltip,
  CommonTooltipProvider,
  ConfirmDialog,
  CopyableValue,
  CopyToClipboard,
  DefinitionList,
  DefinitionRow,
  DetailSection,
  EmptyValue,
  FormField,
  FormInput,
  FormListbox,
  FormRadioGroup,
  FormSelect,
  FormTagsInput,
  FormTextarea,
  LoadingState,
  PageActions,
  SummaryCard,
  SummaryField,
  TableCell,
  TableHeader
} from '../../../src/index'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // The Common components, registered for the live demos in pages/components/*.md.
    app.component('BrandLogo', BrandLogo)
    app.component('CommonAlert', CommonAlert)
    app.component('CommonAppShell', CommonAppShell)
    app.component('CommonBreadcrumb', CommonBreadcrumb)
    app.component('CommonButton', CommonButton)
    app.component('CommonCard', CommonCard)
    app.component('CommonDialog', CommonDialog)
    app.component('CommonMenu', CommonMenu)
    app.component('CommonPagination', CommonPagination)
    app.component('CommonPopover', CommonPopover)
    app.component('CommonSidebar', CommonSidebar)
    app.component('CommonSkeleton', CommonSkeleton)
    app.component('CommonSpinner', CommonSpinner)
    app.component('CommonTable', CommonTable)
    app.component('CommonTabs', CommonTabs)
    app.component('CommonTag', CommonTag)
    app.component('CommonTooltip', CommonTooltip)
    app.component('CommonTooltipProvider', CommonTooltipProvider)
    app.component('ConfirmDialog', ConfirmDialog)
    app.component('CopyableValue', CopyableValue)
    app.component('CopyToClipboard', CopyToClipboard)
    app.component('DefinitionList', DefinitionList)
    app.component('DefinitionRow', DefinitionRow)
    app.component('DetailSection', DetailSection)
    app.component('EmptyValue', EmptyValue)
    app.component('FormField', FormField)
    app.component('FormInput', FormInput)
    app.component('FormListbox', FormListbox)
    app.component('FormRadioGroup', FormRadioGroup)
    app.component('FormSelect', FormSelect)
    app.component('FormTagsInput', FormTagsInput)
    app.component('FormTextarea', FormTextarea)
    app.component('LoadingState', LoadingState)
    app.component('PageActions', PageActions)
    app.component('SummaryCard', SummaryCard)
    app.component('SummaryField', SummaryField)
    app.component('TableCell', TableCell)
    app.component('TableHeader', TableHeader)
    // The token tables of pages/foundations/*.md, read from tokens.json.
    app.component('TokenTable', TokenTable)
  }
} satisfies Theme
