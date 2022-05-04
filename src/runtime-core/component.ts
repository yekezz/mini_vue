import { shallowReadonly } from "../reactivity/reactive";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";


export function createComponentInstance(vnode: any): any {
  return {
    vnode,
    type: vnode.type,
    setupState: {},
    $el: null,
    props: {}
  }
}

export function setupComponent(instance: any) {
  initProps(instance, instance.vnode.props);
  // initSlots()
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const setup = instance.type.setup;
  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props));
    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const component = instance.type
  if (component.render) {
    instance.render = component.render
  }
}

