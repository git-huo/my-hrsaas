<template>
  <div>
    <PageTools>
      <span slot="before">{{ `共${total}条记录` }}</span>
      <template slot="after">
        <el-button size="small" type="warning" @click="$router.push('/import?type=user')">导入</el-button>
        <el-button size="small" type="danger " @click="ExcelData">导出</el-button>
        <el-button size="small" type="primary" @click="add">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table border :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="头像">
          <template slot-scope="{row}">
            <img
              v-imgerror="require('@/assets/common/bigUserHeader.png')"
              :src="row.staffPhoto"
              alt=""
              style="border-radius: 50%; width: 80px; height: 80px; padding: 10px"
              @click="showErCodeDialog(row.staffPhoto)"
            >
          </template>
        </el-table-column>
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="employeeEnumfn" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="scope">
            {{ scope.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState" align="center">
          <template slot-scope="{row}">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="asRole(row.id)">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row v-loading="loading" type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          v-if="total>0"
          background
          :current-page.sync="page.page"
          layout="total,prev, pager, next,sizes"
          :page-size.sync="page.size"
          :page-sizes="[5,10,20,30,40]"
          :total="total"
          @size-change="getEmployeeList()"
          @current-change="getEmployeeList()"
        />
      </el-row>
    </el-card>
    <addemployee :visible-dialog.sync="visibleDialog" />
    <el-dialog title="二维码" :visible.sync="ercodeDialog" custom-class="canvaseq">
      <canvas id="canvas" />
    </el-dialog>
    <assignrole ref="assignrole" v-model="assignRoleDialg" :user-id="currentUserId" @text="text1234" />
    <text />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import employeeEnum from '@/api/constant/employees'
import addemployee from './components/add-employee.vue'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
import assignrole from './components/assign-role.vue'
// import PageTools from '@/components/pageTools/index.vue'
export default {
  name: 'Employees',
  components: {
    addemployee,
    assignrole

  },
  // components: { PageTools },
  data() {
    return {
      // employeeEnum,
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      visibleDialog: false,
      loading: false,
      ercodeDialog: false,
      assignRoleDialg: false,
      currentUserId: ''
    }
  },
  mounted() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        console.log(rows, total)
        this.list = rows
        this.total = total
        if (total !== 0 && rows.length === 0) {
          this.page.page = this.page.page - 1
          this.getEmployeeList()
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    employeeEnumfn(row, column, cellValue, index) {
      //  hireType: [
      //   {
      //     id: 1,f
      //     value: '正式'
      //   },
      //   {
      //     id: 2,
      //     value: '非正式'
      //   }
      // ],

      const obj = employeeEnum.hireType.find(ele => ele.id === cellValue * 1)
      // return obj ? obj.value : '非正式'
      return obj?.value ?? '非正式'
    },
    add() {
      this.visibleDialog = true
    },
    async del(id) {
      try {
        await this.$confirm('你确定删除员工吗', '提示', {
          type: 'warning'
        }).then(res => {
          return delEmployee(id)
        }).then(res => {
          this.getEmployeeList()
          this.$message.success('删除员工成功')
        })
      } catch (e) {
        console.log(e)
      }
    },
    async ExcelData() {
      // this.page.size = this.total
      this.page.size = 10
      const { rows } = await getEmployeeList(this.page)
      // console.log(rows)
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      Object.keys(headers)
      const data = this.formJson(headers, rows)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data: data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
          multiHeader: [['姓名', '主要信息', '', '', '', '', '']],
          merges: ['A1:A2', 'B1:G1']

        })
      })
      // console.log(this.formJson(headers, rows))
    },
    formJson(headers, rows) {
      const arr = rows.map(ele => { //
        // const arr = []
        return Object.values(headers).map(
          // ['姓名','手机号','入职日期',...]
          key => { //
            if (key === 'timeOfEntry' || key === 'correctionTime') {
              return formatDate(ele[key])
            } else if (key === 'formOfEmployment') {
              const obj = employeeEnum.hireType.find(time => time.id === +ele[key])
              return obj?.value || '非正式'
            }
            return ele[key]
          }
        )
        // ele  {  correctionTime: "2019/9/11",mobile: "13041130789",timeOfEntry: "2019/3/11",username: "高小山",workNumber: "20099"}
      })
      console.log('1111', arr)
      return arr
    },
    async showErCodeDialog(staffPhoto) {
      // url存在的情况下 才弹出层
      if (!staffPhoto) return this.$message.error('该用户还未设置头像')
      this.ercodeDialog = true
      await this.$nextTick()
      const dom = document.querySelector('#canvas')
      QrCode.toCanvas(dom, staffPhoto)
    },
    async  asRole(id) {
      this.currentUserId = id
      await this.$refs.assignrole.getRoleList()
      this.assignRoleDialg = true
    }
  }
}
</script>

<style lang="scss" >
.el-dialog__body{
  text-align: center;
}
</style>
