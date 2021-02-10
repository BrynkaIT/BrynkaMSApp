const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    managedService: null,
    sideBarOpen: false,
    formToOpen: {},

  };
};

// Mutations
export const mutations = {
  setManagedService(state, ms) {
    state.managedService = ms
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
  async nuxtServerInit({ commit, dispatch }, { req }) {
    let managerApp_auth = null
    let url = req.url
    const regex = /\/([a-z0-9]+\/)+/gm
    const urlParams = url.match(regex)
    let managerApp_managedService = {}

    if (urlParams != null) {
      managerApp_managedService = await dispatch('createMSObj', urlParams[0].slice(1, -1))
    }

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        if (parsed.managerApp_auth) {
          managerApp_auth = JSON.parse(parsed.managerApp_auth)
        }
        if (parsed.managerApp_managedService) {
          managerApp_managedService = await dispatch('createMSObj', parsed.managerApp_managedService)
        }

      } catch (err) {
        // No valid cookie found
        console.log(`Cookie Error: ${err}`)
      }

    }
    commit('auth/setAuth', managerApp_auth, { root: true })
    commit('setManagedService', managerApp_managedService)
  },
  async validateCustomer({}, subFolder){
    return this.$axios.$get(`/validateCustomerSubfolder/${subFolder}`)
    .then(res =>{
      // dispatch('getVersion')
      return res
    } )
    .catch(e => Promise.reject(e.response));
  },
  async createMSObj({}, msName) {

    const customerSubfolder = msName.split('/').shift();
    try {
      let { logoUrl } = await this.$axios.$get(`/customers/${customerSubfolder}/logo`)

      if(!logoUrl){
        logoUrl = process.env.WEB_APP_DOMAIN+'/img/brynka.png'
      }else{
        logoUrl = process.env.baseURL+logoUrl;
      }

      return  {
        name : customerSubfolder,
        path :`/${customerSubfolder}/`,
        mainLogo :logoUrl,
        secondaryLogo : logoUrl,
      }

    } catch (error) {
      console.log('Invalid Customer!')
    }
  },

 
}
