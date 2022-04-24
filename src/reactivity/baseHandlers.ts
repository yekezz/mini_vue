import { track, triger } from ".";
import { extend, isObject } from "../shared";
import { ReaciveFlags, reactive, readonly } from "./reactive";

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
const shallowReactiveGet = createGetter(false, true);
const shallowReadonlyGet = createGetter(true, true);

function createGetter(isReadonly = false, isShallow = false) {
  return function (target: any, key: any, receiver: any) {
    const res = Reflect.get(target, key, receiver);
    if (key === ReaciveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReaciveFlags.IS_READONLY) {
      return isReadonly
    }

    if (!isReadonly) {
      track(target, key); // 触发订阅
    }

    if (isShallow) {
      return res
    }

    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}

function createSetter() {
  return function (target: any, key: any, value: any, receiver: any) {
    const res = Reflect.set(target, key, value, receiver);
    triger(target, key); // 触发订阅
    return res
  }
}

export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target: any, key: any, value: any, receiver: any) {
    console.warn(`Set ${key} failed, it's readonly`, target);
    return true
  }
}

export const shallowReactiveHandlers = extend({}, mutableHandlers, {
  get: shallowReactiveGet
})

export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
})