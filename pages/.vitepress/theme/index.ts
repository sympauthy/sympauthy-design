import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import '../../../src/fonts.css'
import '../../../dist/tokens.css'
import './brand.css'
import './demos.css'
import TokenTable from './TokenTable.vue'
import {
  BrandLogo,
  CommonAppShell,
  CommonBreadcrumb,
  CommonAlert,
  CommonButton,
  CommonCard,
  CommonDialog,
  CommonMenu,
  CommonPopover,
  CommonSidebar,
  CommonSkeleton,
  CommonSpinner,
  CommonTag,
  CommonTooltip,
  CommonTooltipProvider,
  ConfirmDialog,
  CopyableValue,
  CopyToClipboard,
  EmptyValue,
  FormField,
  FormInput,
  LoadingState,
  PageActions
} from '../../../src/index'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // The Common components, registered for the live demos in pages/components/*.md.
    app.component('BrandLogo', BrandLogo)
    app.component('CommonAppShell', CommonAppShell)
    app.component('CommonBreadcrumb', CommonBreadcrumb)
    app.component('CommonAlert', CommonAlert)
    app.component('CommonButton', CommonButton)
    app.component('CommonCard', CommonCard)
    app.component('CommonDialog', CommonDialog)
    app.component('CommonMenu', CommonMenu)
    app.component('CommonPopover', CommonPopover)
    app.component('CommonSidebar', CommonSidebar)
    app.component('CommonSkeleton', CommonSkeleton)
    app.component('CommonSpinner', CommonSpinner)
    app.component('CommonTag', CommonTag)
    app.component('CommonTooltip', CommonTooltip)
    app.component('CommonTooltipProvider', CommonTooltipProvider)
    app.component('ConfirmDialog', ConfirmDialog)
    app.component('CopyableValue', CopyableValue)
    app.component('CopyToClipboard', CopyToClipboard)
    app.component('EmptyValue', EmptyValue)
    app.component('FormField', FormField)
    app.component('FormInput', FormInput)
    app.component('LoadingState', LoadingState)
    app.component('PageActions', PageActions)
    // The token tables of pages/foundations/*.md, read from tokens.json.
    app.component('TokenTable', TokenTable)
  }
} satisfies Theme
