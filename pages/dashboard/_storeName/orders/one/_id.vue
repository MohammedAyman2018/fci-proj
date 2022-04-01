<template>
  <div v-if="order" class="container mx-auto my-3">
    <section>
      <h3 class="text-xl font-bold">تفاصيل الطلب:</h3>
      <p>
        <span>الحالة:</span>
        <span>{{ order.state }}</span>
      </p>

      <div>
        <select id="editSate" v-model="newState" class="p-2 mx-2 bordered rounded border-gray-400">
          <option
            v-for="state in orderStates"
            :key="state"
            :value="state"
            v-text="state"
          />
        </select>
        <button class="btn btn-primary" :disabled="newState === order.state" @click="updateState">
          تعديل الطلب
        </button>
      </div>
    </section>

    <section v-if="order && order.user">
      <h4 class="text-lg font-bold mt-3">العميل:</h4>
      <div class="flex flex-col lg:flex-row justify-between lg:items-center">
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
      <h4 class="text-lg font-bold mt-3">المنتجات:</h4>
      <div v-for="product in order.items" :key="product._id">
        <div class="product-card">
          <div class="product-card--image">
            <img :src="product.img" :alt="product.name" />
          </div>
          <section class="product-card--info">
            <div class="product-card--info--header">
              <h2 class="cursor-pointer">{{ product.name }}</h2>
              <nuxt-link :to="`/store/${product.storeName}/products`">
                <i class="ri-store-fill ri-1x" />
                {{ product.storeName }}
              </nuxt-link>
            </div>
            <!-- Add Link To One Store In Here -->

            <div class="product-card--info-footer">
              <div>
                <p>{{ product.price }} جنيه</p>
              </div>
            </div>
          </section>
        </div>
      </div>
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
