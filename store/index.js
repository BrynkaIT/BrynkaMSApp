const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => {
  return {
    auth: null,
    managedService: null,
    currentUser:null,
    sideBarOpen: false
  };
};

// Getter functions
export const getters = {
  isAuthenticated(state) {
    return !!state.auth;
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
  setManagedService(state, ms) {
    state.managedService = ms
  },
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser
  },
  toggleSideBar(state, event){
    state.sideBarOpen = event
  }
}

// Actions
export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    let auth = null
    let currentUser = null
    let managedService = {}

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        if (parsed.auth) { auth = JSON.parse(parsed.auth) }
        if (parsed.currentUser) { currentUser = JSON.parse(parsed.currentUser) }
        if (parsed.managedService) {
          managedService = createManagedServiceObj(parsed.managedService)
        }
      } catch (err) {
        // No valid cookie found
        console.log(`Cookie Error: ${err}`)
      }

    }
    commit('setAuth', auth)
    commit('setManagedService', managedService)
    commit('setCurrentUser', currentUser)
  },

  async login({ dispatch, commit }, credentials) {

    try {
      const auth = await this.$axios.post('/login', credentials)
      if (!auth) { return Promise.reject(e) }

      commit('setAuth', auth.data) // mutating to store for client rendering
      Cookie.set('auth', auth.data) // saving token in cookie for server rendering

      const currentuser = await this.$axios.get('/users/me', auth.data.userId) // get current user
      if (!currentuser) { return Promise.reject(e) }

      commit('setCurrentUser', currentuser.data.user) // mutating to store for client rendering
      Cookie.set('currentUser', currentuser.data.user) // saving token in cookie for server rendering

      const ms = createManagedServiceObj(auth.data.customerSubFolder)
      if (!ms) return Promise.reject(e)

      commit('setManagedService', ms) // mutating to store set
      Cookie.set('managedService', auth.data.customerSubFolder) // saving token in cookie for server rendering

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
    return state.managedService
  },

}
function createManagedServiceObj(msName) {
   const customerSubFolder = msName.split('/').shift();

  return  {
    name : customerSubFolder,
    path :`/${customerSubFolder}/`,
    mainLogo : `/img/customer/${customerSubFolder}/mainLogo.png`,
    secondaryLogo : `/img/customer/${customerSubFolder}/secondaryLogo.png`
  };

}
