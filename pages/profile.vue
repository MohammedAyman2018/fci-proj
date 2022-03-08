<template>
  <main class="container mx-auto">
    <h3 v-if="$auth.user" class="my-3 font-bold text-xl">
      مرحباً
      <bdi>{{ $auth.user.name }}</bdi>

      <sup class="cursor-pointer" @click="showModal">
        <i class="ri-pencil-line"> </i>
      </sup>
    </h3>

    <div v-if="$auth.user" class="grid gap-3 grid-cols-2 lg:grid-cols-4">
      <p>
        المدينة:
        <bdi>{{ $auth.user.country ? $auth.user.country : 'لا يوجد' }}</bdi>
      </p>
      <p>
        البريد الإلكتروني: <bdi>{{ $auth.user.email }}</bdi>
      </p>
      <p>
        رقم الهاتف:
        <bdi>{{ $auth.user.phone ? $auth.user.phone : 'لا يوجد' }}</bdi>
      </p>
      <p>
        العنوان:
        <bdi>{{ $auth.user.address ? $auth.user.address : 'لا يوجد' }}</bdi>
      </p>
      <p>
        تاريخ الميلاد:
        <bdi>{{ $auth.user.dob ? $auth.user.dob : 'لا يوجد' }}</bdi>
      </p>
      <p>
        تاريخ إنشاء الحساب:
        <bdi>{{ $auth.user.createdAt.substr(0, 10) }}</bdi>
      </p>
    </div>

    <div class="my-6">
      <h3 class="my-3 font-bold text-xl">المفضلة:</h3>
      <div v-if="fav.length > 0">
        <div
          class="
            grid grid-cols-1
            place-items-center
            lg:grid-cols-2
            xl:grid-cols-3
          "
        >
          <product-card
            v-for="product in fav"
            :key="product._id"
            :product="product"
          />
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center">
        <p class="font-semibold mb-4 text-center">
          لا يوجد منتجات في المفضلة بعد
        </p>
        <nuxt-link class="btn btn-primary" to="/store/products">
          تصفح منتجاتنا
        </nuxt-link>
      </div>
    </div>

    <div class="my-6">
      <h3 class="my-3 font-bold text-xl">الطلبات:</h3>
      <div v-if="orders.length > 0">
        <div
          class="
            grid grid-cols-1
            place-items-center
            lg:grid-cols-2
            xl:grid-cols-3
          "
        >
          <div v-for="order in orders" :key="order._id">
            {{ Object.keys(order) }}
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center">
        <p class="font-semibold mb-4 text-center">لا يوجد طلبات حتى الآن</p>
        <nuxt-link class="btn btn-primary" to="/store/products">
          تصفح منتجاتنا
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import productCard from '~/components/products/product-card.vue'

export default Vue.extend({
  components: { productCard },
  data() {
    return {
      fav: [],
      orders: [],
    }
  },
  async mounted() {
    try {
      const res = await Promise.all([
        this.$axios.get('/users/all/fav/'),
        this.$axios.get('/users/all/orders/'),
      ])
      this.fav = res[0].data
      this.orders = res[1].data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    showModal() {
      alert('we will edit this')
    },
  },
})
</script>

<style scoped>
</style>
