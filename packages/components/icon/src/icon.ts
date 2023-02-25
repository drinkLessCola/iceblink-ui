import { buildProps, definePropType } from '@iceblink/utils'
import type { ExtractPropTypes } from 'vue'

export const iconProps = buildProps({
  /** @description SVG icon size */
  size: {
    type: definePropType<number | string>([Number, String])
  },
  /** @description SVG tag's fill attribute */
  color: {
    type: String
  },
  icon: String,
} as const)

export type IconProps = ExtractPropTypes<typeof iconProps>