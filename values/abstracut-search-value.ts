import { ISearchQuery } from '../interfaces'
export abstract class AbstractSearchValue {
  get value (): ISearchQuery {
    const tmp = localStorage.getItem(this.key()) || '{}'
    return JSON.parse(tmp) as ISearchQuery
  }

  set value (val: ISearchQuery) {
    const tmp = val || {}
    const value = JSON.stringify(tmp)
    localStorage.setItem(this.key(), value)
  }

  protected key (): string {
    throw new Error('継承先で定義すること')
  }
}
