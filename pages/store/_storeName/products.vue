<template>
  <div class="container mx-auto">
    <section v-if="store && store._id">
      <h1 class="text-xl font-bold my-4">متجر {{ $route.params.storeName }}</h1>
      <p class="my-2">{{ store.desc }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ul>
          <p class="font-bold">وسائل التواصل</p>
          <li v-for="link in socialr" :key="link.key">
            <div v-if="store.social[link.key]">
              <i v-if="link.key !== 'tiktok'" :class="[`ri-${link.icon}`]"></i>
              <img
                v-else
                class="inline"
                width="18px"
                src="@/assets/tik-tok.png"
              />
              <a target="_blank" :href="store.social[link.key]">{{
                link.name
              }}</a>
            </div>
          </li>
        </ul>

        <ul>
          <p class="font-bold">يعمل في</p>
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
