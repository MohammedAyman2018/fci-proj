export const state = () => ({
  store: {},
  stores: []
})

export const actions = {
  async getStores({ dispatch, commit }) {
    try {
      const res = await this.$axios.get(`/stores/clint/all?approved=true`)
      commit('setStores', res.data)
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getStore({ dispatch, commit }, storeName) {
    try {
      const res = await this.$axios.get(`/stores/one/${storeName}`)
      commit('setStore', res.data.store)
      commit('products/setProducts', res.data.products, { root: true })
      commit('products/setDisplayedProducts', res.data.products, { root: true })
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
