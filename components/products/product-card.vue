<template>
  <div class="product-card">
    <button
      v-if="checkInFav(product._id)"
      v-tooltip="'حذف من المفضلة'"
      class="like-btn btn btn-circle"
      @click="addToFav(product._id)"
    >
      <i class="ri-dislike-line ri-2x"></i>
    </button>
    <button
      v-else
      v-tooltip="'أضف للمفضلة'"
      class="like-btn btn btn-circle bg-red-600 hover:bg-red-600"
      @click="addToFav(product._id)"
    >
      <i class="ri-heart-line ri-2x"></i>
    </button>
    <div class="product-card--image">
      <img :src="product.images[0]" :alt="product.name" />
    </div>
    <section class="product-card--info">
      <div class="product-card--info--header">
        <h2>{{ product.name }}</h2>
        <nuxt-link :to="`/store/${product.storeName}/products`">
          <i class="ri-store-fill ri-1x" />
          {{ product.storeName }}
        </nuxt-link>
      </div>
      <!-- Add Link To One Store In Here -->

      <div class="product-card--info-footer">
        <div>
          <nuxt-link to="/category">
            {{ product.category.name }}
          </nuxt-link>
          <p>{{ product.price }} جنيه</p>
        </div>
        <div>
          <div>
            <i class="ri-star-fill ri-1x text-yellow-500"></i>
            <span>{{ product.rate || 0 }}</span>
          </div>
          <button
            v-if="!inCart(product)"
            v-tooltip="'أضف للسلة'"
            class="btn btn-success btn-sm btn-square"
            @click="addToCart(product)"
          >
            <i class="ri-add-line ri-1x"></i>
          </button>
          <button
            v-else
            v-tooltip="'حذف من السلة'"
            class="btn btn-success btn-sm btn-square"
            @click="removeFromCart(product)"
          >
            <i class="ri-close-fill ri-1x"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ProductsCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    checkInFav() {
      const vm = this
      return function (itemId) {
        if (!vm.$auth.loggedIn) return false
        return vm.$auth && vm.$auth.user && Array.isArray(vm.$auth.user.fav)
          ? vm.$auth.user.fav.includes(itemId)
          : false
      }
    },
    inCart() {
      const vm = this
      return function (item) {
        const existing = vm.$store.state.localStorage.cart.find(
          (x) => x._id === item._id
        )
        return existing && existing._id
      }
    },
  },
  methods: {
    addToCart(item) {
      this.$store.commit('localStorage/addToCart', { ...item, amount: 1 })
    },
    addToFav(itemId) {
      this.$store.dispatch('products/addAndRemoveFromFav', itemId)
    },
    removeFromCart(item) {
      this.$store.commit('localStorage/removeFromCart', item)
    },
  },
})
</script>

<style>
</style>
