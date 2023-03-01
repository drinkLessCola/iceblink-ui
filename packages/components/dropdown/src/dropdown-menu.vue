<template>
  <ul v-if="options" :class="dropdownMenuClass" :role="role">
    <template 
      v-for="{ type, key, label, disabled, icon, shortcut, children }, itemKey in options" 
      :key="itemKey"
    >
      <hr 
        v-if="type === 'seperator'"
        :class="ns.be('menu', 'seperator')"
        role="separator"
      >
      <ice-dropdown-item
        v-else-if="!children"
        :key="key ?? itemKey"
        :label="label"
        :disabled="disabled"
        :icon="icon"
        :shortcut="shortcut"
        :children="children"

        :show-prefix="showPrefix"
        :show-suffix="showSuffix"
        @click="handleItemClick"
      />

      <ice-dropdown 
        v-else 
        :options="children"
        :show-arrow="false"
        :teleported="false"
        :color-mode="colorMode"
        placement="right"
        transition="ice-zoom-in"
        @click="handleSubMenuClick"
      >
        <ice-dropdown-item
          :key="key ?? itemKey"
          :label="label"
          :disabled="disabled"
          :icon="icon"
          :shortcut="shortcut"
          :children="children"

          :show-prefix="showPrefix"
          :show-suffix="showSuffix"
          @click="handleItemClick"
        />
      </ice-dropdown>
    </template>
  </ul>
  <ul v-else :class="dropdownMenuClass" :role="role" @click="handleItemClick">
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { useNamespace } from '@iceblink/hooks';
import IceDropdownItem from './dropdown-item.vue';
import IceDropdown from './dropdown.vue';
import { DropdownOption } from './dropdown';
import { computed, inject } from 'vue';
import { DROPDOWN_INJECTION_KEY } from '@iceblink/tokens/dropdown';

defineOptions({
  name: 'IceDropdownMenu',
})

type DropdownMenu = {
  options?: DropdownOption[]
}

const props = defineProps<DropdownMenu>()
const emits = defineEmits(['pointermove', 'pointerleave', 'click'])
const ns = useNamespace('dropdown')

const showPrefix = computed(() => props.options?.some((option) => option.icon))
const showSuffix = computed(() => props.options?.some((option) => option.children))
const { close, role, colorMode, size } = inject(DROPDOWN_INJECTION_KEY, undefined)!

const dropdownMenuClass = computed(() => [
  ns.b('menu'),
  ns.bm('menu', size.value)
])

// 直接包含的 DropdownItem 的点击事件
const handleItemClick = () => {
  close?.()
}

// 子级 Dropdown 包含的 DropdownItem 的点击事件
const handleSubMenuClick = () => {
  close?.()
}
</script>