<template>
  <div>
    <ice-tooltip
      ref="popperRef"
      :virtual-ref="virtualRef"
      :virtual-triggering="virtualTriggering"

      :placement="placement"
      :trigger="trigger"
      :offset="offset"
      :fallback-placement="['bottom', 'top']"
      :gpu-acceleration="false"
      :show-arrow="showArrow"
      :show-delay="showDelay"
      :hide-delay="hideDelay"
      :role="role"

      :transition="transition || 'ice-zoom-in-top'"
      :tab-index="tabindex"
      :color-mode="colorMode"
      :popper-class="[ns.e('popper'), popperClass]"
      :teleported="teleported"
      pure
    >
      <template #content>
        <slot name="dropdown">
          <ice-dropdown-menu v-if="props.options" :options="options" />
        </slot>
      </template>
      <template #default>
        <ice-only-child role="button">
          <slot name="default" />
        </ice-only-child>
      </template>
    </ice-tooltip>
  </div>
</template>
<script setup lang="ts">
import { dropdownProps, dropdownEmits } from './dropdown';
import { IceTooltip } from '@iceblink/components/tooltip'
import { IceOnlyChild } from '@iceblink/components/slot';
import { useNamespace } from '@iceblink/hooks';
import { provide, ref, toRef } from 'vue'
import { DROPDOWN_INJECTION_KEY } from '@iceblink/tokens/dropdown';
import IceDropdownMenu from './dropdown-menu.vue';

const props = defineProps(dropdownProps)
const emits = defineEmits(dropdownEmits)

// hideOnClick
const ns = useNamespace('dropdown')
const popperRef = ref()
const handleClose = () => popperRef.value?.onClose()
const handleClick = () => handleClose()

provide(DROPDOWN_INJECTION_KEY, {
  hideOnClick: toRef(props, 'hideOnClick'),
  handleClick,
})
</script>