<template>
  <el-container v-if="menus" class="c-home">
    <el-aside style="width:210px;">
      <el-menu background-color="#545c64" text-color="#fff" :default-active="$route.path" 
      :default-openeds="defaultOpeneds" ref="menu" router style="height:100%;" :collapse="isCollapse">
        <el-menu-item index="/">
          <i class="el-icon-fa-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu  menu-trigger="click" v-if="item.children.length" v-for="(item, index) in menus" :key="index" :index="subIndex[index]">
          <template slot="title">
            <i class="el-icon-fa-lock"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="(son, index) in item.children" :key="index" :index="son.route">{{son.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="c-body">
      <el-header class="c-header" style="height:100px;">
        <div class="c-up">
          <el-breadcrumb style="padding-left:10px;" separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="{ path: item.path}">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="c-down">
          <el-tag class="c-tag" v-for="(tag, i) in tags" @click.native="$router.push({name: tag.routeName})" @close="closeTag(i)" :key="i" closable :type="tag.type">
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
        tags: [],
        subIndex: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        menus: [],
        breadcrumb: []
      }
    },
    created() {
      this._initData()
    },
    beforeRouteUpdate(to, from, next) {
      this.breadcrumbC(to)
      this.tagsC(to)
      next()
    },
    computed: {
      defaultOpeneds() {
        for (let i = 0; i < this.menus.length; i++) {
          let father = this.menus[i]
          for (let j = 0; j < father.children.length; j++) {
            let son = father.children[j]
            if (son.route === this.$route.path) {
              return [this.subIndex[i]]
            }
          }
        }
        return []
      }
    },
    mounted() {
      setTimeout(() => {
        this.breadcrumbC(this.$route)
        this.tagsC(this.$route)
      }, 30)
    },
    methods: {
      async _initData() {
        await this.$http.get('/users/menus').then((response) => {
          this.menus = response.data
        })
      },
      // 面包屑
      breadcrumbC(to) {
        // 首页
        if (to.name === 'home') {
          this.breadcrumb = [{ name: '首页', path: '/' }]
          return
        }
        // 二级菜单
        for (let i = 0; i < this.menus.length; i++) {
          let father = this.menus[i]
          for (let j = 0; j < father.children.length; j++) {
            let son = father.children[j]
            if (son.route === to.path) {
              this.breadcrumb = [{ name: father.name, path: father.route }, { name: son.name, path: son.route }]
              return
            }
          }
        }
        // 三级菜单
        this.breadcrumb.push({ name: to.meta.name, path: to.path })
      },
      // 标签
      tagsC(to) {
        if (to.meta.noTag) {
          return
        }
        for (let i = 0; i < this.tags.length; i++) {
          let item = this.tags[i]
          if (item.routeName === to.name) {
            return
          }
        }
        this.tags.push({ name: to.meta.name, type: 'success', routeName: to.name })
        if (this.tags.length > 10) {
          this.tags.splice(0, 1)
        }
      },
      closeTag(i) {
        this.tags.splice(this.tags.indexOf(i), 1)
      },
      leftMenuC() {
        if (this.isCollapse) {
          this.isCollapse = false
        } else {
          this.isCollapse = true
        }
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
      .c-tag:hover {
        cursor: pointer;
      }
    }
  }
}
</style>