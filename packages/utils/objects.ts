export const hasOwn = (obj: object, prop: string | symbol): prop is never => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}