import { TooltipTriggerType } from './trigger'
import { Arrayable, isArray } from '@iceblink/utils'
import { Ref, unref } from 'vue'

export const isTriggerType = (
  trigger: Arrayable<TooltipTriggerType>, 
  type: TooltipTriggerType
) => {
  if(isArray(trigger)) return trigger.includes(type)
  return trigger === type 
}

export const whenTrigger = (
  trigger: Ref<Arrayable<TooltipTriggerType>>,
  type: TooltipTriggerType,
  handler: (e: Event) => void
) => {
  return (e: Event) => {
    isTriggerType(unref(trigger), type) && handler(e)
  }
}