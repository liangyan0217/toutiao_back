// 引入路由封装模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/login.vue'
// 使用VueRouter管理当前项目的路由
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
  // 添加路由配置，实现路由映射组件
  routes:[
    // {
    //   name:'default',
    //   path:'/',
    //   redirect: {name:'login'}
    // },
    {
      name:'login',
      path:'/login',
      component:Login
    }
  ]
})
// 暴露路由
export default router
