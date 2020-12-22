const config = { headers: {'Content-Type': 'multipart/form-data'}};
export const state = () => {
	return {
		// versions: null,

	}
}
// Mutations
export const mutations = {
	setReleaseNotes(state, versions) {
    state.versions = versions
	},

}

// Actions
export const actions = {
	getVersions({ rootState, commit }, payload) {


	},
	getVersion({ rootState, commit },  payload) {

	},

	postVersion({ rootState }, payload) {

    if(rootState.auth.auth.customerSubFolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/versions`
    }else{
      throw "You are not authorized"
    }
		return this.$axios.$post(URL, payload)
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))
	},
  async patchVersion({ rootState, dispatch },  payload) {

    const version = await dispatch('createFormData', payload)
    if(rootState.auth.auth.customerSubFolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/versions`
    }else{
      throw "You are not authorized"
    }
		return this.$axios.$patch(`${URL}/${payload.id}`, version,  config)
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))

  },
  async patchReleaseNotes({ rootState, dispatch },  payload) {

    const rn = await dispatch('createFormData', payload)
    if(rootState.auth.auth.customerSubFolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/versions/${payload.versionId}/releaseNotes/${payload.releaseNoteId}`
    }else{
      throw "You are not authorized"
    }
		return this.$axios.$patch(`${URL}`, rn,  config)
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))

  },
  async patchNotes({ rootState, dispatch },  payload) {

    const note = await dispatch('createFormData', payload)
    if(rootState.auth.auth.customerSubFolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/versions/${payload.releaseNoteId}/notes/${payload.noteId}`
    }else{
      throw "You are not authorized"
    }
		return this.$axios.$patch(`${URL}`, note,  config)
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))

  },
  async postNotes({ rootState, dispatch },  payload) {


    if(rootState.auth.auth.customerSubFolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/versions/${payload.versionId}/releaseNotes/${payload.releaseNoteId}`

    }else{
      throw "You are not authorized"
    }

		return this.$axios.$post(`${URL}`, payload )
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))

	},
	async putVersion({ rootState, dispatch },  payload) {

    const version = await dispatch('createFormData', payload)
    if(rootState.auth.auth.customerSubFolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/versions`
    }else{
      throw "You are not authorized"
    }

		return this.$axios.$put(`${URL}/${payload.id}`, version,  config)
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))

	},
  async putReleaseNotes({ rootState, dispatch },  payload) {


    if(rootState.auth.auth.customerSubFolder === 'brynka' && rootState.auth.auth.userType === 'API'){
      URL= `/manage/brynka/versions/${payload.versionId}/releaseNotes/${payload.releaseNoteId}`
    }else{
      throw "You are not authorized"
    }

		return this.$axios.$put(URL)
			.then(res =>  Promise.resolve(res))
			.catch(e => Promise.reject(e.response))

	},
	async deleteVersion({ rootState }, locationId) {

  },
  createFormData({ context }, form){
		let formData = new FormData()
      if(form.application != null) formData.append('application', form.application)
      if(form.build) formData.append('build', form.build)
      if(form.buildNumber) formData.append('buildNumber', form.buildNumber)
      if(form.primaryVersion) formData.append('primaryVersion', form.primaryVersion)
      if(form.subVersion) formData.append('subVersion', form.subVersion)
      if(form.releaseDate) formData.append('releaseDate', form.releaseDate)
      if(form.version) formData.append('version', form.version)

      if(form.title) formData.append('title', form.title)
      if(form.module != null) formData.append('module', form.module)
      if(form.text) formData.append('text', form.text)

      if(form.media != null){
        for (var i = 0; i < form.media.length; i++) {
          formData.append("media", form.media[i])
        }
      }


		console.log(Array.from(formData))
		for(let obj of formData) {
			console.log(obj)
		}
		return formData
	}
}
