import { Instance } from '@popperjs/core'
import { ComputedRef } from 'vue'
import { InjectionKey } from 'vue'
import { Ref } from 'vue'


export type Measurable = {
  getBoundingClientRect: () => DOMRect
}


export type IcePopperInjectionContext = {
  triggerRef: Ref<Measurable | undefined> // 触发器元素
  contentRef: Ref<HTMLElement | undefined> 
  popperInstanceRef: Ref<Instance | undefined> // Popper 元素
  role: ComputedRef<string>
}

export type IcePopperContentInjectionContext = {
  arrowRef: Ref<HTMLElement | undefined>
  arrowOffset: Ref<number | undefined>
}

export const POPPER_INJECTION_KEY: InjectionKey<IcePopperInjectionContext> = Symbol('popper')
export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<IcePopperContentInjectionContext> = Symbol('popperContent')