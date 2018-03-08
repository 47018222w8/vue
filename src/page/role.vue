  <template>
  <div>
    <el-button type="primary" @click="$router.push({name: 'roleAdd'})">新建角色</el-button>
    <el-table v-loading="!tableData.length" :data="tableData" style="width:100%">
      <el-table-column type="expand" width="80">
        <template slot-scope="props">
          <el-form label-position="left" >
            <el-form-item label="可用接口">
              <el-tag v-for="(item, index) in props.row.inters" :key="index">{{item.name}}</el-tag>
            </el-form-item>
            <el-form-item label="可用菜单">
              <el-tag v-for="(item, index) in props.row.menus" :key="index">{{item.name}}</el-tag>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="code" label="code" width="100">
      </el-table-column>
      <el-table-column label="操作">
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
        params: { pageNum: 1, pageSize: 10 }
      }
    },
    created() {
      this._initData()
    },
    methods: {
      _initData() {
        this.$http.get('/roles', { params: this.params }).then((response) => {
          this.tableData = response.data.list
          this.pageInfo = response.data
        })
      },
      handleCurrentChange(val) {
        this._initData()
      },
      toEdit(id) {
        this.$router.push({ name: 'roleEdit', params: { id: id } })
      }
    }
  }
</script>

<style lang="less">
@import "../style/admin.less";
</style>