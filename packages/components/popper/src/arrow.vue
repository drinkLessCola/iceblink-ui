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
import { onBeforeUnmount } from 'vue';
import { inject, watch } from 'vue';

const props = withDefaults(
  defineProps<{arrowOffset?: number}>(),
  { arrowOffset: 0 }
)


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