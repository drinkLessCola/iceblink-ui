# Button 按钮

## 基本
<section class="btn-group type">
  <ice-button>Default</ice-button>
  <ice-button type="primary">Primary</ice-button>
  <ice-button type="success">Success</ice-button>
  <ice-button type="warning">Warning</ice-button>
  <ice-button type="info">Info</ice-button>
  <ice-button type="danger">Danger</ice-button>
</section>

## 扁平按钮
<section class="btn-group plain">
  <ice-button plain>Default</ice-button>
  <ice-button type="primary" plain>Primary</ice-button>
  <ice-button type="success" plain>Success</ice-button>
  <ice-button type="warning" plain>Warning</ice-button>
  <ice-button type="info" plain>Info</ice-button>
  <ice-button type="danger" plain>Danger</ice-button>
</section>
<section class="btn-group plain">
  <ice-button plain round>Default</ice-button>
  <ice-button type="primary" plain round>Primary</ice-button>
  <ice-button type="success" plain round>Success</ice-button>
  <ice-button type="warning" plain round>Warning</ice-button>
  <ice-button type="info" plain round>Info</ice-button>
  <ice-button type="danger" plain round>Danger</ice-button>
</section>
  
## 文字按钮
<section class="btn-group text">
  <ice-button text>Default</ice-button>
  <ice-button type="primary" text>Primary</ice-button>
  <ice-button type="success" text>Success</ice-button>
  <ice-button type="warning" text>Warning</ice-button>
  <ice-button type="info" text>Info</ice-button>
  <ice-button type="danger" text>Danger</ice-button>
</section>
<section class="btn-group text">
  <ice-button text round>Default</ice-button>
  <ice-button type="primary" text round>Primary</ice-button>
  <ice-button type="success" text round>Success</ice-button>
  <ice-button type="warning" text round>Warning</ice-button>
  <ice-button type="info" text round>Info</ice-button>
  <ice-button type="danger" text round>Danger</ice-button>
</section>
  
## 链接按钮
<section class="btn-group link">
  <ice-button link>Default</ice-button>
  <ice-button type="primary" link>Primary</ice-button>
  <ice-button type="success" link>Success</ice-button>
  <ice-button type="warning" link>Warning</ice-button>
  <ice-button type="info" link>Info</ice-button>
  <ice-button type="danger" link>Danger</ice-button>
</section>

## 按钮尺寸
<section class="btn-group shape">
  <ice-button plain size="large">大按钮</ice-button>
  <ice-button plain>不大不小</ice-button>
  <ice-button plain size="small">小个按钮</ice-button>
</section>

## 按钮形状
<section class="btn-group shape">
  <ice-button circle>
    <ice-icon>
      <Flower />
    </ice-icon>
  </ice-button>
  <ice-button round>圆角</ice-button>
  <ice-button>mini 圆角</ice-button>
</section>

## 透明背景
<section class="btn-group shape">
  <ice-button ghost>Default</ice-button>
  <ice-button type="primary" ghost>Primary</ice-button>
  <ice-button type="success" ghost>Success</ice-button>
  <ice-button type="warning" ghost>Warning</ice-button>
  <ice-button type="info" ghost>Info</ice-button>
  <ice-button type="danger" ghost>Danger</ice-button>
</section>

## 禁用
<section class="btn-group disabled">
  <ice-button disabled>不许点</ice-button>
</section>

## 加载中
<section class="btn-group loading">
  <ice-button loading>loading</ice-button>
</section>

## API

### Button Props

| 名称  | 描述     | 类型                                   | 默认值    |   
| ----- | ------- | -------------------------------------- | -------- |
| size  | 按钮尺寸 | ^[enum]`'large'\| 'default'\| 'small'` | -        | 
| type  | 按钮类型 | ^[enum]`'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | - | 