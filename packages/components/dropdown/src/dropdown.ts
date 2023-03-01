import { buildProps, definePropType, IconType } from '@iceblink/utils'
import { Measurable } from '@iceblink/tokens'
import { PopperColorMode, PopperRoleType } from '@iceblink/components/popper'
import { useSizeProps } from '@iceblink/hooks'
export const placementType = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'right', 'left'] as const
export const triggerType = ['hover', 'click', 'contextmenu'] as const

export interface DropdownOption {
  type?: string
  label?: string
  key?: string | number
  shortcut?: string | string[]
  icon?: IconType
  disabled?: boolean
  children?: DropdownOption[]
}

export const dropdownProps = buildProps({
  options: {
    type: definePropType<DropdownOption[]>(Array),
  },
  size: useSizeProps, // 整合一下 button 的 size
  /** @description 菜单弹出位置 */
  placement: {
    type: String,
    values: placementType,
    default: 'bottom'
  },
  /** @description 触发方式 */
  trigger: {
    type: String,
    values: triggerType,
    default: 'hover'
  },
  /** @description 与触发器的距离 */
  offset: Number,
  showArrow: {
    type: Boolean,
    default: true
  },
  /** @description 点击菜单项后隐藏菜单 */
  hideOnClick: {
    type: Boolean,
    default: true
  },
  showDelay: {
    type: Number,
    default: 0
  },
  hideDelay: {
    type: Number,
    default: 200
  },
  role: {
    type: definePropType<PopperRoleType>(String),
    default: 'menu'
  },
  tabindex: { // TODO
    type: Number,
    default: 0
  },
  popperClass: {
    type: String,
    default: ''
  },
  /** @description 虚拟触发器元素 */
  virtualRef: {
    type: definePropType<Measurable>(Object),
  },
  /** @description 是否使用虚拟触发 */
  virtualTriggering: Boolean,
  colorMode: { 
    type: definePropType<PopperColorMode>(String),
    default: 'light'
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: true
  },
})


export const dropdownEmits = {
  visibleChange: () => true,
  click: () => true,
}

// const option = { label: '分享', key: 'share', disabled: true }
// type B = typeof option
// type A = B extends DropdownOption? true : false