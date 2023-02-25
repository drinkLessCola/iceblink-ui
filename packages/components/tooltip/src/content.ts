import { useNamespace } from '@iceblink/hooks';
import { buildProps, definePropType } from '@iceblink/utils';
import { popperContentProps } from '@iceblink/components/popper';

const ns = useNamespace('tooltip')

export const tooltipContentProps = buildProps({
  ...popperContentProps,
  appendTo: {
    type: definePropType<HTMLElement | String>([Object, String]),
  },
  content: String,
  /** @description 是否使用 teleport， true 会被追加到 appendTo 的位置 */
  teleported: Boolean,
  tabindex: {
    type: Number,
    default: 0
  },
  /** @description 动画名称 */
  transition: {
    type: String,
    default: `${ns.namespace}-fade-in-linear`
  },
  /** @description 受控模式自行控制 popper 的显示 */
  visible: {
    type: definePropType<Boolean | null>([Boolean]),
    default: null
  },
  virtualTriggering: Boolean,
  ariaLabel: String,
})
