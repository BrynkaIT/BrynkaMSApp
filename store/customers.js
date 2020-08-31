const config = { headers: { 'Content-Type': 'multipart/form-data' } };
let URL = "/manage/customers"


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

    try {
      const res = await this.$axios.$get(`${URL}${query}`)
      commit('setCustomers', res.customers )
      return res

    } catch (error) {
      console.log(error)
    }
	},
  async	getCustomer({ rootState, commit }, customerId) {

  if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
     URL= "/manage/brynka/customers"
  }else{
    URL = "/manage/customers"
  }
      try {
      const res = await this.$axios.$get(`${URL}/${customerId}`)
      commit('setCustomerInContext', res.customer)
      return res
      } catch (error) {
        console.log(error)
      }
	},

	async postCustomer({ rootState, dispatch }, customer) {
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
   }else{
     URL = "/manage/customers"
   }
    try {
      if(customer.image != null){
        let data = await dispatch('createFormData', customer)
        const res = await this.$axios.$post(URL, data, config)
        return res
      }else{
        const res = await this.$axios.$post(URL, customer)
        return res
      }
		} catch (error) {
			console.log(error)
		}
	},
  async patchCustomer({ rootState, dispatch }, customerToEdit) {
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
    }else{
      URL = "/manage/customers"
    }

    try {
        let data = await dispatch('createFormData', customerToEdit)
        const res = await this.$axios.$patch(`${URL}/${ customerToEdit.id }`, data, config)
        return res

		} catch (error) {
			console.log(error)
		}
	},
	async putCustomer({ rootState, dispatch }, customerToEdit) {
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
   }else{
     URL = "/manage/customers"
   }
   try {
    const res = await this.$axios.$put(`${URL}/${ customerToEdit.id }`, customerToEdit)
    return res

		} catch (error) {
			console.log(error)
		}
	},

	deleteCustomer({ rootState, commit }, customerId) {
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/customers"
   }else{
     URL = "/manage/customers"
   }
		return this.$axios.$delete(`${URL}/${ customerId }`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
  },

  createFormData({ context }, c) {
    let formData = new FormData()
    
   if(c.name != '') formData.append('name', c.name)
   if(c.name != '') formData.append('dbName', c.dbName)
   if(c.emailDomain != '') formData.append('emailDomain', c.emailDomain)
   if(c.subFolder != '') formData.append('subFolder', c.subFolder)
   if(c.mediaFolder != '') formData.append('mediaFolder', c.mediaFolder)
   if(c.possessiveName != '') formData.append('possessiveName', c.possessiveName)

   if(c.address.street1 != '') formData.append('street1', c.address.street1)
   if(c.address.street2 != '') formData.append('street2', c.address.street2)
   if(c.address.city != '') formData.append('city', c.address.city)
   if(c.address.state != '') formData.append('state', c.address.state)
   if(c.address.postalCode != '') formData.append('postalCode', c.address.postalCode)

    if(c.billToAddress.street1 != '') formData.append('billToStreet1', c.billToAddress.street1)
    if(c.billToAddress.street2 != '') formData.append('billToStreet2', c.billToAddress.street2)
    if(c.billToAddress.city != '') formData.append('billToCity', c.billToAddress.city)
    if(c.billToAddress.state != '') formData.append('billToState', c.billToAddress.state)
    if(c.billToAddress.postalCode != '') formData.append('billToPostalCode', c.billToAddress.postalCode)
    if(c.billToAddress.title != '') formData.append('billToContactTitle', c.billToContact.title)
    if(c.billToAddress.firstName != '') formData.append('billToContactFirstName', c.billToContact.firstName)
    if(c.billToAddress.lastName != '') formData.append('billToContactLastName', c.billToContact.lastName)
    if(c.billToAddress.email != '') formData.append('billToContactEmail', c.billToContact.email)
    if(c.billToAddress.phone != '') formData.append('billToContactPhone', c.billToContact.phone)

    if(c.salesContact.title != '') formData.append('salesContactTitle', c.salesContact.title)
    if(c.salesContact.firstName != '') formData.append('salesContactFirstName', c.salesContact.firstName)
    if(c.salesContact.lastName != '') formData.append('salesContactLastName', c.salesContact.lastName)
    if(c.salesContact.email != '') formData.append('salesContactEmail', c.salesContact.email)
    if(c.salesContact.phone != '') formData.append('salesContactPhone', c.salesContact.phone)

    if(c.shipToAddress.street1 != '') formData.append('shipToStreet1', c.shipToAddress.street1)
    if(c.shipToAddress.street2 != '') formData.append('shipToStreet2', c.shipToAddress.street2)
    if(c.shipToAddress.city != '') formData.append('shipToCity', c.shipToAddress.city)
    if(c.shipToAddress.state != '') formData.append('shipToState', c.shipToAddress.state)
    if(c.shipToAddress.postalCode != '') formData.append('shipToPostalCode', c.shipToAddress.postalCode)

    if(c.technicalContact.title != '') formData.append('technicalContactTitle', c.technicalContact.title)
    if(c.technicalContact.firstName != '') formData.append('technicalContactFirstName', c.technicalContact.firstName)
    if(c.technicalContact.lastName != '') formData.append('technicalContactLastName', c.technicalContact.lastName)
    if(c.technicalContact.email != '') formData.append('technicalContactEmail', c.technicalContact.email)
    if(c.technicalContact.phone != '') formData.append('technicalContactPhone', c.technicalContact.phone)

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
