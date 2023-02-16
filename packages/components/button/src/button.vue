<template>
  <button
    ref="_ref"
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
      ns.is('plain', plain),
      ns.is('text', text),
      ns.is('link', link),
      ns.is('ghost', ghost),
      ns.is('border', border),
      ns.is('dashed', dashed),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('disabled', disabled),
      ns.is('loading', loading),
    ]"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <!-- loading -->
    <template v-if="loading">
      <!-- 插槽 loading 传入的图标 -->
      <slot v-if="$slots.loading" name="loading" />
      <!-- props 指定的图标 -->
      <ice-icon v-else>
        <component :is="loadingIcon" />
      </ice-icon>
    </template>
    
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { useNamespace } from '@iceblink/hooks/use-namespace'
import { buttonProps, buttonEmits } from './button';
import { useButton } from './use-button'
import iceIcon from '@iceblink/components/icon'

defineOptions({
  name: 'IceButton',
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

// const buttonClass = null
// const buttonStyle = useButtonCustomStyle(props)

const ns = useNamespace('button')

/**
 * _disabled, // 按钮的可用状态
 * _size, // 按钮尺寸
 * _type, // 按钮类型
 * _ref, // 按钮实例
 * shouldAddSpace, // 是否应当添加空格的 ref
 * handleClick, // 事件处理函数
 */
const { _disabled, _size, _type, _ref, shouldAddSpace, handleClick} = useButton(props, emit)

defineExpose({
  ref: _ref,
  size: _size,
  type: _type,
  disabled: _disabled,
  shouldAddSpace,
})
</script>

<style>

</style>