import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import componentsns from '@/components'
import App from './App'
import store from './store'
import router from './router'

import * as directives from '@/directives'

import '@/icons' // icon
import '@/permission' // permission control
Vue.use(ElementUI)
Vue.use(componentsns)
Vue.config.productionTip = false
Object.keys(directives).forEach(key => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
