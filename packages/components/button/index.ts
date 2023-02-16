import Button from './src/button.vue'
import { withInstall } from '@iceblink/utils/install'
// 生成带有 install 方法的组件
export const IceButton = withInstall(Button)
export default IceButton
export type { ButtonProps } from './src/button'

// for volar
declare module 'vue' {
  export interface GlobalComponents {
    IceButton: typeof IceButton;
  }
}

export * from './src/button'