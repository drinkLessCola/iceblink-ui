import { PopperColorMode, PopperRoleType } from '@iceblink/components/popper';
import { InjectionKey, Ref } from 'vue';

interface dropdownContext {
  hideOnClick: Ref<boolean>
  close: (e?: Event) => void
  role: Ref<PopperRoleType>
  colorMode: Ref<PopperColorMode>
}

export const DROPDOWN_INJECTION_KEY: InjectionKey<dropdownContext> = Symbol('iceDropdown')