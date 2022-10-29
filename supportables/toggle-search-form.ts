import { ref } from 'vue'
import { ToggleSearchFormValue } from '../values'

export const useToggleSearchForm = (key) => {
  const toggleSearchFormValue = new ToggleSearchFormValue(key)
  const isOpen = ref(toggleSearchFormValue.isOpen)
  const toggle = () => {
    toggleSearchFormValue.toggle()
    isOpen.value = toggleSearchFormValue.isOpen
  }
  return { isOpen, toggle }
}
