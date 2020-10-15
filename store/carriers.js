export const state = () => {
	return {
		carriers: [{ name: 'Carrier', _id: null }],

	}
}

// Mutations
export const mutations = {
	setCarriers(state, carriers) {
		state.carriers = [{ name: 'Carrier', _id: null }]
		if (carriers != null && carriers.length > 0) {
			carriers.forEach(carrier => {
				state.carriers.push(carrier)
			})
		}
	},

}

// Actions
export const actions = {
	getCarriers({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/carriers${query}`)
			.then(res => {
				commit('setCarriers', res.carriers )
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},
	getCarrier({ commit }, carrierId) {
		return this.$axios.$get(`/carrier/${carrierId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},

	postCarrier({ commit }, carrier) {
		return this.$axios.$post('/carrier', carrier )
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	putCarrier({ commit }, carrierToEdit) {
    debugger
		return this.$axios.$put(`/carrier/${ carrierToEdit.id }`, carrierToEdit)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteCarrier({ commit }, carrierId) {
		return this.$axios.$delete(`/carrier/${ carrierId }`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	}

}
