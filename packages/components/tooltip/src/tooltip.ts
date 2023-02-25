import { popperArrowProps, popperProps } from '@iceblink/components/popper'
import { buildProps } from '@iceblink/utils'
import { ComputedRef } from 'vue'
import { tooltipTriggerProps } from './trigger'
import { tooltipContentProps } from './content'
import { useDelayedToggleProps } from '@iceblink/hooks'
export const placementType = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'] as const
export const triggerType = ['hover', 'click', 'contextmenu'] as const

export const tooltipProps = buildProps({
  ...popperProps,
  ...popperArrowProps,
  ...useDelayedToggleProps,
  ...tooltipContentProps,
  ...tooltipTriggerProps,
  showArrow: {
    type: Boolean,
    default: true
  },
  disabled: Boolean,
})

export const tooltipEmits = {
  visibleChange: () => true,
  click: () => true,
}

export interface IceDropdownInstance {
  onClose?: () => void,
  hideOnClick?: ComputedRef<boolean>
}