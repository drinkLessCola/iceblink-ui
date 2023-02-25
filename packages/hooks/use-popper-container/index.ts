import { computed, onBeforeMount } from 'vue'
import { useIdInjection } from '..'

let cachedContainer: HTMLElement
export const usePopperContainerId = () => {
  const namespace = 'ice'
  const { containerId: id } = useIdInjection()
  const containerId = computed(() => `${namespace}-popper-container-${id}`)
  return {
    containerId,
    selector: computed(() => `#${containerId.value}`)
  }
}

export const createPopperContainer = (id: string) => {
  const container = document.createElement('div')
  container.id = id
  document.body.appendChild(container)
  return container
}

export const usePopperContainer = () => {
  onBeforeMount(() => {
    const { containerId, selector } = usePopperContainerId()
  
    if(!cachedContainer && !document.querySelector(selector.value)) {
      cachedContainer = createPopperContainer(containerId.value)
    }
  })
}