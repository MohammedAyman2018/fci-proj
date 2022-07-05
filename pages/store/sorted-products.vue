<template>
  <div>
    <products-page />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import productsPage from '~/components/products/productsPage.vue'
export default {
  components: { productsPage },
  head() {
    return {
      title: 'كل المنتجات',
    }
  },
  async beforeMount() {
    try {
      await this.getAllProducts(this.$route.query.sort)
      await this.getAllCategory()
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions({
      getAllProducts: 'products/getSortedProducts',
      getAllCategory: 'categories/getCategories',
    }),
  },
}
</script>

<style></style>
