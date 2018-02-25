// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'static/loading-spin.svg',
  attempt: 1
})
Vue.prototype.$http = axios
Vue.prototype.imgUrl = 'http://localhost:8001/'
Vue.prototype.apiUrl = 'http://localhost:8000/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
