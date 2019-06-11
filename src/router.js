import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import AssetManagement from './components/AssetManagement.vue'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/assetmgmt', component: AssetManagement }
  ]
})
