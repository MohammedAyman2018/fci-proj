<template>
  <div v-if="store._id" class="container mx-2">
    <h2 class="has-text-weight-bold is-size-4 my-3">إحصائيات متجرك</h2>
    <div class="columns is-multiline">
      <!-- stats column -->
      <div class="column is-12 is-9-widescreen">
        <div class="columns is-multiline">
          <div class="column is-12-mobile is-6-tablet is-4-desktop">
            <div class="rate-card is-flex">
              <img width="100px" src="@/assets/rate.png" alt="rate" />
              <div
                class="is-flex is-flex-direction-column is-justify-content-space-between"
              >
                <h3 class="is-size-4 has-text-weight-bold">تقييم المتجر:</h3>
                <h2 class="is-size-3 has-text-weight-bold">
                  {{ store.actualRating }}
                </h2>
              </div>
            </div>
          </div>
          <div
            v-if="productsViews.length > 0"
            class="column is-12-mobile is-6-tablet is-4-desktop"
          >
            <div class="rate-card pink is-flex">
              <img width="100px" src="@/assets/vision.png" alt="views" />
              <div
                class="is-flex is-flex-direction-column is-justify-content-space-between"
              >
                <h3 class="is-size-5 has-text-weight-bold">
                  عدد زيارات المنتجات:
                </h3>
                <h2 class="is-size-3 has-text-weight-bold">
                  {{ productsViews[0].totalViews }}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <section>
          <h2 class="has-text-weight-bold is-size-4 my-3">
            عدد المنتجات في كل فئة
          </h2>
          <div class="columns is-multiline">
            <div
              v-for="(value, key, idx) in productsPerCategoryCount"
              :key="key + idx"
              class="column is-6-tablet is-4-desktop"
            >
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <h3 class="is-size-4 has-text-weight-semi-bold">
                      {{ key }}
                    </h3>
                    <p class="has-text-weight-bold">
                      {{ value > 0 ? `${value} منتج` : 'لا يوجد' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="columns is-multiline">
          <div
            v-for="list in mostProduct"
            :key="list.id"
            class="column is-12-mobile is-6-tablet is-4-desktop"
          >
            <b-collapse class="card" animation="slide" :aria-id="list.id">
              <template #trigger="props">
                <div
                  class="card-header"
                  role="button"
                  :aria-controls="list.id"
                  :aria-expanded="props.open"
                >
                  <p class="card-header-title">{{ list.title }}</p>
                  <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                  </a>
                </div>
              </template>

              <div class="card-content">
                <div class="content">
                  <div
                    v-for="prod in list.items"
                    :key="prod._id"
                    class="is-flex is-justify-content-space-between is-align-items-center my-3"
                  >
                    <nuxt-link
                      :to="`/store/product/${prod.name}`"
                      target="_blank"
                      class="m-0 p-0 trauncate-text"
                      >{{ prod.name }}</nuxt-link
                    >
                    <p class="m-0 p-0">
                      {{ prod[list.property] }}
                      <b-icon :icon="list.icon" class="mx-1" size="is-small" />
                    </p>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>

        <section>
          <h2 class="has-text-weight-bold is-size-4 my-3">تقييمات العملاء</h2>
          <rates-table :rates="store.rating" />
        </section>
      </div>
      <!-- finished products column -->
      <div class="column is-12 is-3-widescreen">
        <b-collapse
          class="card"
          animation="slide"
          aria-id="productsAboutToFinish"
        >
          <template #trigger="props">
            <div
              class="card-header"
              role="button"
              aria-controls="productsAboutToFinish"
              :aria-expanded="props.open"
            >
              <p class="card-header-title">منتنجات على وشك الإنتهاء</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
              </a>
            </div>
          </template>

          <div class="card-content">
            <div class="content">
              <div v-for="prod in productsAboutToFinish" :key="prod._id">
                <nuxt-link
                  :to="`/store/product/${prod.name}`"
                  target="_blank"
                  class="mb-2 p-0 is-block trauncate-text"
                >
                  {{ prod.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RatesTable from '~/components/tables/RatesTable.vue'

export default Vue.extend({
  components: { RatesTable },
  layout: 'admin',
  props: {
    storeName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      store: {},
      productsPerCategoryCount: [],
      productsViews: 0,
      mostViewedProducts: [],
      mostOrderedProducts: [],
      highestRatedProducts: [],
      productsAboutToFinish: [],
    }
  },
  computed: {
    mostProduct(): any[] {
      return [
        {
          title: 'أكثر المنتجات مشاهدة',
          id: 'mostViewedProducts',
          items: this.mostViewedProducts,
          property: 'views',
          icon: 'eye',
        },
        {
          title: 'أكثر المنتجات مشاهدة',
          id: 'mostOrderedProducts',
          items: this.mostOrderedProducts,
          property: 'ordered',
          icon: 'cart',
        },
        {
          title: 'أعلى المنتجات تقييما',
          id: 'highestRatedProducts',
          items: this.highestRatedProducts,
          property: 'actualRating',
          icon: 'star',
        },
      ]
    },
  },
  mounted() {
    this.getStore()
    this.getStats()
  },
  methods: {
    async getStore() {
      try {
        const store = await this.$axios.$get(
          `/stores/one/admin/${this.storeName}`
        )
        this.store = store
      } catch (error) {
        this.$store.dispatch('showToast', {
          message: error,
          type: 'error',
        })
      }
    },
    async getStats() {
      try {
        const res = await this.$axios.$get(`/dashboadrd/${this.storeName}`)
        this.productsPerCategoryCount = res.productsPerCategoryCount
        this.productsViews = res.productsViews
        this.mostViewedProducts = res.mostViewedProducts
        this.mostOrderedProducts = res.mostOrderedProducts
        this.highestRatedProducts = res.highestRatedProducts
        this.productsAboutToFinish = res.productsAboutToFinish
      } catch (error) {
        this.$store.dispatch('showToast', {
          message: error,
          type: 'error',
        })
      }
    },
  },
})
</script>

<style scoped>
.rate-card {
  background: #125b50;
  color: white;
  padding: 20px;
  border-radius: 10px;
}
.rate-card.pink {
  background: #ff6363;
}

.trauncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
}
</style>
