const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => {
  return {
    auth: null,
    currentUser:null,
    sideBarOpen: false,
    formToOpen: {},
    versions:''
  };
};

// Getter functions
export const getters = {
  isAuthenticated(state) {
    return !!state.auth;
  },
  isBrynka(state){
    if(state.auth){
      if(state.auth.customerSubFolder === 'brynka' && state.auth.userType === 'API'){
        return true
      }else{
        return false
      }
    }
  },
  currentUser(state) {
    return state.currentUser || null;
  },
}
// Mutations
export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },

  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser
  },
  setVersions(state, versions){
    state.versions = versions
  },
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
  nuxtServerInit({ commit, dispatch }, { req }) {
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
    commit('setAuth', managerApp_auth)
    commit('setCurrentUser', managerApp_currentUser)
  },

  async login({ dispatch, commit }, credentials) {

    try {
      const auth = await this.$axios.post('/login', credentials)
      if (!auth)  return Promise.reject(e)

      commit('setAuth', auth.data) // mutating to store for client rendering
      Cookie.set('managerApp_auth', auth.data) // saving token in cookie for server rendering

      const currentuser = await this.$axios.get('/users/me', auth.data.userId) // get current user
      if (!currentuser) { return Promise.reject(e) }

      commit('setCurrentUser', currentuser.data.user) // mutating to store for client rendering
      Cookie.set('managerApp_currentUser', currentuser.data.user) // saving token in cookie for server rendering

      return currentuser
    }
    catch (e) {
      return Promise.reject(e)
    }
  },

  logOut({ commit }) {
    Cookie.remove('managerApp_auth')
    Cookie.remove('managerApp_currentUser')
    commit('setAuth', null)
    commit('setCurrentUser', null)

  },

  async getVersion({ commit }){
    try {
      const { versions } = await this.$axios.$get(`/versions?app=webApp&build=^${process.env.version}`)
      // console.log('version', versions)
      commit('setVersions', versions.reverse())
    } catch (error) {
      console.log('Was unable to fetch versions')
    }
  }
}
