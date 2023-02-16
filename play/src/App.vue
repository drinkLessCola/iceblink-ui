<script setup lang="ts">
import { IceDropdown, IceButton } from  '@iceblink/components'
import SvgIcon from './components/SvgIcon.vue'
</script>

<template>
  <ice-dropdown>
    <ice-button>快乐是选择</ice-button>
    <template #dropdown>
      <IceIcon><SvgIcon icon="flower" /></IceIcon>
    </template>
  </ice-dropdown>
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
