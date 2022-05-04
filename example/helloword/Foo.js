import {
  h
} from "../../lib/mini_vue.esm.js"

export default {
  name: 'Foo',
  setup(props) {
    console.log(props.count)
    props.count++
    console.log(props.count)
  },
  render() {
    return h('div', {
      id: 'foo'
    }, 'foo：' + this.count)
  }
}