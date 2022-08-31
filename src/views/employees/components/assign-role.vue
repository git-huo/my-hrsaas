<template>
  <el-dialog
    title="分配角色"
    :visible="value"
    :before-close="handelClose"
  >
    <!-- {{ $attrs }} -->
    <!-- <Mytext v-bind="$attrs" v-on="$listeners" /> -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button v-loading type="primary" size="small" @click="finish">确定</el-button>
        <el-button size="small" @click="handelClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
// import Mytext from './text.vue'
export default {
  name: 'HrsaasAssignRole',
  components: {
    // Mytext
  },
  inheritAttrs: false,
  model: {
    event: 'update'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleIds: [],
      roleList: [],
      loading: false
    }
  },
  watch: {
    value() {
      this.getUserDetailById()
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    handelClose() {
      this.$emit('update', false)
      this.roleIds = []
    },
    async getRoleList() {
      const { rows } = await getRoleList()
      console.log(rows)
      this.roleList = rows
    },
    async getUserDetailById() {
      const { roleIds } = await getUserDetailById(this.$attrs['user-id'])
      // console.log(roleIds)
      this.roleIds = roleIds || []
    },
    async finish() {
      try {
        this.loading = true
        await assignRoles({ id: this.$attrs['user-id'], roleIds: this.roleIds })
        this.handelClose()
        this.$message.success('角色分配成功')
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }

  }
}
</script>
