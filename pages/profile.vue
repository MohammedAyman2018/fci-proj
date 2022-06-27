<template>
  <main class="container mx-auto">
    <b-modal
      v-model="isComponentModalActive"
      style="z-index: 9999999"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Login</p>
            <button type="button" class="delete" @click="props.close" />
          </header>
          <section class="modal-card-body">
            <div class="p-4">
              <h2 class="is-size-5 has-text-weight-bold">تعديل الحساب</h2>
              <FormulateForm :values="prepareUser()" @submit="editUser">
                <FormulateInput type="text" name="name" label="اسمك" />
                <FormulateInput
                  type="email"
                  name="email"
                  label="بريدك الإلكنروني"
                  help="لن نزعجك برسائل غير مفيدة"
                />
                <FormulateInput
                  type="tel"
                  name="phone"
                  label="رقم هاتفك"
                  help="سيتم التواصل مع هذا الرقم عند توصيل الطلبات"
                />
                <FormulateInput
                  type="text"
                  name="address"
                  label="عنوانك"
                  help="سيتم ارسال الطلبيات لهذا العنوان"
                />
                <FormulateInput type="date" name="dob" label="تاريخ ميلادك" />
                <div class="mt-5">
                  <div
                    class="is-flex is-justify-content-space-between is-align-items-center mt-4 mb-4"
                  >
                    <FormulateInput type="submit" label="تعديل" />
                    <b-button type="is-ghost" size="is-sm" @click="props.close">
                      إلغاء
                    </b-button>
                  </div>
                </div>
              </FormulateForm>
            </div>
          </section>
        </div>
      </template>
    </b-modal>
    <!-- <modal name="edit-user" scrollable height="auto">
    </modal> -->

    <h3 v-if="$auth.user" class="my-3 font-bold text-xl">
      مرحباً
      <bdi>{{ $auth.user.name }}</bdi>

      <sup class="cursor-pointer" @click="isComponentModalActive = true">
        <i class="ri-pencil-line"> </i>
      </sup>
    </h3>

    <div v-if="$auth.user" class="columns is-multiline is-mobile">
      <p class="column is-one-quarter-tablet is-12-mobile">
        المدينة:
        <bdi>{{ $auth.user.country ? $auth.user.country : 'لا يوجد' }}</bdi>
      </p>
      <p class="column is-one-quarter-tablet is-12-mobile">
        البريد الإلكتروني: <bdi>{{ $auth.user.email }}</bdi>
      </p>
      <p class="column is-one-quarter-tablet is-12-mobile">
        رقم الهاتف:
        <bdi>{{ $auth.user.phone ? $auth.user.phone : 'لا يوجد' }}</bdi>
      </p>
      <p class="column is-one-quarter-tablet is-12-mobile">
        العنوان:
        <bdi>{{ $auth.user.address ? $auth.user.address : 'لا يوجد' }}</bdi>
      </p>
      <p class="column is-one-quarter-tablet is-12-mobile">
        تاريخ الميلاد:
        <bdi>{{
          $auth.user.dob ? $auth.user.dob.substr(0, 10) : 'لا يوجد'
        }}</bdi>
      </p>
      <p class="column is-one-quarter-tablet is-12-mobile">
        تاريخ إنشاء الحساب:
        <bdi>{{ $auth.user.createdAt.substr(0, 10) }}</bdi>
      </p>
    </div>

    <div class="my-6">
      <h3 class="my-3 font-bold text-xl">المفضلة:</h3>
      <div v-if="fav.length > 0">
        <div class="columns is-multiline">
          <div
            v-for="product in fav"
            :key="product._id"
            class="column is-one-quarter"
          >
            <product-card :product="product" />
          </div>
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
        <div class="columns is-multiline">
          <div
            v-for="order in orders"
            :key="order._id"
            class="column is-6-desktop is-4-fullhd"
          >
            <div class="box">
              <ul>
                <h2 class="is-size-3 is-bold">تفاصيل المستخدم</h2>
                <li>
                  <span>الاسم:</span>
                  <span>{{ order.user.name }}</span>
                </li>
                <li>
                  <span>الموبايل:</span>
                  <span>{{ order.user.tel }}</span>
                </li>
                <li>
                  <span>العنوان:</span>
                  <span>{{ order.user.address }}</span>
                </li>
                <li>
                  <span>طريقة الدفع:</span>
                  <span>{{ order.user.payment }}</span>
                </li>
              </ul>
              <hr />
              <ul>
                <b-collapse :open="false" :aria-id="order._id">
                  <template #trigger>
                    <h3
                      class="mb-4 is-size-3 has-text-weight-bold is-flex is-justify-content-space-between is-align-items-center"
                    >
                      تفاصيل الطلب
                      <b-icon icon="menu-down" />
                    </h3>
                  </template>
                  <li>
                    <span>تاريخ الطلب:</span>
                    <span>{{ order.createdAt.substr(0, 10) }}</span>
                  </li>
                  <li>
                    <span>المتجر:</span>
                    <span>{{ order.storeName }}</span>
                  </li>
                  <li>
                    <span>حالة الطلب:</span>
                    <span>{{ order.state }}</span>
                  </li>
                  <hr />
                  <div
                    v-for="product in order.items"
                    :key="product._id"
                    class="columns"
                  >
                    <div class="column is-3">
                      <img
                        style="width: 100px; height: 100px; border-raduis: 10px"
                        :src="product.img"
                        :alt="product.name"
                      />
                    </div>
                    <div class="column">
                      <h4 class="is-size-4">{{ product.name }}</h4>
                      <p class="is-size-6">الكمية: {{ product.amount }} قطع</p>
                    </div>
                    <div class="column is-3">
                      <h4 class="is-size-4">{{ product.price }} جنيه</h4>
                    </div>
                  </div>
                </b-collapse>
              </ul>
            </div>
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
import clonDeep from 'lodash.clonedeep'
import { format } from 'date-fns'
import productCard from '~/components/products/product-card.vue'
export default Vue.extend({
  components: { productCard },
  data() {
    return {
      fav: [],
      orders: [],
      editObj: {},
      isComponentModalActive: false,
    }
  },
  head() {
    return {
      title: 'ملفك الشخصي',
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
      this.$store.dispatch('showToast', { message: error, type: 'error' })
    }
  },
  methods: {
    prepareUser(): any {
      const clonedUser = clonDeep(this.$auth.user)
      clonedUser.dob = format(new Date(clonedUser.dob), 'yyyy-MM-dd')
      return clonedUser
    },
    async editUser(editObj) {
      try {
        await this.$axios.$patch(`/users/${editObj._id}`, editObj)
        await this.$auth.fetchUser()
        await this.$auth.refreshTokens()
        // this.$modal.
        this.$store.dispatch('showToast', {
          message: 'تم التعديل بنجاح',
          type: 'success',
        })
        this.isComponentModalActive = false
      } catch (error) {
        this.$store.dispatch('showToast', { message: error, type: 'error' })
      }
    },
  },
})
</script>

<style scoped></style>
