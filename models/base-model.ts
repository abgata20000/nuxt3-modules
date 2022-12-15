export class BaseModel {
  protected dataKey = 'data'
  protected fieldProperties: any

  constructor () {
    this[this.dataKey] = {}
  }

  assignDefaultAttributes (data: any, fieldProperties: any = {}) {
    this.fieldProperties = fieldProperties
    const defaultValues = this.fieldProperties || {}
    this.assignAttributes(Object.assign({}, defaultValues, data))
    this.assignAccessors()
  }

  assignAccessors () {
    Object.keys(this.fieldProperties).forEach((key) => {
      Object.defineProperty(this, key, {
        get () {
          return this[this.dataKey][key]
        },
        set (val) {
          this[this.dataKey][key] = val
        }
      })
    })
  }

  assignAttributes (data: any) {
    const currentValues = this[this.dataKey] || {}
    this[this.dataKey] = Object.assign({}, currentValues, data)
  }

  assignAttribute (key: string, value: any) {
    this[this.dataKey][key] = value
  }

  toParams () {
    return this[this.dataKey]
  }

  get attributes () {
    return this.toParams()
  }
}
