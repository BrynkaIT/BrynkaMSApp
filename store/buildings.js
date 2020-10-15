export const state = () => {
	return {
		buildings: [{ name: 'Building', _id: null }],

	}
}


// Mutations
export const mutations = {
	setBuildings(state, buildings) {
		state.buildings = [{ name: 'Building', _id: null }]
		if (buildings.length > 0) {
			buildings.forEach(building => {
				state.buildings.push(building)
			})
		}
	},
}


// Actions
export const actions = {
	getBuildings({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/buildings${query}`)
			.then(res => {
				commit('setBuildings', res.buildings)
				return Promise.resolve(res)
			})
			.catch(e => {
				Promise.reject(e.response)
			})
	},
	getBuilding({ commit }, buildingId) {
		return this.$axios.$get(`/building/${buildingId}`)
			.then(res => {
				return res
			})
			.catch(e => Promise.reject(e.response));
	},
	postBuilding({ commit }, building) {
		return this.$axios.$post(`/building`, building)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	putBuilding({ commit }, buildingToEdit) {
		return this.$axios.$put(`/building/${buildingToEdit.id}`, buildingToEdit)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteBuilding({ commit }, buildingId) {
		return this.$axios.$delete(`/building/${buildingId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	}

}
