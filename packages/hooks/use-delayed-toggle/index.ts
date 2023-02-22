/* eslint-disable no-unused-vars */
import { withDefaults, defineProps } from 'vue'
import { useTimeout } from '../use-timeout'
import { ToRefs } from 'vue'
import { unref } from 'vue'

export const useDelayedToggleProps = withDefaults(defineProps<{
  showDelay?: number
  hideDelay?: number
}>(), {
  showDelay: 0,
  hideDelay: 2000
})

// showDelay 和 hideDelay 以 ref 形式传入：
export type UseDelayedToggleProps = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<typeof useDelayedToggleProps>

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