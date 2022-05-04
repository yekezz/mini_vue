import { hasOwn } from "../shared/index";

const publicPropertiesMap: any = {
  $el: (i: any) => i.$el,
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }: any, key: string, receiver: any) {
    const { setupState, props } = instance;
    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    if (key in publicPropertiesMap) {
      return publicPropertiesMap[key](instance)
    }
  }
}