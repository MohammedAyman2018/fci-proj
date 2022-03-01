<template>
  <p>
    {{ allOrders }}
  </p>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AllOrders',
  layout: 'admin',
  data() {
    return {
      allOrders: [],
    }
  },
  head() {
    return {
      title: 'الطلبيات',
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.$get(
        `/orders?storeName=${this.$route.params.storeName}`
      )
      this.allOrders = res
    } catch (error: any) {
      this.$notification('حدث خطأ ما', error.response.data.msg)
    }
  },
})
</script>
<style>
</style>
