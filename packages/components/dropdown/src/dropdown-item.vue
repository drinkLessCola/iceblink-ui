<template>
  <!-- :role="role"
    :tabindex="tabIndex" -->
  
  <li
    :aria-disabled="disabled"
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
import { computed, inject } from 'vue';
import { IceIcon } from '@iceblink/components'
// import { DropdownOption } from './dropdown'
import { useNamespace } from '@iceblink/hooks';
import { DROPDOWN_INJECTION_KEY } from '@iceblink/tokens/dropdown';
import { Arrayable, IconType, isArray } from '@iceblink/utils';

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
const { hideOnClick, handleClick: onClose } = inject(DROPDOWN_INJECTION_KEY, undefined)!

console.log(props.disabled)
const handleClick = (evt: MouseEvent) => {
  if(props.disabled) return
  emits('click', evt)

  if(hideOnClick?.value) {
    onClose?.()
  }
}
    
const getLabel = (label: string, shortcut?: Arrayable<string>) => {
  if(!shortcut) return label

  const shortcutTip = isArray(shortcut) ? shortcut.join('+') : shortcut
  return `${label}(${shortcutTip})`
}
const labelWithShortcut = computed(() => getLabel(props.label, props.shortcut))
</script>