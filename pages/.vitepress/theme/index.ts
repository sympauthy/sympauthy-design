import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import '../../../src/fonts.css'
import '../../../dist/tokens.css'
import './brand.css'
import './demos.css'
import {
  CommonAlert,
  CommonButton,
  CommonCard,
  CommonSpinner,
  FormField,
  FormInput
} from '../../../src/index'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // The Common components, registered for the live demos in pages/components/*.md.
    app.component('CommonAlert', CommonAlert)
    app.component('CommonButton', CommonButton)
    app.component('CommonCard', CommonCard)
    app.component('CommonSpinner', CommonSpinner)
    app.component('FormField', FormField)
    app.component('FormInput', FormInput)
  }
} satisfies Theme
