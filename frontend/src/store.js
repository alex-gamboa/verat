import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		user: {},
		assets: []
  },
	getters:{
		getUser: state => { return state.user },
		getAssets: state => { return state.assets }
	},
	mutations: {
		initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('user')) {
				// Replace the state object with the stored item

				state.user = JSON.parse(localStorage.getItem('user'))

			}
		},
		setUser: (state, user) => {
			state.user = user
		},
		setAssets: (state, assets) => {
			state.assets = assets
		}
	},
  actions: {

  }
})
