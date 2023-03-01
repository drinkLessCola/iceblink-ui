<template>
  <div 
    :class="[ns.b()]"
    :style="scrollbarStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div ref="wrap" :class="[ns.e('wrap')]" :style="wrapStyle" @scroll="handleScroll">
      <div ref="view" :class="[ns.e('view')]">
        <slot />
      </div>
    </div>
    <ice-thumb
      :offset="scrollX" 
      :visible="(alwaysVisible || thumbVisible)"
      :bar-length="wrapperCoord.width"
      :thumb-length="horizontalThumbWidth"
    />
    <ice-thumb 
      :offset="scrollY" 
      :visible="alwaysVisible || thumbVisible" 
      :bar-length="wrapperCoord.height"
      :thumb-length="verticalThumbHeight"
      vertical
    />
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@iceblink/hooks';
import IceThumb from './thumb.vue';
import { SCROLLBAR_INJECTION_KEY } from '@iceblink/tokens/scrollbar';
import { WatchStopHandle, computed } from 'vue';
import { provide, onBeforeUnmount, onMounted, ref, toRef } from 'vue'
import { scrollbarProps } from './scrollbar';
import { addUnit } from '@iceblink/utils';

const ns = useNamespace('scrollbar')
const props = defineProps(scrollbarProps)

const scrollX = ref<number>(0)   // 水平滚动条的偏移量
const scrollY = ref<number>(0)   // 垂直滚动条的偏移量

const horizontalThumbWidth = ref<number>(0)
const verticalThumbHeight = ref<number>(0)

const wrap = ref<HTMLElement>()   // wrapper
const view = ref<HTMLElement>()   // 视图

let thumbVisible = ref(false)  // 鼠标是否移入实例，用于控制滚动条的显隐
let wrapperCoord = ref<Pick<DOMRect, 'height' | 'width' | 'top' | 'left'>>({
  height: 0,
  width: 0,
  top: 0,
  left: 0,
})

const scrollbarStyle = computed(() => ({
  '--ice-thumb-size': props.thumbSize + 'px',
  height: props.fitParent ? '100%' : undefined,
}))

const wrapStyle = computed(() => ({
  maxHeight: props.maxHeight ? addUnit(props.maxHeight) : undefined,
  width: props.width ? addUnit(props.width) : undefined,
  height: props.height ? addUnit(props.height) : undefined,
}))
/**
 * 处理鼠标滚动事件
 * scroll 事件只有在 overflow: scroll | auto 的状态下才能产生
 * @param event 
 */
function handleScroll() {
  const wrapDom = wrap.value!
  scrollX.value = wrapDom.scrollLeft / wrapDom.scrollWidth * (wrapperCoord.value.width - props.thumbSize)
  scrollY.value = wrapDom.scrollTop / wrapDom.scrollHeight * (wrapperCoord.value.height - props.thumbSize)
}


function updateScroll(isVertical: boolean, offset: number) {
  if(isVertical) scrollY.value = offset
  else scrollX.value = offset
  update()
}

/**
 * 根据滚动条的偏移更新 view 容器的滚动偏移
 */
function update() {
  const wrapDom = wrap.value!

  const barHeight = wrapperCoord.value.height - props.thumbSize
  const barWidth = wrapperCoord.value.width - props.thumbSize

  wrapDom.scrollTop = scrollY.value / barHeight * wrapDom.scrollHeight
  wrapDom.scrollLeft = scrollX.value / barWidth * wrapDom.scrollWidth
}

const showScrollbar = () => thumbVisible.value = true
const hideScrollbar = () => thumbVisible.value = false


function scrollTo(x: number, y: number) {
  const wrapDom = view.value!
  wrapDom.scrollTo({
    top: y,
    left: x,
    behavior: 'smooth'
  })
}

function scrollIntoView(elem: HTMLElement) {
  const wrapDom = wrap.value!
  if (!wrapDom.contains(elem)) return

  const { top, left } = elem.getBoundingClientRect()
  const { top: wrapperClientTop, left: wrapperClientLeft } = wrapperCoord.value
  scrollTo(left - wrapperClientLeft, top - wrapperClientTop)
}

/**
 * 初始化 scrollbar
 */
function initScrollbar() {
  const wrapperDom = wrap.value
  const viewDom = view.value

  if(!wrapperDom || !viewDom) return
  
  // 计算滚动条的长度 & 最大偏移量 & 是否溢出
  const { left, top } = wrapperDom.getBoundingClientRect()
  // clientHeight / clientWidth 不包括滚动条的宽度
  const { clientHeight: height, clientWidth: width } = wrapperDom
  const { scrollHeight, scrollWidth } = viewDom
  wrapperCoord.value = { left, top, width, height }
  // 解决 view 容器高度小于 wrap 容器的情况
  horizontalThumbWidth.value = Math.min(width / scrollWidth, 1) * (width - props.thumbSize)
  verticalThumbHeight.value = Math.min(height / scrollHeight, 1) * (height - props.thumbSize)
}

let stopWatchHandler: WatchStopHandle

onMounted(() => {
  // 取消原生 drag 和 select 事件
  // TODO: 还没有取消 bar 的 select 事件

  // 监听 resize 事件
  window.onresize = initScrollbar

  // 初始化
  initScrollbar()
})

onBeforeUnmount(() => {
  window.onresize = null
  stopWatchHandler?.()
})

const handleMouseEnter = () => showScrollbar()
const handleMouseLeave = () => hideScrollbar()

provide(SCROLLBAR_INJECTION_KEY, {
  updateScroll,
  size: toRef(props, 'thumbSize')
})

// 组件暴露 api
defineExpose({
  scrollTo,
  scrollIntoView
})
</script>