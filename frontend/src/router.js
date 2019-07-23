import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import AssetManagement from './components/AssetManagement'
import UserManagement from './components/user/UserManagement'
import Tickets from './components/ticket/Tickets';
import Consumables from './components/consumable/Consumables'
import Contracts from './components/contract/Contracts'
import Configurations from './components/configuration/Configurations'
import Documents from './components/document/Documents'
import ScheduledTasks from './components/scheduledTask/ScheduledTasks'

import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/assetmgmt', component: AssetManagement },
    { path: '/users', component: UserManagement },
    { path: '/tickets', component: Tickets },
    { path: '/consumables', component: Consumables },
    { path: '/contracts', component: Contracts },
    { path: '/configurations', component: Configurations },
    { path: '/documents', component: Documents },
    { path: '/scheduledTasks', component: ScheduledTasks },
  ]
})
