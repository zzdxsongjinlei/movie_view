// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'

import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as custom from './untils/filters/common.js'
import mes from './untils/common.js'

global.qs=require('qs');
axios.defaults.timeout=6000;
axios.interceptors.request.use(function(config){

	config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  	if(config.method === 'post') {
      	config.data = qs.stringify( {
          ...config.data
       	});
    }
	return config;

},function(error){
	loadinginstace.close();
	return Promise.reject(error);
});
axios.interceptors.response.use(function(response){
	return response;
},function(error){
	return Promise.reject(error);
})

Object.keys(custom).forEach(key=>{
	Vue.filter(key,custom[key]);
});
Vue.prototype.axios=axios;

Vue.prototype.mes=mes;

Vue.use(ElementUI);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
