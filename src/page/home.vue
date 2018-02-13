<template>
  <el-container class="c-home">
    <el-aside style="width:200px;">
      <el-menu default-active="1" router style="height:100%;" :collapse="isCollapse">
        <el-menu-item index="/">
          <i class="el-icon-fa-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-fa-lock"></i>
            <span>权限</span>
          </template>
          <el-menu-item index="">账号</el-menu-item>
          <el-menu-item index="2-2">角色</el-menu-item>
          <el-menu-item index="2-3">菜单</el-menu-item>
          <el-menu-item index="/inter">接口</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="c-body">
      <el-header class="c-header">
        <div class="c-up">
          <el-breadcrumb style="padding-left:10px;" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="c-down">
          <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
            {{tag.name}}
          </el-tag>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>天生我才必有用,千金散尽还复来</el-footer>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]
      }
    },
    created() {
    },
    methods: {
      shMenu() {
        this.isCollapse ? this.isCollapse = false : this.isCollapse = true
      }
    }
  }
</script>

<style lang="less">
@import "../style/admin.less";
.c-home {
  height: 100%;
  .el-tag {
    height: 26px;
    line-height: 26px;
    margin: 5px 0 2px 4px;
  }
  .el-main {
    padding-right: 0;
  }
  .c-header {
    .display-flex;
    .flex-direction(column);
    padding-left: 0;
    padding-right: 0;
    .c-up {
      .flex(0 0 60%);
      .display-flex;
      .align-items(center);
      .c-hand {
        cursor: pointer;
      }
    }
    .c-down {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .flex(auto);
    }
  }
}
</style>