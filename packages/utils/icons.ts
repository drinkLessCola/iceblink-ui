import { Component } from 'vue'
import { definePropType } from './vue'

export const IconPropType = definePropType<string | Component>([String, Object, Function])