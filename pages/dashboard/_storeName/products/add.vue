<template>
  <products-form />
</template>

<script lang="ts">
import Vue from 'vue'
import ProductsForm from '~/components/admin/forms/ProductsForm.vue'
export default Vue.extend({
  name: 'AddProductPage',
  components: { ProductsForm },
  layout: 'admin',
  head() {
    return {
      title: 'إضافة منتج',
    }
  },
})
</script>

<style>
</style>
