export const state = () => {
	return {
		departments: [{ name: 'Department', _id: null }]
	}
}

// Mutations
export const mutations = {
	setDepartments(state, departments) {
		state.departments = [{ name: 'Department', _id: null }]
		if (departments.length > 0) {
			departments.forEach(department => {
				state.departments.push(department)
			})
		}
	}
}


// Actions
export const actions = {
	getDepartments({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/departments${query}`)
			.then(res => {
				commit('setDepartments', res.departments)
				return Promise.resolve(res.departments)
			})
			.catch(e => {
				Promise.reject(e.response)
			})
	},
	getDepartment({ commit }, departmentId) {
		return this.$axios.$get(`/department/${departmentId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},

	postDepartment({ commit }, department) {
		return this.$axios.$post('/department', department)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	putDepartment({ commit }, departmentToEdit) {
		return this.$axios.$put(`/department/${departmentToEdit.id}`, departmentToEdit)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteDepartment({ commit }, departmentId) {
		return this.$axios.$delete(`/department/${departmentId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	}

}
