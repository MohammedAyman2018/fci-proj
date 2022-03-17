// store/localStorage.js
export const state = () => ({
  cart: [],
  singleProductId: '',
})

export const mutations = {
  setSingleProductId(state, id) {
    state.singleProductId = id
  },
  addToCart(state, item) {
    state.cart.push(item)
  },
  removeFromCart(state, item) {
    const idx = state.cart.findIndex(x => x._id === item._id)
    if (idx !== -1) state.cart.splice(idx, 1)
  },
  editAmount(state, { idx, amount }) {
    state.cart[idx].amount = amount
  },
  emptyCart(state) {
    state.cart = []
  }
}
