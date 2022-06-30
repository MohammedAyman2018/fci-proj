<template>
  <div class="container mx-auto">
    <section v-if="store && store._id">
      <div
        class="is-flex is-justify-content-space-between is-align-items-center"
      >
        <h1 class="is-size-4 has-text-weight-bold my-4">
          متجر {{ $route.params.storeName }}
        </h1>
        <b-button type="is-primary" size="is-small"> تقييم المتجر </b-button>
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
          <li v-for="link in store.workOn" :key="link">
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
  },
}
</script>

<style></style>
