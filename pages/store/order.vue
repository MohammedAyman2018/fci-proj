<template>
  <section class="container mx-auto">
    <h3 class="my-4 has-text-weight-bold is-size-3">إتمام الطلب</h3>

    <div v-if="cart.length > 0">
      <div class="columns is-multiline">
        <div
          v-for="product in cart"
          :key="product._id"
          class="column is-12 mb-3"
        >
          <div class="columns box">
            <div class="column is-3">
              <b-button size="is-small" @click="removeFromCart(product)">
                x
              </b-button>
              <img
                style="width: 50px; height: 50px; border-raduis: 10px"
                :src="product.images[0]"
                :alt="product.name"
              />
            </div>
            <div class="column">
              <h4 class="is-size-5">
                {{ product.name }}
              </h4>
            </div>
            <div class="column is-3">
              <bdi class="is-size-5">
                {{ product.price }} X {{ product.orderedAmount }} =
                {{ product.price * product.orderedAmount }} جنيه
              </bdi>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <b-button
        type="is-primary"
        :disabled="cart.length === 0"
        @click="createOrder"
        >إتمام الطلب</b-button
      >
    </div>
  </section>
</template>

<script>
export default {
  name: 'OrderPage',
  data() {
    return {
      payment: 'كاش',
    }
  },
  computed: {
    cart() {
      return this.$store.state.localStorage.cart
    },
    total() {
      let sum = 0
      this.$store.state.localStorage.cart.forEach((product) => {
        sum += Number(product.price) * Number(product.orderedAmount)
      })
      return sum
    },
  },
  mounted() {
    if (this.cart.length === 0) {
      this.$router.push('/')
    }
  },
  methods: {
    async createOrder() {
      try {
        if (!this.$auth.user.phone || !this.$auth.user.address) {
          // this.$modal.show('complete-profile')
          this.$buefy.dialog.confirm({
            title: 'بيانات ناقصة',
            message: 'برجاء إكمال حسابك قبل إنشاء الحساب',
            cancelText: 'إلغاء',
            confirmText: 'إكمال الحساب',
            type: 'is-warning',
            onConfirm: () => this.$router.push('/profile'),
          })
          return
        }

        const order = {
          items: this.cart.map((prod) => {
            return {
              name: prod.name,
              amount: prod.orderedAmount,
              price: prod.price,
              img: prod.images[0],
              _id: prod._id,
              storeName: prod.storeName,
            }
          }),
          user: {
            name: this.$auth.user.name,
            tel: this.$auth.user.phone,
            address: this.$auth.user.address,
            payment: this.payment,
          },
          storeName: this.$auth.user.storeName,
        }
        await this.$axios.post('/orders', order)
        this.$store.commit('localStorage/emptyCart')
        this.$store.dispatch('showToast', {
          message: 'تم استقبال طلبك',
          type: 'success',
        })
        this.$router.push('/')
      } catch (error) {
        this.$store.dispatch('showToast', {
          message: error,
          type: 'danger',
        })
      }
    },
    removeFromCart(item) {
      this.$buefy.dialog.confirm({
        title: 'حذف منتج منتج الطلب',
        message: 'هل حقاً تريد حذف المنتج من الطلب؟',
        cancelText: 'إلغاء',
        confirmText: 'نعم',
        type: 'is-danger',
        onConfirm: () =>
          this.$store.commit('localStorage/removeFromCart', item),
      })
    },
  },
}
</script>

<style></style>
