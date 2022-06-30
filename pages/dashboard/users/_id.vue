<template>
  <section class="container mx-auto">
    <div v-if="user.name" class="shadow">
      <header class="user-header">
        <span>العميل</span>
        <span>{{ user.name }}</span>
      </header>
      <div class="user-details">
        <p>
          <i class="ri-mail-line"></i>
          <span>البريد الالكتروني</span>
          <span>{{ user.email }}</span>
        </p>
        <p>
          <i class="ri-map-pin-line"></i>
          <span>العنوان</span>
          <span>{{ user.country }} - {{ user.address }}</span>
        </p>
        <p>
          <i class="ri-calendar-line"></i>
          <span>تاريخ الميلاد</span>
          <span v-if="user && user.dob">{{ user.dob.substr(0, 10) }}</span>
        </p>

        <p>
          <i class="ri-calendar-line"></i>
          <span>تاريخ الاشتراك بالمتجر</span>
          <span v-if="user && user.createdAt">{{
            user.createdAt.substr(0, 10)
          }}</span>
        </p>

        <a :href="`tel:${user.phone}`" class="call-link">
          <i class="ri-phone-line"></i>
          <span>اتصل بالعميل</span>
        </a>
      </div>
    </div>

    <section class="orders mt-3">
      <h2 class="text-2xl">طلبات العميل</h2>

      <p class="text-center mt-3">لا يوجد أي طلبيات حتى الان</p>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import IUser from '~/interfaces/user'

export default Vue.extend({
  name: 'SingleUserProfile',
  layout: 'admin',
  data() {
    return {
      user: {} as IUser,
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.get(`/users/one/${this.$route.params.id}`)
      this.user = res.data
    } catch (error: any) {
      this.$store.dispatch('showToast', {
        message: error,
        type: 'error',
      })
    }
  },
})
</script>

<style scoped>
/* i {
  @apply mx-1;
}

.call-link {
  @apply rounded mt-3 flex items-center justify-center text-white px-4 py-1 bg-green-400;
}

.user-header {
  @apply flex justify-between mt-5 p-4 bg-gray-300 text-black;
}

.user-details {
  @apply space-y-2 p-4;
}

.user-details p {
  @apply flex;
}

p span:last-child {
  @apply inline-block mr-auto;
} */
</style>
