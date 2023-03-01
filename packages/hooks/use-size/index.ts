import { buildProp } from '@iceblink/utils'
import { ComputedRef } from 'vue'
import { computed, getCurrentInstance } from 'vue'
export const componentSizes = ['', 'default', 'small', 'large'] as const
export type ComponentSizes = typeof componentSizes[number]
export const useSizeProps = buildProp({
  type: String,
  values: componentSizes,
  required: false,
})


export const useProps = <T>(name: string): ComputedRef<T | undefined> => {
  const comp = getCurrentInstance()
  return computed(() => comp?.proxy?.$props[name] ?? undefined)
}
export const useSize = () => {
  const size = useProps<ComponentSizes>('size')
  return computed(() => size.value)
}