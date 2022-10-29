import { AbstractValue } from './abstracut-value'

export class AccessTokenValue extends AbstractValue {
  protected key () {
    return 'ACCESS_TOKEN'
  }
}
export const accessTokenValue = new AccessTokenValue()
