import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'

axios.defaults.headers.Authorization = localStorage.getItem('jwt');

Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render: h => h(App)
}).$mount('#app')
