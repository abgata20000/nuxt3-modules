import { BaseRepository } from './'
import { TokenModel, ITokenModel } from '../models'

export class TokenRepository extends BaseRepository {
  protected resourcesPath () {
    return '/token'
  }

  protected resourcePath () {
    return '/token'
  }

  protected toInstance (data: ITokenModel) {
    return new TokenModel(data)
  }

  protected useAuth () {
    return false
  }
}
