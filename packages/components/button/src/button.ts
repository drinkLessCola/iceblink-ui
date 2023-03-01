import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@iceblink/utils'
import { IconPropType } from '@iceblink/utils/icons'
// import { Loading } from '@iceblink/svg-icons/src/components'
import Loading from './loading.vue'
import { useSizeProps } from '@iceblink/hooks/use-size'

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'info', 'danger'] as const
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const
export const iconAlignTypes = ['left', 'right'] as const


// buildProps 首先会将有 values 的属性的类型变为联合类型！
export const buttonProps = buildProps({
  /** @description 尺寸 */
  size: useSizeProps,
  /** @description 按钮类型 */
  type: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  /** @description 原生类型 */
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button'
  },
  /** @description 图标 */
  icon: {
    type: IconPropType,
  },
  /** @description 图标相对按钮的位置 */
  iconAlign: {
    type: String,
    values: iconAlignTypes,
  },

  /** @description 自动聚焦 */
  autofocus: Boolean,
  /** @description 块级按钮 */
  block: Boolean,
  /** @description 禁用状态 */
  disabled: Boolean,
  /** @description 加载状态 */
  loading: Boolean,

  /** @description 加载图标 */
  loadingIcon: {
    type: IconPropType,
    default: () => Loading
  },

  // 按钮风格
  /** @description 扁平按钮: hover 时背景加深, 背景为浅色 */
  plain: Boolean,
  /** @description 文字按钮: hover 时背景加深, 背景为灰色 */
  text: Boolean,
  /** @description 链接按钮：hover 时文字变色，无背景 */
  link: Boolean,

  /** @description 按钮是否无背景 */
  ghost: Boolean,
  /** @description 按钮是否具有边框 */
  border: Boolean,
  /** @description 按钮边框是否为虚线 */
  dashed: Boolean,

  // 按钮边框风格
  /** @description 圆角 */
  round: Boolean,
  /** @description 圆形 */
  circle: Boolean,

  /** @description 按钮的颜色 */
  color: String,
  /** @description 暗黑模式 */
  dark: Boolean,
  /** @description 按钮文字的颜色 */
  textColor: String,
  /** @description 按钮文字是否加粗 */
  bold: Boolean,

  /** @description 在按钮文字之间自动插入空格 */
  autoInsertSpace: {
    type: Boolean,
    default: undefined
  }
} as const)

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonType = ButtonProps['type']
export type ButtonNativeType = ButtonProps['nativeType']