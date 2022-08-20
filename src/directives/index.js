export const imgerror = {
  inserted: function(dom, options) {
    // console.log(dom)
    // console.log(options)
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
// 首先定义第一个自定义指令v-color
export const color = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted: function(dom, options) {
    // options是 指令中的变量的解释  其中有一个属性叫做 value
    // dom 表示当前指令作用的dom对象
    // dom认为此时就是图片
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    // console.log(dom)
    // console.log(options)
    dom.style.color = options.value
  }
}
