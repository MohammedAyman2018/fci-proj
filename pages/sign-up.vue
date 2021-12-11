<template>
  <div>
    <div class="flex items-center min-h-screen bg-gray-50">
      <div
        class="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl"
      >
        <div class="flex flex-col md:flex-row">
          <div class="h-32 md:h-auto md:w-1/2">
            <img
              class="object-cover w-full h-full"
              src="https://source.unsplash.com/user/erondu/1600x900"
              alt="img"
            />
          </div>
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div class="w-full">
              <div class="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-20 h-20 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <h1 class="mb-4 text-2xl font-bold text-center text-gray-700">
                انشئ حساب
              </h1>
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
                :attrs="{
                  type: 'email',
                  placeholder: 'ادخل البريد الإلكتروني',
                }"
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
                class="btn mt-4 w-full btn-success btn-wide"
                @click="createUser"
              >
                تسجيل
              </button>

              <div class="mt-4 text-center">
                <p class="text-sm">
                  لديك حساب بالفعل?
                  <nuxt-link to="/login" class="text-blue-600 hover:underline">
                    سجل دخول.</nuxt-link
                  >
                </p>
              </div>
            </div>
          </div>
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
