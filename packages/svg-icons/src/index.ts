import { App, defineAsyncComponent } from 'vue'
export default {
  install(app: App) {
    const iconComponents = import.meta.glob('./components/*.vue')
    console.log(iconComponents)
    for(const icon of Object.values(iconComponents)) {
      console.log(icon)
      app.component(icon.name, defineAsyncComponent(icon))
    }
  }
}