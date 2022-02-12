export const state = () => ({
  links: [
    { text: 'item 1', url: '/' },
    { text: 'item 2', url: '/' },
  ],
  store: {}
})

export const mutations = {
  setStore(state, store) {
    state.store = store
  }
}
