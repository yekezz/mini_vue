

const targetMap = new WeakMap
export function track(target: any, key: any) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map
    targetMap.set(target, depsMap)
  }
  let depsSet = depsMap.get(key)
  if (!depsSet) {
    depsSet = new Set
    depsMap.set(key, depsSet)
  }
  depsSet.add(activeEffect)
}

export function triger(target: any, key: any) {
  const depsMap = targetMap.get(target)
  const depsSet = depsMap.get(key)
  for (const effect of depsSet) {
    if(effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

let activeEffect: any;
export function effect(fn: any, options: any = {}) {
  const { scheduler } = options
  const _effect = new ReactiveEffect(fn, scheduler)
  activeEffect = _effect
  _effect.run()
  activeEffect = null

  return _effect.run.bind(_effect)
}

class ReactiveEffect {
  constructor(private _fn: any,public scheduler: any) {
  }
  public run() {
    return this._fn()
  }
}