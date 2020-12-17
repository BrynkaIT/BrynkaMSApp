export const state = () => {
	return {
		releaseNotes: null,

	}
}
// Mutations
export const mutations = {
	setReleaseNotes(state, releaseNotes) {
    state.releaseNotes = releaseNotes
	},

}

// Actions
export const actions = {
	getReleaseNotes({ rootState, commit }, payload) {


	},
	getReleaseNote({ rootState, commit },  payload) {

	},

	postReleaseNote({ rootState }, payload) {

    if(rootState.auth.auth.customerSubFolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/versions`
    }else{
      throw "You are not authorized"
    }
		return this.$axios.$post(URL, payload)
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))
	},

	putReleaseNote({ rootState },  payload) {

	},

	deleteReleaseNote({ rootState }, locationId) {

	}
}
