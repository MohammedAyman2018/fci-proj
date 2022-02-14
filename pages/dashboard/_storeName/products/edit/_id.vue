<template>
  <products-form :old-product="product" />
</template>

<script lang="ts">
import Vue from 'vue'
import ProductsForm from '~/components/admin/forms/ProductsForm.vue'
export default Vue.extend({
  name: 'EditProductPage',
  components: { ProductsForm },
  layout: 'admin',
  data() {
    return {
      product: {},
    }
  },
  head() {
    return {
      title: 'تعديل منتج',
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.$get(`/products/${this.$route.params.id}`)
      res.images = res.images.map((x, idx) => {
        return { name: x + idx, url: x }
      })
      this.product = res
    } catch (error) {
      this.$notify({
        group: 'foo',
        type: 'error',
        title: error,
      })
    }
  },
})
</script>

<style>
</style>
