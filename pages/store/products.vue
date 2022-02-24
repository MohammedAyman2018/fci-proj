<template>
  <div>
    <section class="container mx-auto">
      <h1>تصفح المنتجات</h1>
      <div
        class="
          grid grid-cols-1
          place-items-center
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        <product-card
          v-for="product in products"
          :key="product.name"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IProduct from '@/interfaces/product'
import productCard from '~/components/products/product-card.vue'

export default Vue.extend({
  components: { productCard },
  name: 'ProductsPage',
  data() {
    return {
      products: [] as IProduct[],
    }
  },
  async beforeMount() {
    try {
      const res = await this.$axios.get<IProduct[]>('/products/all/stores')
      this.products = res.data
    } catch (error) {
      console.log(error)
    }
  },
})
/*
TODO:
  - POPULATE CATEGORY.
  - Save Cart.
  - Save this to the state.
  - Add sorting and filtering.
[
    "amount",
    "visible",
    "_id",
    "name",
    "images",
    "price",
    "desc",
    "category",
    "url",
    "views",
    "ordered",
    "rating",
    "createdAt",
    "updatedAt",
    "__v"
]
*/
</script>

