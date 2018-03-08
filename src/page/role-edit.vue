<template>
  <el-form v-loading="!role.name" :model="role" :rules="rules" ref="role" label-width="100px" class="c-role-add">
    <el-form-item class="c-item" label="名称" prop="name">
      <el-input placeholder="请输入名称" :disabled="adminDisabled" v-model="role.name" :maxlength="20"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="唯一编码" prop="code">
      <el-input placeholder="请输入唯一编码" disabled v-model="role.code" :maxlength="50"></el-input>
    </el-form-item>
    <el-form-item label="可用接口" prop="interIds">
      <el-checkbox-group v-model="role.interIds">
        <el-checkbox :disabled="adminDisabled" v-for="(item,index) in inters" :key="index" :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item class="c-item" label="可用菜单" prop="menuIds">
      <el-tree v-if="role.menuIds" :default-expanded-keys="role.menuIds" :default-checked-keys="role.menuIds" ref="tree" node-key="id" :data="menus" :props="defaultProps" style="padding-top:6px;" show-checkbox></el-tree>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="!adminDisabled" :loading="loading" :disabled="loading" @click="sub('role')">{{loading?'提交中...':'提交'}}</el-button>
      <el-button type="primary" v-else :loading="loading" disabled @click="sub('role')">超级管理员权限不可修改</el-button>
    </el-form-item>
  </el-form>
</template>

  <script>
  import { SECURITY_ADMIN_CODE } from '@/components/constant'
  export default {
    data() {
      return {
        role: {
          id: null,
          name: '',
          code: '',
          interIds: [],
          menuIds: null
        },
        adminDisabled: false,
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
        inters: [],
        loading: false
      }
    },
    created() {
      this._initData()
    },
    methods: {
      async _initData() {
        await this.$http.get('/roles/' + this.$route.params.id).then((response) => {
          this.role.id = response.data.id
          this.role.name = response.data.name
          this.role.code = response.data.code
          this.role.code === SECURITY_ADMIN_CODE && (this.adminDisabled = true)
          response.data.inters.forEach(element => {
            this.role.interIds.push(element.id)
          })
          this.role.menuIds = []
          response.data.menus.forEach(element => {
            this.role.menuIds.push(element.id)
          })
        })
        await this.$http.get('/all').then((response) => {
          this.inters = response.data.inters
        })
        await this.$http.get('/menus').then((response) => {
          this.menus = response.data
          if (this.adminDisabled) {
            this.menus.forEach(element => {
              element.disabled = true
              element.children.forEach(item => {
                item.disabled = true
              })
            })
          }
        })
      },
      sub(name) {
        this.role.menuIds = this.$refs.tree.getCheckedKeys()
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http.put('/roles', this.role).then((response) => {
              this.$message.success('编辑成功')
              setTimeout(() => {
                this.$router.push({ name: 'role' })
              }, 1000)
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
  padding-top: 10px;
  .c-item {
    width: 20%;
  }
}
</style>