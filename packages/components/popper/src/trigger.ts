/* eslint-disable no-unused-vars */
import { buildProps, definePropType } from '@iceblink/utils'
import { Measurable } from '@iceblink/tokens'

export const popperTriggerProps = buildProps({
  /** @description 虚拟触发器元素 */
  virtualRef: {
    type: definePropType<Measurable>(Object),
  },
  /** @description 是否使用虚拟触发 */
  virtualTriggering: Boolean,
  id: String,
  open: Boolean,
})
