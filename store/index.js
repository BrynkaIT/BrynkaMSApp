const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => {
  return {

    sideBarOpen: false,
    formToOpen: {},
    // versions:''
  };
};

// Getter functions
export const getters = {

}
// Mutations
export const mutations = {

  // setVersions(state, versions){
  //   state.versions = versions
  // },
  toggleSideBar(state, event){
    state.sideBarOpen = event
  },
  switchForm(state, form) {
    //Bundle form data into a object and save to state
    state.formToOpen = this.$openForm(form)
  },
  closeModal(state) {
    state.formToOpen.showModal = false
  }
}

// Actions
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let managerApp_auth = null
    let managerApp_currentUser = null


    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        if (parsed.managerApp_auth) { managerApp_auth = JSON.parse(parsed.managerApp_auth) }
        if (parsed.managerApp_currentUser) { managerApp_currentUser = JSON.parse(parsed.managerApp_currentUser) }

      } catch (err) {
        // No valid cookie found
        console.log(`Cookie Error: ${err}`)
      }

    }
    commit('auth/setAuth', managerApp_auth, { root: true })
    commit('auth/setCurrentUser', managerApp_currentUser, { root: true })
  },



  // async getVersion({ commit }){
  //   try {
  //     const { versions } = await this.$axios.$get(`/versions?app=webApp&build=^${process.env.version}`)
  //     // console.log('version', versions)
  //     commit('setVersions', versions.reverse())
  //   } catch (error) {
  //     console.log('Was unable to fetch versions')
  //   }
  // }
}
