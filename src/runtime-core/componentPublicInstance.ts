const publicPropertiesMap: any = {
  $el: (i: any) => i.$el,
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }: any, key: string, receiver: any) {
    const { setupState } = instance;
    if (key in setupState) {
      return setupState[key];
    }

    if (key in publicPropertiesMap) {
      return publicPropertiesMap[key](instance)
    }
  }
}