import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {},
    hrsaasTime: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    setHrsaasTime(state, time) {
      state.hrsaasTime = time
    }
  },
  actions: {
    // 通过接口获取token
    // commit token
    async  login({ commit }, data) {
      const res = await login(data)
      // console.log(res)
      commit('setHrsaasTime', Date.now())
      commit('setToken', res)
    },
    async getUserInfo({ commit }) {
      const str = await getUserInfo()
      const baseInfo = await getUserDetailById(str.userId)
      // 合并数据
      const baseRes = { ...str, ...baseInfo }
      commit('setUserInfo', baseRes)
      return baseRes
    },
    async logout(context) {
      // 删除token
      context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
      // 删除用户资料
      context.commit('removeUserInfo') // 删除用户信息
    }

  }
}
