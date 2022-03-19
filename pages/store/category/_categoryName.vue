<template>
  <div class="container mx-auto">
    <products-page />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import productsPage from '~/components/products/productsPage.vue'
export default {
  components: { productsPage },
  data() {
    return {}
  },
  head() {
    return {
      title: this.$route.params.storeName
        ? `منتجات فئة ${this.$route.params.storeName}`
        : 'منتجات متجر ',
    }
  },
  computed: {
    store() {
      return this.$store.state.stores.store
    },
  },
  async beforeMount() {
    try {
      await this.getCategoryProducts(this.$route.params.categoryName)
      await this.getStoreCategory(this.$route.params.storeName)
    } catch (error) {
      this.$store.dispatch('showToast', {
        message: error.response.data.msg,
        type: 'error',
      })
    }
  },
  methods: {
    ...mapActions({
      getCategoryProducts: 'products/getCategoryProducts',
      getStoreCategory: 'categories/getStoreCategory',
    }),
  },
}
</script>

<style></style>
