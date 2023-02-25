/* eslint-disable no-unused-vars */
import { useTimeout } from '../use-timeout'
import { ToRefs, unref } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@iceblink/utils'

export const useDelayedToggleProps = buildProps({
  showDelay: {
    type: Number,
    default: 0,
  },
  hideDelay: {
    type: Number,
    default: 200,
  }
} as const)

// showDelay 和 hideDelay 以 ref 形式传入：
export type UseDelayedToggleProps = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<ExtractPropTypes<typeof useDelayedToggleProps>>

export const useDelayedToggle = ({
  open,
  close,
  showDelay,
  hideDelay
}: UseDelayedToggleProps) => {
  const { registerTimeout } = useTimeout()

  const onOpen = (event?: Event) => {
    registerTimeout(() => open(event), unref(showDelay))
  }

  const onClose = (event?: Event) => {
    registerTimeout(() => close(event), unref(hideDelay))
  }
  return {
    onOpen,
    onClose
  }
}