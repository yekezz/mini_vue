import { effect } from "..";
import { isReactive, isReadonly, readonly, shallowReactive } from "../reactive";

describe("shallowReactive", () => {
  test("should not make non-reactive properties reactive", () => {
    const props = shallowReactive({ m: 2, n: { foo: 1 } });
    expect(isReactive(props.n)).toBe(false);
    expect(isReactive(props)).toBe(true);
    let total
    effect(() => {
      total = props.m + 1
    })
    expect(total).toBe(3)
    props.m++
    expect(total).toBe(4)

    let other
    effect(() => {
      other = props.n.foo + 1
    })
    expect(other).toBe(2)
    props.n.foo++
    expect(other).toBe(2)
  });
});