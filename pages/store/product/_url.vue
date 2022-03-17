<template>
  <div v-if="product._id" class="mt-14">
    <div class="grid grid-cols-12">
      <div class="col-span-3">
        <div class="carousel-wrapper">
          <VueSlickCarousel v-bind="slickOptions">
            <div v-for="i in product.images" :key="i" class="img-wrapper">
              <img :src="i" />
            </div>
          </VueSlickCarousel>
        </div>
      </div>

      <div class="col-span-9">
        <h3 class="text-4xl font-bold" v-text="product.name" />
        <p class="text-xl font-bold">{{ product.price }} جنيه</p>
        <p>
          الفئة:
          <nuxt-link
            :to="`/store/category/${product.category.name}`"
            v-text="product.category.name"
          />
        </p>
      </div>
    </div>
    {{ singleProductId }}
  </div>
</template>

<script>
export default {
  name: 'SingleProductPage',
  data() {
    return {
      product: {},
      slickOptions: {
        slidesToShow: 1,
        arrows: true,
        center: true,
      },
    }
  },
  head() {
    return {
      title: this.$route.params.url,
    }
  },
  computed: {
    singleProductId() {
      return this.$store.state.localStorage.singleProductId
    },
  },
  async beforeMount() {
    const x = await this.$store.dispatch(
      'products/getProduct',
      this.singleProductId
    )
    this.product = x
  },
}
</script>

<style></style>
