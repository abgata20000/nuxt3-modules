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
      (target.fieldProperties || (target.fieldProperties = {}) as any)[propertyKey] = defaultValue
    } else {
      (target.fieldProperties || (target.fieldProperties = {}) as any)[propertyKey] = null
    }
  }
}

// MEMO: typescriptの仕様が変わってtargetに直接definePropertyで設定できなくなったので別の方法を用意した
export const useFieldDecorator = () => {
  const fieldProperties = {}
  const Field = (defaultValue?: any) => {
    return (_target: any, propertyKey: string | symbol) => {
      // MEMO: undefined はnullとして扱う
      const myDefaultValue = defaultValue === undefined ? null : defaultValue
      fieldProperties[propertyKey] = myDefaultValue
    }
  }
  return { Field, fieldProperties }
}
