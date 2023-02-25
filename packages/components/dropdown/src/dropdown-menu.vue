<template>
  <ul :class="[ns.b('menu')]">
    <slot>
      <template v-if="options">
        <template v-for="optionGroup, groupKey in options" :key="groupKey">
          <hr 
            v-if="groupKey"
            :class="ns.bem('menu', 'item', 'divided')"
            role="separator"
          >
          <li :class="ns.b('group')">
            <ul>
              <ice-dropdown-item 
                v-for="{ key, disabled = false, children, label, icon, shortcut }, itemKey in optionGroup"
                :key="key ?? itemKey"
                :label="label"
                :disabled="disabled"
                :icon="icon"
                :shortcut="shortcut"
                :children="children"
              />
            </ul>
          </li>
        </template>
      </template>
    </slot>
  </ul>
</template>

<script lang="ts" setup>
import { useNamespace } from '@iceblink/hooks';
import IceDropdownItem from './dropdown-item.vue';
import { DropdownGroup } from './dropdown';

defineOptions({
  name: 'IceDropdownMenu',
})

type DropdownMenu = {
  options?: DropdownGroup[]
}

const props = defineProps<DropdownMenu>()
const ns = useNamespace('dropdown')

</script>