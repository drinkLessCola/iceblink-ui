<template>
  <ice-popper-trigger
    :id="id"
    :virtual-triggering="virtualTriggering"
    :virtual-ref="virtualRef"
    :open="open"
    :class="ns.e('trigger')"
    @click="onClick"
    @contextmenu="onContextmenu"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </ice-popper-trigger>
</template>
<script setup lang="ts">
import { composeEventHandlers } from '@iceblink/utils';
import { whenTrigger } from './utils';
import { tooltipTriggerProps } from './trigger';
import { inject, unref } from 'vue'
import { useNamespace } from '@iceblink/hooks';
import { TOOLTIP_INJECTION_KEY } from '@iceblink/tokens/tooltip';
import { IcePopperTrigger } from '@iceblink/components/popper';

defineOptions({
  name: 'IceTooltipTrigger'
})

const props = defineProps(tooltipTriggerProps)

const ns = useNamespace('tooltip')
const { id, open, onOpen, onClose, onToggle, trigger, disabled, controlled } = inject(TOOLTIP_INJECTION_KEY, undefined)!

// EventHandler
const stopWhenDisabledOrControlled = (e?: Event) => {
  if(unref(disabled) || unref(controlled)) return true
}

const onMouseenter = composeEventHandlers(
  stopWhenDisabledOrControlled,
  whenTrigger(trigger, 'hover', onOpen)
)
const onMouseleave = composeEventHandlers(
  stopWhenDisabledOrControlled,
  whenTrigger(trigger, 'hover', onClose)
)

const onClick = composeEventHandlers(
  stopWhenDisabledOrControlled,
  whenTrigger(trigger, 'click', (e) => {
    // left click
    if((e as MouseEvent).button === 0) return onToggle(e)
  })
)

const onFocus = composeEventHandlers(
  stopWhenDisabledOrControlled,
  whenTrigger(trigger, 'focus', onOpen)
)
const onBlur = composeEventHandlers(
  stopWhenDisabledOrControlled,
  whenTrigger(trigger, 'focus', onClose)
)

const onContextmenu = composeEventHandlers(
  stopWhenDisabledOrControlled,
  whenTrigger(trigger, 'contextmenu', (e) => {
    e.preventDefault()
    onToggle(e)
  })
)
</script>