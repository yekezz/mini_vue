import { reactive } from '../reactive'

describe('reactive', () => {
  it('reactive', () => {
    const obj = {
      foo: 'foo',
    };
    const objRec = reactive(obj);
    expect(objRec.foo).toBe('foo');
    expect(obj).not.toBe(objRec);
  });
});

