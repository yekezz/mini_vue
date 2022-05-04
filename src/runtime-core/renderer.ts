import { createComponentInstance, setupComponent } from './component';

export function render(vnode: any, container: any) {
  // ...
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (typeof vnode.type === 'object') {
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  // type
  const el = vnode.el = document.createElement(vnode.type);
  // props
  for (let key in vnode.props) {
    el.setAttribute(key, vnode.props[key]);
  }
  // children
  if (typeof vnode.children === 'string') {
    el.innerText = vnode.children;
  } else if (typeof vnode.children === 'object') {
    mountChildren(vnode, el)
  }
  // append
  container.appendChild(el);
}

function mountChildren(vnode: any, el: any) {
  for (let i = 0; i < vnode.children.length; i++) {
    processElement(vnode.children[i], el);
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

  instance.vnode.el = subTree.el;
}