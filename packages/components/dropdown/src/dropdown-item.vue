<template>
  <!-- 
    :tabindex="tabIndex" -->
  
  <li
    :aria-disabled="disabled"
    :role="role"
    :class="[
      ns.b('item'),
      ns.is('disabled', disabled)
    ]"
    @click="handleClick"
  >
    <span v-if="showPrefix" :class="[ns.be('item', 'prefix')]">
      <ice-icon v-if="icon">
        <component :is="icon" />
      </ice-icon>
    </span>

    <span :class="ns.be('item', 'label')">
      <slot name="default">
        {{ labelWithShortcut }}
      </slot>
    </span>

    <span v-if="showSuffix" :class="ns.be('item', 'suffix')">
      <ice-icon v-if="children">
        <component :is="'right-arrow'" />
      </ice-icon>
    </span>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { IceIcon } from '@iceblink/components'
// import { DropdownOption } from './dropdown'
import { useNamespace } from '@iceblink/hooks';
import { Arrayable, IconType, isArray } from '@iceblink/utils';
import { inject } from 'vue';
import { DROPDOWN_INJECTION_KEY } from '@iceblink/tokens/dropdown';

defineOptions({
  name: 'IceDropdownItem'
})

interface DropdownOption {
  type?: string
  label?: string
  // eslint-disable-next-line vue/no-reserved-props
  key?: string | number
  shortcut?: string | string[]
  icon?: IconType
  showPrefix?: boolean,
  showSuffix?: boolean,
  disabled?: boolean
  children?: DropdownOption[]
}

const props = withDefaults(
  defineProps<DropdownOption>(),  
  {
    type: 'option',
    label: '',
    shortcut: '',
    key: '',
    icon: undefined,
    showPrefix: false,
    showSuffix: false,
    disabled: false,
    children: undefined
  }
)
const emits = defineEmits(['pointermove', 'pointerleave', 'click'])

const ns = useNamespace('dropdown')
const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, undefined)!

const handleClick = (evt: MouseEvent) => {
  emits('click', evt)
}
    
const getLabel = (label: string, shortcut?: Arrayable<string>) => {
  if(!shortcut) return label

  const shortcutTip = isArray(shortcut) ? shortcut.join('+') : shortcut
  return `${label}(${shortcutTip})`
}
const labelWithShortcut = computed(() => getLabel(props.label, props.shortcut))

// DropdownItem 的 role 属性根据 Dropdown 的 role 属性决定
const role = computed(() => {
  if(menuRole.value === 'menu') return 'menuitem'
  else if(menuRole.value === 'navigation') return 'link'
  return 'button'
})
</script>