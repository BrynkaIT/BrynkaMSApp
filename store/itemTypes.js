export const state = () => {
	return {
		itemTypes: [{ name: 'ItemType', _id: null }],

	}
}

// Mutations
export const mutations = {
	setItemTypes(state, itemTypes) {
		state.itemTypes = [{ name: 'ItemType', _id: null }]
		if (itemTypes != null && itemTypes.length > 0) {
			itemTypes.forEach(itemType => {
				state.itemTypes.push(itemType)
			})
		}
	},

}

// Actions
export const actions = {
	getItemTypes({ commit }, query) {
		query = query || ''
		return this.$axios.$get(`/itemTypes${query}`)
			.then(res => {
				commit('setItemTypes', res.itemTypes )
				return res
			})
			.catch(e => Promise.reject(e.response));
	},
	getItemType({ commit }, itemTypeId) {
		return this.$axios.$get(`/itemType/${itemTypeId}`)
			.then(res => {
				return res
			})
			.catch(e => Promise.reject(e.response));
	},

	postItemType({ commit }, itemType) {
		return this.$axios.$post('/itemType', itemType )
			.then(res => {
				return res
			})
			.catch(e => Promise.reject(e.response))
	},

	putItemType({ commit }, ItemTypeToEdit) {
		return this.$axios.$put(`/itemType/${ ItemTypeToEdit.id }`, ItemTypeToEdit)
			.then(res => {
				return res
			})
			.catch(e => Promise.reject(e.response))
	},

	deleteItemType({ commit }, itemTypeId) {
		return this.$axios.$delete(`/itemType/${ itemTypeId }`)
			.then(res => {
				return res
			})
			.catch(e => Promise.reject(e.response))
	}

}
