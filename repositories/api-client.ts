import axios, { AxiosInstance } from 'axios'
import { serialize } from 'object-to-formdata'
import { camelcaseKeys, snakecaseKeys } from '../libs'
import { AccessTokenValue } from '../values'
export class ApiClient {
  static generateClient (apiBaseUrl: string) {
    const accessTokenValue = new AccessTokenValue()
    const client: AxiosInstance = axios.create({
      baseURL: apiBaseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // MEMO: リクエストを送る際に、送信するデータのキーをスネークケースに変換しておく
    client.interceptors.request.use((config) => {
      if (config.data && typeof config.data === 'object') {
        // TODO: Fileが含まれているかどうかを判定しているが1階層目しか判定対象にしていないので、深い階層にも対応する必要がある
        const fileKeys = []
        Object.keys(config.data).forEach((key) => {
          if (config.data[key] instanceof File) {
            fileKeys.push(key)
          }
        })
        const hasFile = fileKeys.length > 0
        if (hasFile) {
          config.headers['Content-Type'] = 'multipart/form-data'
          // MEMO: Fileにdeep:trueのsnakecaseKeysを実行すると壊れてしまうのでdeep: falseにする
          // TODO: 今後、Fileを含むデータかつdeep:trueが必要になったら、別の方法を考える
          config.data = serialize(snakecaseKeys(config.data, { deep: false }))
        } else {
          config.data = snakecaseKeys(config.data, { deep: true })
        }
      }
      if (config.params && typeof config.params === 'object') {
        config.params = snakecaseKeys(config.params, { deep: true })
      }
      // MEMO: 送信時に都度トークンをセットする
      config.headers.Authorization = `Bearer ${accessTokenValue.value}`
      return config
    })

    // MEMO: レスポンスを受け取るの際に、受け取ったデータのキーをキャメルケースに変換しておく
    client.interceptors.response.use((response) => {
      if (!response.data || typeof response.data !== 'object') {
        return response
      }
      response.data = camelcaseKeys(response.data, { deep: true })
      return response
    })
    return client
  }
}
