import { isOn } from '../shared/index';
import { ShapeFlags } from '../shared/shapeFlags';
import { createComponentInstance, setupComponent } from './component';

export function render(vnode: any, container: any) {
  // ...
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container)
  } else if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  // type
  const el = vnode.$el = document.createElement(vnode.type);
  // props
  const { props } = vnode
  for (let key in props) {
    const val = props[key];
    if (isOn(key)) {
      const event = key.slice(2).toLocaleLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val);
    }
  }
  // children
  if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.innerText = vnode.children;
  } else if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  }
  // append
  container.appendChild(el);
}

function mountChildren(vnode: any, el: any) {
  for (let i = 0; i < vnode.children.length; i++) {
    patch(vnode.children[i], el);
  }
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(initinalVNode: any, container: any) {
  const instance = createComponentInstance(initinalVNode);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container: any) {
  const subTree = instance.render.call(instance.proxy);
  patch(subTree, container);

  // 最终是要给rootcomponet实例上添加el
  instance.$el = subTree.$el;
}