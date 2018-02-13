  <template>
  <el-form :model="inter" :rules="rules" ref="inter" label-width="100px" class="c-inter-add">
    <el-form-item class="c-item" label="url" prop="url">
      <el-input v-model="inter.url" placeholder="请输入url"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="名称" prop="name">
      <el-input placeholder="请输入名称" v-model="inter.name"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="唯一编码" prop="code">
      <el-input placeholder="请输入唯一编码" v-model="inter.code"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="HTTP动词">
      <el-select v-model="inter.requestMethod" style="width:100%;">
        <el-option label="GET" value="GET"></el-option>
        <el-option label="POST" value="POST"></el-option>
        <el-option label="PUT" value="PUT"></el-option>
        <el-option label="DELETE" value="DELETE"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="c-item" label="赋予角色">
      <el-checkbox-group v-model="inter.roleIds">
        <el-checkbox v-for="(item,index) in roles" :key="index" :disabled="item.checked" :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" :disabled="loading" @click="sub('inter')">{{loading?'提交中...':'提交'}}</el-button>
    </el-form-item>
  </el-form>
</template>

  <script>
  import { SECURITY_ADMIN_CODE } from '@/components/constant'
  export default {
    data() {
      return {
        inter: {
          url: '',
          name: '',
          code: '',
          requestMethod: 'GET',
          roleIds: []
        },
        rules: {
          url: [
            { required: true, message: '请输入url', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入编码', trigger: 'blur' }
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
      _initData() {
        this.$http.get('/all').then((response) => {
          this.roles = response.data.roles
          // 默认选中管理员
          for (let item of this.roles) {
            if (item.code === SECURITY_ADMIN_CODE) {
              item.checked = true
              this.inter.roleIds.push(item.id)
              break
            }
          }
        })
      },
      sub(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http.post('/inters', this.inter).then((response) => {
              this.$message.success('添加成功')
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
.c-inter-add {
  padding-top: 10px;
  .c-item {
    width: 20%;
  }
}
</style>