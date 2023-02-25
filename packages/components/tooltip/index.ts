import { withInstall } from '@iceblink/utils'
import Tooltip from './src/tooltip.vue'
import TooltipContent from './src/content.vue'
import TooltipTrigger from './src/trigger.vue'

export const IceTooltip = withInstall(Tooltip)
export const IceTooltipContent = withInstall(TooltipContent)
export const IceTooltipTrigger = withInstall(TooltipTrigger)
export default IceTooltip