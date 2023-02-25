
let id = 0
export const useId = (prefix?: string) => {
  const namespace = 'ice'
  return `${namespace}-id-${prefix}-${id++}`
}