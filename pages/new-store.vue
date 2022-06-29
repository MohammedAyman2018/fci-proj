<template>
  <div class="banner">
    <!-- <img class="bg" src="@/assets/topography.svg" alt="" /> -->

    <Success v-if="storeSuccess" />

    <p v-if="storeEdit" class="text-2xl text-center my-5">
      للأسف لم يتم قبول متجرك للسبب التالي: {{ theStore.rejectMessage }}. لكن لا
      تقلق يمكنك دائماً التقديم مرة أخرى
    </p>

    <div
      v-if="!showNotReviewedMessage && !storeSuccess"
      class="is-flex items-center"
    >
      <div class="">
        <div class="columns">
          <div class="column is-hidden-touch is-6-desktop">
            <video autoplay loop="true" width="100%" height="100%">
              <source src="@/assets/videos/sign up.mp4" type="video/mp4" />

              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
          <div
            class="column is-6-desktop is-flex is-align-items-center is-justify-content-center p-6"
          >
            <div class="w-full">
              <h1 class="mb-4 is-size-3 has-text-weight-bold">انشئ متجرك</h1>

              <new-store-form
                :show-not-reviewed-message="showNotReviewedMessage"
                :store-success="storeSuccess"
                :store-edit="storeEdit"
                :the-store="theStore"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!storeSuccess || showNotReviewedMessage">
      <p class="has-text-centered is-size-3 mt-4">
        المتجر تحت المراجعة برجاء الانتظار
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Success from '@/components/NewStore/success.vue'

export default Vue.extend({
  name: 'CreateStore',
  components: {
    Success,
  },
  data() {
    return {
      showNotReviewedMessage: false,
      theStore: null,
      storeSuccess: false,
      storeEdit: false,
    }
  },
  head() {
    return {
      title: 'إنشئ متجرك',
    }
  },
  async mounted() {
    if (!this.$auth.loggedIn) return this.$router.push('/login')
    const validateStore = await this.$axios.$get('/stores/check-if-validate')
    if (validateStore === null) return
    if (validateStore.reviewed && validateStore.approved) {
      this.theStore = validateStore
      this.$store.commit('stores/setStore', validateStore)
      if (this.$auth.user.role !== 'owner') {
        await this.$auth.logout()
        this.$store.dispatch('showToast', {
          message: 'تم قبول متجرك رجاء تسجيل الدخول مرة أخرى.',
          type: 'success',
        })
      }
      this.storeSuccess = true
    } else if (validateStore.reviewed && !validateStore.approved) {
      this.theStore = validateStore
      this.storeEdit = true
    } else if (!validateStore.reviewed) {
      this.showNotReviewedMessage = true
    }
  },
})
</script>

<style scoped>
.banner {
  @apply relative h-screen;
}
.banner img.bg {
  z-index: -1;
  @apply w-full h-full absolute top-0 left-0 object-cover opacity-10;
}
</style>
