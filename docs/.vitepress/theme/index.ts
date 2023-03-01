import DefaultTheme from 'vitepress/theme'
import { IceButton, IceIcon, IceDropdown, IceDropdownMenu, IceDropdownItem, IceTooltip, IceScrollbar } from '@iceblink/components'
// 主题样式
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
import '@iceblink/theme-chalk/src/index.css'
import Icons from '@iceblink/svg-icons/src'

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(Icons)

    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)

    app.component('IceButton', IceButton)
    app.component('IceIcon', IceIcon)
    app.component('IceDropdown', IceDropdown)
    app.component('IceTooltip', IceTooltip)
    app.component('IceDropdownMenu', IceDropdownMenu)
    app.component('IceDropdownItem', IceDropdownItem)
    app.component('IceScrollbar', IceScrollbar)

  },
}