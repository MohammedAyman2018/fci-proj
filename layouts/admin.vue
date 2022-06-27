<template>
  <div class="container">
    <client-only>
      <Navbar />
    </client-only>
    <Nuxt />
    <!-- <client-only>
      <side-bar />
    </client-only> -->
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'
export default {
  name: 'AdminLayout',
  middleware: ['admins'],
}
</script>
