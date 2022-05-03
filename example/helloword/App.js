import {
  h
} from '../../lib/mini_vue.esm.js';
// component
export const App = {
  render() {
    return h('div', 'Hello World!');
  },
  setup() {
    return {
      msg: 'Hello World!'
    };
  }
}