import Content from './src/content.vue'
import Trigger from './src/trigger.vue'
import Popper from './src/popper.vue'
import Arrow from './src/arrow.vue'
import { withInstall } from '@iceblink/utils'

export const IcePopperContent = withInstall(Content)
export const IcePopperTrigger = withInstall(Trigger)
export const IcePopperArrow = withInstall(Arrow)
export const IcePopper = withInstall(Popper)