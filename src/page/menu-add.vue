<template>
  <el-form v-if="roles" :model="menu" :rules="rules" ref="menu" label-width="100px" class="c-menu-add">
    <el-form-item class="c-item" label="名称" prop="name">
      <el-input placeholder="请输入名称" v-model="menu.name" :maxlength="10"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="route">
      <el-input placeholder="请输入route" v-model="menu.route" :maxlength="20"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="父菜单">
      <el-select v-model="menu.pid" style="width:100%;">
        <el-option v-for="(item, index) in pMenus" :key="index" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="c-item" label="赋予角色">
      <el-checkbox-group v-model="menu.roleIds">
        <el-checkbox v-for="(item,index) in roles" :key="index" :disabled="item.checked" :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" :disabled="loading" @click="sub('menu')">{{loading?'提交中...':'提交'}}</el-button>
    </el-form-item>
  </el-form>
</template>

  <script>
  import { SECURITY_ADMIN_CODE } from '@/components/constant'
  export default {
    data() {
      return {
        menu: {
          name: '',
          pid: 0,
          route: '',
          roleIds: []
        },
        pMenus: [{ name: '顶级菜单', id: 0 }],
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
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
        await this.$http.get('/all').then((response) => {
          this.roles = response.data.roles
          // 默认选中管理员
          for (let item of this.roles) {
            if (item.code === SECURITY_ADMIN_CODE) {
              item.checked = true
              this.menu.roleIds.push(item.id)
              break
            }
          }
          response.data.menus.forEach(element => {
            if (element.pid === 0) {
              this.pMenus.push(element)
            }
          })
        })
      },
      sub(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http.post('/menus', this.menu).then((response) => {
              this.$message.success('添加成功')
              setTimeout(() => {
                this.$router.push({ name: 'menu' })
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
.c-menu-add {
  padding-top: 10px;
  .c-item {
    width: 20%;
  }
}
</style>