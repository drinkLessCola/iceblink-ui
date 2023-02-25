<template>
  <span 
    ref="arrowRef"
    :class="ns.e('arrow')"
    data-popper-arrow=""
  />
</template>

<script setup lang="ts">
import { useNamespace } from '@iceblink/hooks';
import { POPPER_CONTENT_INJECTION_KEY } from '@iceblink/tokens'
import { inject, watch, onBeforeUnmount } from 'vue';
import { popperArrowProps } from './arrow'

const props = defineProps(popperArrowProps)


const { arrowRef, arrowOffset } = inject(POPPER_CONTENT_INJECTION_KEY, undefined)!
const ns = useNamespace('popper')

watch(
  () => props.arrowOffset,
  (newArrowOffset) => arrowOffset.value = newArrowOffset,
  {
    immediate: true,
  }
)

onBeforeUnmount(() => {
  arrowRef.value = undefined
})
</script>