// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import {
  Menu,
  MenuItem,
  MenuItemGroup,
  Input,
  Button,
  Table,
  TableColumn,
  Tooltip,
  Tag,
  Icon,
  Row,
  Col,
  Card,
  Carousel,
  CarouselItem,
  Container,
  Header,
  Main,
  Footer,
  Loading,
  Message
} from 'element-ui'
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message

// Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'static/loading-spin.svg',
  attempt: 1
})
Vue.prototype.$http = axios
Vue.prototype.imgUrl = 'http://p4qe3se64.bkt.clouddn.com/'
Vue.prototype.apiUrl = 'http://e029d6.miu.cx/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
