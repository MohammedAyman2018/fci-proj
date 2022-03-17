export const state = () => ({
  displayedProducts: [],
  products: [],
})

export const actions = {
  reset({ commit }) {
    commit('setDisplayedProducts', [])
    commit('setProducts', [])
  },
  async getProducts({ dispatch, commit }) {
    try {
      const res = await this.$axios.get('/products/all/stores')
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getCategoryProducts({ dispatch, commit }, categoryName) {
    try {
      const res = await this.$axios.get(`/products/filter/all-category/${categoryName}`)
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getStoreProducts({ dispatch, commit }, storeName) {
    try {
      const res = await this.$axios.get(`/products?storeName=${storeName}`)
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async addAndRemoveFromFav({ dispatch }, productId) {
    try {
      if (this.$auth.loggedIn) {
        await this.$axios.post('/users/fav/', { productId })
        this.$auth.fetchUser()
      } else {
        dispatch('showToast', { message: 'سجل دخول أولاً', type: 'error' }, { root: true })
      }
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  filterProducts({ commit, state }, categories) {
    const productsWithFilter = categories.length > 0
      ? state.products.filter((x) => categories.includes(x.category._id))
      : state.products
    commit('setDisplayedProducts', productsWithFilter)
  }
}

export const mutations = {
  setDisplayedProducts(state, products) {
    state.displayedProducts = products
  },
  setProducts(state, products) {
    state.products = products
  },
}

