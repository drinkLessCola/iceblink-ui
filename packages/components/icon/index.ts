import Icon from './src/icon.vue'
import { withInstall } from '@iceblink/utils'

export const IceIcon = withInstall(Icon)
export default IceIcon
export type { IconProps } from './src/icon' 

declare module 'vue' {
  export interface GlobalComponents {
    IceIcon: typeof IceIcon
  }
}

export * from './src/icon'