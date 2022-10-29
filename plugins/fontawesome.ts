import { config, library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
export const loadFontAwesome = () => {
  config.autoAddCss = true
  library.add(fas)
  dom.watch()
}
