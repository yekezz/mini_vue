import { track, triger } from './index'

export function reactive(obj: any) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key ,receiver);
      track(target, key); // 触发订阅
      return res
    },
    set(target, key, value ,receiver) {
      const res = Reflect.set(target, key, value, receiver);
      triger(target, key); // 触发订阅
      return res
    }
  })
}