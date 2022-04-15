class ReactiveEffect {
  public effect: any
  constructor(fn: any) {
    this.effect = fn
  }
  public run() {
    this.effect()
  }
}

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
    effect.run()
  }
}

let activeEffect: any;
export function effect(fn: any) {
  const _effect = new ReactiveEffect(fn)
  activeEffect = _effect
  _effect.run()
  activeEffect = null
}