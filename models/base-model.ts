export class BaseModel {
  protected dataKey = 'data'
  protected defaultValues: any

  constructor () {
    this[this.dataKey] = {}
  }

  assignDefaultAttributes (data: any = {}) {
    const defaultValues = this.defaultValues || {}
    this.assignAttributes(Object.assign({}, defaultValues, data))
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
