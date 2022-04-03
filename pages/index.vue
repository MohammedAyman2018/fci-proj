<template>
  <div class="banner">
    <img class="bg" src="@/assets/topography.svg" alt="" />
    <div class="h-screen grid grid-cols-1 md:grid-cols-2">
      <div class="flex justify-center items-center">
        <div>
          <h3 class="text-center md:text-start text-4xl mb-3 font-bold">
            هنساعدك تنقل شغلك على النت
          </h3>
          <p class="text-center md:text-start text-xl font-semibold">
            مع السوق الإلكتروني انسى استغلال التجار واختار بين كل الاسعار اللي في السوق
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <img
          width="60%"
          class="rounded-xl"
          src="@/assets/story_2.jpg"
          alt="انشئ موقعك واحظ بعملاء حول العالم"
        />
      </div>
    </div>

    <WhyUs />

    <OurFeatures />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WhyUs from '@/components/Home/WhyUs.vue'
import OurFeatures from '@/components/Home/OurFeatures.vue'
export default Vue.extend({
  components: {
    WhyUs,
    OurFeatures,
  },
})
</script>


<style scoped>
.banner {
  @apply relative;
}
.banner img.bg {
  z-index: -1;
  @apply w-full h-full absolute top-0 left-0 object-cover opacity-10;
}
</style>
