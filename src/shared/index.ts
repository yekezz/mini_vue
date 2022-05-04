export const extend = Object.assign

export const isObject = (val: any) => {
  return val !== null && typeof val === 'object'
}

export const hasChanged = (newValue: any, value: any) => !Object.is(newValue, value)

export const isOn = (key: string) => /^on[A-Z]/.test(key)