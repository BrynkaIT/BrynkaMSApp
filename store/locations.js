export const state = () => {
	return {
		locations: [{ name: 'Location', _id: null }],

	}
}

// Mutations
export const mutations = {
	setLocations(state, locations) {
		state.locations = [{ name: 'Location', _id: null }]
		if (locations != null && locations.length > 0) {
			locations.forEach(location => {
				state.locations.push(location)
			})
		}
	},

}


// Actions
export const actions = {
	getLocations({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/locations${query}`)
			.then(res => {
				commit('setLocations', res.locations )
				return Promise.resolve(res)
			})
			.catch(e => {Promise.reject(e.response)});
	},
	getLocation({ commit }, locationId) {
		return this.$axios.$get(`/location/${locationId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},

	postLocation({ commit }, location) {
		return this.$axios.$post('/location', location )
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	putLocation({ commit }, locationToEdit) {
		return this.$axios.$put(`/location/${ locationToEdit.id }`, locationToEdit)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteLocation({ commit }, locationId) {
		return this.$axios.$delete(`/location/${ locationId }`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	}

}
