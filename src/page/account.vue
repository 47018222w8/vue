  <template>
  <div v-if="pageInfo">
    <el-button type="primary" @click="$router.push({name: 'accountAdd'})">新建账户</el-button>
    <el-table :data="tableData" style="width:100%">
      <el-table-column type="index" width="80">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" >
      </el-table-column>
      <el-table-column label="包含角色">
        <template slot-scope="props">
          <el-tag v-for="(item, index) in props.row.roles">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button @click="toEdit(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="params.pageNum" :page-size="params.pageSize" layout="total, prev, pager, next" :total="pageInfo.total">
      </el-pagination>
  </div>
</template>

  <script>
  export default {
    data() {
      return {
        pageInfo: null,
        tableData: [],
        params: { pageNum: 1, pageSize: 10 }
      }
    },
    created() {
      this._initData()
    },
    methods: {
      async _initData() {
        await this.$http.get('/users', { params: this.params }).then((response) => {
          this.tableData = response.data.list
          this.pageInfo = response.data
        })
      },
      toEdit(id) {
        this.$router.push({ name: 'accountEdit', params: { id: id } })
      },
      handleCurrentChange(val) {
        this._initData()
      }
    }
  }
</script>

<style lang="less">
@import "../style/admin.less";
</style>