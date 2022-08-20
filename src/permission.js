// 1. 权限拦截处理逻辑需要放在路由的前置守卫里处理
// 2. 首先判断有无token
// 2.1 token 存在 说明 处于登录状态
// 2.1.1 判断是否处于登录页面，是的话 跳首页 否则 直接留在当前页（直接放行 next()）
// 2.2 token 不存在 说明 不处于登录状态
// 2.2.1 判断一下 是否处于白名单 是的话 直接留在 当前页 否则 跳转到登录页

// 引入router
import router from '@/router'
// 引入store
import store from '@/store'
// 创建一个白名单
const whiteList = ['/login', '404']
router.beforeEach(async(to, form, next) => {
  // 判断是否登陆状态
  if (store.getters.token) {
    if (!store.getters.userId) { await store.dispatch('user/getUserInfo') }
    if (router.path === '/login') {
      // 2.1.1 判断是否处于登录页面，是的话 跳首页 否则 直接留在当前页（直接放行 next()）
      next('/')
    } else {
      next()
    }
  } else {
    // 2.2 token 不存在 说明 不处于登录状态
    // 2.2.1 判断一下 是否处于白名单 是的话 直接留在 当前页 否则 跳转到登录页
    // includes仅能用来判断元素是否存在。其用法与indexOf类似，都能作用在字符串中，同样在字符串中includes不接受-1坐标并且能默认转换字符串
    if (whiteList.includes(to.path)) {
      next() // 处于白名单中
    } else {
      next('/login')// 跳转登陆页面
    }
  }
})
