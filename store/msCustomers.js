export const state = () => {
  return {
    selectedCustomer: null
  }
}

export const actions = {
  getSelectedCustomer ({ commit }, payload) {
    commit('SelectedCustomer', payload);
  },
  
}

export const mutations = {
    SelectedCustomer(state, payload) {
    return (state.selectedCustomer = payload)
  }
}
