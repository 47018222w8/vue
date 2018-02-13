<template>
  <div class="c-login">
    <el-form :model="user" :rules="rules" ref="user" label-width="100px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="user.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" :disabled="loading" style="width:100%" @click="sub('user')">{{loading?'登录中...':'登录'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { JWT_TOKEN_HEAD, JWT_HEADER } from '@/components/constant'
  import axios from 'axios'
  export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
          loading: false
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        loading: false
      }
    },
    created() {
    },
    methods: {
      sub(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            axios.defaults.headers.common[JWT_HEADER] = ''
            this.$http.post('/noFilter/sessions', this.user).then((response) => {
              localStorage.setItem(JWT_HEADER, JWT_TOKEN_HEAD + response.data.token)
              axios.defaults.headers.common[JWT_HEADER] = JWT_TOKEN_HEAD + response.data.token
              this.$router.push(this.$store.state.loginTo)
            }).catch((error) => {
              let result = error.response
              result.status === 401 && this.$message.error(result.data.message)
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="less">
@import "../style/admin.less";
.c-login {
  height: 100%;
  background-image: url("http://192.168.1.136:9008/img/4.jpg");
  .display-flex;
  .justify-content(center);
  .align-items(center);
}
</style>