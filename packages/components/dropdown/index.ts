import dropdown from './src/dropdown.vue'
import dropdownMenu from './src/dropdown-menu.vue'
import dropdownItem from './src/dropdown-item.vue'
import { withInstall } from '@iceblink/utils'

export const IceDropdown = withInstall(dropdown)
export const IceDropdownMenu = withInstall(dropdownMenu)
export const IceDropdownItem = withInstall(dropdownItem)
export default IceDropdown