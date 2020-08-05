const config = { headers: {'Content-Type': 'multipart/form-data'}};

export const state = () => {
	return {
		receivedItems: '',
	}
}

// Mutations
export const mutations = {
	setReceivedItems(state, receivedItems) {
		state.receivedItems = receivedItems
	},

}


// Actions
export const actions = {
    async getReceivedItems({ commit },  query) {
		query = query || ''
		try {
            const res = await this.$axios.$get(`/receivedItems${query}`)
			commit('setReceivedItems', res.receivedItems)
			return res
		} catch (error) {
			console.log(error)
		}

	},
	getItemById({ commit },  itemId) {
        return this.$axios.$get(`/receivedItems/${itemId}?deep=true`)
        .then(res => {
			commit('setReceivedItems', res.receivedItem)
			return res
        })
	},

	async postReceivedItem({ dispatch }, data) {
		try {

			const receivedItem = await dispatch('createFormData', data)
			const newReceivedItem = await this.$axios.$post(`/receivedItems`, receivedItem, config)
			return newReceivedItem
		} catch (error) {
			console.log(error)
		}

	},
	async postReceivedItemEvents({ dispatch }, data) {
		try {
			const newReceivedItem = await this.$axios.$post(`/receivedItems/events`, data)
			return newReceivedItem
		} catch (error) {
			console.log(error)
		}

	},
	async postEventImages({ dispatch }, data) {
		try {
			const imagesAndIds = await dispatch('createFormData', data)

			const newReceivedItem = await this.$axios.$post(`/receivedItems/events/images`, imagesAndIds)
			return newReceivedItem
		} catch (error) {
			console.log(error)
		}

	},
	async putReceivedItem({ dispatch }, data) {

		try {
			const receivedItemToEdit = await dispatch('createFormData', data)
			const editedReceivedItem = await this.$axios.$put(`/receivedItems/${data.id}`, receivedItemToEdit, config)
			return editedReceivedItem
		} catch (error) {
			console.log(error)
		}
	},
	async patchReceivedItem({ dispatch },  data) {

		try {
			const receivedItemToEdit = await dispatch('createFormData', data)
			const editedReceivedItem = await this.$axios.$patch(`/receivedItems/${data.id}`, receivedItemToEdit, config)
			return editedReceivedItem
		} catch (error) {
			console.log(error)
		}

	},
	async deleteReceivedItem({ commit }, receivedItemId) {

		try {
			const deletedReceivedItem = await this.$axios.$delete(`/receivedItems/${receivedItemId}`)
			return deletedReceivedItem
		} catch (error) {
			console.log(error)
		}
	},
	async postReceivedItemEvent({ dispatch }, data) {
		try {

			const receivedItem = await dispatch('createFormData', data)
			const newReceivedItem = await this.$axios.$post(`/receivedItems/events`, receivedItem, config)
			return newReceivedItem

		} catch (error) {
			return error.response
		}

	},
	createFormData({ context }, form){

		let formData = new FormData()
		if(form.clerkId) formData.append('clerkId', form.clerkId)
		if(form.eventCode) formData.append('eventCode', form.eventCode)
		if(form.signedBy) formData.append('signedBy', form.signedBy)
		if(form.eventDateTime) formData.append('eventDateTime', form.eventDateTime)
		if(form.trackingNumber) formData.append('trackingNumber', form.trackingNumber)
		if(form.eventIds){
			for (var i = 0; i < form.eventIds.length; i++) {
				formData.append("eventIds", form.eventIds[i])
			}
		}

		if (form.images != null) {
			for (var i = 0; i < form.images.length; i++) {
				formData.append("images", form.images[i])
			}
		}
		// console.log(Array.from(formData))
		// for(let obj of formData) {
		// 	console.log(obj)
		// }
		return formData
	},

}
