<template>
  <div>
    <div class="filter drawer-content">
      <!-- Page content here -->
      <label for="my-drawer-4" class="btn btn-circle drawer-button">
        <i class="ri-filter-2-line" />
      </label>
    </div>

    <categories-menu />
    <section class="container mx-auto">
      <h1 class="text-xl font-bold my-4">تصفح المنتجات</h1>
      <div
        v-if="displayedProducts.length > 0"
        class="
          grid
          justify-items-center
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        <product-card
          v-for="product in displayedProducts"
          :key="product._id"
          :product="product"
        />
      </div>
      <div v-else>
        <p class="text-center">لايوجد منتجات تحت هذه الفئة</p>
      </div>
    </section>
  </div>
</template>

<script>
import productCard from '~/components/products/product-card.vue'
import CategoriesMenu from '~/components/products/CategoriesMenu.vue'
export default {
  name: 'ProductsPage',
  components: { productCard, CategoriesMenu },
  computed: {
    products() {
      return this.$store.state.products.products
    },
    displayedProducts() {
      return this.$store.state.products.displayedProducts
    },
  },
  destroyed() {
    this.$store.dispatch('products/reset')
    this.$store.dispatch('categories/reset')
  },
}
</script>


<style scoped>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.2s;
  max-height: 230px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
