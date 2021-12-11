<template>
  <div>
    <div class="container mx-auto">
      <div class="grid lg:grid-cols-2">
        <div class="h-full flex-center flex-col">
          <img width="150px" src="@/assets/placeholder.png" alt="logo" />
          <h2 class="text-green-500">سهلة لحد الإتقان</h2>
        </div>
        <div class="lg:border-r lg:border-gray-400 px-5">
          <custom-input
            :label="'اسم المتجر'"
            :message="'اسم المتجر مطلوب'"
            should-validate
            is-requried
            :attrs="{ placeholder: 'ادخل اسم المتجر' }"
            @changed="user.name = $event"
          />
          <custom-input
            :label="'البريد الإلكتروني'"
            :message="'ادخل بريد الكتروني صحيح'"
            should-validate
            is-email
            :attrs="{ type: 'email', placeholder: 'ادخل البريد الإلكتروني' }"
            @changed="user.email = $event"
          />
          <div class="form-control w-50 my-1">
            <label class="label">
              <span class="label-text">رقم الجوال</span>
            </label>
            <phone-input
              @change="
                user.phone = $event.phone
                user.country = $event.country
              "
            />
          </div>
          <custom-input
            :label="'كلمة المرور'"
            :message="'ادخل كلمة المرور صحيح'"
            should-validate
            is-requried
            :attrs="{ type: 'password', placeholder: 'ادخل كلمة المرور' }"
            @changed="user.password = $event"
          />

          <button
            :class="{ 'btn-disabled': !valid }"
            class="btn mt-4 btn-success btn-wide"
            @click="createUser"
          >
            تسجيل
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CustomInput from '~/components/utils/CustomInput.vue'
import PhoneInput from '~/components/utils/PhoneInput.vue'
const { required, email } = require('vuelidate/lib/validators')

export default Vue.extend({
  components: { CustomInput, PhoneInput },
  data() {
    return {
      user: {
        phone: '',
        name: '',
        email: '',
        password: '',
      },
    }
  },
  computed: {
    valid() {
      return true
    },
  },
  validations: {
    user: {
      phone: { required },
      name: { required },
      email: { required, email },
      password: { required },
    },
  },
  methods: {
    async createUser() {
      try {
        this.$v.$touch()
        if (this.$v.$anyError) {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'تأكد من إكمال البيانات',
          })
          return
        }
        await this.$axios.$post('/users', this.user)
        this.$notify({
          group: 'foo',
          type: 'success',
          text: 'تم إنشاء الحساب بنجاح',
        })
      } catch (err: any) {
        this.$notify({
          group: 'foo',
          title: 'حدث خطأ ما',
          text: err.response.data.msg,
        })
      }
    },
  },
})
</script>

<style scoped>
</style>
