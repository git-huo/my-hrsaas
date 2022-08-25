<template>
  <div class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" @addDept="addDept" />

    </el-card>
    <el-tree
      :data="departs"
      :props="defaultProps"
      :default-expand-all="true"
    >
      <treeTools slot-scope="{data}" :tree-node="data" style="width: 100%" @addDept="addDept" @editDept="editDept" @refreshDepts="getDepartments" />

    </el-tree>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @refreshDepts="getDepartments" />
  </div></template>

<script>
import { tranListToTreeData } from '@/utils'
import { getDepartments } from '@/api/departments'
import treeTools from './components/tree-tools.vue'
import addDept from './components/add-dept.vue'
export default {
  name: 'Hrsaas1Index',
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      showDialog: false, // 显示窗体,

      defaultProps: {
        label: 'name'
      },

      node: {},
      departs: [],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
    }
  },

  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const { depts, companyName, companyManage } = await getDepartments()
      console.log(depts)
      this.departs = tranListToTreeData(depts, '')

      this.company = { name: companyName, manager: companyManage, id: '' }
    },

    addDept(node) {
      this.node = node// 保存当前节点
      this.showDialog = true// 弹窗显示
    },
    editDept(node) {
      this.node = node// 保存当前节点
      this.showDialog = true// 弹窗显示
      this.$refs.addDept.FormData = { ...node }
    }
  }
}
</script>

<style lang="scss" scoped>
.departments-container{
  width:900px;
  margin:20px auto;
}
</style>
