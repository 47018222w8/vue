  <template>
  <div>
    <el-button type="primary" @click="$router.push({name: 'interAdd'})">添加接口</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="code" width="180">
      </el-table-column>
      <el-table-column prop="address" label="url" width="180">
      </el-table-column>
      <el-table-column prop="address" label="请求方式" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        params: { pageNum: 1, pageSize: 10 }
      }
    },
    created() {
      this._initData()
    },
    methods: {
      _initData() {
        this.$http.get('/inters', { params: this.params }).then((response) => {
        })
      }
    }
  }
</script>

<style lang="less">
@import "../style/admin.less";

</style>