<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <UploadExcel :before-upload="beforeUpload" /> -->
    <!-- <a
      href="http://localhost:8888/static/img/login-logo.758b34e9.png"
      download="login-logo.758b34e9.png"
    >点击</a> -->
    <ImageUpload @onSuccess="onSuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  // direactives 局部注册自定义指令
  // directives: {
  //   // key: value
  //   // key 自定义指令的名称
  //   // value ==》 自定义指令对应的逻辑
  //   color: {
  //     inserted(dom, options, vNode) {
  //       console.log(dom) // dom 指令绑定的元素
  //       console.log(options) // 描述 当前指令信息
  //       console.log(vNode.context) // 可以访问到 当前vue实例的
  //       // 实现 改 当前 dom 元素颜色
  //       dom.style.color = options.value
  //     }
  //   }
  // },
  data() {
    return {
      info: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    // import('@/vendor/Export2Excel').then(excel => {
    //   excel.export_json_to_excel({
    //     header: ['姓名', '手机号', '入职日期', '聘用形式'], // 表头 必填
    //     data: [['张三', '13399999', '2020-2020-2020', '正式']], // 具体数据 必填
    //     filename: 'excel-list', // 非必填
    //     autoWidth: true, // 非必填
    //     bookType: 'xlsx' // 非必填
    //   })
    // })
  },
  // methods: {
  //   beforeUploadCode(file) {
  //     console.log(file)
  //     if (file.size >5*1024* 1024) {
  //       this.$message.error('文件大小不能超过1M')
  //       return false
  //     }
  //     // return true
  //   }

  // }
  methods: {
    onSuccess({ url }) {
      console.log(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
