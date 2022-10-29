import { BaseRepository } from '../repositories'
import { toaster } from '../libs'

interface IArgs<T> {
  repository: BaseRepository
  newModel: T
}

export class ModelFinder<T> {
  private repository: BaseRepository
  private newModel: T
  constructor (args: IArgs<T>) {
    this.repository = args.repository
    this.newModel = args.newModel
  }

  async find (id: number | string | null): Promise<T> {
    if (!id) { return (this.newModel) }
    try {
      const { data: model } = await this.repository.show(id)
      return model
    } catch (error) {
      toaster.error('通信に失敗しました')
      return (this.newModel)
    }
  }
}
