<template>
  <el-form v-loading="!account.username" :model="account" :rules="rules" ref="account" label-width="100px" class="c-account-add">
    <el-form-item class="c-item" label="用户名" prop="username">
      <el-input placeholder="请输入用户名" disabled v-model="account.username" :maxlength="20"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="密码" prop="password">
      <el-input type="password" placeholder="请输入密码" v-model="account.password" :maxlength="20" ></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="昵称" prop="nickName">
      <el-input placeholder="请输入用昵称" v-model="account.nickName" :maxlength="10" ></el-input>
    </el-form-item>
    <el-form-item label="包含角色" prop="roleIds">
      <el-checkbox-group v-model="account.roleIds">
        <el-checkbox v-for="(item,index) in roles" :key="index" :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" :disabled="loading" @click="sub('account')">{{loading?'提交中...':'提交'}}</el-button>
    </el-form-item>
  </el-form>
</template>

  <script>
  export default {
    data() {
      return {
        account: {
          username: '',
          password: '',
          nickName: '',
          roleIds: []
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          roleIds: [
            { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
          ]
        },
        roles: [],
        loading: false
      }
    },
    created() {
      this._initData()
    },
    methods: {
      async _initData() {
        await this.$http.get('/users/' + this.$route.params.id).then((response) => {
          this.account = response.data
          this.account.roleIds = []
          this.account.roles.forEach(element => {
            this.account.roleIds.push(element.id)
          })
        })
        await this.$http.get('/all').then((response) => {
          this.roles = response.data.roles
        })
      },
      sub(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http.put('/users', this.account).then((response) => {
              this.$message.success('编辑成功')
              setTimeout(() => {
                this.$router.push({ name: 'account' })
              }, 1000)
            }).catch((error) => {
              let result = error.response
              result.status === 400 && this.$message.error(result.data.message)
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
.c-account-add {
  padding-top: 10px;
  .c-item {
    width: 20%;
  }
}
</style>