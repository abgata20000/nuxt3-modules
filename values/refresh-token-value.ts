import { AbstractValue } from './abstracut-value'

export class RefreshTokenValue extends AbstractValue {
  protected key () {
    return 'REFRESH_TOKEN'
  }
}
export const refreshTokenValue = new RefreshTokenValue()
