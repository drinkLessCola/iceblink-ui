<script setup lang="ts">
import { IceButton, IceDropdown, IceDropdownMenu, IceDropdownItem, IceIcon } from  '@iceblink/components'
const handleMenuSelect = (e: Event, key: string) => {
  console.log(e, key)
}
const menu = [
  { label: '查看评论', key: 'comment' },
  { label: '播放',  key: 'play', shortcut: 'Enter', icon: 'Flower' },
  { label: '下一首播放', key: 'playAfter' },
  { type: 'seperator' },
  { 
    label: '收藏到歌单',
    key: 'collect', 
    children: [
      { label: '歌单 1', key: 'list 1' },
      { label: '歌单 2', key: 'list 2' },
      { type: 'seperator' },
      { label: '歌单 3', key: 'list 3' },
    ] 
  },
  { label: '分享', key: 'share', disabled: true },
]
 
// const tooltipVisible:Ref<boolean> = ref(false)
// const handleToggle = () => {
//   tooltipVisible.value = !unref(tooltipVisible)
// }
// const contextmenuVisible:Ref<boolean> = ref(false)
// const box = ref()
// const menu = ref()
// const position = ref({
//   top: 0,
//   bottom: 0,
//   left: 0,
//   right: 0
// } as DOMRect)

// const virtualRef = ref({
//   getBoundingClientRect() {
//     return position.value
//   }
// })

// onMounted(() => {
//   box.value.addEventListener('contextmenu', (e: MouseEvent) => {
//     e.preventDefault()
//     contextmenuVisible.value = true
//     console.log(e, e.clientX, e.clientY)
//     position.value = DOMRect.fromRect({
//       x: e.clientX,
//       y: e.clientY,
//       width: 0,
//       height: 0,
//     })
//     document.addEventListener('click', function handleClick (e: MouseEvent) {
//       const target = e.target
//       if(!target) return 
//       const isClickMenu = (target as HTMLElement).closest('#menu')
//       console.log(isClickMenu)
//       if(!isClickMenu) {
//         contextmenuVisible.value = false
//         document.removeEventListener('click', handleClick)
//       }
//     })
//   })
// })

// const content = ref('sea')
// setTimeout(() => content.value = 'me', 6000)
</script>

<template>
  <!-- <div style="height: 100px;" /> -->
  <ice-dropdown 
    :hide-on-click="false" 
    :options="menu"
    @select="handleMenuSelect"
  >
    <ice-button>点击 Option 不会关闭</ice-button>
  </ice-dropdown>

  <ice-icon>
    <right-arrow />
  </ice-icon>
  <ice-dropdown>
    <ice-button>选一个好地方</ice-button>
    <template #dropdown>
      <ice-dropdown-menu>
        <ice-dropdown-item>地球</ice-dropdown-item>
        <ice-dropdown-item>火星</ice-dropdown-item>
        <ice-dropdown-item>M78星云</ice-dropdown-item>
      </ice-dropdown-menu>
    </template>
  </ice-dropdown>
<!-- 
  <ice-tooltip
    :content="content"
    color-mode="light"
    placement="bottom-start"
  >
    <ice-button>tooltip</ice-button>
  </ice-tooltip>

  <ice-tooltip
    content="I wear you ring"
    color-mode="dark"
    placement="top-end"
  >
    <ice-button>tooltip</ice-button>
  </ice-tooltip>

  <ice-tooltip
    content="Bluebread"
    color-mode="dark"
    placement="bottom"
    disabled
  >
    <ice-button>disabled</ice-button>
  </ice-tooltip>

  <ice-button @click="handleToggle">change tooltip visible</ice-button>
  <ice-tooltip
    content="Spangle maker"
    color-mode="dark"
    placement="right"
    :visible="tooltipVisible"
  >
    <ice-button>受控 tooltip</ice-button>
  </ice-tooltip>
  <section ref="box" style="width: 100px; height: 100px; background-color:beige;">
    <ice-tooltip
      id="menu"
      ref="menu"
      content="菜单！！！"
      color-mode="dark"
      placement="bottom-end"
      :offset="0"
      :show-arrow="false"
      trigger="click"
      virtual-triggering
      :virtual-ref="virtualRef"
      :visible="contextmenuVisible"
    />
  </section> -->
</template>

<style lang="scss">
.btn-group {
  display: flex;
  width:fit-content;
  padding: 5px;
  margin: 10px 0;
  // background-color: #333;
  button + button {
    margin-left: 12px;
  }
}
</style>
