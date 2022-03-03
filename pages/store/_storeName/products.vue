<template>
  <div class="container mx-auto">
    <section>
      <h1 class="text-xl font-bold my-4">متجر {{ $route.params.storeName }}</h1>
      <p class="my-2">{{ store.desc }}</p>
      <ul>
        <p class="font-bold">وسائل التواصل</p>
        <li v-for="link in social" :key="link.key">
          <i v-if="link.key !== 'tiktok'" :class="[`ri-${link.icon}`]"></i>
          <img v-else class="inline" width="18px" src="@/assets/tik-tok.png" />
          {{ link.name }}
        </li>
      </ul>
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
      social: [
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
      await this.getStoreProducts(this.$route.params.storeName)
      await this.getStoreCategory(this.$route.params.storeName)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions({
      getStore: 'stores/getStore',
      getStoreProducts: 'products/getStoreProducts',
      getStoreCategory: 'categories/getStoreCategory',
    }),
  },
}
</script>

<style>
</style>
