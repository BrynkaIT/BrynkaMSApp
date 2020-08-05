export const state = () => {
	return {
		customers: [{ name: 'Please select customer(s)', _id: null, disabled: true }],
	}
}

// Mutations
export const mutations = {
	setCustomers(state, customers) {
		state.customers = [{ name: 'Please select customer(s)', _id: null, disabled: true }]
		if (customers != null && customers.length > 0) {
			customers.forEach(customers => {
				state.customers.push(customers)
			})
		}
	},

}


// Actions
export const actions = {
	getCustomers({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/customers${query}`)
			.then(res => {
				commit('setCustomers', res.customers )
				return Promise.resolve(res)
			})
			.catch(e => {Promise.reject(e.response)});
	},
	getCustomer({ commit }, customerId) {
		return this.$axios.$get(`/customers/${customerId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},

	postCustomer({ commit }, customer) {
    debugger
		return this.$axios.$post('/customers', customer )
			.then(res => {
        debugger
				return Promise.resolve(res)
			})
			.catch(e => {
        debugger
        Promise.reject(e.response)})
	},

	putCustomer({ commit }, customerToEdit) {
		return this.$axios.$put(`/customer/${ customerToEdit.id }`, customerToEdit)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteCustomer({ commit }, customerId) {
		return this.$axios.$delete(`/customer/${ customerId }`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	}

}
