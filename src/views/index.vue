<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <div class="logo" @click="$router.push({path:'/index'})"></div>
        <!-- default-active 展开指定索引的菜单项 -->
        <!-- unique-opened 是否只保持一个菜单项展开 -->
        <!-- router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-user"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="postList">
              <i class="el-icon-s-order"></i>
              <span>文章列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-s-promotion"></i>
              <span>文章发布</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-s-grid"></i>
              <span>栏目列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i class="el-icon-s-fold toggle-btn"></i>
          <span class="system-title">黑马头条后台管理系统</span>
          <div class="welcome">
            <span>欢迎您，管理员</span> &nbsp;&nbsp;
            <span>退出</span>
          </div>
          <!-- <div>
            <span>
              <img :src="baseURL+userInfo.head_img" alt />
            </span>
            <span class="welcome">欢迎您，管理员</span>
            <a>退出</a>
          </div> -->
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { user } from "@/apis/use";
export default {
  // data() {
  //   return {
  //     baseURL: "",
  //     userInfo: "",
  //   };
  // },
  // async mounted() {
  //   let res = await user(localStorage.getItem("toutiao_back_userId"));
  //   console.log(res);
  //   this.baseURL = res.config.baseURL;
  //   this.userInfo = res.data.data;
  // },
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;

  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
    // span {
    //   > img {
    //     border-radius: 50%;
    //     height: 40px;
    //   }
    // }
    // > div {
    //   > span {
    //     vertical-align: middle;
    //     margin: 0 15px 0 0;
    //   }
    // }
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
    cursor: pointer;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
    cursor: pointer;
  }
}
</style>