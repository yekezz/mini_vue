import { track, triger } from ".";

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

function createGetter(isReadonly = false) {
  return function (target: any, key: any, receiver: any) {
    const res = Reflect.get(target, key, receiver);
    if (!isReadonly) {
      track(target, key); // 触发订阅
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
  get,
  set(target: any, key: any, value: any, receiver: any) {
    console.warn(`Set ${key} failed, it's readonly`, target);
    return true
  }
}