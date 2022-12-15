import { computed, Ref, ref } from 'vue'
import { BaseRepository } from '../repositories'
import { IPostParams } from '../interfaces'
import { ErrorMessageModel } from '../models'
import { toaster, loader } from '../libs'
interface IArgs {
  repository: BaseRepository
  formValues: IPostParams
}

interface IOptions {
  id?: string
}

export class FormItemClass {
  public isPosting: Ref<boolean>
  public formValues: Ref<IPostParams>
  public errorMessage: Ref<ErrorMessageModel>
  protected repository: BaseRepository
  protected options: IOptions
  constructor (args: IArgs, options: IOptions = {}) {
    this.options = Object.assign({}, this._defaultOptions(), options)
    this.repository = args.repository
    this.formValues = ref(args.formValues)
    this._initRefs()
  }

  protected _defaultOptions (): IOptions {
    return { id: null }
  }

  protected _initRefs () {
    this.isPosting = ref<boolean>(false)
    this.errorMessage = ref<ErrorMessageModel>(new ErrorMessageModel({}))
  }

  refs () {
    const { isPosting, formValues, errorMessage, isNew, isButtonEnabled, actionLabel } = this
    return { isPosting, formValues, errorMessage, isNew, isButtonEnabled, actionLabel }
  }

  get id () {
    return this.options.id
  }

  get isNew () {
    return !this.id
  }

  get actionLabel () {
    return this.isNew ? '作成' : '更新'
  }

  protected _successText () {
    return `${this.actionLabel}しました`
  }

  protected _failedText () {
    return `${this.actionLabel}に失敗しました`
  }

  async submitAction (action: () => void): Promise<boolean> {
    let result = false
    if (this.isPosting.value) { return result }
    this.isPosting.value = true
    loader.show()
    this.errorMessage.value.resetErrors()
    try {
      await action()
      toaster.success(this._successText())
      result = true
    } catch (e) {
      this.errorMessage.value.updateErrors(e.response.data.messages)
      toaster.error(this._failedText())
    } finally {
      this.isPosting.value = false
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      loader.hide()
    }
    return result
  }

  async create (): Promise<boolean> {
    const result = await this.submitAction(
      async () => await this.repository.create(this.formValues.value)
    )
    return result
  }

  async update (): Promise<boolean> {
    const result = await this.submitAction(
      async () => await this.repository.update(this.id, this.formValues.value)
    )
    return result
  }

  async destroy (): Promise<boolean> {
    let result = false
    if (this.isPosting.value) { return result }
    this.isPosting.value = true
    loader.show()
    this.errorMessage.value.resetErrors()
    try {
      await this.repository.delete(this.id)
      toaster.success('削除しました')
      result = true
    } catch (e) {
      this.errorMessage.value.updateErrors(e.response.data.messages)
      toaster.error('削除に失敗しました')
    } finally {
      this.isPosting.value = false
      loader.hide()
    }
    return result
  }

  async save (): Promise<boolean> {
    let result
    if (this.isNew) {
      result = await this.create()
    } else {
      result = await this.update()
    }
    return result
  }

  get isButtonEnabled () {
    return computed(() => {
      return !this.isPosting.value
    })
  }
}
