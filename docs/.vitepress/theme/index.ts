import DefaultTheme from 'vitepress/theme'
import '@iceblink/theme-chalk/src/index.css'
import { IceButton, IceIcon, IceDropdown, IceDropdownMenu, IceDropdownItem } from '@iceblink/components'
import { Flower } from '@iceblink/svg-icons/src/components'
// 主题样式
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)

    app.component('IceButton', IceButton)
    app.component('IceIcon', IceIcon)
    app.component('IceDropdown', IceDropdown)
    app.component('IceDropdownMenu', IceDropdownMenu)
    app.component('IceDropdownItem', IceDropdownItem)
    app.component('Flower', Flower)

  },
};