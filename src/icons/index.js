import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)
// function fn(val) {
//   console.log(val)
//   return val
// }
// [1, 2, 3, 4, 5].map(fn)
// [1, 2, 3, 4, 5].map(ele => fn(val))

const req = require.context('./svg', false, /\.svg$/)
// console.log(req)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

