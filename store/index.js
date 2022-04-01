export const state = () => ({
  links: [
    { text: 'item 1', url: '/' },
    { text: 'item 2', url: '/' },
  ],
  orderStates: [
    'جاري التوصيل',
    'قيد التنفيذ',
    'تم التنفيذ',
    'بانتظار المراجعة',
    'تم التوصيل',
    'تم الشحن',
    'ملغي',
    'مسترجع',
    'قيد الاسترجاع',
  ],
  store: {},
})

export const actions = {
  showToast(
    _,
    {
      message,
      type = 'show',
      icon = '',
      position = 'bottom-center',
      duration = 5000,
      theme = 'toasted-primary',
      action = [],
    }
  ) {
    this.$toast[type](message, {
      theme,
      position,
      duration,
      icon,
      action,
    })
  },
}

export const mutations = {
  setStore(state, store) {
    state.store = store
  },
}
