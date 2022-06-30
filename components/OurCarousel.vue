<template>
  <div class="my-3">
    <div
      class="is-flex is-justify-content-space-between is-align-items-center mb-3"
    >
      <h3 class="is-size-4 has-text-weight-bold">
        {{ title }}
      </h3>
      <b-button tag="router-link" type="is-ghost" size="is-small" :to="link">
        مشاهدة المزيد
      </b-button>
    </div>
    <hooper :settings="hooperSettings">
      <slide v-for="list in items" :key="list._id" class="mb-2">
        <product-card class="mx-4" :product="list" />
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import productCard from './products/product-card.vue'
import 'hooper/dist/hooper.css'
export default {
  components: { productCard, Hooper, Slide, HooperNavigation },
  props: {
    link: {
      type: String,
      default: () => '',
    },
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
        mouseDrag: false,
        wheelControl: false,
        trimWhiteSpace: true,
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
