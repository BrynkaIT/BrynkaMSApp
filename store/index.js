const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => {
  return {
    auth: null,
    currentUser:null,
    sideBarOpen: false,
    formToOpen: {}
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
    let auth = null
    let currentUser = null


    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        if (parsed.auth) { auth = JSON.parse(parsed.auth) }
        if (parsed.currentUser) { currentUser = JSON.parse(parsed.currentUser) }

      } catch (err) {
        // No valid cookie found
        console.log(`Cookie Error: ${err}`)
      }

    }
    commit('setAuth', auth)

    commit('setCurrentUser', currentUser)
  },

  async login({ dispatch, commit }, credentials) {

    try {
      const auth = await this.$axios.post('/login', credentials)
      if (!auth)  return Promise.reject(e)

      commit('setAuth', auth.data) // mutating to store for client rendering
      Cookie.set('auth', auth.data) // saving token in cookie for server rendering

      const currentuser = await this.$axios.get('/users/me', auth.data.userId) // get current user
      if (!currentuser) { return Promise.reject(e) }

      commit('setCurrentUser', currentuser.data.user) // mutating to store for client rendering
      Cookie.set('currentUser', currentuser.data.user) // saving token in cookie for server rendering

      return currentuser
    }
    catch (e) {
      return Promise.reject(e)
    }
  },

  logOut({ commit }) {
    Cookie.remove('auth')
    Cookie.remove('currentUser')
    commit('setAuth', null)
    commit('setCurrentUser', null)

  },

}
