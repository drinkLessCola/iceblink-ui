<template>
  <slot />
</template>

<script lang="ts" setup>
import { IcePopperInjectionContext, POPPER_INJECTION_KEY } from '@iceblink/tokens';
import { ref, provide, computed } from 'vue';
import { Instance as PopperInstance } from '@popperjs/core';
import { popperProps } from './popper';


defineOptions({
  name: 'IcePopperRoot',
  // inheritAttrs: false,
})

// props: { role }
const props = defineProps(popperProps)

const triggerRef = ref<HTMLElement>()
const referenceRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const popperInstanceRef = ref<PopperInstance>()
const role = computed(() => props.role)

const popperProvides = {
  role,
  /** @description 触发器元素 trigger element */
  triggerRef,
  /** @description  */
  referenceRef,
  contentRef,
  /** @description popperjs instance  */
  popperInstanceRef
} as IcePopperInjectionContext

defineExpose(popperProvides)
provide(POPPER_INJECTION_KEY, popperProvides)
</script>