import { Ref } from 'vue';
import { InjectionKey } from 'vue';

interface ScrollbarInjectionContext {
  updateScroll: (isVertical: boolean, scroll: number, ) => void,
  size: Ref<number>,
}
export const SCROLLBAR_INJECTION_KEY:InjectionKey<ScrollbarInjectionContext> = Symbol('iceScrollbar')