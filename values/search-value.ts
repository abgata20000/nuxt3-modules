import { ISearchQuery } from '../interfaces'
export class SearchValue {
  key: string
  constructor (key: string) {
    this.key = key
    this.key = `SEARCH-VALUE-${key.toUpperCase()}`
  }

  get value (): ISearchQuery {
    const tmp = localStorage.getItem(this.key) || '{}'
    return JSON.parse(tmp) as ISearchQuery
  }

  set value (val: ISearchQuery) {
    const tmp = val || {}
    const value = JSON.stringify(tmp)
    localStorage.setItem(this.key, value)
  }
}
