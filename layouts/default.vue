<template>
  <div>
    <client-only>
      <Navbar />
    </client-only>

    <div class="container mx-auto">
      <div class="grid lg:gap-3 lg:grid-cols-4">
        <div class="lg:col-span-4 grid grid-cols-1">
          <Nuxt />
        </div>
      </div>
    </div>
    <notifications group="foo" position="top right" />
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'
// import Navbar from '~/components/Navbar.vue'
export default {
  // components: { Navbar },
}
</script>
