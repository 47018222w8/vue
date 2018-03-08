<template>
  <el-form  v-loading="!menus.length" :model="role" :rules="rules" ref="role" label-width="100px" class="c-role-add">
    <el-form-item class="c-item" label="名称" prop="name">
      <el-input placeholder="请输入名称" v-model="role.name" :maxlength="20"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="唯一编码" prop="code">
      <el-input placeholder="请输入唯一编码" v-model="role.code" :maxlength="50"></el-input>
    </el-form-item>
    <el-form-item v-if="inters.length" label="可用接口" prop="interIds">
      <el-checkbox-group v-model="role.interIds">
        <el-checkbox v-for="(item,index) in inters" :disabled="item.disabled" :key="index" :label="item.id" name="inter">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item v-if="menus.length" class="c-item" label="可用菜单" prop="menuIds">
      <el-tree ref="tree" node-key="id" :data="menus" :props="defaultProps" style="padding-top:6px;" show-checkbox></el-tree>
    </el-form-item>
    <el-form-item v-if="users.length" label="赋予账号">
      <el-checkbox-group v-model="role.userIds">
        <el-checkbox v-for="(item,index) in users" :key="index" :label="item.id">{{item.username}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" :disabled="loading" @click="sub('role')">{{loading?'提交中...':'提交'}}</el-button>
    </el-form-item>
  </el-form>
</template>

  <script>
  import { SECURITY_MENUS_CODE } from '@/components/constant'
  export default {
    data() {
      return {
        role: {
          name: '',
          code: '',
          pid: 0,
          interIds: [],
          menuIds: [],
          userIds: []
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入编码', trigger: 'blur' }
          ],
          interIds: [
            { type: 'array', required: true, message: '请至少选择一个可用接口', trigger: 'change' }
          ],
          menuIds: [
            { type: 'array', required: true, message: '请至少选择一个可用菜单', trigger: 'change' }
          ]
        },
        menus: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        users: [],
        inters: [],
        loading: false
      }
    },
    created() {
      this._initData()
    },
    methods: {
      async _initData() {
        await this.$http.get('/all').then((response) => {
          this.inters = response.data.inters
          for (let i = 0; i < this.inters.length; i++) {
            let element = this.inters[i]
            if (element.code === SECURITY_MENUS_CODE) {
              this.role.interIds.push(element.id)
              element.disabled = true
              break
            }
          }
        })
        await this.$http.get('/menus').then((response) => {
          this.menus = response.data
        })
        await this.$http.get('/users', { params: { pageNum: 1, pageSize: 0 } }).then((response) => {
          this.users = response.data
        })
      },
      sub(name) {
        this.role.menuIds = this.$refs.tree.getCheckedKeys()
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http.post('/roles', this.role).then((response) => {
              this.$message.success('添加成功')
              setTimeout(() => {
                this.$router.push({ name: 'role' })
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
.c-role-add {
  .el-checkbox {
    margin-left: 0;
    margin-right: 30px;
  }
  padding-top: 10px;
  .c-item {
    width: 20%;
  }
}
</style>