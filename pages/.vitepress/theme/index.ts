import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import { createI18n } from 'vue-i18n'
import '../../../src/fonts.css'
import '../../../dist/tokens.css'
import './brand.css'
import './demos.css'
import TokenTable from './TokenTable.vue'
import DemoFrame from './DemoFrame.vue'
import DemoModes from './DemoModes.vue'
import DemoPageActions from './DemoPageActions.vue'
import {
  SaAlert,
  SaAppShell,
  SaBrandLogo,
  SaBreadcrumb,
  SaButton,
  SaCard,
  SaCombobox,
  SaConfirmDialog,
  SaCopyableValue,
  SaCopyButton,
  SaDefinitionList,
  SaDefinitionRow,
  SaDetailSection,
  SaDialog,
  SaDisclosure,
  SaEmptyValue,
  SaErrorSummary,
  SaField,
  SaInput,
  SaLink,
  SaListbox,
  SaLoadingState,
  SaMenu,
  SaPageActions,
  SaPagination,
  SaPasswordInput,
  SaPopover,
  SaRadioGroup,
  SaRecordLink,
  SaRecordViews,
  SaSelect,
  SaSidebar,
  SaSidebarAccount,
  SaSkeleton,
  SaSpinner,
  SaSummaryCard,
  SaSummaryField,
  SaTable,
  SaTableActions,
  SaTableCell,
  SaTableEnd,
  SaTableFilterPicker,
  SaTableFilters,
  SaTableHeader,
  SaTableRecord,
  SaTableSort,
  SaTabs,
  SaTag,
  SaTagsInput,
  SaTextarea,
  SaTooltip,
  SaTooltipProvider,
  SA_MESSAGES_EN
} from '../../../src/index'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // The package's words, in English, as an app adds them beside its own.
    app.use(
      createI18n({
        legacy: false,
        locale: 'en',
        fallbackLocale: 'en',
        messages: { en: SA_MESSAGES_EN }
      })
    )
    // The Common components, registered for the live demos in pages/components/*.md.
    app.component('SaAlert', SaAlert)
    app.component('SaAppShell', SaAppShell)
    app.component('SaBrandLogo', SaBrandLogo)
    app.component('SaBreadcrumb', SaBreadcrumb)
    app.component('SaButton', SaButton)
    app.component('SaCard', SaCard)
    app.component('SaCombobox', SaCombobox)
    app.component('SaConfirmDialog', SaConfirmDialog)
    app.component('SaCopyableValue', SaCopyableValue)
    app.component('SaCopyButton', SaCopyButton)
    app.component('SaDefinitionList', SaDefinitionList)
    app.component('SaDefinitionRow', SaDefinitionRow)
    app.component('SaDetailSection', SaDetailSection)
    app.component('SaDialog', SaDialog)
    app.component('SaDisclosure', SaDisclosure)
    app.component('SaEmptyValue', SaEmptyValue)
    app.component('SaErrorSummary', SaErrorSummary)
    app.component('SaField', SaField)
    app.component('SaInput', SaInput)
    app.component('SaLink', SaLink)
    app.component('SaListbox', SaListbox)
    app.component('SaLoadingState', SaLoadingState)
    app.component('SaMenu', SaMenu)
    app.component('SaPageActions', SaPageActions)
    app.component('SaPagination', SaPagination)
    app.component('SaPasswordInput', SaPasswordInput)
    app.component('SaPopover', SaPopover)
    app.component('SaRadioGroup', SaRadioGroup)
    app.component('SaRecordLink', SaRecordLink)
    app.component('SaRecordViews', SaRecordViews)
    app.component('SaSelect', SaSelect)
    app.component('SaSidebar', SaSidebar)
    app.component('SaSidebarAccount', SaSidebarAccount)
    app.component('SaSkeleton', SaSkeleton)
    app.component('SaSpinner', SaSpinner)
    app.component('SaSummaryCard', SaSummaryCard)
    app.component('SaSummaryField', SaSummaryField)
    app.component('SaTable', SaTable)
    app.component('SaTableActions', SaTableActions)
    app.component('SaTableCell', SaTableCell)
    app.component('SaTableEnd', SaTableEnd)
    app.component('SaTableFilterPicker', SaTableFilterPicker)
    app.component('SaTableFilters', SaTableFilters)
    app.component('SaTableHeader', SaTableHeader)
    app.component('SaTableRecord', SaTableRecord)
    app.component('SaTableSort', SaTableSort)
    app.component('SaTabs', SaTabs)
    app.component('SaTag', SaTag)
    app.component('SaTagsInput', SaTagsInput)
    app.component('SaTextarea', SaTextarea)
    app.component('SaTooltip', SaTooltip)
    app.component('SaTooltipProvider', SaTooltipProvider)
    // The token tables of pages/foundations/*.md, read from tokens.json.
    app.component('TokenTable', TokenTable)
    // The frames drawing a demo at the width of a device, alone or a tab per mode.
    app.component('DemoFrame', DemoFrame)
    app.component('DemoModes', DemoModes)
    app.component('DemoPageActions', DemoPageActions)
  }
} satisfies Theme
