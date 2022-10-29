interface IOptions {
  overlayBackgroundColor?: string
  overlayOpacity?: number
  spinnerIcon?: string
  spinnerColor?: string
  spinnerSize?: string
  overlayIDName?: string
  spinnerIDName?: string
  offsetY?: number
  offsetX?: number
  lockScroll?: boolean,
  containerID?: null,
  spinnerZIndex?: number
  overlayZIndex?: number
}
interface ISpinners {
  [key: string]: number
}
// MEMO: ↓のライブラリがそのままだと利用できなかったので必要な部分のみ抜粋してts化した
// refs: https://js-loading-overlay.muhdfaiz.com/
class LoadingOverlay {
  options: IOptions
  stylesheetBaseURL: string
  spinner: string
  spinnerStylesheetURL: string
  numberOfEmptyDivForSpinner: ISpinners
  constructor () {
    this.options = {
      overlayBackgroundColor: '#FFF',
      overlayOpacity: 0.6,
      spinnerIcon: 'ball-fussion',
      spinnerColor: '#D0D0D0',
      spinnerSize: '3x',
      overlayIDName: 'overlay',
      spinnerIDName: 'spinner',
      offsetY: 0,
      offsetX: 0,
      lockScroll: false,
      containerID: null,
      spinnerZIndex: 99999,
      overlayZIndex: 99998
    }
    this.stylesheetBaseURL = 'https://cdn.jsdelivr.net/npm/load-awesome@1.1.0/css/'
    this.spinner = null
    this.spinnerStylesheetURL = null
    this.numberOfEmptyDivForSpinner = {
      'ball-8bits': 16,
      'ball-atom': 4,
      'ball-beat': 3,
      'ball-circus': 5,
      'ball-climbing-dot': 1,
      'ball-clip-rotate': 1,
      'ball-clip-rotate-multiple': 2,
      'ball-clip-rotate-pulse': 2,
      'ball-elastic-dots': 5,
      'ball-fall': 3,
      'ball-fussion': 4,
      'ball-grid-beat': 9,
      'ball-grid-pulse': 9,
      'ball-newton-cradle': 4,
      'ball-pulse': 3,
      'ball-pulse-rise': 5,
      'ball-pulse-sync': 3,
      'ball-rotate': 1,
      'ball-running-dots': 5,
      'ball-scale': 1,
      'ball-scale-multiple': 3,
      'ball-scale-pulse': 2,
      'ball-scale-ripple': 1,
      'ball-scale-ripple-multiple': 3,
      'ball-spin': 8,
      'ball-spin-clockwise': 8,
      'ball-spin-clockwise-fade': 8,
      'ball-spin-clockwise-fade-rotating': 8,
      'ball-spin-fade': 8,
      'ball-spin-fade-rotating': 8,
      'ball-spin-rotate': 2,
      'ball-square-clockwise-spin': 8,
      'ball-square-spin': 8,
      'ball-triangle-path': 3,
      'ball-zig-zag': 2,
      'ball-zig-zag-deflect': 2,
      cog: 1,
      'cube-transition': 2,
      fire: 3,
      'line-scale': 5,
      'line-scale-party': 5,
      'line-scale-pulse-out': 5,
      'line-scale-pulse-out-rapid': 5,
      'line-spin-clockwise-fade': 8,
      'line-spin-clockwise-fade-rotating': 8,
      'line-spin-fade': 8,
      'line-spin-fade-rotating': 8,
      pacman: 6,
      'square-jelly-box': 2,
      'square-loader': 1,
      'square-spin': 1,
      timer: 1,
      'triangle-skew-spin': 1
    }
  }

  show (options: IOptions = {}) {
    this.setOptions(options)
    this.addSpinnerStylesheet()
    this.generateSpinnerElement()

    if (this.options.lockScroll) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }

    this.generateAndAddOverlayElement()
  }

  hide () {
    if (this.options.lockScroll) {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    const stylesheet = document.getElementById('loading-overlay-stylesheet')

    if (stylesheet) {
      stylesheet.parentNode.removeChild(stylesheet)

      document.getElementById(this.options.overlayIDName).remove()
      document.getElementById(this.options.spinnerIDName).remove()
    }
  }

  setOptions (options) {
    if (typeof options !== 'undefined') {
      for (const key in options) {
        this.options[key] = options[key]
      }
    }
  }

  generateAndAddOverlayElement () {
    let left = '50%'
    if (this.options.offsetX !== 0) {
      left = 'calc(50% + ' + this.options.offsetX + ')'
    }
    let top = '50%'
    if (this.options.offsetY !== 0) {
      top = 'calc(50% + ' + this.options.offsetY + ')'
    }

    if (this.options.containerID && document.body.contains(document.getElementById(this.options.containerID))) {
      const loadingOverlay = `<div id="${this.options.overlayIDName}" style="display: block !important; position: absolute; top: 0; left: 0; overflow: auto; opacity: ${this.options.overlayOpacity}; background: ${this.options.overlayBackgroundColor}; z-index: 50; width: 100%; height: 100%;"></div><div id="${this.options.spinnerIDName}" style="display: block !important; position: absolute; top: ${top}; left: ${left}; -webkit-transform: translate(-50%); -ms-transform: translate(-50%); transform: translate(-50%); z-index: 9999;">${this.spinner}</div>`

      const containerID = document.getElementById(this.options.containerID)

      containerID.style.position = 'relative'
      containerID.insertAdjacentHTML('beforeend', loadingOverlay)
      return
    }

    const loadingOverlay = `<div id="${this.options.overlayIDName}" style="display: block !important; position: fixed; top: 0; left: 0; overflow: auto; opacity: ${this.options.overlayOpacity}; background: ${this.options.overlayBackgroundColor}; z-index: ${this.options.overlayZIndex}; width: 100%; height: 100%;"></div><div id="${this.options.spinnerIDName}" style="display: block !important; position: fixed; top: ${top}; left: ${left}; -webkit-transform: translate(-50%); -ms-transform: translate(-50%); transform: translate(-50%); z-index: ${this.options.spinnerZIndex};">${this.spinner}</div>`
    document.body.insertAdjacentHTML('beforeend', loadingOverlay)
  }

  generateSpinnerElement () {
    const emptyDivKey = Object.keys(this.numberOfEmptyDivForSpinner).find(element => element === this.options.spinnerIcon)

    const emptyDivElement = this.generateEmptyDivElement(this.numberOfEmptyDivForSpinner[emptyDivKey])

    this.spinner = `<div style="color: ${this.options.spinnerColor}" class="la-${this.options.spinnerIcon} la-${this.options.spinnerSize}">${emptyDivElement}</div>`
  }

  addSpinnerStylesheet () {
    this.setSpinnerStylesheetURL()

    const link = document.createElement('link')
    link.setAttribute('id', 'loading-overlay-stylesheet')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', this.spinnerStylesheetURL)

    document.getElementsByTagName('head')[0].appendChild(link)
  }

  setSpinnerStylesheetURL () {
    this.spinnerStylesheetURL = this.stylesheetBaseURL + this.options.spinnerIcon + '.min.css'
  }

  generateEmptyDivElement (numberOfEmptyDiv) {
    let emptyDivElement = ''

    for (let i = 1; i <= numberOfEmptyDiv; i++) {
      emptyDivElement += '<div></div>'
    }

    return emptyDivElement
  }
}
export { LoadingOverlay }
