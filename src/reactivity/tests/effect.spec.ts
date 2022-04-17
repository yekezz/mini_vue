import { effect } from '../index'
import { reactive } from '../reactive';

describe('effect', () => {
  it('effect', () => {
    const record = reactive({
      count: 0
    })
    let total;
    effect(() => {
      total = record.count + 1
    })
    expect(total).toBe(1)
    record.count = 4
    expect(total).toBe(5)
  });
  
  it('test runner returned by the effect', () => {
    let count = 0
    const runner = effect(() => {
      count++
      return 'hello'
    })
    expect(count).toBe(1)
    const r = runner()
    expect(count).toBe(2)
    expect(r).toBe('hello')
  });

  
  it('scheduler', () => {
    let dummy
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler }
    )
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    // should be called on first trigger
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    // should not run yet
    expect(dummy).toBe(1)
    // manually run
    run()
    // should have run
    expect(dummy).toBe(2)
  })
  
});