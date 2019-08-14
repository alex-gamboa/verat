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
import Reports from './components/report/Reports'
import AssetsByCategory from './components/report/AssetsByCategory'
import AssetsByStatus from './components/report/AssetsByStatus'
import AssetsByKind from './components/report/AssetsByKind'
import AssetsByBrand from './components/report/AssetsByBrand'
import Login from './components/login/Login'

import Home from './views/Home'

Vue.use(Router)

let router =
	new Router({
		mode: 'history',
		routes: [
			{
                path: '/',
                name: 'home',
                component: Home,
                meta: {
                    title: 'verat Home page'
                }
             },
			{ path: '/assetmgmt', component: AssetManagement, meta: { requiresAuth: true, is_admin : true } },
			{ path: '/users', component: UserManagement, meta: { requiresAuth: true, is_admin : true } },
			{ path: '/tickets', component: Tickets, meta: { requiresAuth: true, is_admin : true } },
			{ path: '/consumables', component: Consumables, meta: { requiresAuth: true, is_admin : true } },
			{ path: '/contracts', component: Contracts, meta: { requiresAuth: true, is_admin : true } },
			{ path: '/configurations', component: Configurations, meta: { requiresAuth: true, is_admin : true } },
			{ path: '/documents', component: Documents, meta: { requiresAuth: true, is_admin : true } },
			{ path: '/scheduledTasks', component: ScheduledTasks, meta: { requiresAuth: true, is_admin : true }},
			{ path: '/login', name: 'login', component: Login, meta: { guest: true}},
            { path: '/reports',	name: 'reports', component: Reports, meta: { requiresAuth: true, is_admin : true }},
            {
                path: '/reports/assetsbycategory',
                name: 'assetsbycategory',
                component: AssetsByCategory,
                meta: { requiresAuth: true, is_admin : true }
            },
            {
                path: '/reports/assetsbystatus',
                name: 'assetsbystatus',
                component: AssetsByStatus,
                meta: { requiresAuth: true, is_admin : true }
            },
            {
                path: '/reports/assetsbykind',
                name: 'assetsbykind',
                component: AssetsByKind,
                meta: { requiresAuth: true, is_admin : true }
            },
            {
                path: '/reports/assetsbybrand',
                name: 'assetsbybrand',
                component: AssetsByBrand,
                meta: { requiresAuth: true, is_admin : true }
            },

		]
	})

router.beforeEach((to, from, next) => {
    document.title = 'Verat'
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
			let user = JSON.parse(localStorage.getItem('user'))

            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.type == 'Soporte'){
                    next()
                }
                else{
                    next({ name: 'home'})
                }
            }else {
                next()
            }
        }
	}
	else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'home'})
        }
    }else {
        next()
    }
})

export default router
