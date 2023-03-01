# Scrollbar 滚动条

## 基本使用

可以通过属性 `height` 设置滚动窗口的大小。
如果不设置默认为子元素的大小。

:::demo

```vue
<template>
  <ice-scrollbar height="200px">
    <div class="demo-item">1</div>
    <div class="demo-item">1</div>
    <div class="demo-item">1</div>
    <div class="demo-item">1</div>
  </ice-scrollbar>
</template>
<style>
.demo-item {
  width: 100%;
  height: 100px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  box-sizing: border-box;
  background-color: #aaa;  
}
</style>
```

:::

## 最大高度

可以通过属性 `maxHeight` 设置滚动窗口的最大高度。
如果子元素的高度不超过 maxHeight，则不会产生滚动条。
如果子元素的高度超过了 maxHeight，就会产生滚动条。

:::demo

```vue
<template>
  <ice-scrollbar max-height="500">
    <div class="demo-item">1</div>
    <div class="demo-item">1</div>
    <div class="demo-item">1</div>
    <div class="demo-item">1</div>
    <div class="demo-item">1</div>
    <div class="demo-item">1</div>
  </ice-scrollbar>
</template>
<style>
.demo-item {
  width: 100%;
  height: 100px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  box-sizing: border-box;
  background-color: #aaa;  
}
</style>
```

:::

## 适配父容器的大小

通过属性 `fit-parent` 设置滚动窗口的大小适配父容器大小。

:::demo

```vue
<template>
  <div style="width: 200px; height: 200px;">
    <ice-scrollbar fit-parent>
      <div class="demo-item-3">1</div>
      <div class="demo-item-3">1</div>
      <div class="demo-item-3">1</div>
      <div class="demo-item-3">1</div>
    </ice-scrollbar>
  </div>
</template>
<style>
.demo-item-3 {
  width: 400px;
  height: 100px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  box-sizing: border-box;
  background-color: #aaa;  
}
</style>
```

:::