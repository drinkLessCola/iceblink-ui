import { TooltipTriggerType } from '@iceblink/components/tooltip/src/trigger';
import { Arrayable } from '@iceblink/utils';
import { Ref } from 'vue';
import { InjectionKey } from 'vue';

interface TooltipInjectionContext {
  id: string
  controlled: Ref<boolean>
  trigger: Ref<Arrayable<TooltipTriggerType>>
  disabled: Ref<boolean>
  open: Ref<boolean>
  onOpen: (e?: Event) => void
  onClose: (e?: Event) => void
  onToggle: (e?: Event) => void
}
export const TOOLTIP_INJECTION_KEY: InjectionKey<TooltipInjectionContext> = Symbol('tooltipInjection')