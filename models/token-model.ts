import dayjs from 'dayjs'
import { refreshTokenValue, accessTokenValue, refreshTokenExpiredAtValue, accessTokenExpiredAtValue } from '../values'
import { TokenRepository } from '../repositories'
import { BaseModel, useFieldDecorator } from './'
const { Field, fieldProperties } = useFieldDecorator()
export interface ITokenModel {
  id?: number
  userAccountId?: number
  refreshToken?: string
  refreshTokenExpiredAt?: string
  accessToken?: string
  accessTokenExpiredAt?: string
  createdAt?: string
  updatedAt?: string
}

export class TokenModel extends BaseModel implements ITokenModel {
  protected data: ITokenModel
  @Field() id: number
  @Field() userAccountId: number
  @Field() refreshToken: string
  @Field('') refreshTokenExpiredAt: string
  @Field() accessToken: string
  @Field('') accessTokenExpiredAt: string
  @Field() createdAt: string
  @Field() updatedAt: string

  constructor (data: ITokenModel) {
    super()
    this.assignDefaultAttributes(data, fieldProperties)
  }

  static factory () {
    const params = {
      accessToken: accessTokenValue.value,
      refreshToken: refreshTokenValue.value,
      refreshTokenExpiredAt: refreshTokenExpiredAtValue.value,
      accessTokenExpiredAt: accessTokenExpiredAtValue.value
    }
    return new TokenModel(params)
  }

  saveLocalToken () {
    accessTokenValue.value = this.accessToken
    refreshTokenValue.value = this.refreshToken
    refreshTokenExpiredAtValue.value = this.refreshTokenExpiredAt
    accessTokenExpiredAtValue.value = this.accessTokenExpiredAt
  }

  async refresh () {
    try {
      const tokenRepository = new TokenRepository()
      const { data: token } = await tokenRepository.index({ refreshToken: this.refreshToken })
      token.saveLocalToken()
      this.accessToken = token.accessToken
      this.refreshToken = token.refreshToken
      this.refreshTokenExpiredAt = token.refreshTokenExpiredAt
      this.accessTokenExpiredAt = token.accessTokenExpiredAt
    } catch (_e) {
      accessTokenValue.value = null
      refreshTokenValue.value = null
      refreshTokenExpiredAtValue.value = null
      accessTokenExpiredAtValue.value = null
    }
  }

  async destroy () {
    accessTokenValue.value = null
    refreshTokenValue.value = null
    refreshTokenExpiredAtValue.value = null
    accessTokenExpiredAtValue.value = null
    try {
      const tokenRepository = new TokenRepository()
      await tokenRepository.delete('', { refreshToken: this.refreshToken })
    } catch (_e) {
    }
  }

  get hasToken () {
    return this.accessToken.length > 0 && this.refreshToken.length > 0
  }

  get isExpired () {
    if (this.accessTokenExpiredAt === null || this.accessTokenExpiredAt === '') { return true }

    const expiredAt = dayjs(this.accessTokenExpiredAt)
    const now = dayjs()
    return now >= expiredAt
  }
}
