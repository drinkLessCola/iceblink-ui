<template>
  <ice-popper :role="role">
    <ice-tooltip-trigger
      :virtual-ref="virtualRef"
      :virtual-triggering="virtualTriggering"
      :disabled="disabled"
    >
      <slot v-if="$slots.default" />
    </ice-tooltip-trigger>
    <ice-tooltip-content
      ref="contentRef"
      :append-to="appendTo"
      :content="content"
      :teleported="teleported"

      :transition="transition"
      :placement="placement"
      :strategy="strategy"
      :offset="offset"
      :fallback-placement="fallbackPlacement"
      :gpu-acceleration="gpuAcceleration"

      :popper-options="popperOptions"
      :color-mode="colorMode"
      :pure="pure"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :z-index="zIndex"
      :reference-elem="referenceElem"
      :trigger-target-elem="triggerTargetElem"
      :visible="visible"
      :enterable="enterable"

      :style="style"
      :aria-label="ariaLabel"
      :virtual-triggering="virtualTriggering"
    >
      <slot name="content">
        <span>{{ content }}</span>
      </slot>
      <ice-popper-arrow v-if="showArrow" :arrow-offset="arrowOffset" />
    </ice-tooltip-content>
  </ice-popper>
</template>
<script setup lang="ts">
import { tooltipProps, tooltipEmits } from './tooltip'
import { IcePopper, IcePopperContent, IcePopperArrow } from '@iceblink/components/popper'
import { IceTooltipTrigger, IceTooltipContent } from '@iceblink/components/tooltip'
import { computed, provide, readonly, ref, toRef, unref, watch } from 'vue';
import { useDelayedToggle } from '@iceblink/hooks';
import { TOOLTIP_INJECTION_KEY } from '@iceblink/tokens/tooltip';
import { isBoolean } from '@vueuse/core';
import { useId } from '@iceblink/hooks';

const props = defineProps(tooltipProps)
const emits = defineEmits(tooltipEmits)

const contentRef = ref<InstanceType<typeof IcePopperContent> | null>(null)

// 受控模式，直接控制 popper 的 visible 属性
const controlled = computed(() => isBoolean(props.visible))
let id = computed(() => props.id || useId('tooltip'))

const open = ref(false)
const handleOpen = () => {
  // 已经是展示的状态
  if(open.value === true) return
  open.value = true
}
const handleClose = () => {
  if(open.value === false) return
  open.value = false
}

const { onOpen, onClose } = useDelayedToggle({
  open: handleOpen,
  close: handleClose,
  showDelay: toRef(props, 'showDelay'),
  hideDelay: toRef(props, 'hideDelay'),
})

provide(TOOLTIP_INJECTION_KEY, {
  /** @description 用于无障碍属性，表明 trigger 由 tooltip 描述 */
  id: unref(id),
  /** @description 受控模式 */
  controlled,
  open: readonly(open),
  disabled: toRef(props, 'disabled'),
  trigger: toRef(props, 'trigger'),
  onOpen,
  onClose,
  onToggle: () => {
    unref(open) ? onClose() : onOpen()
  },

})

// 实现受控模式
watch(
  () => props.visible,
  (visible) => {
    if(!isBoolean(visible)) return
    if(open.value !== visible) {
      visible ? handleOpen() : handleClose()
    } 
  },
)
</script>