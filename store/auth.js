const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => {
  return {
    auth: null,
    currentUser:null,

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
  }

}

// Actions
export const actions = {

  async login({commit }, credentials) {

    try {
      const auth = await this.$axios.post('/login', credentials)
      if (!auth)  return Promise.reject(e)

      commit('setAuth', auth.data) // mutating to store for client rendering
      Cookie.set('managerApp_auth', auth.data) // saving token in cookie for server rendering

      const currentuser = await this.$axios.get(`/users/${auth.data.userId}?deep=true`) // get current user
      if (!currentuser) { return Promise.reject(e) }

      commit('setCurrentUser', currentuser.data.user) // mutating to store for client rendering
      // Cookie.set('managerApp_currentUser', currentuser.data.user) // saving token in cookie for server rendering
      localStorage.setItem('managerApp_currentUser', JSON.stringify(currentuser.data.user));

      // await this.$store.dispatch('getVersion') // Fetch version
    }
    catch (e) {
      return Promise.reject(e)
    }
  },

  logOut({ commit }) {
    if(Cookie){
      Cookie.remove('managerApp_auth')
      // Cookie.remove('managerApp_currentUser')
    }

    commit('auth/setAuth', null, { root: true })
    commit('auth/setCurrentUser', null, { root: true })
  }
}
