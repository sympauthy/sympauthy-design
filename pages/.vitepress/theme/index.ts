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
  CommonTag,
  CopyableValue,
  CopyToClipboard,
  EmptyValue,
  FormField,
  FormInput,
  FormListbox,
  FormSelect,
  FormTagsInput,
  FormTextarea,
  LoadingState
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
    app.component('CommonTag', CommonTag)
    app.component('CopyableValue', CopyableValue)
    app.component('CopyToClipboard', CopyToClipboard)
    app.component('EmptyValue', EmptyValue)
    app.component('FormField', FormField)
    app.component('FormInput', FormInput)
    app.component('FormListbox', FormListbox)
    app.component('FormSelect', FormSelect)
    app.component('FormTagsInput', FormTagsInput)
    app.component('FormTextarea', FormTextarea)
    app.component('LoadingState', LoadingState)
    // The token tables of pages/foundations/*.md, read from tokens.json.
    app.component('TokenTable', TokenTable)
  }
} satisfies Theme
