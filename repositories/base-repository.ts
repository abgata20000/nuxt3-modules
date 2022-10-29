import { AxiosInstance, AxiosResponse } from 'axios'
import { ApiClient } from './api-client'
import { IPostParams, ISearchQuery } from '../interfaces'
const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL)

export class BaseRepository {
  client: AxiosInstance
  constructor () {
    this.client = ApiClient.generateClient(API_BASE_URL)
  }

  index (params: ISearchQuery = {}): Promise<AxiosResponse> {
    return this.convertResponse(this.client.get(this.resourcesPath(), { params }))
  }

  show (id: string | number | ISearchQuery, params: ISearchQuery = {}): Promise<AxiosResponse> {
    if (typeof id === 'string' || typeof id === 'number') {
      return this.convertResponse(this.client.get(this.resourcePath(id), { params }))
    } else {
      return this.convertResponse(this.client.get(this.resourcesPath(), { params: id }))
    }
  }

  new (params: ISearchQuery = {}): Promise<AxiosResponse> {
    return this.convertResponse(this.client.get(this.newPath(), { params }))
  }

  create (params: IPostParams = {}): Promise<AxiosResponse> {
    return this.convertResponse(this.client.post(this.resourcesPath(), params))
  }

  update (id: string | number | IPostParams, params: IPostParams = {}): Promise<AxiosResponse> {
    if (typeof id === 'string' || typeof id === 'number') {
      return this.convertResponse(this.client.put(this.resourcePath(id), params))
    } else {
      return this.convertResponse(this.client.put(this.resourcesPath(), id))
    }
  }

  delete (id: string | number | ISearchQuery, params: ISearchQuery = {}): Promise<AxiosResponse> {
    if (typeof id === 'string' || typeof id === 'number') {
      return this.convertResponse(this.client.delete(this.resourcePath(id), { params }))
    } else {
      return this.convertResponse(this.client.delete(this.resourcesPath(), { params: id }))
    }
  }

  protected convertResponse (promiseFunc: Promise<AxiosResponse>): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      promiseFunc.then((res) => {
        res.data = this.convertToInstance(res.data)
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  protected convertToInstance (data: any) {
    if (Array.isArray(data)) {
      return data.map((val) => {
        return this.toInstance(val)
      })
    } else if (typeof data === 'object') {
      return this.toInstance(data)
    } else {
      return data
    }
  }

  protected toInstance (_data: any) {
    throw new Error('継承先で定義すること')
  }

  protected newPath (): string {
    throw new Error('継承先で定義すること')
  }

  protected resourcesPath (): string {
    throw new Error('継承先で定義すること')
  }

  protected resourcePath (id: string | number): string {
    throw new Error('継承先で定義すること')
  }
}
