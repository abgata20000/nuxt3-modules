import { AbstractValue } from './abstracut-value'

export class NextPageValue extends AbstractValue {
  protected key () {
    return 'NEXT_PAGE'
  }

  pop () {
    const defaultPath = '/'
    let tmp = this.value
    if (tmp === '') { tmp = defaultPath }
    this.value = ''
    return tmp
  }
}
export const nextPageValue = new NextPageValue()
