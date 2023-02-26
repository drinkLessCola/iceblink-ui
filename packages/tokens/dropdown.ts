import { InjectionKey, Ref } from 'vue';

interface dropdownContext {
  hideOnClick: Ref<boolean>
  close: (e?: Event) => void
}

export const DROPDOWN_INJECTION_KEY: InjectionKey<dropdownContext> = Symbol('iceDropdown')