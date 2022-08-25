<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible.sync="showDialog" :before-close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="FormData" label-width="120px" :model="FormData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="FormData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="FormData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="FormData.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="FormData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="submitDept">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple } from '@/api/employees'
import { getDepartments, addDepartments, updateDepartments } from '@/api/departments'
// import { listenerCount } from 'process'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 当前操作的节点
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkCodeRepeat = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.FormData.id) {
        // const list = depts.filter(ele => ele.id !== this.formData.id)
        isRepeat = depts.some(ele => ele.id !== this.FormData.id && ele.code === value)
      } else {
        isRepeat = depts.some(ele => ele.code === value)
      }

      console.log(depts)

      isRepeat ? callback(new Error(`部门编码${value}已存在，请重新添加`)) : callback()
    }
    // 现在定义一个函数 这个函数的目的是 去找 同级部门下 是否有重复的部门名称
    const checkNameRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments()
      // depts是所有的部门数据
      // 如何去找技术部所有的子节点
      let isRepeat = false
      if (this.FormData.id) {
        // const list = depts.filter(item => FormData.id !== item.id)
        //   = depts.filter(item => item.pid === this.treeNode.id)
        isRepeat = depts.some(item => this.FormData.id !== item.id && item.pid === this.treeNode.id && item.name === value)
      } else {
        isRepeat = depts.some(item => item.pid === this.treeNode.id && item.name === value)
      }
      // const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    return {
      FormData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      peoples: [],
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      }
    }
  },
  computed: {
    showTitle() {
      return this.FormData.id ? '编辑部门' : '新增子部门'
    }
  },
  created() {
    this.getEmployeeSimple()
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      // 表单重置
      this.$refs.FormData.resetFields()
      // 数据重置
      this.FormData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    submitDept() {
      this.$refs.FormData.validate(async vali => {
        if (vali) {
          // 表单验证通过
          // 新增部门接口
          if (this.FormData.id) {
            await updateDepartments(this.FormData)
          } else {
            await addDepartments({ ...this.FormData, pid: this.treeNode.id })
          }

          this.$message.success(`部门${this.FormData.id ? '修改' : '新增'}成功`)
          this.$emit('refreshDepts') // 告诉父组件，刷新列表
          this.handleClose()
        }
      })
    }
  }
}
</script>

<style>

</style>
