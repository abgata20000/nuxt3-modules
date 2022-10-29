export function ModelDecorator (dataKey = 'data') {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    constructor.prototype.dataKey = dataKey
    // constructor.prototype[dataKey] = {}
  }
}

export function FieldDecorator (defaultValue?: any) {
  return function (target: any, propertyKey: string) {
    let value : string
    Object.defineProperty(target, propertyKey, {
      get () {
        return this[this.dataKey][propertyKey]
      },
      set (val) {
        this[this.dataKey][propertyKey] = val
      }
    })
    if (defaultValue !== undefined) {
      (target.defaultValues || (target.defaultValues = {}) as any)[propertyKey] = defaultValue
    } else {
      (target.defaultValues || (target.defaultValues = {}) as any)[propertyKey] = null
    }
  }
}
