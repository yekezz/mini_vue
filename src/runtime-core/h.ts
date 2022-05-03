import { createVNode } from "./vnode";

export function h(type: any, props?: any, children?: any) {
  return createVNode(type, props, children);
}