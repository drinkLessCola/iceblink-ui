import { App, defineAsyncComponent } from 'vue'
import * as iconComponents from './components'
// export default {
//   install(app: App) {
//     const iconComponents = import.meta.glob('./components/*.vue')
//     for(const icon of Object.values(iconComponents)) {
//       const name = (icon as any).name.match(/([^/]*)\.vue$/)
//       if(name) {
//         app.component(name[1], defineAsyncComponent(icon as any))
//       }
//     }
//   }
// }

export default {
  install(app: App) {
    for(const icon of Object.values(iconComponents)) {
      app.component(icon.name, icon)
    }
  }
}