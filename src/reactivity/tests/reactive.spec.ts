import { effect } from '..';
import { isProxy, isReactive, reactive } from '../reactive'

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
    expect(isProxy(objRec)).toBe(true);
    expect(isProxy(obj)).toBe(false);
  });

  it('nested reactive', () => {
    const obj = {
      a: { b: 1 },
      c: [{ d: 2 }]
    }
    const objRec = reactive(obj);
    let total
    effect(() => {
      total = objRec.a
    })
    expect(isReactive(objRec.a)).toBe(true);
    expect(isReactive(objRec.c)).toBe(true);
    expect(isReactive(objRec.c[0])).toBe(true);

    objRec.a = 3
    expect(total).toBe(3)
  });

});

