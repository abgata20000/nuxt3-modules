import { AbstractValue } from './abstracut-value'

export class AccessTokenExpiredAtValue extends AbstractValue {
  protected key () {
    return 'ACCESS_TOKEN_EXPIRED_AT'
  }
}
export const accessTokenExpiredAtValue = new AccessTokenExpiredAtValue()
