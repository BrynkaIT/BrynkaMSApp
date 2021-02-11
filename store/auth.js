const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => {
  return {
    auth: null,
    requestedUrl:''
  };
};

// Getter functions
export const getters = {
  isAuthenticated(state) {
    return !!state.auth;
  },
  isBrynka(state){

    if(state.auth){

      if(state.auth.customerSubfolder === 'brynka' && state.auth.userType === 'API'){
        return true
      }else{
        return false
      }
    }
  },

}
// Mutations
export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },

  setResetToken(state, token) {
    state.resetToken = token
  },

  setRequestedUrl(state, url){
    state.requestedUrl = url
  }
}

// Actions
export const actions = {
  forgetPassword({}, payload) {
    return this.$axios.post('/requestPasswordReset', payload)
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(e => Promise.reject(e.response))
  },

  async genericLogin({ commit }, credentials) {
    try {

      const auth = await this.$axios.post('/login', credentials)
      if (!auth) { return Promise.reject(e) }
      commit('setTempAuth', auth.data)
      return auth
    }
    catch (e) {
      return Promise.reject(e)
    }
  },

  async login({ dispatch, commit }, credentials) {

    let apiURL = credentials.customerId ? '/login/changeCustomer': '/login'

    try {
      const auth = await this.$axios.post(apiURL, credentials)
      if (!auth) { return Promise.reject(e) }
      if (auth.data.userType == 'Standard') {
        return Promise.reject("You are not Authorized")
      }

      commit('setAuth', auth.data) // mutating to store for client rendering
      Cookie.set('managerApp_auth', auth.data) // saving token in cookie for server rendering

      const res = await this.$axios.get('/users/me?deep=true') // get current user
      localStorage.setItem('managerApp_currentUser', JSON.stringify(res.data.user));

      const ms = await dispatch ('createMSObj', auth.data.customerSubfolder, { root:true })
      if (!ms) return Promise.reject(e)

      commit('setManagedService', ms, { root:true }) // mutating to store set
      Cookie.set('managerApp_managedService', auth.data.customerSubfolder, { expires: 1 }) // saving token in cookie for server rendering

      return auth

    }
    catch (e) {

      return Promise.reject(e)
    }
  },

  logOut({ commit }) {
    if(Cookie){
      Cookie.remove('managerApp_auth')
      Cookie.remove('managerApp_managedService')
    }
    commit('auth/setAuth', null, { root: true })

  },
  resetPassword({commit}, payload) {

    commit('setResetToken', payload.token)

    return this.$axios.post('/resetPassword', payload.form)
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(e => Promise.reject(e.response))
  },
}
