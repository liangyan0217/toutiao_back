// 引入路由封装模块
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用VueRouter管理当前项目的路由
Vue.use(VueRouter)

// 引入组件
import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
import Welcome from '@/views/welcome.vue'
import PostList from '@/views/posts/postList.vue'
import PostPublish from '@/views/posts/postPublish.vue'
// 创建路由对象
const router = new VueRouter({
  // 添加路由配置，实现路由映射组件
  routes: [
    {
      name:'default',
      path:'/',
      redirect: {name:'index'}
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'index',
      path: '/index',
      component: Index,
      // 重定向的时候要使用name,因为在嵌套路由的时候，使用path，会被当成根路由来看待
      redirect: {name:'welcome'},
      children:[
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'postList',
          path: 'postList',
          component: PostList
        },
        // ?代表参数可以没有，也可以有一个
        {
          name: 'postPublish',
          path: 'postPublish/:id?',
          component: PostPublish
        },
        // {
        //   name: 'postEdit',
        //   path: 'postEdit/:id',
        //   component: PostPublish
        // },
      ]
    },
  ]
})

// 添加导航守卫
// 除了登陆之外的页面，都需要验证用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (localStorage.getItem('toutiao_back_token')) {
      next()
    } else {
      next({ name: 'login' })
    }
  }

})
// 暴露路由
export default router
