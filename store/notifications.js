const config = { headers: {'Content-Type': 'multipart/form-data'}};
export const state = () => {
	return {
		notifications: null
	}
}

// Mutations
export const mutations = {
	setNotifications(state, notifications) {
		state.notifications = notifications
	},

}

// Actions
export const actions = {
	getNotifications({ commit }, query) {
		query = query || ''

		return this.$axios.$get(`/notifications${query}`)
			.then(res => {
				commit('setNotifications', res.notifications )
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},
	getNotification({ commit }, notificationId) {
		return this.$axios.$get(`/notifications/${notificationId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},

	async patchEmailNotification({ dispatch }, data) {
		const formData =  await dispatch('createFormData', data)
		debugger
		return this.$axios.$patch(`/emailnotifications/${ data.id }`, formData, config)
		.then(res => {
			return Promise.resolve(res)
		})
		.catch(e => Promise.reject(e.response))
	},

	async patchSmsNotification({ dispatch }, data) {
		const formData =  await dispatch('createFormData', data)
		return this.$axios.$patch(`/smsnotifications/${ data.id }`, formData, config)
		.then(res => {
			return Promise.resolve(res)
		})
		.catch(e => Promise.reject(e.response))
	},

	async postEmailNotification({ dispatch }, data) {

		const formData =  await dispatch('createFormData', data)

		return this.$axios.$post(`/emailnotifications`, formData, config )
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},
	async postSmsNotification({ dispatch }, data) {

		const formData =  await dispatch('createFormData', data)
		return this.$axios.$post(`/smsnotifications`, formData, config )
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	async putEmailNotification({ dispatch }, data) {
		debugger
		const formData =  await dispatch('createFormData', data)
		return this.$axios.$put(`/emailnotifications/${ data.id }`, formData, config)
		.then(res => {
			return Promise.resolve(res)
		})
		.catch(e => Promise.reject(e.response))
	},

	async putSmsNotification({ dispatch }, data) {
		debugger
		const formData =  await dispatch('createFormData', data)
		return this.$axios.$put(`/smsnotifications/${ data.id }`, formData, config)
		.then(res => {
			return Promise.resolve(res)
		})
		.catch(e => Promise.reject(e.response))
	},

	deleteNotification({ commit }, notificationId) {

		return this.$axios.$delete(`/notifications/${ notificationId }`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response))
	},

	createFormData({ context }, form){

		let formData = new FormData()
		if(form.body) formData.append('body', form.body)
		if(form.text) formData.append('text', form.text)
		if(form.eventId) formData.append('eventId', form.eventId)
		if(form.from) formData.append('from', form.from)
		if(form.name) formData.append('name', form.name)
		if(form.subject) formData.append('subject', form.subject)
		if(form.to) formData.append('to', form.to)
		if(form.locations){
			for (var i = 0; i < form.locations.length; i++) {
				formData.append("locations", form.locations[i])
			}
		}
		// formData.append('isActive', form.isActive)
		// console.log(Array.from(formData))
		// for(let obj of formData) {
		// 	console.log(obj)
		// }
		return formData
	}

}