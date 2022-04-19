import { mutableHandlers, readonlyHandlers } from './baseHandlers';

export function reactive(obj: any) {
  return createActiveObject(obj, mutableHandlers)
}

export function readonly(obj: any) {
  return createActiveObject(obj, readonlyHandlers)
}

function createActiveObject(obj: any, baseHandlers: any) {
  return new Proxy(obj, baseHandlers)
}