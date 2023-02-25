import { InjectionKey, inject, computed, getCurrentInstance } from 'vue'

const defaultIdInjection = {
  containerId: 'default',
  itemId: 0
}

interface IdContext {
  containerId: number | string,
  itemId: number,
}
export const ID_INJECTION_KEY: InjectionKey<IdContext> = Symbol('idInjection')

export const useIdInjection = () => {
  const idInjection = getCurrentInstance() 
    ? inject(ID_INJECTION_KEY, defaultIdInjection)
    : defaultIdInjection

  return idInjection
}

export const useId = (id?: string) => {
  const namespace = 'ice'
  const idInjection = useIdInjection()

  return computed(
    () => id || `${namespace}-id-${idInjection.containerId}-${idInjection.itemId++}`
  )
}