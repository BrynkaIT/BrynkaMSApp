export const state = () => {
  return {
    selectedCustomer: null,
    ManagedService: null
  }
}

export const actions = {
  getSelectedCustomer ({ commit }, customer) {
    commit('setSelectedCustomer', customer);
  },
  postNewCustomer({ commit }, customer) {
    this.$axios.post('/customer', customer)
    .then(customer => {
      commit('setNewCustomer', customer)
    })
    .catch(e => console.log(e))
  },
  getManagedService({ commit }, urlParams){
    const ms = {};
    if (urlParams != null) {
      ms.name = urlParams;
      ms.mainLogo = "img/" + urlParams + "/mainLogo" +".png"
      ms.secondaryLogo = "img/" + urlParams + "/secondaryLogo" +".png"
      commit('setManagedService', ms);
    } else {
      ms.name = 'brynka';
      ms.mainLogo = "img/brynka/mainLogo.png"
      ms.secondaryLogo = "img/brynka/secondaryLogo.png"
      commit('setManagedService', ms);
    }
  }

}

export const mutations = {
  setSelectedCustomer(state, payload) {
  return (state.selectedCustomer = payload)
  },
  setNewCustomer(state, customer){
    state.selectedCustomer = customer;
    this.$router.push(`/customers/${state.selectedCustomer.data.customerId}`)
  },
  setManagedService(state, ms){
    state.ManagedService = ms
  }
}
