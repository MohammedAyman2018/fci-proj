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
        to="/store/order"
      >
        الذهاب لصفحة الشراء
      </b-button>
    </div>
    <div v-if="cart.length > 0">
      <div class="columns is-multiline">
        <div
          v-for="product in products"
          :key="product._id"
          class="column is-12 mb-3"
        >
          <!-- <product-card :product="product" /> -->
          <div class="columns box">
            <div class="column is-3">
              <img
                style="width: 100px; height: 100px; border-raduis: 10px"
                :src="product.images[0]"
                :alt="product.name"
              />
            </div>
            <div class="column">
              <h4 class="is-size-4">{{ product.name }}</h4>
              <p class="is-size-6">
                <b-field label="الكمية:">
                  <b-numberinput
                    v-model="product.amount"
                    min="1"
                    :max="product.amount.available"
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
    <div v-else class="flex flex-col justify-center items-center">
      <p class="font-semibold mb-4 text-center">لا يوجد منتجات في السلة بعد</p>
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
    }
  },
  // components: {
  //   // ProductCard,
  // },
  computed: {
    cart() {
      return this.$store.state.localStorage.cart
    },
  },
  mounted() {
    this.products = JSON.parse(JSON.stringify(this.cart))
  },
}
</script>

<style></style>
