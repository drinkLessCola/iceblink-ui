import { buildProps, definePropType, IconPropType } from '@iceblink/utils'
import { Measurable } from '@iceblink/tokens'
import { PopperColorMode, PopperRoleType } from '@iceblink/components/popper'
export const placementType = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'] as const
export const triggerType = ['hover', 'click', 'contextmenu'] as const

interface DropdownOption {
  label?: string
  key?: string | number
  shortcut?: string | string[]
  icon?: typeof IconPropType
  disabled?: boolean
  children?: DropdownOption[]
}

export type DropdownGroup = Array<DropdownOption>
export type DropdownMenu = {
  options?: DropdownGroup[]
}

export const dropdownProps = buildProps({
  options: {
    type: definePropType<DropdownGroup[]>(Array),
  },
  size: String, // 整合一下 button 的 size
  /** @description 菜单的最大高度 */
  // maxHeight: {
  //   type: definePropType<string | number>([String, Number]),
  // },
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
  tabindex: {
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
  teleported: Boolean,
})


export const dropdownEmits = {
  visibleChange: () => true,
  click: () => true,
}



