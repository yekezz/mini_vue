import { ShapeFlags } from "../shared/shapeFlags"


export function createVNode(type: any, props?: any, children?: any) {
  // type 可能是 string | Component，例如 'div' | MyComponent
  const vnode = {
    type,
    props,
    children,
    $el: null,
    shapeFlag: getShapeFlag(type)
  };

  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  } else if (typeof children === 'object') {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  }

  return vnode;
}

function getShapeFlag(type: any) {
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}