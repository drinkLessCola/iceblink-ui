<template>
  <teleport :disabled="!teleported" :to="appendTo">
    <transition
      :name="transition"
      @after-enter="onAfterEnter"
      @before-enter="onBeforeEnter"
    >
      <ice-popper-content
        v-if="shouldRender"
        v-show="shouldShow"
        :id="id"
        ref="contentRef"
        :popper-class="popperClass"
        :popper-style="[popperStyle, contentStyle]"
        
        :aria-label="ariaLabel"
        :aria-hidden="ariaHidden"

        :z-index="zIndex"
        :reference-elem="referenceElem"
        :trigger-target-elem="triggerTargetElem"
        :visible="shouldShow"
        :class-name="className"
        :color-mode="colorMode"
        :enterable="enterable"
        :pure="pure"

        :placement="placement"
        :strategy="strategy"
        :offset="offset"
        :fallback-placement="['bottom', 'top']"
        :gpu-acceleration="false"
        :popper-options="popperOptions"

        @mouseenter="onContentEnter"
        @mouseleave="onContentLeave"
        @blur="onBlur"
        @close="onClose"
      >
        <slot />
      </ice-popper-content>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { Ref, computed, inject, ref, unref, watch } from 'vue';
import { tooltipContentProps } from './content';
import { TOOLTIP_INJECTION_KEY } from '@iceblink/tokens/tooltip';
import { IcePopperContent } from '@iceblink/components/popper';
import { usePopperContainerId } from '@iceblink/hooks';
import { composeEventHandlers } from '@iceblink/utils';

defineOptions({
  name: 'IceTooltipContent',
  inheritAttrs: false
})
const props = defineProps(tooltipContentProps)

const { 
  id,
  controlled, 
  trigger, 
  disabled, 
  open, 
  onOpen, 
  onClose
} = inject(TOOLTIP_INJECTION_KEY, undefined)!

const contentRef: Ref<InstanceType<typeof IcePopperContent> | null> = ref(null)
const shouldShow = computed(() => unref(disabled) ? false : unref(open))
const shouldRender = computed(() => unref(open))

// const { selector } = usePopperContainerId()
// const appendTo = computed(() => props.appendTo || selector)

const contentStyle = computed(() => props.style ?? {})
const ariaHidden = computed(() => !unref(open))


const stopWhenControlled = () => {
  return unref(controlled)
}
// 鼠标移入 / 移出 contentRef
const onContentEnter = composeEventHandlers(
  stopWhenControlled,
  (e?: Event) => {
    if(props.enterable && unref(trigger) === 'hover') onOpen(e)
  }
)
const onContentLeave =  composeEventHandlers(
  stopWhenControlled,
  (e?: Event) => {
    if(props.enterable && unref(trigger) === 'hover') onClose(e)
  }
)
const onBlur = (e?: Event) => {
  if(!props.virtualTriggering) onClose(e)
}

let stopHandler: ReturnType<typeof onClickOutside>

// popper 打开之前更新位置
const onBeforeEnter = () => {
  contentRef.value?.updatePopper?.()
}
// popper 打开后监听 clickOutside 以关闭 popper
const onAfterEnter = () => {
  stopHandler = onClickOutside(
    computed(() => contentRef.value?.popperContentRef),
    () => {
      if(unref(controlled)) return
      if(unref(trigger) !== 'hover') onClose()
    }
  )
}

// popper 关闭后，停止监听 clickOutside
watch(
  () => unref(open),
  (val) => {
    if(!val) stopHandler?.()
  }
)
</script>