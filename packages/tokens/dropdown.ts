import { InjectionKey, Ref } from 'vue';

interface dropdownContext {
  hideOnClick: Ref<boolean>
  handleClick: (e?: Event) => void
}

export const DROPDOWN_INJECTION_KEY: InjectionKey<dropdownContext> = Symbol('iceDropdown')