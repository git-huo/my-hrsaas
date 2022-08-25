<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <span>{{ treeNode.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end" align="middle">
          <el-col>
            {{ treeNode.manager }}
          </el-col>
          <el-col>
            <el-dropdown @command="handlecommand">
              <span>
                操作<i class="el-icon-arrow-down" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  name: 'TreeTools',
  props: {
    treeNode: {
      type: Object,
      default: () => ({})
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handlecommand(type) {
      // console.log('handlecommand', type)
      if (type === 'add') {
        // 添加
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // 编辑
        this.$emit('editDept', this.treeNode)
      } else {
        // 删除
        this.$confirm('您确定删除该部门的数据吗？', '删除提示', {
          type: 'warning'

        }).then(res => {
          // await delDepartments(this.treeNode.id)
          // this.$emit('refreshDepth')
          // this.$message.success('删除成功')
          return delDepartments(this.treeNode.id)
        }).then(res => {
          this.$emit('refreshDepts')
          this.$message.success('删除成功')
        })
      }
    }
  }

}
</script>

<style>

</style>
