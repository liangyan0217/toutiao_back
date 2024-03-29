import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import Css from '@/styles/index.less'
import "babel-polyfill"
// 按需引入 Element
import 'element-ui/lib/theme-chalk/index.css';
import { Button,Input,Form,FormItem,Message,Container,Aside,Header,Menu,Submenu,MenuItem,Main,Breadcrumb,BreadcrumbItem,Table,TableColumn,Card,Pagination,Radio,RadioGroup,Upload,Checkbox,CheckboxGroup,Dialog} from 'element-ui'
Vue.use(Button)
    .use(Input)
    .use(Form)
    .use(FormItem)
    .use(Container)
    .use(Aside)
    .use(Header)
    .use(Menu)
    .use(Submenu)
    .use(MenuItem)
    .use(Main)
    .use(Breadcrumb)
    .use(BreadcrumbItem)
    .use(Table)
    .use(TableColumn)
    .use(Card)
    .use(Pagination)
    .use(Radio)
    .use(RadioGroup)
    .use(Upload)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Dialog)

Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  // 注入路由
  router,
  render: h => h(App),
}).$mount('#app')
