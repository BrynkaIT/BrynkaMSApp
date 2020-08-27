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
async	getCustomers({rootState, commit}, query) {

let URL = "/manage/customers"
  // if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
  //    URL= "/manage/brynka/customers"
  // }else{
  //   URL = "/manage/customers"
  // }
    query = query || ''

    try {

      const res = await this.$axios.$get(`${URL}${query}`)
      commit('setCustomers', res.customers )
      return res

    } catch (error) {
      console.log(error)
    }
	},
  async	getCustomer({ commit }, customerId) {
      try {
      const res = await this.$axios.$get(`manage/customers/${customerId}`)
      commit('setCustomerInContext', res.customer)
      return res
      } catch (error) {
        console.log(error)
      }
	},

	async postCustomer({ dispatch }, customer) {
    try {
      if(customer.image != null){
        let data = await dispatch('createFormData', customer)
        const res = await this.$axios.$post(`/manage/customers`, data, config)
        return res
      }else{
        const res = await this.$axios.$post(`/manage/customers`, customer)
        return res
      }

		} catch (error) {
			console.log(error)
		}

	},

	async putCustomer({ dispatch }, customerToEdit) {

    try {
      if(customerToEdit.image != null ){
        debugger
        let data = await dispatch('createFormData', customerToEdit)
        const res = await this.$axios.$put(`/manage/customers/${ customerToEdit.id }`, data, config)
        return res
      }else{
        debugger
        const res = await this.$axios.$put(`/manage/customers/${ customerToEdit.id }`, customerToEdit)
        return res
      }

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
		formData.append('mediaFolder', c.mediaFolder)
		formData.append('name', c.name)
		formData.append('possessiveName', c.possessiveName)
		formData.append('subFolder', c.subFolder)

		if (c.image != null) formData.append('image', c.image)
    if (c.address != null) formData.append('address', c.address)
    if (c.shipToAddress != null) formData.append('shipToAddress', c.shipToAddress)
    if (c.billToAddress != null) formData.append('billToAddress', c.billToAddress)
    if (c.billToContact != null) formData.append('billToContact', c.billToContact)
    if (c.salesContact != null) formData.append('salesContact', c.salesContact)
    if (c.technicalContact != null) formData.append('technicalContact', c.technicalContact)

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
