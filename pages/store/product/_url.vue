<template>
  <div v-if="product._id" class="content mt-11">
    <div class="columns">
      <div class="column is-one-quarter-desktop">
        <div class="carousel">
          <b-carousel :autoplay="false">
            <b-carousel-item v-for="(item, i) in product.images" :key="i">
              <b-image lazy ratio="1by1" :src="item" />
            </b-carousel-item>
          </b-carousel>
        </div>
      </div>

      <div class="column is-three-quarters-desktop">
        <div
          class="is-flex is-justify-content-space-between is-align-items-center"
        >
          <h1 v-text="product.name" />
          <b-tooltip
            :label="checkInFav(product._id) ? 'حذف من المفضلة' : 'أضف للمفضلة'"
          >
            <b-button
              type="is-danger is-light"
              :icon-left="
                checkInFav(product._id) ? 'cards-heart' : 'heart-outline'
              "
              @click="addToFav(product._id)"
            />
          </b-tooltip>
        </div>
        <div
          class="is-flex is-justify-content-space-between is-align-items-center"
        >
          <p>
            الفئة:
            <nuxt-link
              :to="`/store/category/${product.category.name}`"
              v-text="product.category.name"
            />
          </p>
          <nuxt-link :to="`/store/${product.storeName}/products`">
            <i class="ri-store-fill ri-1x" />
            {{ product.storeName }}
          </nuxt-link>
        </div>
        <div
          class="is-flex is-justify-content-space-between is-align-items-center"
        >
          <b-field>
            <b-numberinput
              v-model="amount"
              min="1"
              :max="product.amount.available"
            />
          </b-field>
          <div>
            <h2
              v-if="product.hasOffer"
              style="color: #c90000; text-decoration: line-through"
            >
              {{ product.price }} ج.م
            </h2>
            <h2>
              {{
                product.hasOffer
                  ? Math.ceil(
                      product.price -
                        product.price * (product.offerAmount / 100)
                    ).toFixed(2)
                  : product.price
              }}
              ج.م
            </h2>
          </div>
        </div>
        <b-button
          class="mb-4"
          type="is-success"
          @click="
            inCart(product) ? removeFromCart(product) : addToCart(product)
          "
        >
          {{ inCart(product) ? 'حذف من السلة' : 'أضف للسلة' }}
        </b-button>

        <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
          <template #trigger="props">
            <div
              class="card-header"
              role="button"
              aria-controls="contentIdForA11y3"
              :aria-expanded="props.open"
            >
              <p class="card-header-title">تفاصيل المنتج</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
              </a>
            </div>
          </template>

          <div class="card-content">
            <div class="content">
              {{ product.desc }}
            </div>
          </div>
        </b-collapse>

        <h3>التعليقات:</h3>
        <article
          v-for="coment in product.rating"
          :key="coment._id"
          class="media"
        >
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ coment.userId.name }}</strong>
                <small>
                  <b-rate v-model="coment.rate" :rtl="true" disabled />
                </small>
                <br />
                {{ coment.comment }}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"
                    ><i class="fas fa-reply"></i
                  ></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small"
                    ><i class="fas fa-retweet"></i
                  ></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small"
                    ><i class="fas fa-heart"></i
                  ></span>
                </a>
              </div>
            </nav>
          </div>
        </article>

        <article class="media">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea
                  v-model="comment"
                  class="textarea"
                  placeholder="اضف تعليقك..."
                />
              </p>
            </div>
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <b-button
                    type="is-info"
                    :disabled="!comment || !productRate"
                    class="button is-info"
                    @click="rateProduct"
                    >أضف تعليقك</b-button
                  >
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <b-rate v-model="productRate"></b-rate>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleProductPage',
  data() {
    return {
      product: {},
      amount: 1,
      productRate: 1,
      comment: '',
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
    inCart() {
      const vm = this
      return function (item) {
        const existing = vm.$store.state.localStorage.cart.find(
          (x) => x._id === item._id
        )
        return existing && existing._id
      }
    },
    checkInFav() {
      const vm = this
      return function (itemId) {
        if (!vm.$auth.loggedIn) return false
        return vm.$auth && vm.$auth.user && Array.isArray(vm.$auth.user.fav)
          ? vm.$auth.user.fav.includes(itemId)
          : false
      }
    },
  },
  async beforeMount() {
    await this.getProduct()
  },
  methods: {
    async getProduct() {
      const product = await this.$store.dispatch(
        'products/getProduct',
        this.singleProductId
      )
      this.product = product
    },
    addToCart(item) {
      this.$store.commit('localStorage/addToCart', {
        ...item,
        amount: this.amount,
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
    async rateProduct() {
      if (!this.$auth.loggedIn) {
        this.$store.dispatch('showToast', {
          message: 'سجل دخول اولاً',
          type: 'error',
        })
        return
      }
      try {
        await this.$axios.post(`/products/rate/${this.singleProductId}`, {
          rate: this.productRate,
          userId: this.$auth.user._id,
          comment: this.comment,
        })
        this.getProduct()
        this.productRate = this.product.actualRating
        this.comment = ''
        this.$store.dispatch('showToast', {
          message: 'شكراً على تقييمك',
          type: 'success',
        })
      } catch (error) {
        this.$store.dispatch('showToast', {
          message: `حدث خطأ ما ${error}`,
          type: 'error',
        })
      }
    },
  },
}
</script>

<style scoped>
.carousel {
  max-height: 300px !important;
}
.carousel * {
  max-height: 300px !important;
}
</style>
