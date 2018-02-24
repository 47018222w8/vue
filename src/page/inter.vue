  <template>
  <div >
    <el-button type="primary" @click="$router.push({name: 'interAdd'})">添加接口</el-button>
    <el-table  v-loading="!tableData.length" :data="tableData" style="width: 100%">
      <el-table-column type="index" width="80">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="code" label="code">
      </el-table-column>
      <el-table-column prop="url" label="url">
      </el-table-column>
      <el-table-column prop="requestMethod" label="请求方式" >
      </el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button @click="toEdit(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="pageInfo" @current-change="handleCurrentChange" :current-page.sync="params.pageNum" :page-size="params.pageSize" layout="total, prev, pager, next" :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

  <script>
  export default {
    data() {
      return {
        pageInfo: null,
        tableData: [],
        params: { pageNum: 1, pageSize: 10 },
        loading: false
      }
    },
    created() {
      this._initData()
    },
    methods: {
      async _initData() {
        await this.$http.get('/inters', { params: this.params }).then((response) => {
          this.tableData = response.data.list
          this.pageInfo = response.data
        })
      },
      handleCurrentChange(val) {
        this._initData()
      },
      toEdit(id) {
        this.$router.push({ name: 'interEdit', params: { id: id } })
      },
      reload() {
        this.$http.get('/reloadSecurity').then((response) => {
        })
      }
    }
  }
</script>

<style lang="less">
@import "../style/admin.less";
</style>