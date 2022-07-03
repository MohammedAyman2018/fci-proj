<template>
  <div class="container">
    <client-only>
      <Navbar />
    </client-only>
    <Nuxt />
    <nuxt-link class="contact-us" to="/contact-us">
      <img width="50px" src="@/assets/support.png" alt="تواصل معنا" />
    </nuxt-link>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'
export default {}
</script>

<style scoped>
.contact-us {
  position: fixed;
  bottom: 10px;
  right: 5%;
}
</style>
