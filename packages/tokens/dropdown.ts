import { PopperColorMode, PopperRoleType } from '@iceblink/components/popper';
import { ComponentSizes } from '@iceblink/hooks';
import { InjectionKey, Ref, ComputedRef } from 'vue';

interface dropdownContext {
  hideOnClick: Ref<boolean>
  close: (e?: Event) => void
  role: Ref<PopperRoleType>
  colorMode: Ref<PopperColorMode>
  size: ComputedRef<ComponentSizes>
}

export const DROPDOWN_INJECTION_KEY: InjectionKey<dropdownContext> = Symbol('iceDropdown')