const config = { headers: { 'Content-Type': 'multipart/form-data' } };

// export const state = () => {
//     return {
//         users: null,

//     }
// }

// Mutations
export const mutations = {

}


// Actions
export const actions = {
	async getUsers({ commit }, query) {
		query = query || ''

		try {
			const res = await this.$axios.$get(`/users${query}`)
			return res
		} catch (error) {
			console.log(error)
		}

	},
	getUser({ commit }, userId) {
		return this.$axios.$get('/users', userId)
			.then(res => {
				// commit('setUsers', res)
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},
	async postUser({ dispatch }, data) {

		try {
			const user = await dispatch('createFormData', data)
			
			const newUser = await this.$axios.$post(`/users`, user, config)
			return newUser

		} catch (e) {

			console.log(e)
		}

	},
	async putUser({ dispatch }, data) {

		try {
			const userToEdit = await dispatch('createFormData', data)
			const editedUser = await this.$axios.$put(`/users/${data.id}`, userToEdit, config)
			return editedUser

		} catch (error) {
			console.log(error)
		}

	},
	async patchUser({ dispatch }, data) {

		try {

			const userToEdit = await dispatch('createFormData', data)
			const editedUser = await this.$axios.$patch(`/users/${data.id}`, userToEdit, config)
			return editedUser
		} catch (error) {
			console.log(error)
		}

	},
	async deleteUser({ commit }, userId) {

		try {
			const deletedUser = await this.$axios.$delete(`/users/${userId}`)
			return deletedUser

		} catch (error) {
			return(error)
		}
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
