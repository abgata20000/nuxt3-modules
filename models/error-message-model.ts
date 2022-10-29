import { camelcaseKeys } from '../libs'
interface IErrors {
  [key: string]: [string]
}
export class ErrorMessageModel {
  errors: IErrors
  constructor (errors: IErrors) {
    this.updateErrors(errors)
  }

  updateErrors (errors: IErrors) {
    this.errors = camelcaseKeys(errors, { deep: true })
  }

  hasError (key: string): boolean {
    return !!this.errors[key]
  }

  messages (key: string): string[] {
    if (!this.hasError(key)) { return [] }
    return this.errors[key]
  }

  message (key: string): string {
    if (!this.hasError(key)) { return '' }
    return this.errors[key][0]
  }

  resetErrors () {
    this.errors = {}
  }
}
