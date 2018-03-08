  <template>
  <el-form v-if="inter" :model="inter" :rules="rules" ref="inter" label-width="100px" class="c-inter-add">
    <el-form-item class="c-item" label="url" prop="url">
      <el-input v-model="inter.url" placeholder="请输入url" :maxlength="100"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="名称" prop="name">
      <el-input placeholder="请输入名称" v-model="inter.name" :maxlength="20"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="唯一编码" prop="code">
      <el-input placeholder="请输入唯一编码" disabled v-model="inter.code"  :maxlength="50"></el-input>
    </el-form-item>
    <el-form-item class="c-item" label="HTTP动词">
      <el-select v-model="inter.requestMethod" style="width:100%;">
        <el-option label="GET" value="GET"></el-option>
        <el-option label="POST" value="POST"></el-option>
        <el-option label="PUT" value="PUT"></el-option>
        <el-option label="DELETE" value="DELETE"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" :disabled="loading" @click="sub('inter')">{{loading?'提交中...':'提交'}}</el-button>
    </el-form-item>
  </el-form>
</template>

  <script>
  export default {
    data() {
      return {
        inter: null,
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
        loading: false
      }
    },
    created() {
      this._initData()
    },
    methods: {
      async _initData() {
        await this.$http.get('/inters/' + this.$route.params.id).then((response) => {
          this.inter = response.data
        })
      },
      sub(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http.put('/inters', this.inter).then((response) => {
              this.$message.success('编辑成功')
              setTimeout(() => {
                this.$router.push({ name: 'inter' })
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
.c-inter-add {
  padding-top: 10px;
  .c-item {
    width: 20%;
  }
}
</style>