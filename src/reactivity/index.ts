import { extend } from "../shared"


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
  activeEffect.deps.push(depsSet)
}

export function triger(target: any, key: any) {
  const depsMap = targetMap.get(target)
  const depsSet = depsMap.get(key)
  for (const effect of depsSet) {
    if (effect.scheduler) {
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
  extend(_effect, options)
  activeEffect = _effect
  _effect.run()
  activeEffect = null
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

class ReactiveEffect {
  public deps = []
  private active = false
  private onStop?: () => void

  constructor(private _fn: any, public scheduler: any) {
  }

  public run() {
    return this._fn()
  }

  public stop() {
    if (this.active) return
    this.active = true
    if (this.onStop) this.onStop()
    clearupeffect(this)
  }
}

function clearupeffect(effect: any) {
  effect.deps.forEach((depSet: any) => {
    depSet.delete(effect)
  });
}

export function stop(runner: any) {
  runner.effect.stop()
}