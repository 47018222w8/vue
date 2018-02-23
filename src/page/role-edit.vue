<template>
  <el-form :model="role" :rules="rules" ref="role" label-width="100px" class="c-role-add">
    <el-form-item class="c-item" label="名称" prop="name">
      <el-input placeholder="请输入名称" v-model="role.name"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="唯一编码" prop="code">
      <el-input placeholder="请输入唯一编码" v-model="role.code"></el-input>
    </el-form-item>
    <el-form-item label="可用接口" prop="interIds">
      <el-checkbox-group v-model="role.interIds">
        <el-checkbox v-for="(item,index) in inters" :key="index" :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item class="c-item" label="可用菜单" prop="menuIds">
      <el-tree ref="tree" node-key="id" :data="menus" :props="defaultProps" style="padding-top:6px;" show-checkbox></el-tree>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" :disabled="loading" @click="sub('role')">{{loading?'提交中...':'提交'}}</el-button>
    </el-form-item>
  </el-form>
</template>

  <script>
  export default {
    data() {
      return {
        role: {
          name: '',
          code: '',
          pid: 0,
          interIds: [],
          menuIds: []
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