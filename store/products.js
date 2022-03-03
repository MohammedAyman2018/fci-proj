export const state = () => ({
  displayedProducts: [],
  products: [],
})

export const actions = {
  reset({ commit }) {
    commit('setDisplayedProducts', [])
    commit('setProducts', [])
  },
  async getProducts({ commit }) {
    try {
      const res = await this.$axios.get('/products/all/stores')
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
    } catch (error) {
      // TODO: Add error
    }
  },
  async getStoreProducts({ commit }, storeName) {
    try {
      const res = await this.$axios.get(`/products?storeName=${storeName}`)
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
    } catch (error) {
      // TODO: Add error
    }
  },
  async addAndRemoveFromFav(_, productId) {
    try {
      if (this.$auth.loggedIn) {
        await this.$axios.post('/users/fav/', { productId })
        this.$auth.fetchUser()
      } else {
        alert('سجل دخول أولاً')
      }
    } catch (error) {

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

