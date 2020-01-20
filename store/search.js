export const state = () => {
  return {
    searchParams: null
  }
}

export const actions = {
  searchTableData({ commit }, payload) {
    commit('tableData', payload);
  }
}

export const mutations = {
  tableData(state, payload) {
    return (state.searchParams = payload);
  }
}
