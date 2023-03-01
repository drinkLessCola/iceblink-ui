# Tooltip 文字提示

## 基础用法

:::demo

```vue
<template>
  <ice-tooltip placement="top-start" content="tooltip">
    <ice-button>top-start</ice-button>
  </ice-tooltip>

  <ice-tooltip placement="top" content="tooltip">
    <ice-button>top</ice-button>
  </ice-tooltip>

  <ice-tooltip placement="top-end" content="tooltip">
    <ice-button>top-end</ice-button>
  </ice-tooltip>

  <ice-tooltip placement="bottom-start" content="tooltip">
    <ice-button>bottom-start</ice-button>
  </ice-tooltip>

  <ice-tooltip placement="bottom" content="tooltip">
    <ice-button>bottom</ice-button>
  </ice-tooltip>

  <ice-tooltip placement="bottom-end" content="tooltip">
    <ice-button>bottom-end</ice-button>
  </ice-tooltip>

  <ice-tooltip placement="left" content="tooltip">
    <ice-button>left</ice-button>
  </ice-tooltip>

  <ice-tooltip placement="right" content="tooltip">
    <ice-button>right</ice-button>
  </ice-tooltip>
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

使用`trigger`属性来定义如何触发下拉菜单，可以使用 `hover` | `click` | `contextmenu`。
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
  <ice-dropdown trigger="contextmenu">
    <ice-button>contextmenu</ice-button>
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

## Dropdown Attributes

| 参数        | 说明                 | 类型    | 可选值                                                                 | 默认值 |
| ----------- | -------------------- | ------- | ---------------------------------------------------------------------- | ------ | ----------- | --- |
| placement   | 弹出位置             | string  | top\|top-start\|top-end\|left\|right\|bottom\|bottom-start\|bottom-end | bottom |
| trigger     | 触发方式             | string  | hover                                                                  | click  | contextmenu | —   |
| hideOnClick | 点击菜单项时关闭菜单 | boolean | —                                                                      | —      |
| showTimeout | 下拉菜单打开时延     | number  | —                                                                      | 0      |
| hideTimeout | 下拉菜单关闭时延     | number  | —                                                                      | 0      |

## Dropdown Item Attributes

| 参数     | 说明             | 类型    | 可选值 | 默认值 |
| -------- | ---------------- | ------- | ------ | ------ |
| disabled | 禁用选项         | boolean | —      | false  |
| divided  | 选项前加入分割线 | boolean | —      | false  |
