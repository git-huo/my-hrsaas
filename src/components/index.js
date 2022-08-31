
// import testIndex from './testIndex'
// import PageTools from './PageTools'
// // import aa from './filters/aa'
// const obj = { aa }
// const com = [testIndex, PageTools]
// // export default {
// //   install: (Vue) => {
// //     Vue.component('testIndex', testIndex)
// //     Vue.component('testIndex1', testIndex1)
// //   }
// // }

// export default (Vue) => {
//   com.forEach(ele => {
//     Vue.component(ele.name, ele)
//   })
//   Object.keys(obj).forEach(key => {
//     Vue.filter(key, obj[key])
//   })
// }
// export default (Vue) => {
//   Vue.component(PageTools)
// }

const requireComponent = require.context('./', true, /\.vue$/)
// const list = requireComponent.keys().map(ele => requireComponent(ele))
const list = requireComponent.keys().map(requireComponent)
export default (Vue) => {
  list.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
}
