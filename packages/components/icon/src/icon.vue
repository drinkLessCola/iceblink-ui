<template>
  <i :class="ns.b()" :style="style">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { CSSProperties, useAttrs } from 'vue'
import { computed } from 'vue'
import { iconProps } from './icon'
import { useNamespace } from '@iceblink/hooks/use-namespace';
import { addUnit, isUndefined } from '@iceblink/utils'

// @ts-ignore
defineOptions({
  name: 'IceIcon',
  // inheritAttrs: false, // 不属于 props 声明的属性，不会被添加为 HTMLElement 的 attribute
})

const props = defineProps(iconProps)
const attrs = useAttrs()
const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  if(!size && !color) return {}
  
  return {
    fontSize: isUndefined(size) ? undefined : addUnit(size),
    '--icon-color': color,
  }
})

</script>

<style>

</style>