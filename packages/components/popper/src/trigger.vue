<template>
  <!-- v-bind + inheritAttrs 是为了使事件处理函数绑定到元素上 -->
  <ice-only-child 
    v-if="!virtualTriggering"
    v-bind="$attrs"
    :aria-controls="ariaControls"
    :aria-describedby="ariaDescribedby"
    :aria-expanded="ariaExpanded"
    :aria-haspopup="ariaHaspopup"
  >
    <slot />
  </ice-only-child>
</template>
<script setup lang="ts">
import { IceOnlyChild } from '@iceblink/components/slot'
import { computed, inject, onBeforeUnmount, onMounted, watch } from 'vue'
import { unrefElement } from '@vueuse/core';
import { POPPER_INJECTION_KEY } from '@iceblink/tokens'
import { isElement } from '@iceblink/utils';
import { isNil } from 'lodash';
import { useForwardRef } from '@iceblink/hooks';
import { popperTriggerProps } from './trigger';

defineOptions({
  name: 'IcePopperTrigger',
  inheritAttrs: false,
})

const props = defineProps(popperTriggerProps)

// 注入 triggerRef 并向子组件提供 setTriggerRef 方法
// 通过 OnlyChild 组件在其默认插槽的元素添加指令
// 在子元素挂载、更新、卸载的生命周期钩子中使用子元素更新 triggerRef
const { role, triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!
useForwardRef(triggerRef)


// aria-haspopup 属性指示：可由设置该属性的元素触发的
// 交互式弹出元素的可用性和类型。

// menu, listbox, tree, grid, dialog, true(相当于是 menu) 指示能够触发一个 popup 元素
// 其他值相当于 false

// 这里排除 tooltip 是因为 tooltip 不控制其他元素 && tooltip 不是可交互元素。
const ariaHaspopup = computed(() => {
  if(role && role.value !== 'tooltip') return role.value
  return undefined
})

// 当前元素(trigger)控制着 id 指示的另一个元素(popup 结构)
const ariaControls = computed(() => {
  return ariaHaspopup.value ? props.id : undefined
})

// 当前元素由 id 指示的元素进行描述, tooltip 的 content 由 trigger 指示
const ariaDescribedby = computed(() => {
  if(role && role.value === 'tooltip') {
    return props.open && props.id ? props.id : undefined
  }
  return undefined
})

// 元素展开状态 "true" | "false"
const ariaExpanded = computed(() => {
  console.log(props.open)
  return ariaHaspopup.value ? `${props.open}` : undefined
})

let cancelTriggerAriaWatch

onMounted(() => {
  // triggerRef 与 virtualRef 绑定
  // 虚拟触发
  watch(
    () => props.virtualRef,
    (virtualRef) => {
      if(virtualRef) {
        triggerRef.value = unrefElement(virtualRef as HTMLElement)
      }
    },
    { immediate: true }
  )

  // 监听 trigger 元素的变化，转移事件处理程序 和 动态修改新元素的 ARIA 属性
  watch(
    triggerRef,
    (elem, prevElem) => {
      cancelTriggerAriaWatch?.()
      cancelTriggerAriaWatch = undefined

      if(isElement(elem)) {
        // 为新的元素添加 props 上定义的事件处理函数
        // 为旧的元素移除事件处理函数
        (
          [
            'onMouseenter', 
            'onMouseleave', 
            'onClick', 
            'onKeydown',
            'onFocus',
            'onBlur',
            'onContextmenu'
          ] as const
        ).forEach((eventName) => {
          const handler = props[eventName]
          if(handler) {
            ;(elem as HTMLElement).addEventListener(
              eventName.slice(2).toLowerCase(),
              handler
            )
            ;(prevElem as HTMLElement).removeEventListener(
              eventName.slice(2).toLowerCase(),
              handler
            )
          }
        })
        
        // 监听 Aria Ref 的变化，动态修改元素的属性
        cancelTriggerAriaWatch = watch(
          [ariaControls, ariaDescribedby, ariaHaspopup, ariaExpanded],
          (ariaArr) => {
            [
              'aria-controls', 
              'aria-describedby', 
              'aria-haspopup', 
              'aria-expanded',
            ].forEach((key, idx) => {
              // 新的 aria 值为 undefined | null，从元素上移除该属性
              // 否则
              isNil(ariaArr[idx]) 
                ? elem.removeAttribute(key)
                : elem.setAttribute(key, ariaArr[idx]!)
            })
          },
          { immediate: true }
        )
      }
    },
    { immediate: true }
  )
})

onBeforeUnmount(() => {
  cancelTriggerAriaWatch?.()
  cancelTriggerAriaWatch = undefined
})

defineExpose({
  /** @description 触发器元素 */
  triggerRef,
})
</script>