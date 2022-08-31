<template>
  <div>
    <el-upload
      v-loading="loading"
      action="#"
      :file-list="fileList"
      list-type="picture-card"
      :on-change="change"
      :http-request="oRequest"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :limit="limit"
      :class="`${fileList.length === limit ? 'hideAdd' : ''}`"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="previewImgDialogVisible"
    >
      <img style="width: 100%" :src="previewImgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDUr56xa0B9sQlskQxPiqkT0pRq0MYYM7t',
  SecretKey: 'oaFl4EJGEDGF8pJadS5byId4oWAg5MTM'
})
console.log(cos)
export default {
  name: 'ImageUpload',
  props: {
    limit: {
      type: Number,
      default: 1
    }
    // beforeUploadCode: Function
  },
  data() {
    return {
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      previewImgDialogVisible: false,
      previewImgUrl: '',
      loading: false
    }
  },
  methods: {
    change(file, fileList) {
      console.log(file)
      console.log(fileList)
      this.fileList = fileList
    },
    oRequest(data) {
      this.loading = true
      console.log(data.file)
      cos.putObject({
        Bucket: 'hh-harss-32-1313544683', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: data.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: data.file, // 上传文件对象
        onProgress: function(progressData) {
        // console.log(JSON.stringify(progressData))
        // 这个就是上传的百分比
        // params.percent 表示当前上传的进度
        }
      }, (err, data) => {
        console.log(err || data)
        this.loading = false
        if (err && data.statusCode !== 200) {
          return this.$message.error('图片上传不成功，请重新上传')
        }
        this.$emit('onSuccess', {
          url: 'https://' + data.Location
        })
      })
    },
    onPreview(file) {
      this.previewImgUrl = file.url
      this.previewImgDialogVisible = true
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      // if(this.beforeUploadCode&&!this.beforeUploadCode(file)){
      //   return false
      // }
      // 一般分两种情况
      // 自定义 完全 ==》所有的逻辑取决于 自定义， 自定义和默认是相互排斥的
      // if (this.beforeUploadCheck) {
      //   return this.beforeUploadCheck(file)
      // }
      // 自定义 完全 ==》所有的逻辑取决于 先自定义 再默认， 自定义和默认是不相互排斥的
      //  两个相互补充
      // if (this.beforeUploadCheck && !this.beforeUploadCheck(file)) {
      //   return false
      // }

      // 检查一下文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss">
.hideAdd {
  .el-upload--picture-card {
  display: none;
}
}
</style>
