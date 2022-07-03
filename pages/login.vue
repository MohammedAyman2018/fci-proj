<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">تسجيل الدخول</h3>
          <hr class="login-hr" />
          <div class="box">
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
                  :input-class="[
                    'btn-success',
                    'is-justify-content-center',
                    'w-full',
                    'btn',
                  ]"
                  :disabled="isLoading || !valid"
                  :label="isLoading ? 'جاري التسجيل' : 'تسجيل'"
                />
              </div>
            </FormulateForm>
          </div>
        </div>
      </div>
    </div>
  </section>
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
