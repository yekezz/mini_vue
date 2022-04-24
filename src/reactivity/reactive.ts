import { mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers } from './baseHandlers';

export const enum ReaciveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

export function reactive(obj: any) {
  return createActiveObject(obj, mutableHandlers)
}

export function readonly(obj: any) {
  return createActiveObject(obj, readonlyHandlers)
}

export function shallowReactive(obj: any) {
  return createActiveObject(obj, shallowReactiveHandlers)
}

export function shallowReadonly(obj: any) {
  return createActiveObject(obj, shallowReadonlyHandlers)
}

function createActiveObject(obj: any, baseHandlers: any) {
  return new Proxy(obj, baseHandlers)
}

export function isReactive(obj: any) {
  return !!obj[ReaciveFlags.IS_REACTIVE]
}

export function isReadonly(obj: any) {
  return !!obj[ReaciveFlags.IS_READONLY]
}