import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/dist/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path from 'path'

export default defineConfig({
  plugins: [DefineOptions(), vue(), vueJsx(), createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[name]'
  })],
})