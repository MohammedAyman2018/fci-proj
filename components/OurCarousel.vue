<template>
  <div>
    <h3 class="is-size-4 has-text-weight-bold">
      {{ title }}
    </h3>
    <hooper :settings="hooperSettings">
      <slide v-for="list in items" :key="list._id">
        <product-card class="mx-4" :product="list" />
      </slide>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide } from 'hooper'
import productCard from './products/product-card.vue'
import 'hooper/dist/hooper.css'
export default {
  components: { productCard, Hooper, Slide },
  props: {
    title: {
      type: String,
      default: () => '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      hooperSettings: {
        rtl: true,
        centerMode: false,
        breakpoints: {
          767: {
            itemsToShow: 1,
          },
          768: {
            itemsToShow: 2,
          },
          1000: {
            itemsToShow: 5,
          },
        },
      },
    }
  },
}
</script>

<style>
/* .story-carousel .story-carousel__slide {
  height: 200px;
  font-size: 18px;
  color: #fff;
}
.story-carousel--colors .story-carousel__slide:nth-child(n + 1) {
  background: #2e5c8a;
}
.story-carousel--colors .story-carousel__slide:nth-child(2n + 1) {
  background: #336699;
} */
</style>
