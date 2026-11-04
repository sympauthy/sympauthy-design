import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import '../../../src/fonts.css'
import '../../../dist/tokens.css'
import './brand.css'
import './demos.css'
import TokenTable from './TokenTable.vue'
import {
  SaAlert,
  SaAppShell,
  SaBrandLogo,
  SaBreadcrumb,
  SaButton,
  SaCard,
  SaConfirmDialog,
  SaCopyableValue,
  SaCopyButton,
  SaDefinitionList,
  SaDefinitionRow,
  SaDetailSection,
  SaDialog,
  SaEmptyValue,
  SaField,
  SaInput,
  SaListbox,
  SaLoadingState,
  SaMenu,
  SaPageActions,
  SaPagination,
  SaPopover,
  SaRadioGroup,
  SaSelect,
  SaSidebar,
  SaSkeleton,
  SaSpinner,
  SaSummaryCard,
  SaSummaryField,
  SaTable,
  SaTableCell,
  SaTableHeader,
  SaTabs,
  SaTag,
  SaTagsInput,
  SaTextarea,
  SaTooltip,
  SaTooltipProvider
} from '../../../src/index'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // The Common components, registered for the live demos in pages/components/*.md.
    app.component('SaAlert', SaAlert)
    app.component('SaAppShell', SaAppShell)
    app.component('SaBrandLogo', SaBrandLogo)
    app.component('SaBreadcrumb', SaBreadcrumb)
    app.component('SaButton', SaButton)
    app.component('SaCard', SaCard)
    app.component('SaConfirmDialog', SaConfirmDialog)
    app.component('SaCopyableValue', SaCopyableValue)
    app.component('SaCopyButton', SaCopyButton)
    app.component('SaDefinitionList', SaDefinitionList)
    app.component('SaDefinitionRow', SaDefinitionRow)
    app.component('SaDetailSection', SaDetailSection)
    app.component('SaDialog', SaDialog)
    app.component('SaEmptyValue', SaEmptyValue)
    app.component('SaField', SaField)
    app.component('SaInput', SaInput)
    app.component('SaListbox', SaListbox)
    app.component('SaLoadingState', SaLoadingState)
    app.component('SaMenu', SaMenu)
    app.component('SaPageActions', SaPageActions)
    app.component('SaPagination', SaPagination)
    app.component('SaPopover', SaPopover)
    app.component('SaRadioGroup', SaRadioGroup)
    app.component('SaSelect', SaSelect)
    app.component('SaSidebar', SaSidebar)
    app.component('SaSkeleton', SaSkeleton)
    app.component('SaSpinner', SaSpinner)
    app.component('SaSummaryCard', SaSummaryCard)
    app.component('SaSummaryField', SaSummaryField)
    app.component('SaTable', SaTable)
    app.component('SaTableCell', SaTableCell)
    app.component('SaTableHeader', SaTableHeader)
    app.component('SaTabs', SaTabs)
    app.component('SaTag', SaTag)
    app.component('SaTagsInput', SaTagsInput)
    app.component('SaTextarea', SaTextarea)
    app.component('SaTooltip', SaTooltip)
    app.component('SaTooltipProvider', SaTooltipProvider)
    // The token tables of pages/foundations/*.md, read from tokens.json.
    app.component('TokenTable', TokenTable)
  }
} satisfies Theme
