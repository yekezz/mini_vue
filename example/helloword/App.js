// component
export const App = {
  render() {
    return history('div', 'Hello World!');
  },
  setup() {
    return {
      msg: 'Hello World!'
    };
  }
}