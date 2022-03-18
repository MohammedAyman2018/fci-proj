<template>
  <div>
    <div class="flex items-center min-h-screen bg-gray-50">
      <div
        class="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl"
      >
        <div class="flex flex-col md:flex-row">
          <div class="md:h-32 md:w-1/2">
            <video autoplay loop="true" width="100%" height="100%">
              <source src="@/assets/videos/login.mp4" type="video/mp4" />

              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div class="w-full">
              <h1 class="mb-4 text-2xl font-bold text-center text-gray-700">
                انشئ حساب
              </h1>
              <FormulateForm v-slot="{ isLoading }" @submit="createUser">
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
                  v-model="user.phone"
                  type="tel"
                  name="رقم الجوال"
                  label="رقم الجوال"
                  placeholder="رقم الجوال"
                  validation="required|validNumber"
                  :validation-rules="{
                    validNumber: ({ value }) => value.length === 11,
                    startsWith01: ({ value }) => value.startsWith('01'),
                  }"
                  :validation-messages="{
                    startsWith01: 'يجب أن يبدأ الرقم ب 01',
                    validNumber: 'يجب ان يتكون من 11 رقم',
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
  name: 'SignUpUser',
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
  head() {
    return {
      title: 'إنشاء حساب',
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
