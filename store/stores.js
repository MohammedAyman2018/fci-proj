export const state = () => ({
  store: {},
  stores: []
})

export const actions = {
  async getStores({ commit }) {
    try {
      const res = await this.$axios.get(`/stores/clint/all?approved=true`)
      commit('setStores', res.data)
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getStore({ commit }, storeName) {
    try {
      const res = await this.$axios.get(`/stores/one/${storeName}`)
      commit('setStore', res.data)
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
}

export const mutations = {
  setStores(state, stores) {
    state.stores = stores
  },
  setStore(state, store) {
    state.store = store
  }
}
