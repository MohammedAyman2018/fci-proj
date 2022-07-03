<template>
  <stats-page :store-name="$route.params.storeName" />
</template>

<script>
import StatsPage from '~/components/admin/pages/StatsPage.vue'
export default {
  components: { StatsPage },
}
</script>

<style></style>
