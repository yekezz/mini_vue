import { PublicInstanceProxyHandlers } from "./componentPublicInstance";


export function createComponentInstance(vnode: any): any {
  return {
    vnode,
    type: vnode.type,
    setupState: {},
    $el: null
  }
}

export function setupComponent(instance: any) {
  // initProps()
  // initSlots()
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const setup = instance.type.setup;
  if (setup) {
    const setupResult = setup();
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

