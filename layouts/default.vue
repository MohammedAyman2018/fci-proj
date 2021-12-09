<template>
  <div>
    <Navbar />
    <Nuxt />
    <notifications group="foo" position="top right" />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
export default {
  components: { Navbar },
}
</script>
