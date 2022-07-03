<template>
  <div v-if="order" class="container mx-auto my-3">
    <section>
      <h2 class="is-size-3 has-text-weight-bold">تفاصيل الطلب</h2>

      <div>
        <b-field label="الحالة">
          <b-select v-model="newState" expanded>
            <option v-for="option in orderStates" :key="option" :value="option">
              {{ option }}
            </option>
          </b-select>
        </b-field>

        <b-button
          type="is-primary"
          class="btn btn-primary"
          :disabled="newState === order.state"
          @click="updateState"
        >
          تعديل الطلب
        </b-button>
      </div>
    </section>

    <section v-if="order && order.user">
      <h4 class="is-size-4 has-text-weight-bold mt-3">العميل:</h4>

      <div
        class="is-flex is-flex-wrap-wrap is-flex-direction-col is-flex-direction-col-desktop is-justify-content-space-between is-align-items-cnter-desktop"
      >
        <div>
          <p>الاسم: {{ order.user.name }}</p>
        </div>
        <div>
          <p>رقم التليفون: {{ order.user.tel }}</p>
        </div>
        <div>
          <p>العنوان: {{ order.user.address }}</p>
        </div>
        <div>
          <p>طريقة الدفع: {{ order.user.payment }}</p>
        </div>
      </div>
    </section>
    <section v-if="order && order.items">
      <our-carousel title="المنتجات" :items="order.items" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'OrderDetails',
  data() {
    return {
      order: {},
      newState: '',
    }
  },
  head() {
    return {
      title: 'تفاصيل المنتج',
    }
  },
  computed: {
    orderStates() {
      return this.$store.state.orderStates
    },
  },
  async mounted() {
    try {
      const res = await this.$axios.get(`/orders/${this.$route.params.id}`)
      this.order = res.data
      this.newState = this.order.state
    } catch (error) {
      this.$store.dispatch('showToast', { message: error, type: 'error' })
    }
  },
  methods: {
    async updateState() {
      try {
        await this.$axios.$patch(`/orders/${this.$route.params.id}`, {
          state: this.newState,
        })
        this.order.state = this.newState
        this.$store.dispatch('showToast', {
          message: 'تم تعديل الطلب بنجاح',
          type: 'success',
        })
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
