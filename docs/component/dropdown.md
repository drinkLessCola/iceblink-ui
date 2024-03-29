# Dropdown 下拉菜单

## 基础用法

:::demo

```vue
<template>
  <ice-dropdown>
    <ice-button>Dropdown</ice-button>
    <template #dropdown>
      <ice-dropdown-menu>
        <ice-dropdown-item disabled>Option 1</ice-dropdown-item>
        <ice-dropdown-item divided>Option 2</ice-dropdown-item>
        <ice-dropdown-item>Option 3</ice-dropdown-item>
      </ice-dropdown-menu>
    </template>
  </ice-dropdown>
</template>
```

:::

## 弹出位置

使用`placement`属性来定义下拉菜单相对触发器的定位，可以使用可以使用 `top` | `top-start` | `top-end` | `left` | `right` | `bottom` | `bottom-start` | `bottom-end` | `bottom`。
:::demo

```vue
<template>
  <ice-dropdown>
    <ice-button>bottom</ice-button>
    <template #dropdown>
      <ice-dropdown-menu>
        <ice-dropdown-item>Option 1</ice-dropdown-item>
        <ice-dropdown-item>Option 2</ice-dropdown-item>
        <ice-dropdown-item>Option 3</ice-dropdown-item>
      </ice-dropdown-menu>
    </template>
  </ice-dropdown>
  <ice-dropdown placement="top">
    <ice-button>top</ice-button>
    <template #dropdown>
      <ice-dropdown-menu>
        <ice-dropdown-item>Option 1</ice-dropdown-item>
        <ice-dropdown-item>Option 2</ice-dropdown-item>
        <ice-dropdown-item>Option 3</ice-dropdown-item>
      </ice-dropdown-menu>
    </template>
  </ice-dropdown>
</template>
```

:::

## 触发方式

使用`trigger`属性来定义如何触发下拉菜单，可以使用 `hover` | `click` | `conlabelmenu`。
:::demo

```vue
<template>
  <ice-dropdown>
    <ice-button>hover</ice-button>
    <template #dropdown>
      <ice-dropdown-menu>
        <ice-dropdown-item>Option 1</ice-dropdown-item>
        <ice-dropdown-item>Option 2</ice-dropdown-item>
        <ice-dropdown-item>Option 3</ice-dropdown-item>
      </ice-dropdown-menu>
    </template>
  </ice-dropdown>
  <ice-dropdown trigger="click">
    <ice-button>click</ice-button>
    <template #dropdown>
      <ice-dropdown-menu>
        <ice-dropdown-item>Option 1</ice-dropdown-item>
        <ice-dropdown-item>Option 2</ice-dropdown-item>
        <ice-dropdown-item>Option 3</ice-dropdown-item>
      </ice-dropdown-menu>
    </template>
  </ice-dropdown>
  <ice-dropdown trigger="conlabelmenu">
    <ice-button>conlabelmenu</ice-button>
    <template #dropdown>
      <ice-dropdown-menu>
        <ice-dropdown-item>Option 1</ice-dropdown-item>
        <ice-dropdown-item>Option 2</ice-dropdown-item>
        <ice-dropdown-item>Option 3</ice-dropdown-item>
      </ice-dropdown-menu>
    </template>
  </ice-dropdown>
</template>
```

:::

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性设置为 `false` 可以关闭此功能。

:::demo

```vue
<template>
  <ice-dropdown :hide-on-click="false">
    <ice-button>点击 Option 不会关闭</ice-button>
    <template #dropdown>
      <ice-dropdown-menu>
        <ice-dropdown-item>Option 1</ice-dropdown-item>
        <ice-dropdown-item>Option 2</ice-dropdown-item>
        <ice-dropdown-item>Option 3</ice-dropdown-item>
      </ice-dropdown-menu>
    </template>
  </ice-dropdown>
</template>
```

:::


## 选项以对象配置

可以通过 `options` 属性传入一个对象，作为选项配置。
```vue
<template>
  <ice-dropdown 
    :options="menu"
    @select="handleMenuSelect"
  >
    <ice-button>Dropdown</ice-button>
  </ice-dropdown>
</template>
<script lang="ts" setup>
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
</script>
```


可选的对象属性有：

| 属性      | 说明                                                               |
| --------- | ----------------------------------------------------------------- |
| type      | 类型，`seperator` 表示分割线，`option` 表示选项，默认为 `option`     |
| label     | 选项在菜单中显示的文字                                              |
| key       | 选项标识，作为选择事件发生时发出的参数                                |
| shortcut  | 快捷键，可以以字符串形式或数组形式传入： `'Enter'`、 `['Ctrl', 'K']`  |
| icon      | 选项前面的图标，接受组件名称的字符串或组件实例                        |
| disabled  | 禁用选项                                                           |
| children  | 选项的子菜单                                                       |


## Dropdown Attributes

| 参数        | 说明                 | 类型    | 可选值                                                                 | 默认值 |
| ----------- | -------------------- | ------- | ---------------------------------------------------------------------- | ------ | ----------- | --- |
| placement   | 弹出位置             | string  | top\|top-start\|top-end\|left\|right\|bottom\|bottom-start\|bottom-end | bottom |
| trigger     | 触发方式             | string  | hover                                                                  | click  | conlabelmenu | —   |
| hideOnClick | 点击菜单项时关闭菜单 | boolean | —                                                                      | —      |
| showTimeout | 下拉菜单打开时延     | number  | —                                                                      | 0      |
| hideTimeout | 下拉菜单关闭时延     | number  | —                                                                      | 0      |

## Dropdown Item Attributes

| 参数     | 说明             | 类型    | 可选值 | 默认值 |
| -------- | ---------------- | ------- | ------ | ------ |
| disabled | 禁用选项         | boolean | —      | false  |
| divided  | 选项前加入分割线 | boolean | —      | false  |
