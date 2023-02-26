import { Component } from 'vue'
import { definePropType } from './vue'

export type IconType = string | Component
export const IconPropType = definePropType<string | Component>([String, Object, Function])