const publicPropertiesMap = {
    $el: (i) => i.$el,
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key, receiver) {
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
        }
    }
};

function createComponentInstance(vnode) {
    return {
        vnode,
        type: vnode.type,
        setupState: {},
        $el: null
    };
}
function setupComponent(instance) {
    // initProps()
    // initSlots()
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const setup = instance.type.setup;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const component = instance.type;
    if (component.render) {
        instance.render = component.render;
    }
}

function render(vnode, container) {
    // ...
    patch(vnode, container);
}
function patch(vnode, container) {
    if (vnode.shapeFlag & 1 /* ELEMENT */) {
        processElement(vnode, container);
    }
    else if (vnode.shapeFlag & 2 /* STATEFUL_COMPONENT */) {
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    // type
    const el = vnode.$el = document.createElement(vnode.type);
    // props
    for (let key in vnode.props) {
        el.setAttribute(key, vnode.props[key]);
    }
    // children
    if (vnode.shapeFlag & 4 /* TEXT_CHILDREN */) {
        el.innerText = vnode.children;
    }
    else if (vnode.shapeFlag & 8 /* ARRAY_CHILDREN */) {
        mountChildren(vnode, el);
    }
    // append
    container.appendChild(el);
}
function mountChildren(vnode, el) {
    for (let i = 0; i < vnode.children.length; i++) {
        processElement(vnode.children[i], el);
    }
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(initinalVNode, container) {
    const instance = createComponentInstance(initinalVNode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render.call(instance.proxy);
    patch(subTree, container);
    // 最终是要给rootcomponet实例上添加el
    instance.$el = subTree.$el;
}

function createVNode(type, props, children) {
    // type 可能是 string | Component，例如 'div' | MyComponent
    const vnode = {
        type,
        props,
        children,
        $el: null,
        shapeFlag: getShapeFlag(type)
    };
    if (typeof children === 'string') {
        vnode.shapeFlag |= 4 /* TEXT_CHILDREN */;
    }
    else if (typeof children === 'object') {
        vnode.shapeFlag |= 8 /* ARRAY_CHILDREN */;
    }
    return vnode;
}
function getShapeFlag(type) {
    return typeof type === 'string' ? 1 /* ELEMENT */ : 2 /* STATEFUL_COMPONENT */;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };
