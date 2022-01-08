<template>
  <div class="container mx-auto px-2">
    <div class="justify-between flex items-center my-3">
      <h2 class="text-2xl mb-3">كل المنتجات</h2>
      <button
        class="btn btn-primary btn-sm"
        @click="
          $router.push(`/dashboard/${$route.params.storeName}/products/add`)
        "
      >
        أضف منتج
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IProduct from '@/interfaces/product'

export default Vue.extend({
  name: 'ProductPage',
  data() {
    return {
      product: {} as IProduct,
      edit: false,
    }
  },
  methods: {
    openModal(modalName, product) {
      this.product = product
      this.$modal.show(modalName)
    },
    async getProducts() {
      await this.$axios.$get('/products').catch((err) => {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: err,
        })
      })
    },

    async removeCategory() {
      try {
        await this.$axios.$delete(`/products/${this.product._id}`)
        await this.getProducts()
        this.closeModal('delete-product')
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تم حذف الفئة بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },

    closeModal(modalName) {
      this.product = {} as IProduct
      this.edit = true
      this.$modal.hide(modalName)
    },
  },
})
</script>

<style scoped>
</style>
