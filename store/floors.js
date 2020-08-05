export const state = () => {
	return {
		floors: [{ name: 'Floor', _id: null }],
	}
}

// Mutations
export const mutations = {
	setFloors(state, floors) {
		state.floors = [{ name: 'floor', _id: null }]
		if (floors != null || floors.length > 0) {
			floors.forEach(floor => {
				state.floors.push(floor)
			})
		}
	},
}


// Actions
export const actions = {
	getFloors({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/floors${query}`)
			.then(res => {
				commit('setFloors', res.floors)
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},
	postFloor({ commit }, floor) {
		return this.$axios.$post(`/floor`, floor)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	putFloor({ commit }, floorToEdit) {
		return this.$axios.$put(`/floor/${floorToEdit.id}`, floorToEdit)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteFloor({ commit }, floorId) {
		return this.$axios.$delete(`/floor/${floorId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	}
}
