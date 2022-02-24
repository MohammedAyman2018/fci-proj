<template>
  <div class="product-card">
    <div class="product-card--image">
      <img :src="product.images[0]" :alt="product.name" />
    </div>
    <section class="product-card--info">
      <div>
        <div class="product-card--info--header">
          <h2>{{ product.name }}</h2>

          <h4><i class="ri-store-fill ri-1x" /> {{ product.storeName }}</h4>
        </div>
        <!-- Add Link To One Store In Here -->
      </div>

      <div class="product-card--info-footer">
        <div>
          <nuxt-link to="/category">
            {{ product.category[0].name }}
          </nuxt-link>
          <p>{{ product.price }} جنيه</p>
        </div>
        <div>
          <button class="btn btn-success btn-square">
            <i class="ri-add-line ri-1x"></i>
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
  },
})
</script>

<style>
</style>
