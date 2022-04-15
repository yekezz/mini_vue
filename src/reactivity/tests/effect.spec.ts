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
  
});