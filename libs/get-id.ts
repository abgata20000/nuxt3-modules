import { RouteLocationNormalizedLoaded } from 'vue-router'
export const getId = (route: RouteLocationNormalizedLoaded, key = 'id'): string | null => {
  if (route.params[key]) {
    if (Array.isArray(route.params[key])) {
      return route.params[key][0]
    } else {
      return route.params[key] as string
    }
  } else {
    return null
  }
}
