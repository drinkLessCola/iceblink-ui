/* eslint-disable indent */
import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective } from '@iceblink/hooks';
import { inject, withDirectives, defineComponent, VNode, Text, Fragment, cloneVNode } from 'vue';
import { NOOP } from '@vue/shared'
import { isObject } from '@iceblink/utils';

export const OnlyChild = defineComponent({
  name: 'IceOnlyChild',
  setup(_, { slots, attrs }) {
    // 更新 Ref 的函数 生成指令，在组件实例的指定生命周期执行该指令
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY)
    const forwardRefDirective = useForwardRefDirective(
      forwardRefInjection?.setForwardRef ?? NOOP
    )

    return () => {
      // 获取组件 slots 第一个元素
      const defaultSlot = slots.default?.()
      if(!defaultSlot) return null
      // TODO 添加警告
      if(defaultSlot.length > 1) return null

      const firstValidChild = getFirstValidChild(defaultSlot) 
      if(!firstValidChild) return null

      return withDirectives(cloneVNode(firstValidChild!, attrs), [
        // 添加自定义指令
        [forwardRefDirective]
      ])
    }
  }
})

const getFirstValidChild = (children: VNode[] | undefined): VNode | null => {
  if(!children) return null
  
  for(const child of children) {
    if(isObject(child)) {
      switch (child.type) {
        case Comment:
          continue
        case Text: 
        case 'svg':
          return wrapTextContent(child)
        case Fragment:
          return getFirstValidChild(child.children as VNode[])
        default:
          return child      
      }
    }
    return wrapTextContent(child)
  }
  return null
}

function wrapTextContent(content: string | VNode) {
  return <span>{content}</span>
}