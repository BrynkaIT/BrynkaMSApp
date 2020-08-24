const config = { headers: { 'Content-Type': 'multipart/form-data' } };

export const state = () => {
	return {
    customers: [{ name: 'Please select customer(s)', _id: null, disabled: true }],
    customerInContext:''
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
  setCustomerInContext(state, customer){
    state.customerInContext = customer
  }

}

// Actions
export const actions = {
	getCustomers({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/manage/customers${query}`)
			.then(res => {
				commit('setCustomers', res.customers )
				return Promise.resolve(res)
			})
			.catch(e => {Promise.reject(e.response)});
	},
	getCustomer({ commit }, customerId) {
		return this.$axios.$get(`manage/customers/${customerId}`)
			.then(res => {
        commit('setCustomerInContext', res.customer)
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},

	async postCustomer({ dispatch }, customer) {
    try {
      const data = await dispatch('createFormData', customer)
			const res = await this.$axios.$post(`/manage/customers`, data, config)
			return res
		} catch (error) {
			console.log(error)
		}

	},

	async putCustomer({ dispatch }, customerToEdit) {
    try {
			// const customerToEdit = await dispatch('createFormData', data)
			const res = await this.$axios.$put(`/manage/customers/${ customerToEdit.id }`, customerToEdit, config)
			return res
		} catch (error) {
			console.log(error)
		}
	},

	deleteCustomer({ commit }, customerId) {
		return this.$axios.$delete(`manage/customer/${ customerId }`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
  },
  createFormData({ context }, c) {
    let formData = new FormData()
    debugger
		formData.append('allowsAutomaticSignup', c.allowsAutomaticSignup)
		formData.append('dbName', c.dbName)
		formData.append('defaultSecurityRole', c.defaultSecurityRole)
		formData.append('defaultSecurityRoleModel', c.defaultSecurityRoleModel)
		formData.append('emailDomain', c.emailDomain)
		formData.append('imageFolder', c.imageFolder)
		formData.append('name', c.name)
		formData.append('possessiveName', c.possessiveName)
		formData.append('subFolder', c.subFolder)

		if (c.image != null) formData.append('image', c.image)
		if (c.address != null) formData.append('address', c.address)

    if (c.automaticSignUpEmailDomainFilters != null) {
			for (var i = 0; i < c.automaticSignUpEmailDomainFilters.length; i++) {
				formData.append("automaticSignUpEmailDomainFilters", c.automaticSignUpEmailDomainFilters[i])
			}
    }
    if (c.parentCustomers != null) {
			for (var i = 0; i < c.parentCustomers.length; i++) {
				formData.append("parentCustomers", c.parentCustomers[i])
			}
    }
    if (c.modules != null) {
			for (var i = 0; i < c.modules.length; i++) {
				formData.append("modules", c.modules[i])
			}
    }
		// console.log(Array.from(formData))
		// for(let obj of formData) {
		// 	console.log(obj)
		// }
		return formData
	}

}
