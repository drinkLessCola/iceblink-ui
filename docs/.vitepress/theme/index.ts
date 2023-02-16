import DefaultTheme from 'vitepress/theme'
import '@iceblink/theme-chalk/src/index.css'
import { IceButton, IceIcon } from '@iceblink/components'
import { Flower } from '@iceblink/svg-icons/src/components'

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component('IceButton', IceButton),
    app.component('IceIcon', IceIcon),
    app.component('Flower', Flower)
  },
};