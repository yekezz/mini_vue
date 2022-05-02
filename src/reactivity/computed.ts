import { ReactiveEffect } from "."

class ComputedRefImpl {
  private _dirty: boolean = false
  private _effect: ReactiveEffect
  private _value: any
  constructor(getter: any) {
    this._effect = new ReactiveEffect(getter, () => {
      if (this._dirty) {
        this._dirty = false
      }
    })
  }
  get value() {
    if (!this._dirty) {
      this._value = this._effect.run()
      this._dirty = true
      return this._value
    }
    return this._value
  }
}


export function computed(getter: any) {
  return new ComputedRefImpl(getter)
}