// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入Element-UI
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI, { Message } from 'element-ui';
Vue.use(ElementUI);

//引入全局css样式
import './assets/css/elementui.css'
import './assets/css/globecss.css'
import './assets/css/stars.css'



// 引入axios
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL="http://122.51.65.4:5000/"   //请求默认的ip和端口 后面请求时url可以省掉ip和端口 
Vue.prototype.axios = axios //后面通过this.axios调用
axios.withCredentials = true
// http请求拦截
// axios.interceptors.request.use(config => {
//   // console.log(config);
//    return config;
//  });
 // http响应拦截 
// axios.interceptors.response.use(res => {
//   if(res.data === ''){
//     Message("请重新登录");
//     router.push({path:'/login'})
//     return null;
//   }
//   return res;
// });


//引入QS
import qs from 'qs'
Vue.prototype.qs = qs  //后面通过this.qs调用

//引入加密库
import CryptoJS from "crypto-js";
Vue.prototype.CryptoJS = CryptoJS;




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
