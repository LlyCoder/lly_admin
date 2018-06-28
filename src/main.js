// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import view from './View'
import Element from 'element-ui'
import axios from './api/httpConfig'
import 'element-ui/lib/theme-chalk/index.css'
// import VueResource from 'vue-resource'

// Vue.use(VueResource) 

Vue.prototype.$http = axios
Vue.axios = axios

Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(view)
})
