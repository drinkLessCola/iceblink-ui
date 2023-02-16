import { defineConfig } from 'vite';
import VueMacros from 'unplugin-vue-macros/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        // vueJsx: VueJsx(),
      }
    })
  ],
});
