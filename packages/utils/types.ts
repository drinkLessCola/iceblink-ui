import {
  isString,
} from '@vue/shared'
export {
  isArray,
  isMap,
  isSet,
  isDate,
  isFunction,
  isString,
  isSymbol,
  isPromise,
  isObject, // 包括数组
  isPlainObject, // 不包括数组
} from '@vue/shared';

export const isNumber = (val: any): val is number => typeof val === 'number'
export const isUndefined = (val: any): val is undefined => val === undefined

export const isStringNumber = (val: string): boolean => {
  if(!isString(val)) return false
  
  return !Number.isNaN(Number(val))
}

export const isElement = (e: unknown): e is Element => {
  if(typeof Element === 'undefined') return false
  return e instanceof Element
}