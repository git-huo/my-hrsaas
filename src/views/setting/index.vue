<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="角色管理" name="first">
        <el-row style="height:60px">
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="add"
          >新增角色</el-button>
        </el-row>
        <el-table
          v-loading="loading"
          :data="list"
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column
            prop="name"
            label="角色名称"
            width="180"
          />
          <el-table-column
            prop="description"
            label="描述"
            width="280"
          />
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="success" size="medium">分配权限</el-button>
              <el-button type="primary" size="medium" @click="edit(scope.row)">编辑</el-button>
              <el-button type="danger" size="medium" @click="deleteRole(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" style="height:60px" align="middle">
          <el-pagination
            background
            :current-page.sync="page.page"
            layout="total,prev, pager, next,sizes"
            :page-size.sync="page.pagesize"
            :page-sizes="[5,10,20,30,40]"
            :total="total"
            @size-change="getRoleList()"
            @current-change="getRoleList()"
          />
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          show-icon
        />
        <el-form label-width="120px" style="margin-top:50px">
          <el-form-item label="公司名称">
            <el-input v-model="fromData.name" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="fromData.companyAddress" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="fromData.mailbox" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="fromData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <roleDialog ref="roleDialog" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import roleDialog from '@/views/setting/components/roleDialog.vue'
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'

export default {
  name: 'Hrsaas1Index',
  components: {
    roleDialog

  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      list: [],
      total: 0,
      loading: false,
      dialogVisible: false,
      fromData: ''
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },

  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        this.list = rows
        this.total = total
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    add() {
      this.dialogVisible = true
    },
    edit(row) {
      this.dialogVisible = true
      this.$refs.roleDialog.roleForm = { ...row }
    },
    async deleteRole(id) {
      //  提示
      try {
        await this.$confirm('确认删除该角色吗', '删除提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        })
        // 只有点击了确定 才能进入到下方
        await deleteRole(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async getCompanyInfo() {
      this.fromData = await getCompanyInfo(this.companyId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
