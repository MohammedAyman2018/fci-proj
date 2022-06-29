<template>
  <section class="container mx-auto">
    <div
      class="is-flex is-justify-content-space-between my-5 is-align-items-center"
    >
      <h3 class="font-bold text-xl">السلة</h3>
      <b-button
        v-if="cart.length > 0"
        type="is-primary"
        tag="router-link"
        :disabled="isError"
        to="/store/order"
      >
        الذهاب لصفحة الشراء
      </b-button>
    </div>
    <div v-if="cart.length > 0">
      <div class="columns is-multiline">
        <div
          v-for="(product, idx) in products"
          :key="product._id"
          class="column is-12 mb-3"
        >
          <!-- <product-card :product="product" /> -->
          <div class="columns box">
            <div class="column is-3">
              <b-button size="is-small" @click="removeFromCart(product)">
                x
              </b-button>
              <img
                style="width: 100px; height: 100px; border-raduis: 10px"
                :src="product.images[0]"
                :alt="product.name"
              />
            </div>
            <div class="column">
              <h4 class="is-size-4">{{ product.name }}</h4>
              <p class="is-size-6">
                <b-field
                  label="الكمية:"
                  :validation-message="`يجب أن تكون الكمية بين 1 و ${product.amount.available}`"
                >
                  <b-numberinput
                    v-model="product.orderedAmount"
                    min="1"
                    :max="product.amount.available"
                    @input="testIt(idx, product)"
                  />
                </b-field>
              </p>
            </div>
            <div class="column is-3">
              <h4 class="is-size-4">{{ product.price }} جنيه</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
    >
      <p class="has-text-weight-semibold mb-4 has-text-centered">
        لا يوجد منتجات في السلة بعد
      </p>
      <nuxt-link class="btn btn-primary" to="/store/products">
        تصفح منتجاتنا
      </nuxt-link>
    </div>
  </section>
</template>

<script>
// import ProductCard from '~/components/products/product-card.vue'
export default {
  name: 'CartPage',
  data() {
    return {
      products: [],
      isError: false,
    }
  },
  computed: {
    cart() {
      return this.$store.state.localStorage.cart
    },
  },
  mounted() {
    this.products = JSON.parse(JSON.stringify(this.cart))
  },
  methods: {
    testIt(idx, item) {
      this.isError = item.orderedAmount > item.amount.available
      if (this.isError) return
      this.$store.commit('localStorage/editAmount', {
        idx,
        amount: item.orderedAmount,
      })
    },
    removeFromCart(item) {
      this.$store.commit('localStorage/removeFromCart', item)
      this.products = JSON.parse(JSON.stringify(this.cart))
      this.$store.dispatch('showToast', {
        message: 'تم الحذف من السلة',
        type: 'success',
      })
    },
  },
}
</script>

<style></style>
