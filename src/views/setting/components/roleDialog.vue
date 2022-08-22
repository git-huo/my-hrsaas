<template>
  <div>
    <el-dialog :title="`${roleForm.id ? '修改' : '添加'}角色`" :visible.sync="dialogVisible" :before-close="handleclose">
      <el-form ref="roleDialogForm" label-width="80px" :model="roleForm">
        <el-form-item label="角色" prop="name" :rules="[{required:true,message:'角色必填',trigger:'blur'}]">
          <el-input v-model="roleForm.name" placeholder="请输入角色" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="roleForm.description" type="textarea" row="3" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" type="flex" justify="center" align="middle">
        <el-button @click="handleclose">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submitRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, updateRole } from '@/api/setting'
export default {
  name: 'RoleDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  methods: {
    handleclose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
      this.roleForm = {
        name: '',
        description: ''
      }
    },
    async submitRole() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.roleForm.id ? await updateRole(this.roleForm) : await addRole(this.roleForm)
        // 调用父接口刷新页面
        this.$parent.getRoleList()
        // 关闭页面

        this.handleclose()
        this.$message.success(`${this.roleForm.id ? '角色修改完成' : '角色添加完成'}`)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
