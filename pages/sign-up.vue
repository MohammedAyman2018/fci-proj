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
              <FormulateForm @submit="createUser" #default="{ isLoading }">
                <FormulateInput
                  v-model="user.name"
                  name="اسمك"
                  label="اسمك"
                  placeholder="اسمك"
                  validation="required"
                />
                <FormulateInput
                  v-model="user.email"
                  name="البريد الإلكتروني"
                  label="البريد الإلكتروني"
                  placeholder="البريد الإلكتروني"
                  validation="required|email"
                />

                <FormulateInput
                  v-model="user.country"
                  :options="{ مصر: 'مصر', السعودية: 'السعودية' }"
                  type="select"
                  placeholder="اختر دولتك"
                  label="الدولة"
                />
                <FormulateInput
                  :key="user.country"
                  v-model="user.phone"
                  type="tel"
                  name="رقم الجوال"
                  label="رقم الجوال"
                  placeholder="رقم الجوال"
                  validation="required|validNumber"
                  :validation-rules="{
                    validNumber: ({ value }) =>
                      user.country === 'مصر'
                        ? value.length === 11
                        : value.length === 10,
                    startsWith01: ({ value }) =>
                      user.country === 'مصر'
                        ? value.startsWith('01')
                        : value.startsWith('05'),
                  }"
                  :validation-messages="{
                    startsWith01:
                      user.country === 'مصر'
                        ? 'يجب أن يبدأ الرقم ب 01'
                        : 'يجب أن يبدأ الرقم ب 05',
                    validNumber:
                      user.country === 'مصر'
                        ? 'يجب ان يتكون من 11 رقم'
                        : 'يجب ان يتكون من 10 رقم',
                  }"
                />

                <FormulateInput
                  v-model="user.password"
                  type="password"
                  name="كلمة المرور"
                  label="كلمة المرور"
                  placeholder="كلمة المرور"
                  validation="required|min:8,length"
                />

                <FormulateInput
                  type="submit"
                  :wrapper-class="['w-full']"
                  :input-class="['btn-success', 'w-full', 'btn']"
                  :disabled="isLoading || !valid"
                  :label="isLoading ? 'جاري التسجيل' : 'تسجيل'"
                />
              </FormulateForm>

              <div class="mt-4 text-center">
                <p class="text-sm">
                  لديك حساب بالفعل؟
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

export default Vue.extend({
  data() {
    return {
      user: {
        phone: '',
        country: 'مصر',
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
  created() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    async createUser() {
      try {
        await this.$axios.$post('/users', this.user)
        this.$notification('نجح الطلب', 'تم إنشاء الحساب بنجاح')
        this.$router.push('/login')
      } catch (err: any) {
        this.$notification('حدث خطأ ما', err.response.data.msg)
      }
    },
  },
})
</script>

