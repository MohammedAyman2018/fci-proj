<template>
  <div>
    <div class="container mx-auto">
      <div class="hero min-h-screen">
        <div class="flex-col w-full justify-center hero-content lg:flex-row">
          <div class="text-center flex-grow lg:text-right">
            <h1 class="mb-5 text-5xl font-bold">أهلا بيك</h1>
            <p class="mb-5">اشتري كل احتياجاتك بافضل سعر ف السوق.</p>
          </div>
          <div
            class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div class="card-body">
              <FormulateForm
                v-slot="{ isLoading }"
                v-model="user"
                @submit="userLogin"
              >
                <FormulateInput
                  type="email"
                  name="email"
                  label="البريد الإلكتروني"
                  placeholder="البريد الإلكتروني"
                  validation="required|email"
                />

                <FormulateInput
                  type="password"
                  name="password"
                  label="كلمة المرور"
                  placeholder="كلمة المرور"
                  validation="required"
                />
                <div class="mt-4 text-center">
                  <p class="text-sm">
                    ليس لديك حساب؟
                    <nuxt-link
                      to="/sign-up"
                      class="text-blue-600 hover:underline"
                    >
                      أنشئ حسابك.</nuxt-link
                    >
                  </p>
                </div>
                <div class="form-control mt-6">
                  <FormulateInput
                    type="submit"
                    :wrapper-class="['w-full']"
                    :input-class="['btn-success', 'w-full', 'btn']"
                    :disabled="isLoading || !valid"
                    :label="isLoading ? 'جاري التسجيل' : 'تسجيل'"
                  />
                </div>
              </FormulateForm>
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
  name: 'LoginPage',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  computed: {
    valid(): Boolean {
      return !!this.user.email && !!this.user.password
    },
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', { data: this.user })
        this.$router.push('/')
        this.$store.dispatch('showToast', {
          message: 'تم تسجيل الدخول',
          type: 'success',
        })
      } catch (err: any) {
        this.$store.dispatch('showToast', {
          message: err.response.data.msg,
          type: 'error',
        })
      }
    },
  },
})
</script>

<style scoped></style>
