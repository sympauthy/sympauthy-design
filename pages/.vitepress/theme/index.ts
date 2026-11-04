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
  CommonButton,
  CommonCard,
  CommonSkeleton,
  CommonSpinner,
  CommonTabs,
  CommonTag,
  CopyableValue,
  CopyToClipboard,
  DefinitionList,
  DefinitionRow,
  DetailSection,
  EmptyValue,
  FormField,
  FormInput,
  LoadingState,
  SummaryCard,
  SummaryField
} from '../../../src/index'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // The Common components, registered for the live demos in pages/components/*.md.
    app.component('BrandLogo', BrandLogo)
    app.component('CommonAlert', CommonAlert)
    app.component('CommonButton', CommonButton)
    app.component('CommonCard', CommonCard)
    app.component('CommonSkeleton', CommonSkeleton)
    app.component('CommonSpinner', CommonSpinner)
    app.component('CommonTabs', CommonTabs)
    app.component('CommonTag', CommonTag)
    app.component('CopyableValue', CopyableValue)
    app.component('CopyToClipboard', CopyToClipboard)
    app.component('DefinitionList', DefinitionList)
    app.component('DefinitionRow', DefinitionRow)
    app.component('DetailSection', DetailSection)
    app.component('EmptyValue', EmptyValue)
    app.component('FormField', FormField)
    app.component('FormInput', FormInput)
    app.component('LoadingState', LoadingState)
    app.component('SummaryCard', SummaryCard)
    app.component('SummaryField', SummaryField)
    // The token tables of pages/foundations/*.md, read from tokens.json.
    app.component('TokenTable', TokenTable)
  }
} satisfies Theme
