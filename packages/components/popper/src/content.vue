<template>
  <div
    ref="popperContentRef"
    :style="contentStyle"
    :class="contentClass"
    tabindex="-1"
    @mouseenter="(e) => $emit('mouseenter', e)"
    @mouseleave="(e) => $emit('mouseleave', e)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY } from '@iceblink/tokens';
import { useNamespace, useZIndex } from '@iceblink/hooks';
import { WatchStopHandle, computed, inject, onMounted, provide, ref, unref, watch } from 'vue';
import { createPopper } from '@popperjs/core'
import { popperContentProps, popperContentEmits, buildPopperOptions, CreatePopperInstanceParams } from './content';
import { unwrapMeasurableElem } from './util';

const emit = defineEmits(popperContentEmits)
// id, style, className, colorMode, pure, popperClass, popperStyle, 
// zIndex：指定 popper 的层级
// referenceElem
// triggerTargetElem
// visible
const props = defineProps(popperContentProps)

const { 
  popperInstanceRef, 
  contentRef, 
  triggerRef
} = inject(POPPER_INJECTION_KEY, undefined)!

// Popper 的 z-index
const { nextZIndex } = useZIndex()
const contentZIndex = ref<number>(props.zIndex || nextZIndex())

const ns = useNamespace('popper')

const popperContentRef = ref<HTMLElement>()
// const focusStartRef = ref<'container' | 'first' | HTMLElement>('first')


const arrowRef = ref<HTMLElement>() // 箭头 Ref
const arrowOffset = ref<number>() // 箭头的偏移量
/** 
 * 从 Arrow 组件获取相关信息：
 *  -  Arrow 组件挂载后根元素会赋值给 arrowRef
 *  -  同步获取 Arrow 组件 props.arrowOffset
 */
provide(POPPER_CONTENT_INJECTION_KEY, {
  arrowRef,
  arrowOffset
})


// TODO: form 上下文，向下提供 formItem 的属性

// const trapped = ref<boolean>(false)

/** 
 * 触发器元素
 *  - 首先考虑使用通过 Props 传入的 referenceElem。
 *  - 其次使用当前所处 Popper 实例中的 PopperTrigger 子元素。 
 */ 
const computedReference = computed(
  () => unwrapMeasurableElem(props.referenceElem) || unref(triggerRef)
)

// styles
const contentStyle = computed(
  () => [{ zIndex: unref(contentZIndex), display: 'inline-flex' }, props.popperStyle] as any
)

// class
const contentClass = computed(() => [
  ns.b(),
  // ns.is('pure', props.pure),
  ns.is(props.colorMode),
  props.popperClass,
])



/**
 * 创建 popper 实例
 * @param referenceElem 触发器
 * @param popperContentElem popper 内容
 * @parem arrowElem 箭头元素
 */
const createPopperInstance = ({
  referenceElem,
  popperContentElem,
  arrowElem,
}: CreatePopperInstanceParams) => {
  const options = buildPopperOptions(props, {
    arrowElem,
    arrowOffset: unref(arrowOffset)
  })

  return createPopper(referenceElem, popperContentElem, options)
}

// const trapped = ref<boolean>(false)


const updatePopper = () => {
  unref(popperInstanceRef)?.update()
}

/**
 * 通过修改 eventListeners 修饰符的 enabled 属性，更新 popper 的开启状态
 */
const togglePopperAlive = () => {
  const monitorable = { name: 'eventListeners', enabled: props.visible }

  unref(popperInstanceRef)?.setOptions((options) => ({
    ...options,
    modifiers: [...(options.modifiers || []), monitorable],
  }))

  updatePopper()

  // TODO: toggle trapped.value
}

onMounted(() => {
  let updateHandle: WatchStopHandle

  // 触发器元素更新
  watch(
    computedReference,
    (referenceElem) => {
      updateHandle?.()
      // 销毁旧的 popper 实例
      const popperInstance = unref(popperInstanceRef)
      popperInstance?.destroy()
      // 如果存在新的触发器元素，则创建新的 popper 实例
      if(referenceElem) {
        // 使用 popperContent 更新 contentRef
        const popperContentElem = unref(popperContentRef)!
        contentRef.value = popperContentElem

        popperInstanceRef.value = createPopperInstance({
          referenceElem,
          popperContentElem,
          arrowElem: unref(arrowRef),
        })

        // watch 函数的返回值为一个停止侦听器的函数
        // 调用即可停止侦听
        // 侦听新的触发器元素的坐标属性，发生改变时通过 updatePopper 更新 popper
        updateHandle = watch(
          () => referenceElem.getBoundingClientRect(),
          () => updatePopper(),
          {
            immediate: true,
          }
        )
      } 
      // 否则，将 popperInstance 置空
      else {
        popperInstanceRef.value = undefined
      }
    }, {
      // 立即执行一次副作用函数，创建 popper 实例
      immediate: true
    }
  )

  // 监视 trigger 的 HTML Attribute
  // watch(
  //   () => props.triggerTargetElem,
  //   (triggerTargetElem, prevTriggerTargetElem) => {
  //     const elem = unref(triggerTargetElem || popperContentRef.value)
  //     const prevElem = unref(prevTriggerTargetElem || popperContentRef.value)
  //   },
  //   { immediate: true }
  // )

  // 根据 props.visible 控制 popper 的显示
  watch(() => props.visible, togglePopperAlive, { immediate: true })
  
  // 监视 buildPopperOptions 的构建结果，在结果 option 对象发生变更时
  // 更新 popper 实例的 option
  watch(
    () => 
      buildPopperOptions(props, {
        arrowElem: unref(arrowRef),
        arrowOffset: unref(arrowOffset),
      }),
    (option) => popperInstanceRef.value?.setOptions(option)
  )
})


defineExpose({
  popperContentRef,
  popperInstanceRef,
  updatePopper,
  contentStyle,
})
</script>