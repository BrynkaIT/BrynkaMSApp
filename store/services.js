export const state = () => {
	return {
		services: [{ name: 'Service', _id: null }],

	}
}

// Mutations
export const mutations = {
	setServices(state, services) {
		state.services = [{ name: 'Service', _id: null }]
		if (services != null && services.length > 0) {
			services.forEach(service => {
				state.services.push(service)
			})
		}
	},

}

// Actions
export const actions = {
	getServices({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/services${query}`)
			.then(res => {
				commit('setServices', res.services )
				return res
			})
			.catch(e => Promise.reject(e.response));
	},
	getService({ commit }, serviceId) {
		return this.$axios.$get(`/service/${serviceId}`)
			.then(res => {
				return res
			})
			.catch(e => Promise.reject(e.response));
	},

	postService({ commit }, service) {
		return this.$axios.$post('/service', service )
			.then(res => {
				return res
			})
			.catch(e => Promise.reject(e.response))
	},

	putService({ commit }, serviceToEdit) {
		return this.$axios.$put(`/service/${ serviceToEdit.id }`, serviceToEdit)
			.then(res => {
				return res
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteService({ commit }, serviceId) {
		return this.$axios.$delete(`/service/${ serviceId }`)
			.then(res => {
				return res
			})
			.catch(e => Promise.reject(e.response))
	}

}
