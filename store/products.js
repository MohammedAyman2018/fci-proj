export const state = () => ({
  displayedProducts: [],
  products: [],
})

export const actions = {
  reset({ commit }) {
    commit('setDisplayedProducts', [])
    commit('setProducts', [])
  },
  async getRecommmendedProducts({ dispatch, commit }) {
    try {
      const res = await this.$axios.get('/home/recommended', {
        headers: { device: 'web' },
      })
      // this.recomended = res.data
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
      commit('paginate', { toPage: 1 })
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getSortedProducts({ dispatch, commit }, sort) {
    try {
      const res = await this.$axios.get(`/products/filter/home?sort=${sort}`, {
        headers: { device: 'web' },
      })
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
      commit('paginate', { toPage: 1 })
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getProducts({ dispatch, commit }) {
    try {
      const res = await this.$axios.get('/products/all/stores')
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
      commit('paginate', { toPage: 1 })
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getProduct({ dispatch }, id) {
    try {
      const res = await this.$axios.get(`/products/${id}`)
      return res.data
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getCategoryProducts({ dispatch, commit }, categoryName) {
    try {
      const res = await this.$axios.get(
        `/products/filter/all-category/${categoryName}`
      )
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
      commit('paginate', { toPage: 1 })
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async getStoreProducts({ dispatch, commit }, storeName) {
    try {
      const res = await this.$axios.get(`/products?storeName=${storeName}`)
      commit('setProducts', res.data)
      commit('setDisplayedProducts', res.data)
      commit('paginate', { toPage: 1 })
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  async addAndRemoveFromFav({ dispatch }, productId) {
    try {
      if (this.$auth.loggedIn) {
        await this.$axios.post('/users/fav/', { productId })
        dispatch(
          'showToast',
          { message: '???? ??????????', type: 'success' },
          { root: true }
        )

        this.$auth.fetchUser()
      } else {
        dispatch(
          'showToast',
          { message: '?????? ???????? ??????????', type: 'error' },
          { root: true }
        )
      }
    } catch (error) {
      dispatch('showToast', { message: error, type: 'error' }, { root: true })
    }
  },
  filterProducts({ commit, state }, categories) {
    const productsWithFilter =
      categories.length > 0
        ? state.products.filter((x) => categories.includes(x.category._id))
        : state.products
    commit('setDisplayedProducts', productsWithFilter)
  },
}

export const mutations = {
  setDisplayedProducts(state, products) {
    state.displayedProducts = products
  },
  paginate(state, info) {
    const perPage = 10
    const { toPage } = info
    const startPos = toPage * perPage - perPage
    const endPos = toPage * perPage
    state.displayedProducts = state.products.slice(startPos, endPos)
  },
  sortProducts(state, sortName) {
    if (sortName === 'priceFromLowToHigh') {
      state.displayedProducts.sort((a, b) => a.price - b.price)
    } else if (sortName === 'priceFromHighToLow') {
      state.displayedProducts.sort((a, b) => b.price - a.price)
    } else if (sortName === 'rateFromLowToHigh') {
      state.displayedProducts.sort((a, b) => a.actualRating - b.actualRating)
    } else if (sortName === 'rateFromHighToLow') {
      state.displayedProducts.sort((a, b) => b.actualRating - a.actualRating)
    }
  },
  filterByStore(state, storeName) {
    state.displayedProducts =
      storeName !== 'all'
        ? state.products.filter((prod) => prod.storeName === storeName)
        : state.products
  },
  // filterByName(state, name) {
  //   state.displayedProducts = name.length > 0 ? state.displayedProducts.filter(prod => prod.name.includes(name)) : state.displayedProducts
  // },
  setProducts(state, products) {
    state.products = products
  },
}
