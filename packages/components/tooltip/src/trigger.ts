import { buildProps, definePropType } from '@iceblink/utils'
import { Arrayable } from 'vitest'
import { popperTriggerProps } from '@iceblink/components/popper'

export type TooltipTriggerType = 'click' | 'hover' | 'contextmenu' | 'focus'

export const tooltipTriggerProps = buildProps({
  ...popperTriggerProps,
  /** @description 触发方式 */
  trigger: {
    type: definePropType<Arrayable<TooltipTriggerType>>([String, Array]),
    default: 'hover'
  }
})
