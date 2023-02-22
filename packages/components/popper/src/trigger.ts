/* eslint-disable no-unused-vars */
import { buildProps, definePropType } from '@iceblink/utils'
import { Measurable } from '@iceblink/tokens'

export const popperTriggerProps = buildProps({
  targetRef: {
    type: definePropType<Measurable>(Object),
  },
  targetTriggering: Boolean,
  triggerRef: {
    type: definePropType<Measurable | undefined>(Object)
  },
  id: String,
  open: Boolean,
})
