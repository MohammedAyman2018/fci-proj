<template>
  <main class="container mx-auto">
    <b-modal
      v-model="interstsModalState"
      has-modal-card
      :can-cancel="false"
      custom-class="force-overflow"
    >
      <template #default="props">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">أختر اهتماماتك</p>
          </header>
          <section class="modal-card-body">
            <p class="has-text-weight-bold">
              لتجربة مستخدم أفضل.. اختر اهتماماتك
            </p>
            <div class="my-2 columns is-multiline">
              <b-field
                v-for="cat in categories"
                :key="cat._id"
                class="column is-2-mobile is-4-tablet"
              >
                <b-checkbox v-model="intersts" :native-value="cat._id">{{
                  cat.name
                }}</b-checkbox>
              </b-field>
            </div>
          </section>

          <footer class="modal-card-foot">
            <b-button label="ليس الآن" @click="props.close()" />
            <b-button label="تم" type="is-primary" @click="editUser" />
          </footer>
        </div>
      </template>
    </b-modal>
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

    <div
      class="is-flex is-justify-content-space-between is-align-items-center has-text-weight-bold"
    >
      <h3 v-if="$auth.user" class="my-3 is-size-4">
        مرحباً
        <bdi>{{ $auth.user.name }}</bdi>
        <b-tooltip label="تعديل الملف الشخصي">
          <sup style="cursor: pointer" @click="isComponentModalActive = true">
            <i class="ri-pencil-line"> </i>
          </sup>
        </b-tooltip>
      </h3>
      <b-button
        size="is-small"
        type="is-primary"
        @click="interstsModalState = true"
      >
        تعديل اهتماماتك
      </b-button>
    </div>

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

    <OurCarousel title="المفضلة" :items="fav" />

    <section class="my-4">
      <h3 class="is-size-4 has-text-weight-bold">الطلبيات</h3>

      <orders-table :orders="orders" @updateOrders="getOrders" />
    </section>
    <section class="my-4">
      <h3 class="is-size-4 has-text-weight-bold">الشكاوى</h3>

      <complains-table :rates="rates" @updateOrders="updateComplains" />
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import clonDeep from 'lodash.clonedeep'
import { format } from 'date-fns'
import OrdersTable from '~/components/tables/OrdersTable.vue'
import ComplainsTable from '~/components/tables/ComplainsTable.vue'
export default Vue.extend({
  components: { OrdersTable, ComplainsTable },
  data() {
    return {
      fav: [],
      rates: [],
      orders: [],
      intersts: [],

      editObj: {},
      isComponentModalActive: false,
      interstsModalState: false,
    }
  },
  head() {
    return {
      title: 'ملفك الشخصي',
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories
    },
  },

  async mounted() {
    try {
      await Promise.all([
        this.getFav(),
        this.$store.dispatch('categories/getCategories'),
        this.getOrders(),
        this.getComplains(),
      ])
      if (this.$auth.loggedIn) {
        this.intersts = this.$auth.user.intersts
      }
    } catch (error) {
      this.$store.dispatch('showToast', { message: error, type: 'error' })
    }
  },
  methods: {
    removeFromIntersts(id) {
      const idx = this.intersts.indexOf(id)
      if (idx !== -1) {
        this.intersts.splice(idx, 1)
      }
    },
    async editUser() {
      try {
        await this.$axios.$patch(`/users/${this.$auth.user._id}`, {
          intersts: this.intersts,
        })
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
    async getComplains() {
      try {
        const res = await this.$axios.get(`/contactUs/${this.$auth.user._id}`)
        this.rates = res.data
      } catch (error) {
        this.$store.dispatch('showToast', { message: error, type: 'error' })
      }
    },
    async getFav() {
      try {
        const res = await this.$axios.get('/users/all/fav/')
        this.fav = res.data
      } catch (error) {
        this.$store.dispatch('showToast', { message: error, type: 'error' })
      }
    },
    async getOrders() {
      try {
        const res = await this.$axios.get('/users/all/orders/')
        this.orders = res.data
      } catch (error) {
        this.$store.dispatch('showToast', { message: error, type: 'error' })
      }
    },
    prepareUser(): any {
      const clonedUser = clonDeep(this.$auth.user)
      if (clonedUser.dob) {
        clonedUser.dob = format(new Date(clonedUser.dob), 'yyyy-MM-dd')
      } else {
        clonedUser.dob = format(new Date(), 'yyyy-MM-dd')
      }
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
        this.interstsModalState = false
      } catch (error) {
        this.$store.dispatch('showToast', { message: error, type: 'error' })
      }
    },
  },
})
</script>

<style scoped></style>
