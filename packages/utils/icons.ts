import { Component } from 'vue'
import { definePropType } from './vue'

export const iconPropType = definePropType<string | Component>([String, Object, Function])