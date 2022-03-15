export const state = () => ({
  store: {}
})

export const actions = {
  async getStore({ commit }, storeName) {
    try {
      const res = await this.$axios.get(`/stores/one/${storeName}`)
      commit('setStore', res.data)
    } catch (error) {
      // TODO: Add error
    }
  },
}

export const mutations = {
  setStore(state, store) {
    state.store = store
  }
}
