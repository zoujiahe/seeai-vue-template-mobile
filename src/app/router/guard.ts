import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import store from '../store'

export const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.path === '/login') {
    if (store.getters.userInfo.token) {
      gotoReview('index/home')
      next()
    } else {
      next()
    }
  } else {
    if (store.getters.userInfo.token) {
      next()
    } else {
      gotoReview('login')
      next()
    }
  }
}

const gotoReview = (path) => {
  const hashArr = location.href.split('#')
  let preQuery = ''
  let afterQuery = ''
  if (hashArr && hashArr[0]) {
    let preHash
    if (location.port) {
      preHash = hashArr[0].split(location.port)
    } else {
      preHash = hashArr[0].split(location.host)
    }
    if (preHash && preHash[1]) {
      preQuery = preHash[1]
    }
  }
  if (hashArr && hashArr[1]) {
    const afterHash = hashArr[1].split('?')
    if (afterHash && afterHash[1]) {
      afterQuery = afterHash[1]
    }
  }
  location.href = location.protocol + '//' + location.host + (preQuery || '/') + '#/' + path + (afterQuery ? '?' + afterQuery : '')
}
