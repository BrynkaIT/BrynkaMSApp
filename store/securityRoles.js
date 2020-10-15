export const state = () => {
	return {
		securityRoles: [{ name: 'Security Role', _id: null }],

	}
}

// Mutations
export const mutations = {
	setSecurityRoles(state, securityRoles) {
		state.securityRoles = [{ name: 'Security Role', _id: null }]
		if (securityRoles != null && securityRoles.length > 0) {
			securityRoles.forEach(securityRole => {
				state.securityRoles.push(securityRole)
			})
		}
	},

}

// Actions
export const actions = {
	getSecurityRoles({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/securityRoles${query}`)
			.then(res => {
				commit('setSecurityRoles', res.securityRoles )
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},
	getSecurityRole({ commit }, securityRoleId) {
		return this.$axios.$get(`/securityRole${ securityRoleId }`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},

	postSecurityRole({ commit }, securityRole) {
		return this.$axios.$post('/securityRole', securityRole )
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	putSecurityRole({ commit }, securityRoleToEdit) {
		return this.$axios.$put(`/securityRole/${ securityRoleToEdit.id }`, securityRoleToEdit)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteSecurityRole({ commit }, securityRoleId) {

		return this.$axios.$delete(`/securityRole/${ securityRoleId }`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	}

}
