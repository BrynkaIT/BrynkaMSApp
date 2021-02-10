const config = { headers: { 'Content-Type': 'multipart/form-data' } };

export const state = () => {
  return {
    users: null,
    currentUser: null,
  }
}


// Getter functions
export const getters = {

	currentUser(state) {
	  return state.currentUser || null;
	},
}

// Mutations
export const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser
  },
}


// Actions
export const actions = {
	getUsers({ commit }, query) {

		query = query || ''
		return this.$axios.$get(`/users${query}`)
		.then(res => {
			return Promise.resolve(res)
		})
		.catch(e => {
			Promise.reject(e.response)
		})

	},
	getUser({ commit }, userId) {
		return this.$axios.$get(`/users/${userId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},
	async postUser({ dispatch }, data) {
			const user = await dispatch('createFormData', data)
			return this.$axios.$post(`/users`, user, config)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},
	async putUser({ dispatch }, data) {
			const userToEdit = await dispatch('createFormData', data)
			return this.$axios.$put(`/users/${data.id}`, userToEdit, config)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},
	async patchUser({ dispatch }, data) {

			const userToEdit = await dispatch('createFormData', data)
			return this.$axios.$patch(`/users/${data.id}`, userToEdit, config)
			.then(res => {

				return Promise.resolve(res)
			})
			.catch(e => {

        Promise.reject(e.response)})


	},
	deleteUser({ commit }, userId) {

		return this.$axios.$delete(`/users/${userId}`)
		.then(res => {
			return Promise.resolve(res)
		})
		.catch(e => Promise.reject(e.response))
	},
	createFormData({ context }, user) {
		let formData = new FormData()
		formData.append('firstName', user.firstName)
		formData.append('middleName', user.middleName)
		formData.append('lastName', user.lastName)
		formData.append('firstNameAlias', user.firstNameAlias)
		formData.append('useFirstNameAlias', user.useFirstNameAlias)
		formData.append('fromContact', user.fromContact)
		formData.append('securityRoleId', user.securityRoleId)
		formData.append('email', user.email)
		formData.append('phone', user.phone)
		formData.append('isActive', user.isActive)
		formData.append("isPendingApproval", user.isPendingApproval)
		if (user.image != null) formData.append('image', user.image)
		if (user.locationId != null) formData.append('locationId', user.locationId)
		if (user.departmentId != null) formData.append('departmentId', user.departmentId)
		if (user.buildingId != null) formData.append('buildingId', user.buildingId)
		if (user.floorId != null) formData.append('floorId', user.floorId)
		return formData
	}

}
