/* eslint-disable no-unused-vars */
import { ObjectDirective } from 'vue'
import { Ref, provide, InjectionKey } from 'vue'


export type ForwardRefSetter = <T>(el: T) => void
export type ForwardRefInjectionContext = {
  setForwardRef: ForwardRefSetter
}
export const FORWARD_REF_INJECTION_KEY:InjectionKey<ForwardRefInjectionContext> = Symbol('IceForwardRef')

export const useForwardRef = <T>(forwardRef: Ref<T | null>) => {
  const setForwardRef = (el: T) => {
    forwardRef.value = el 
  }
  
  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef
  })
}

export const useForwardRefDirective = (
  setForwardRef: ForwardRefSetter
): ObjectDirective => {
  return {
    mounted(el) {
      setForwardRef(el)
    },
    updated(el) {
      setForwardRef(el)
    },
    // 为什么不是 beforeUnmounted
    unmounted() {
      setForwardRef(null)
    },
  }
}