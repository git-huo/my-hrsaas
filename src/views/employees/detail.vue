<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">
          <!-- 放置表单 -->
          <el-form ref="infoForm" label-width="120px" style="margin-left: 120px; margin-top:30px" :model="userInfo" :rules="rules">
            <el-form-item prop="username" label="姓名:">
              <el-input v-model="userInfo.username" style="width:300px" />
            </el-form-item>
            <el-form-item prop="password2" label="密码:">
              <el-input v-model="userInfo.password2" style="width:300px" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUser">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情">
          <userinfo />
        </el-tab-pane>
        <el-tab-pane label="岗位信息">
          <jobinfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import userinfo from './components/user-info.vue'
import jobinfo from './components/job-info.vue'

export default {
  components: {
    userinfo,
    jobinfo

  },
  data() {
    return {
      userInfo: {
        //   专门存放基本信息
        username: '',
        password: '',
        password2: ''
      },

      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUser() {
      try {
        this.$refs.infoForm.validate()
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('密码更改成功')
      } catch (e) {
        console.log(e)
      }
    }

  }
}
</script>

<style>

</style>
