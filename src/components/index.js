
import testIndex from './testIndex'
import testIndex1 from './testIndex1'
import aa from './filters/aa'
const obj = { aa }
const com = [testIndex, testIndex1]
// export default {
//   install: (Vue) => {
//     Vue.component('testIndex', testIndex)
//     Vue.component('testIndex1', testIndex1)
//   }
// }

export default (Vue) => {
  com.forEach(ele => {
    Vue.component(ele.name, ele)
  })
  Object.keys(obj).forEach(key => {
    Vue.filter(key, obj[key])
  })
}
