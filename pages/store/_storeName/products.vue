<template>
  <div class="container mx-auto">
    <b-modal
      v-model="isComponentModalActive"
      style="z-index: 9999999"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="تقييم المتجر"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">تقييم المتجر</p>
            <button type="button" class="delete" @click="props.close" />
          </header>
          <section class="modal-card-body">
            <div class="p-4">
              <b-field label="ماهو تقييمك للمتجر">
                <b-rate v-model="rate" :rtl="true" />
              </b-field>
              <b-field label="رسالتك">
                <b-input
                  v-model="comment"
                  maxlength="200"
                  type="textarea"
                ></b-input>
              </b-field>
              <div
                class="is-flex is-justify-content-space-between is-align-items-center"
              >
                <b-button type="is-primary" size="is-small" @click="rateStore">
                  تقييم
                </b-button>
                <b-button
                  type="is-ghost"
                  size="is-small"
                  @click="isComponentModalActive = false"
                >
                  إلغاء
                </b-button>
              </div>
            </div>
          </section>
        </div>
      </template>
    </b-modal>
    <section v-if="store && store._id">
      <div
        class="is-flex is-justify-content-space-between is-align-items-center"
      >
        <h1 class="is-size-4 has-text-weight-bold my-4">
          متجر {{ $route.params.storeName }}
        </h1>
        <b-button
          v-if="$auth.loggedIn"
          type="is-primary"
          size="is-small"
          @click="isComponentModalActive = true"
        >
          تقييم المتجر
        </b-button>
      </div>
      <p class="my-2">{{ store.desc }}</p>
      <div class="columns is-multiline">
        <ul class="column is-12-mobile is-6-tablet is-4-desktop">
          <p class="has-text-weight-bold">وسائل التواصل</p>
          <li v-for="link in socialr" :key="link.key">
            <div v-if="store.social[link.key]">
              <i v-if="link.key !== 'tiktok'" :class="[`ri-${link.icon}`]"></i>
              <img
                v-else
                class="is-inline"
                width="18px"
                src="@/assets/tik-tok.png"
              />
              <a target="_blank" :href="store.social[link.key]">{{
                link.name
              }}</a>
            </div>
          </li>
        </ul>

        <ul class="column is-12-mobile is-6-tablet is-4-desktop">
          <p class="has-text-weight-bold">يعمل في</p>
          <li v-for="link in store.workOn" :key="link.name">
            <nuxt-link :to="`/store/category/${link.name}`">{{
              link.name
            }}</nuxt-link>
          </li>
        </ul>
      </div>
    </section>
    <products-page />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import productsPage from '~/components/products/productsPage.vue'
export default {
  components: { productsPage },
  data() {
    return {
      rate: 0,
      comment: '',
      isComponentModalActive: false,
      socialr: [
        { key: 'fb', name: 'فيس بوك', icon: 'facebook-circle-line' },
        { key: 'insta', name: 'انستجرام', icon: 'instagram-line' },
        { key: 'snap', name: 'سناب شات', icon: 'snapchat-line' },
        { key: 'tiktok', name: 'تيك توك', icon: 'tik-tok.png' },
        { key: 'twitter', name: 'تويتر', icon: 'twitter-line' },
        { key: 'yt', name: 'يوتيوب', icon: 'youtube-line' },
      ],
    }
  },
  head() {
    return {
      title: this.$route.params.storeName
        ? `منتجات متجر ${this.$route.params.storeName}`
        : 'منتجات متجر ',
    }
  },
  computed: {
    store() {
      return this.$store.state.stores.store
    },
  },
  async beforeMount() {
    try {
      await this.getStore(this.$route.params.storeName)
      await this.getStoreCategory(this.$route.params.storeName)
    } catch (error) {
      this.$store.dispatch('showToast', {
        message: error.response.data.msg,
        type: 'error',
      })
    }
  },
  methods: {
    ...mapActions({
      getStore: 'stores/getStore',
      getStoreCategory: 'categories/getStoreCategory',
    }),
    async rateStore() {
      try {
        await this.$axios.patch(`/stores/rate/${this.store._id}`, {
          rate: this.rate,
          userId: this.$auth.user._id,
          comment: this.comment,
        })
        this.isComponentModalActive = false
        this.rate = 0
        this.comment = ''
        this.$store.dispatch('showToast', {
          message: 'تم تقييم المتجر بنجاح',
          type: 'success',
        })
      } catch (error) {
        this.$store.dispatch('showToast', {
          message: error,
          type: 'error',
        })
      }
    },
  },
}
</script>

<style></style>
