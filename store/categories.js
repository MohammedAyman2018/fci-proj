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
      const res = await this.$axios.get('/categories')
      commit('setCategories', res.data)
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getStoreCategory({ commit }) {
    try {
      const res = await this.$axios.get(`/categories`)
      commit('setCategories', res.data)
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
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
