
const defaultNamespace = 'ice'
export const capitalize = (str: string) => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`
const statePrefix = 'is-'
// iceButton-disabled
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let className = `${namespace}${capitalize(block)}`
  if(blockSuffix) className += capitalize(blockSuffix)
  if(element) className += `_${element}`
  if(modifier) className += `-${modifier}`
  return className
}

export const useNamespace = (block: string) => {
  const namespace = defaultNamespace
  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '')
  const e = (element?: string) => element ? _bem(namespace, block, '', element, '') : ''
  const m = (modifier?: string) => modifier ? _bem(namespace, block, '', '', modifier) : ''
  const be = (blockSuffix?: string, element?: string) => 
    blockSuffix && element
      ? _bem(namespace, block, blockSuffix, element, '')
      : ''
  const em = (element?: string, modifier?: string) => 
    element && modifier
      ? _bem(namespace, block, '', element, modifier)
      : ''
  const bm = (blockSuffix?: string, modifier?: string) => 
    blockSuffix && modifier
      ? _bem(namespace, block, blockSuffix, '', modifier)
      : ''
  const bem =  (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace, block, blockSuffix, element, modifier)
      : ''
  
  
  const is = (name: string, state: boolean = true) => {
    const _state = !!state
    return name && _state ? `${statePrefix}${name}` : ''
  }
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  }
}