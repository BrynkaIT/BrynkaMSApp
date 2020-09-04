const config = { headers: { 'Content-Type': 'multipart/form-data' } };
let URL;


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
  async	getCustomers({ rootState, commit }, query) {

    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
    }else{
      URL = "/manage/customers"
    }
      query = query || ''

      return this.$axios.$get(`${URL}${query}`)
      .then(res =>{
        commit('setCustomers', res.customers )
        return Promise.resolve(res)
      })
      .catch(e => Promise.reject(e.response));
  },

  async	getCustomer({ rootState, commit }, customerId) {

    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
    }else{
      URL = "/manage/customers"
    }
    return this.$axios.$get(`${URL}/${customerId}`)
    .then(res =>  {
      commit('setCustomerInContext', res.customer)
      return Promise.resolve(res)
    })
    .catch(e => Promise.reject(e.response));

	},

	async postCustomer({ rootState, dispatch }, customer) {

    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
   }else{
     URL = "/manage/customers"
   }
      if(customer.image != null){
        let data = await dispatch('createFormData', customer)
        return this.$axios.$post(URL, data, config)
        .then(res =>  Promise.resolve(res))
        .catch(e => Promise.reject(e.response));

      }else{
       return this.$axios.$post(URL, customer)
       .then(res =>  Promise.resolve(res))
       .catch(e => Promise.reject(e.response));
      }

	},
  async patchCustomer({ rootState, dispatch }, customerToEdit) {
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
    }else{
      URL = "/manage/customers"
    }
    let data = await dispatch('createFormData', customerToEdit)
    return this.$axios.$patch(`${URL}/${ customerToEdit.id }`, data, config)
    .then(res =>  Promise.resolve(res))
    .catch(e => Promise.reject(e.response));

  },

	async putCustomer({ rootState, dispatch }, customerToEdit) {
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
   }else{
     URL = "/manage/customers"
   }
   return this.$axios.$put(`${URL}/${ customerToEdit.id }`, customerToEdit)
    .then(res =>  Promise.resolve(res))
    .catch(e => Promise.reject(e.response));
	},

	deleteCustomer({ rootState, commit }, customerId) {
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
   }else{
     URL = "/manage/customers"
   }
		return this.$axios.$delete(`${URL}/${ customerId }`)
		.then(res =>  Promise.resolve(res))
    .catch(e => Promise.reject(e.response));
  },

  createFormData({ context }, c) {
    let formData = new FormData()

   formData.append('name', c.name)
   formData.append('dbName', c.dbName)
   formData.append('emailDomain', c.emailDomain)
   formData.append('subFolder', c.subFolder)
   formData.append('mediaFolder', c.mediaFolder)
   formData.append('possessiveName', c.possessiveName)

   formData.append('street1', c.address.street1)
   formData.append('street2', c.address.street2)
   formData.append('city', c.address.city)
   formData.append('state', c.address.state)
   formData.append('postalCode', c.address.postalCode)

    formData.append('billToStreet1', c.billToAddress.street1)
    formData.append('billToStreet2', c.billToAddress.street2)
    formData.append('billToCity', c.billToAddress.city)
    formData.append('billToState', c.billToAddress.state)
    formData.append('billToPostalCode', c.billToAddress.postalCode)
    formData.append('billToContactTitle', c.billToContact.title)
    formData.append('billToContactFirstName', c.billToContact.firstName)
    formData.append('billToContactLastName', c.billToContact.lastName)
    formData.append('billToContactEmail', c.billToContact.email)
    formData.append('billToContactPhone', c.billToContact.phone)

    formData.append('salesContactTitle', c.salesContact.title)
    formData.append('salesContactFirstName', c.salesContact.firstName)
    formData.append('salesContactLastName', c.salesContact.lastName)
    formData.append('salesContactEmail', c.salesContact.email)
    formData.append('salesContactPhone', c.salesContact.phone)

    formData.append('shipToStreet1', c.shipToAddress.street1)
    formData.append('shipToStreet2', c.shipToAddress.street2)
    formData.append('shipToCity', c.shipToAddress.city)
    formData.append('shipToState', c.shipToAddress.state)
    formData.append('shipToPostalCode', c.shipToAddress.postalCode)

    formData.append('technicalContactTitle', c.technicalContact.title)
    formData.append('technicalContactFirstName', c.technicalContact.firstName)
    formData.append('technicalContactLastName', c.technicalContact.lastName)
    formData.append('technicalContactEmail', c.technicalContact.email)
    formData.append('technicalContactPhone', c.technicalContact.phone)

    if(c.allowsAutomaticSignup != '')formData.append('allowsAutomaticSignup', c.allowsAutomaticSignup)
		if ( c.defaultSecurityRole != undefined) formData.append('defaultSecurityRole', c.defaultSecurityRole)
		if (c.defaultSecurityRoleModel != null) formData.append('defaultSecurityRoleModel', c.defaultSecurityRoleModel)


    if (c.image != null) formData.append('image', c.image)
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
