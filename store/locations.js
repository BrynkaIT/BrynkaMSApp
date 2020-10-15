let URL;
export const state = () => {
	return {
		locations: [{ name: 'Location', _id: null }],

	}
}

// Mutations
export const mutations = {
	setLocations(state, locations) {
		state.locations = [{ name: 'Location', _id: null }]
		if (locations != null && locations.length > 0) {
			locations.forEach(location => {
				state.locations.push(location)
			})
		}
	},

}


// Actions
export const actions = {
	getLocations({ rootState, commit }, query) {
    debugger
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/locations"
    }else{
      URL = "/manage/locations"
    }

    query = query || ''

		return this.$axios.$get(`${URL}${query}`)
			.then(res => {
				commit('setLocations', res.locations )
				return Promise.resolve(res)
			})
			.catch(e => {Promise.reject(e.response)});
	},
	getLocation({ rootState, commit }, locationId) {

    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/locations"
    }else{
      URL = "/manage/locations"
    }
		return this.$axios.$get(`${URL}/${locationId}`)
			.then(res => {
				return Promise.resolve(res)
			})
			.catch(e => Promise.reject(e.response));
	},

	postLocation({ rootState }, location) {

    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/locations"
    }else{
      URL = "/manage/locations"
    }

		return this.$axios.$post(URL, location )
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))
	},

	putLocation({ rootState }, locationToEdit) {
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/locations"
    }else{
      URL = "/manage/locations"
    }
		return this.$axios.$put(`${URL}/${ locationToEdit.id }`, locationToEdit)
			.then(res => Promise.resolve(res))
			.catch(e => Promise.reject(e.response))
	},

	deleteLocation({ rootState }, locationId) {
    if(rootState.auth.customerSubFolder === 'brynka' && rootState.auth.userType === 'API'){
      URL= "/manage/brynka/locations"
    }else{
      URL = "/manage/locations"
    }
		return this.$axios.$delete(`${URL}/${locationId}`)
			.then(res => Promise.resolve(res))
			.catch(e => Promise.reject(e.response))
	}
}
