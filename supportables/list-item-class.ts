import { Ref, ref } from 'vue'
import { SearchValue } from '../values'
import { ISearchQuery, IqQuery } from '../interfaces'
import { BaseRepository } from '../repositories'
import { toaster, loader } from '../libs'

interface IArgs {
  repository: BaseRepository
  searchValue: SearchValue
}

interface IOptions {
  limit?: number
  defaultSearches?: IqQuery
  forceSearches?: IqQuery
  listTopTargetId?: string
  headerHeight?: number
}
export class ListItemClass<T> {
  public page: Ref<number>
  public limit: Ref<number>
  public totalPage: Ref<number>
  public totalCount: Ref<number>
  public searches: Ref<IqQuery>
  public isFetching: Ref<boolean>
  public items: Ref<T[]>
  private searchValue: SearchValue
  private repository: BaseRepository
  private options: IOptions

  constructor (args: IArgs, options: IOptions = {}) {
    this.options = Object.assign({}, this._defaultOptions(), options)
    this.repository = args.repository
    this.searchValue = args.searchValue
    this._initRefs()
  }

  refs () {
    const { isFetching, items, searches, page, limit, totalPage, totalCount } = this
    return { isFetching, items, searches, page, limit, totalPage, totalCount }
  }

  protected _initRefs () {
    const initValues = this.searchValue.value
    this.page = ref(initValues.page || 1)
    // MEMO: limitは記録から復元しないようにしておく※表示件数を自分で操作するようになった際には、記録から復元するようにする
    this.limit = ref(this.options.limit)
    this.totalPage = ref(1)
    this.totalCount = ref(0)
    this.searches = ref((initValues.q || this._defaultSearches()) as IqQuery)
    this.isFetching = ref(false)
    this.items = ref([])
  }

  protected _defaultOptions (): IOptions {
    return {
      limit: 100,
      defaultSearches: {},
      listTopTargetId: '#list-top',
      headerHeight: 70
    }
  }

  get _forceSearches () {
    return this.options.forceSearches || {}
  }

  protected _defaultSearches (): IqQuery {
    return Object.assign({}, this.options.defaultSearches)
  }

  get searchQuery (): ISearchQuery {
    return {
      page: this.page.value,
      limit: this.limit.value,
      q: Object.assign({}, this.searches.value, this._forceSearches)
    }
  }

  async fetchItems () {
    if (this.isFetching.value) { return }
    this.isFetching.value = true
    loader.show()
    try {
      const { data, headers } = await this._fetchItems()
      this.items.value = data
      this.totalCount.value = Number(headers['total-count'])
      this.totalPage.value = Number(headers['total-pages'])
      this.searchValue.value = this.searchQuery
    } catch (e) {
      this._fetchErrorAction(e)
    } finally {
      this.isFetching.value = false
      loader.hide()
    }
  }

  protected _fetchErrorAction (_e: any) {
    toaster.error('通信に失敗しました')
  }

  protected async _fetchItems () {
    const { data, headers } = await this.repository.index(this.searchQuery)
    return { data, headers }
  }

  protected toScrollTop () {
    const targetId = this.options.listTopTargetId
    const headerHeight = this.options.headerHeight
    const targetElement = document.querySelector(targetId)
    const scrollTarget = document.scrollingElement || document.documentElement
    const toTop = targetElement ? window.pageYOffset + targetElement.getBoundingClientRect().top : 0
    // MEMO: 固定ヘッダーの高さ分だけ調整をいれる
    scrollTarget.scrollTop = toTop - headerHeight
  }

  async selectPage (toPage = 1) {
    this.page.value = toPage
    await this.fetchItems()
    this.toScrollTop()
  }

  async searchClear () {
    this.searches.value = this._defaultSearches()
    this.resetPage()
    await this.fetchItems()
  }

  resetPage () {
    this.page.value = 1
  }
}
