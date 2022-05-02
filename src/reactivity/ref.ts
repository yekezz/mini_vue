import { isTracking, trackEffect, trigerEffects } from ".";
import { hasChanged, isObject } from "../shared";
import { reactive } from "./reactive";


const createRefImpl = (val: any) => ({
  _v_isRef: true,
  _rawValue: val,
  _value: convert(val),
  dep: new Set,
  get value() {
    if (isTracking()) {
      trackEffect(this.dep);
    }
    return this._value;
  },
  set value(newValue) {
    if (!hasChanged(newValue, this._rawValue)) return;
    this._value = convert(newValue);
    this._rawValue = newValue;
    trigerEffects(this.dep)
  },
})

export function convert(value: any) {
  return isObject(value) ? reactive(value) : value;
}

export function ref(value: any) {
  return createRefImpl(value);
}

export function isRef(ref: any) {
  return !!ref._v_isRef
}

export function unRef(ref: any) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objectWithRef: any) {
  return new Proxy(objectWithRef, {
    get(target: any, key: any, receiver: any) {
      return unRef(Reflect.get(target, key, receiver))
    },
    set(target: any, key: any, value: any, receiver: any) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return Reflect.set(target, key, value, receiver)
      }
    }
  })
}