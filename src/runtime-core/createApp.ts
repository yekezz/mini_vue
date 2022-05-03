import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent: any) {
  return {
    mount(rootContainer: any) {
      const vnode = createVNode(rootComponent);
      render(vnode, rootContainer);
    }
  }
}