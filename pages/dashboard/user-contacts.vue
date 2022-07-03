<template>
  <div class="container mx-auto px-2">
    <div
      class="is-justify-content-space-between is-flex is-align-items-center my-3"
    >
      <h2 class="is-size-3 has-text-weight-bold">شكاوى العملاء</h2>
    </div>
    <complains-table :rates="rates" @updateComplains="getComplains" />
  </div>
</template>

<script>
import ComplainsTable from '~/components/tables/ComplainsTable.vue'
export default {
  name: 'UsersComplainsPage',
  components: { ComplainsTable },
  data() {
    return {
      rates: [],
    }
  },
  mounted() {
    this.getComplains()
  },
  methods: {
    async getComplains() {
      try {
        const res = await this.$axios.get('/contactUs')
        this.rates = res.data
      } catch (error) {
        this.$store.dispatch('showToast', {
          message: error,
          type: 'error',
        })
      }
    },
  },
}
</script>

<style></style>
