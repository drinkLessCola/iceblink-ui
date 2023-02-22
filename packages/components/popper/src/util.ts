import { Measurable } from '@iceblink/tokens';
import { ComponentPublicInstance } from 'vue';
import { MaybeRef, unrefElement, isClient } from '@vueuse/core'
export const unwrapMeasurableElem = (
  $el: MaybeRef<Measurable | ComponentPublicInstance | undefined>
) => {
  // 检测环境是否为客户端
  // if(!isClient) return
  return unrefElement($el as HTMLElement)
}