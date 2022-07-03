<template>
  <div class="card">
    <b-tag v-if="product.hasOffer" type="is-success is-light">
      <bdi>-{{ product.offerAmount }}% </bdi>
    </b-tag>
    <div class="card-image">
      <b-carousel
        v-if="product.category"
        :autoplay="false"
        :arrow="false"
        :indicator="false"
      >
        <b-carousel-item v-for="(item, i) in product.images" :key="i">
          <b-image lazy ratio="1by1" :src="item" />
        </b-carousel-item>
      </b-carousel>
      <b-carousel v-else :autoplay="false" :arrow="false" :indicator="false">
        <b-carousel-item>
          <b-image lazy ratio="1by1" :src="product.img" />
        </b-carousel-item>
      </b-carousel>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p
            class="has-text-weight-semibold is-size-6"
            style="cursor: pointer"
            :class="{ 'trauncate-text': !!product.category }"
            @click="goToProduct"
          >
            {{ product.name }}
          </p>
          <p class="subtitle is-6">
            <nuxt-link :to="`/store/${product.storeName}/products`">
              <i class="ri-store-fill ri-1x" />
              {{ product.storeName }}
            </nuxt-link>
          </p>
        </div>
      </div>

      <div class="content">
        <div class="product-card--info-footer">
          <div v-if="product.category">
            <nuxt-link :to="`/store/category/${product.category.name}`">
              {{ product.category.name }}
            </nuxt-link>
            <p class="is-size-6-tablet">
              {{
                product.hasOffer
                  ? Math.ceil(
                      product.price -
                        product.price * (product.offerAmount / 100)
                    ).toFixed(2)
                  : product.price
              }}
              جنيه
            </p>
          </div>
          <div v-if="product.category">
            <b-rate
              size="is-small"
              :value="product.actualRating"
              disabled
            ></b-rate>
            <div class="is-flex is-justify-content-end is-align-items-center">
              <b-tooltip
                :label="
                  checkInFav(product._id) ? 'حذف من المفضلة' : 'أضف للمفضلة'
                "
              >
                <b-button
                  type="is-danger is-light"
                  :icon-left="
                    checkInFav(product._id) ? 'cards-heart' : 'heart-outline'
                  "
                  @click="addToFav(product._id)"
                />
              </b-tooltip>
              <b-tooltip
                :label="inCart(product) ? 'حذف من السلة' : 'أضف للسلة'"
              >
                <b-button
                  :icon-left="inCart(product) ? 'cart-minus' : 'cart-plus'"
                  class="mx-1"
                  @click="
                    inCart(product)
                      ? removeFromCart(product)
                      : addToCart(product)
                  "
                />
              </b-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    idx: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    checkInFav() {
      const vm = this
      return function (itemId) {
        if (!vm.$auth.loggedIn) return false
        return vm.$auth && vm.$auth.user && Array.isArray(vm.$auth.user.fav)
          ? vm.$auth.user.fav.includes(itemId)
          : false
      }
    },
    inCart() {
      const vm = this
      return function (item) {
        const existing = vm.$store.state.localStorage.cart.find(
          (x) => x._id === item._id
        )
        return existing && existing._id
      }
    },
  },
  methods: {
    addToCart(item) {
      this.$store.commit('localStorage/addToCart', {
        ...item,
        orderedAmount: 1,
      })
      this.$store.dispatch('showToast', {
        message: 'تمت الإضافة للسلة',
        type: 'success',
      })
    },
    addToFav(itemId) {
      this.$store.dispatch('products/addAndRemoveFromFav', itemId)
    },
    removeFromCart(item) {
      this.$store.commit('localStorage/removeFromCart', item)
      this.$store.dispatch('showToast', {
        message: 'تم الحذف من السلة',
        type: 'success',
      })
    },
    goToProduct() {
      this.$store.commit('localStorage/setSingleProductId', this.product._id)
      this.$router.push(
        `/store/product/${
          this.product.url && this.product.url.length > 0
            ? this.product.url
            : this.product.name
        }`
      )
    },
  },
})
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
}
.card .tag {
  position: absolute;
  z-index: 999;
  left: 10%;
  top: 10px;
}
.product-card--info-footer {
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;
}

.product-card--info-footer a,
.card-content .subtitle a {
  color: gray;
  font-size: 12px;
}

.trauncate-text {
  white-space: nowrap;
  overflow: hidden;
  width: 60%;
  text-overflow: ellipsis;
}
</style>
