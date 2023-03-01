import { buildProps } from '@iceblink/utils'
import { ExtractPropTypes } from 'vue'

export const scrollbarProps = buildProps({
  thumbSize: {
    type: Number,
    default: 10,
  },
  width: {
    type: [Number, String]
  },
  height: {
    type: [Number, String]
  },
  maxHeight: {
    type: [Number, String],
  },
  alwaysVisible: Boolean,
  /** @description 滚动容器 wrap 的大小与父元素适配 */
  fitParent: Boolean,
})

export const thumbProps = buildProps({
  /** @description 滚动条滑块的偏移量 */
  offset: {
    type: Number,
    required: true
  },
  /** @description 滚动条轨道的长度 */
  barLength: {
    type: Number,
    required: true
  },
  /** @description 滚动条滑块的长度 */
  thumbLength: {
    type: Number,
    required: true
  },
  visible: Boolean,
  vertical: Boolean,
} as const)

export type ThumbPropsType = ExtractPropTypes<typeof thumbProps>
export const BAR_MAP = {
  vertical: {
    axis: 'Y',
    size: 'width',
    length: 'height',
    client: 'clientTop',
    clientCoord: 'clientY',
    directionStart: 'top',
    key: 'vertical',
  },
  horizontal: {
    axis: 'X',
    size: 'height',
    length: 'width',
    client: 'clientLeft',
    clientCoord: 'clientX',
    directionStart: 'left',
    key: 'horizontal',
  }
} as const


export const genThumbStyle = (
  { 
    offset, 
    thumbLength, 
    bar 
  }: Pick<ThumbPropsType, 'thumbLength' | 'offset'> & {
    bar: typeof BAR_MAP[keyof typeof BAR_MAP]
  }
) => {
  const { axis, length: lengthAttr } = bar
  return {
    transform: `translate${axis}(${offset}px)`,
    [lengthAttr]: thumbLength + 'px',
  }
}