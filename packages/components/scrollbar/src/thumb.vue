<template>
  <transition name="ice-fade-in-linear">
    <div
      v-show="isOverflow && (visible || isDragging)"
      ref="barRef" 
      :class="[ns.e('bar'), ns.is(bar.key)]"
      @mousedown="handleMouseDown"
    >
      <div
        ref="thumbRef" 
        :class="[ns.e('thumb')]"
        :style="thumbStyle"
      />
    </div>
  </transition>
</template>
<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import { BAR_MAP, genThumbStyle, thumbProps } from './scrollbar';
import { SCROLLBAR_INJECTION_KEY } from '@iceblink/tokens/scrollbar';
import { useNamespace } from '@iceblink/hooks';

const ns = useNamespace('scrollbar')
const props = defineProps(thumbProps)

const barRef = ref<HTMLElement>()
const thumbRef = ref<HTMLElement>()
const isDragging = ref<boolean>(false)

const { updateScroll: update, size } = inject(SCROLLBAR_INJECTION_KEY, undefined)!
const updateScroll = update.bind(null, props.vertical)

const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
const maxScroll = computed(() => props.barLength - props.thumbLength - size.value)
const isOverflow = computed(() => !!maxScroll.value)
const barClientStart = computed(() => barRef.value?.getBoundingClientRect()[bar.value['directionStart']]!)
/**
 * 处理滚动条所在轨道的点击事件
 * @param event 
 */
function handleClickBar(event: MouseEvent) {
  const barCoord = barRef.value!.getBoundingClientRect()
  const { thumbLength } = props

  // event.clientX - barCoord.left
  const offset = event[bar.value['clientCoord']] - barCoord[bar.value['directionStart']] - thumbLength / 2
  const scroll = Math.min(Math.max(0, offset), maxScroll.value)
  updateScroll(scroll)
}

/**
 * 开始拖拽滚动条
 * https://zh.javascript.info/mouse-drag-and-drop
 * @param event 
 */
function handleMouseDown(event: MouseEvent) {
  // 判断是点击事件，还是拖动事件
  let isClick = true
  // 设置滑块的拖动状态
  isDragging.value = true

  // 拖动的目标元素
  const target = thumbRef.value!
  const targetClient = target.getBoundingClientRect()[bar.value['directionStart']]

  // 鼠标事件的坐标
  const start = event[bar.value['clientCoord']]
  // 鼠标事件的坐标 相对于 scrollbar 的滑块左上角的偏移值
  // e.g. event.clientX - targetLeft
  const shift = start - targetClient

  moveTo(start)

  // const thottleMouseMoveHandler = throttle(handleMouseMove, 50)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)

  /**
   * 处理鼠标移动滑块
   * @param event 
   */
  function handleMouseMove(event: MouseEvent) {
    const current = event[bar.value['clientCoord']]
    // 点击事件
    if (isClick && (Math.abs(current - start) >= 3)) {
      isClick = false
    }
    moveTo(current)
  }

  /**
   * 鼠标按键松开，移动滑块结束
   * @param event 
   */
  function handleMouseUp(event: MouseEvent) {
    // 处理点击事件
    if (isClick) handleClickBar(event)

    isDragging.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  /**
   * 移动滑块
   * @param axisCoord 鼠标相对窗口在轴上的坐标
   */
  function moveTo(axisCoord: number) {
    // event.clientX - bar.left - shift
    const offset = axisCoord - barClientStart.value - shift
    const scroll = Math.min(Math.max(0, offset), maxScroll.value)
    
    updateScroll(scroll)
  }
}

const thumbStyle = computed(() => {
  return genThumbStyle({
    offset: props.offset,
    thumbLength: props.thumbLength, 
    bar: bar.value
  })
})

onMounted(() => {
  const thumbDom = thumbRef.value!
  const cancelEventHandler = () => false
  thumbDom.ondragstart = cancelEventHandler
  thumbDom.onselectstart = cancelEventHandler
})
</script>