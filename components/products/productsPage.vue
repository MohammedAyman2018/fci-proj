<template>
  <div>
    <b-button class="filter-btn" rounded @click="openSidebar = true">
      <b-icon icon="filter" />
    </b-button>
    <categories-menu :open-sidebar="openSidebar" @close="openSidebar = false" />

    <section class="container mx-auto">
      <h1 class="is-size-4 has-text-weight-bold my-4">تصفح المنتجات</h1>

      <div v-if="displayedProducts.length > 0">
        <div class="columns is-multiline flex-wrap">
          <div
            v-for="product in displayedProducts"
            :key="product._id"
            class="column is-one-quarter"
          >
            <product-card :product="product" />
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-half">
            <b-pagination
              v-model="current"
              order="is-centered"
              class="mb-4"
              :total="products.length"
              :range-before="3"
              :range-after="1"
              :per-page="10"
              aria-next-label="الصفحة التالية"
              aria-previous-label="الصفحة السابقة"
              aria-page-label="صفحة"
              aria-current-label="الصفحة الحالية"
              @change="paginate"
            >
            </b-pagination>
          </div>
        </div>
      </div>

      <div v-else>
        <p class="has-text-centered">لايوجد منتجات تحت هذه الفئة</p>
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
  data() {
    return {
      openSidebar: false,
      current: 1,
    }
  },
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
  methods: {
    paginate(toPage) {
      this.$store.commit('products/paginate', {
        toPage,
      })
    },
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

.filter-btn {
  position: fixed;
  bottom: 10%;
  z-index: 9999;
  left: 10%;
}
</style>
