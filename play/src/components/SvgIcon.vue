<template>
  <svg 
    class="svg-icon" 
    aria-hidden="true" 
    @click="emits('click')"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emits = defineEmits(['click'])
const props = defineProps({
  icon: {
    type: String,
    required: true,
  }
})

const iconName = computed(() => `#icon-${props.icon}`)
</script>
<style scoped>
.svg-icon {
  vertical-align: middle;
  overflow: hidden;
  display: inline-block;
}
</style>