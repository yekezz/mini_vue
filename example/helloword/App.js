import {
  h
} from '../../lib/mini_vue.esm.js';
// component
export const App = {
  render() {
    return h('div', {
      id: 'main',
      class: ['blue']
    }, [
      h('span', {
        id: 'text',
        class: ['yellow']
      }, '我是spannnn!'),
      h('span', {
        id: 'text',
        class: ['red']
      }, '我是span!')
    ]);
  },
  setup() {
    return {
      msg: 'Hello World!'
    };
  }
}