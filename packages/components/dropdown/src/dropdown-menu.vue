<template>
  <ul :class="[ns.b('menu')]">
    <slot>
      <template v-if="options">
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
            v-else
            :key="key ?? itemKey"
            :label="label"
            :disabled="disabled"
            :icon="icon"
            :shortcut="shortcut"
            :children="children"

            :show-prefix="showPrefix"
            :show-suffix="showSuffix"
          />
        </template>
      </template>
    </slot>
  </ul>
</template>

<script lang="ts" setup>
import { useNamespace } from '@iceblink/hooks';
import IceDropdownItem from './dropdown-item.vue';
import { DropdownOption } from './dropdown';
import { computed } from 'vue';

defineOptions({
  name: 'IceDropdownMenu',
})

type DropdownMenu = {
  options?: DropdownOption[]
}

const props = defineProps<DropdownMenu>()
const ns = useNamespace('dropdown')

const showPrefix = computed(() => props.options?.some((option) => option.icon))
const showSuffix = computed(() => props.options?.some((option) => option.children))
</script>