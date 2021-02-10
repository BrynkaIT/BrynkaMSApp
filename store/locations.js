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
	getLocations({ rootState, commit }, payload) {

    if(rootState.auth.auth.customerSubfolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/${payload.customerId}/locations`
    }else{
      URL = `/manage/customer/${payload.customerId}/locations`
    }

    const query = payload.query || ''

		return this.$axios.$get(`${URL}${query}`)
			.then(res => {

				commit('setLocations', res.locations )
				return Promise.resolve(res)
			})
			.catch(e => {

        Promise.reject(e.response)
      });
	},
	getLocation({ rootState, commit },  payload) {

    if(rootState.auth.auth.customerSubfolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/${payload.customerId}/locations`
    }else{
      URL = `/manage/customer/${payload.customerId}/locations`
    }
    const query = payload.query || ''

		return this.$axios.$get(`${URL}/${payload.locationId}${query}`)
			.then(res => {

				return Promise.resolve(res)
			})
			.catch(e => {

        Promise.reject(e.response)});
	},

	postLocation({ rootState }, payload) {

    if(rootState.auth.auth.customerSubfolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/${payload.customerId}/locations`
    }else{
      URL = `/manage/customer/${payload.customerId}/locations`
    }

		return this.$axios.$post(URL, payload.location )
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))
	},

	putLocation({ rootState },  payload) {
    if(rootState.auth.auth.customerSubfolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/${payload.customerId}/locations`
    }else{
      URL = `/manage/customer/${payload.customerId}/locations`
    }
		return this.$axios.$put(`${URL}/${ payload.location.id }`, payload.location)
			.then(res => Promise.resolve(res))
			.catch(e => Promise.reject(e.response))
	},

	deleteLocation({ rootState }, locationId) {
    if(rootState.auth.auth.customerSubfolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/locations`
    }else{
      URL = `/manage/locations`
    }
		return this.$axios.$delete(`${URL}/${locationId}`)
			.then(res => Promise.resolve(res))
			.catch(e => Promise.reject(e.response))
	}
}
