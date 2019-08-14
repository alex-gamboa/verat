import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import i18n from '@/plugins/i18n'

axios.defaults.headers.Authorization = localStorage.getItem('jwt');

Vue.prototype.$http = axios;

Vue.config.productionTip = false

// i18n.locale = 'es';

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
    i18n.locale = (this.$store.getters.getUser.lang) ? this.$store.getters.getUser.lang : 'en'
  },
  i18n,
  render: h => h(App)
}).$mount('#app')
