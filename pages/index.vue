<template>
  <div class="banner">
    <img class="bg" src="@/assets/topography.svg" alt="" />
    <div class="h-screen grid grid-cols-1 md:grid-cols-2">
      <div class="flex justify-center items-center">
        <div>
          <h3 class="text-4xl mb-3 font-bold">
            جميع الأدوات التي تحتاجها لبناء متجر ناجح
          </h3>
          <p class="text-xl font-semibold">
            امتلك متجر احترافي بأقل التكاليف وبدون عمولة على المبيعات
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <img
          width="60%"
          src="@/assets/undraw_world_re_768g.svg"
          alt="انشئ موقعك واحظ بعملاء حول العالم"
        />
      </div>
    </div>

    <WhyUs />

    <OurFeatures />

    <contact-us />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WhyUs from '@/components/Home/WhyUs.vue'
import OurFeatures from '@/components/Home/OurFeatures.vue'
import ContactUs from '~/components/Home/ContactUs.vue'
export default Vue.extend({
  components: {
    WhyUs,
    OurFeatures,
    ContactUs,
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
