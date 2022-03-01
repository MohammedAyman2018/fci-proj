<template>
  <section class="container mx-auto">
    <div class="flex justify-between my-3 items-center">
      <h3 class="font-bold text-xl">السلة</h3>
      <nuxt-link
        v-if="cart.length > 0"
        class="btn btn-primary btn-sm"
        to="/store/products"
      >
        الذهاب لصفحة الشراء
      </nuxt-link>
    </div>
    <div v-if="cart.length > 0">
      <div
        class="
          grid grid-cols-1
          place-items-center
          lg:grid-cols-2
          xl:grid-cols-3
        "
      >
        <product-card
          v-for="product in cart"
          :key="product._id"
          :product="product"
        />
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
import ProductCard from '~/components/products/product-card.vue'
export default {
  name: 'CartPage',
  components: {
    ProductCard,
  },
  computed: {
    cart() {
      return this.$store.state.localStorage.cart
    },
  },
}
</script>

<style>
</style>
