import { mutableHandlers, readonlyHandlers } from './baseHandlers';

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

function createActiveObject(obj: any, baseHandlers: any) {
  return new Proxy(obj, baseHandlers)
}

export function isReactive(obj: any) {
  return !!obj[ReaciveFlags.IS_REACTIVE]
}

export function isReadonly(obj: any) {
  return obj[ReaciveFlags.IS_READONLY]
}