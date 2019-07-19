import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import AssetManagement from './components/AssetManagement'
import UserManagement from './components/user/UserManagement'
import Tickets from './components/ticket/Tickets';
import Consumables from './components/consumable/Consumables'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/assetmgmt', component: AssetManagement },
    { path: '/users', component: UserManagement },
    { path: '/tickets', component: Tickets },
    { path: '/consumables', component: Consumables }
  ]
})
