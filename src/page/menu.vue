<template>
  <div>
    <el-button type="primary" @click="$router.push({name: 'menuAdd'})">添加菜单</el-button>
    <el-tree :data="tree" :props="defaultProps" ></el-tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created() {
      this._initData()
    },
    methods: {
      async _initData() {
        await this.$http.get('/menus').then((response) => {
          this.tree = response.data
        })
      }
    }
  }
</script>
<style lang="less">

</style>
