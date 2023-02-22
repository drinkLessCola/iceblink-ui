import { buildProps } from '@iceblink/utils'

const colorMode = ['light', 'dark'] as const
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const

export const ColorMode = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export const roleTypes = [
  'dialog',
  'grid',
  'group',
  'listbox',
  'menu',
  'navigation',
  'tooltip',
  'tree',
] as const

export type PopperColorMode = typeof colorMode[number]
export type PopperTriggers = typeof triggers[number]

export const popperProps = buildProps({
  role: {
    type: String,
    values: roleTypes,
    default: 'tooltip',
  }
})
