export function createVNode(type: any, props?: any, children?: any) {
  // type 可能是 string | Component，例如 'div' | MyComponent
  return {
    type,
    props,
    children
  }
}