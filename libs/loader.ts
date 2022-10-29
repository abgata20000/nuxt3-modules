import { LoadingOverlay } from './loading-overlay'
const DEFAULT_DELAY = 500
class Loader {
  timeout = null
  loader: LoadingOverlay
  constructor () {
    this.loader = new LoadingOverlay()
  }

  show () {
    if (this.timeout) {
      clearTimeout(this.timeout)
      return
    }
    this.loader.show()
  }

  hide (delay = DEFAULT_DELAY) {
    this.timeout = setTimeout(() => {
      this.timeout = null
      this.loader.hide()
    }, delay)
  }
}
const loader = new Loader()
export { loader }
