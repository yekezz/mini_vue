import { isTracking, trackEffect, trigerEffects } from ".";
import { hasChanged, isObject } from "../shared";
import { reactive } from "./reactive";


const createRefImpl = (val: any) => ({
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