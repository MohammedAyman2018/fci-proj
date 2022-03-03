export const state = () => ({
  categories: [],
  selectedCategories: []
})

export const actions = {
  reset({ commit }) {
    commit('setCategories', [])
    commit('setSelectedCategories', [])
  },
  async getCategories({ commit }) {
    try {
      const res = await this.$axios.get('/categories/all/stores')
      commit('setCategories', res.data)
    } catch (error) {
      // TODO: Add error
    }
  },
  async getStoreCategory({ commit }, storeName) {
    try {
      const res = await this.$axios.get(`/categories?${storeName}`)
      commit('setCategories', res.data)
    } catch (error) {
      // TODO: Add error
    }
  },
  setSelectedCategories({ commit, dispatch }, categories) {
    commit('setSelectedCategories', categories)
    dispatch('products/filterProducts', categories, { root: true })
  }
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
  setSelectedCategories(state, categories) {
    state.selectedCategories = categories
  },
}
