import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
const timeout = 3600
function isCheckOut() {
  return (Date.now() - store.getters.hrsaasTime) / 1000 > timeout
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 如果token存在 注入token
    if (isCheckOut()) { // 超时
      store.dispatch('user/logout')
      router.push('/login')
      // Message.error('请求超时')
      return Promise.reject(new Error('请求超时'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  // console.log('mmmmm', response)
  const { success, message, data } = response.data
  // console.log(data)
  if (success) {
    // console.log('yyy', data)
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
},
error => {
  // console.log(error)
  // console.log(error.response)
  // token 失效 不处于登陆状态
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
    // Message.error('请求超时')
  } else {
    Message.error('error.message' || '')
  }
  // 这一块判断，后端接口，报错是否是token的问题
  // 如果是token问题，直接退出重新登录
  // Message.error('error.message')
  return Promise.reject(error)
})

export default service
