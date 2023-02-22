/* eslint-disable no-unused-vars */
import { icePropKey } from './types'
import type { 
  IcePropInput, 
  IcePropMergeType, 
  IcePropOutput, 
  IfNativePropType, 
  NativePropType, 
  IcePropConvert 
} from './types'

import type { PropType } from 'vue'
import { fromPairs } from 'lodash-unified'
import { hasOwn } from '../objects'
import { isObject } from '../types'

// 为 val 添加类型注释
export const definePropType = <T>(val: any): PropType<T> => val

// 有 values 的属性, 需要将 values 的联合类型变为该属性的类型
export const buildProp = <
  Type = never,
  Value = never,
  Required extends boolean = false,
  Default extends IcePropMergeType<Type, Value> = never
>(
    prop: IcePropInput<Type, Value, Required, Default>,
    key?: string
  ): IcePropOutput<Type, Value, Required, Default> => {
  
  // 类似 plain: Boolean 的对象直接返回
  if(!isObject(prop)) return prop
  // default 是关键字
  const { type, /*values, */required, default: defaultValue } = prop
  // 处理 validator

  // 生成函数返回值
  const props: any = {
    type,
    required: !!required,
    [icePropKey]: true,
  }
  // 如果存在 default 字段，向返回值对象添加该字段
  if(hasOwn(prop, 'default')) props.default = defaultValue

  return props 
}

/**
 * build component's props
 * 
 * ? 解决了 vue 原生的 withDefaults 推断出的类型仍然具有 undefined 的问题
 * Record<string, ... > 中的 NativePropType 是为了解决如下 bug：
 * Prop 类型配置可能通过 构造函数 而非对象字面量。
 * Type 'BooleanConstructor' has no properties in common with type 'IcePropInput<any, any, any, any>'.ts(2345)
 * @param prop 
 */

export const buildProps = <
  Props extends Record<
    string, 
    | NativePropType // 原生 / 自定义的构造函数
    | IcePropInput<any, any, any, any> // 对象字面量形式的配置
  >
>(props: Props): {
  [K in keyof Props]: IfNativePropType<
    Props[K], 
    Props[K], 
    IcePropConvert<Props[K]> // Props[K] 为 IcePropInput 类型
  >
} => fromPairs(
  Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option as any, key)
  ])
) as any
