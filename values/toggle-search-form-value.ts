export class ToggleSearchFormValue {
  key: string
  constructor (key: string) {
    this.key = `TOGGLE-SEARCH-FORM-VALUE-${key.toUpperCase()}`
  }

  get isOpen (): boolean {
    const tmp = localStorage.getItem(this.key) || '1'
    return tmp === '1'
  }

  toggle () : void {
    localStorage.setItem(this.key, this.isOpen ? '0' : '1')
  }
}
