import { isReactive, reactive } from '../reactive'

describe('reactive', () => {
  it('reactive', () => {
    const obj = {
      foo: 'foo',
    };
    const objRec = reactive(obj);
    expect(objRec.foo).toBe('foo');
    expect(obj).not.toBe(objRec);
    expect(isReactive(objRec)).toBe(true);
    expect(isReactive(obj)).toBe(false);
  });
});

