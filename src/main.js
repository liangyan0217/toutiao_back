import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import Css from '@/styles/reset.less'
Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App),
}).$mount('#app')
