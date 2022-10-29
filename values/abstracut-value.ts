export abstract class AbstractValue {
  get value () : string {
    return localStorage.getItem(this.key()) || ''
  }

  set value (val) {
    const value = val || ''
    localStorage.setItem(this.key(), value)
  }

  protected key (): string {
    throw new Error('継承先で定義すること')
  }
}
