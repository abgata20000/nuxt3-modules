import { AbstractValue } from './abstracut-value'

export class RefreshTokenExpiredAtValue extends AbstractValue {
  protected key () {
    return 'REFRESH_TOKEN_EXPIRED_AT'
  }
}
export const refreshTokenExpiredAtValue = new RefreshTokenExpiredAtValue()
