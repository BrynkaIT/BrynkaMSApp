const config = { headers: {'Content-Type': 'multipart/form-data'}};

export const state = () => {
	return {
		contacts: null,

	}
}

// Mutations
export const mutations = {
	setContacts(state, contacts) {
		state.contacts = contacts
	},
}


// Actions
export const actions = {
	async getContacts({ commit },  query) {

		query = query || ''
		try {
			const res = await this.$axios.$get(`/contacts${query}`)
			commit('setContacts', res.contacts)
			return res
		} catch (error) {
			console.log(error)
		}

	},
	async getContact({ commit }, contactId) {
		try {
			const res = await this.$axios.$get('/contacts', contactId)
			commit('setContacts', res.contact)
			return res
		} catch (error) {
			console.log(error)
		}

	},
	async postContact({ dispatch }, data) {
		try {

			const contact = await dispatch('createFormData', data)

			const newContact = await this.$axios.$post(`/contacts`, contact, config)
			return newContact
		} catch (error) {
			console.log(error)
		}

	},
	async putContact({ dispatch }, data) {

		try {
			const contactToEdit = await dispatch('createFormData', data)
			const editedContact = await this.$axios.$put(`/contacts/${data.id}`, contactToEdit, config)
			return editedContact
		} catch (error) {
			console.log(error)
		}
	},
	async patchContact({ dispatch },  data) {

		try {
			const contactToEdit = await dispatch('createFormData', data)
			const editedContact = await this.$axios.$patch(`/contacts/${data.id}`, contactToEdit, config)
			return editedContact
		} catch (error) {
			console.log(error)
		}

	},
	async deleteContact({ commit }, contactId) {

		try {
			const deletedContact = await this.$axios.$delete(`/contacts/${contactId}`)
			return deletedContact
		} catch (error) {
			console.log(error)
		}
	},
	createFormData({ context }, contact){
		let formData = new FormData()
        if(contact.company) formData.append('company', contact.company)
        if(contact.firstName != null) formData.append('firstName', contact.firstName)
        if(contact.middleName != null) formData.append('middleName', contact.middleName)
        if(contact.lastName != null) formData.append('lastName', contact.lastName)
        if(contact.firstNameAlias != null) formData.append('firstNameAlias', contact.firstNameAlias)
        if(contact.useFirstNameAlias != null) formData.append('useFirstNameAlias', contact.useFirstNameAlias)
		if(contact.email != null) formData.append('email', contact.email)
        if(contact.phone != null) formData.append('phone', contact.phone)
		if(contact.image != null) formData.append('image', contact.image)
		if(contact.locationId != null) formData.append('locationId', contact.locationId)
		if(contact.departmentId != null) formData.append('departmentId', contact.departmentId)
		if(contact.buildingId != null) formData.append('buildingId', contact.buildingId)
		if(contact.floorId != null)formData.append('floorId', contact.floorId)

		if(contact.address != null){
			if(contact.address.street1) formData.append('street1', contact.address.street1)
			if(contact.address.street2) formData.append('street2', contact.address.street2)
			if(contact.address.city) formData.append('city', contact.address.city)
			if(contact.address.state) formData.append('state', contact.address.state)
			if(contact.address.postalCode) formData.append('postalCode', contact.address.postalCode)
			if(contact.address.country) formData.append('country', contact.address.country)
		}

		console.log(Array.from(formData))
		for(let obj of formData) {
			console.log(obj)
		}
		return formData
	}
}
