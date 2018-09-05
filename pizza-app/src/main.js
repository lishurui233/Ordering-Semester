import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes'
import axios from 'axios'

import {store} from './store/store.js'



Vue.use(VueRouter);
//配置默认根路径
axios.defaults.baseURL = 'https://wd0486188552fjsojr.wilddogio.com/'

//配置Vue原型(在任何组件中都可以正常使用axios)
Vue.prototype.http = axios

const router = new VueRouter({
  routes,
  mode:'history',
  
})

//全局守卫,在没有登录前，点击任何页面（注册页面除外）都跳转登录页面
// router.beforeEach((to, from, next) => {
//   // to and from are both route objects
//   if (to.path == '/login' || to.path == '/register') {
//     next();
//   }else{
//     alert("还没有登录,请先登录！");
//     next('/login');
//   }
// })


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
