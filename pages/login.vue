<template>
  <div>
    <div class="container mx-auto">
      <div class="grid h- justify-center items-center justify-items-center">
        <div class="pt-16 lg:pt-32">
          <div class="flex-center flex-col">
            <img width="150px" src="@/assets/placeholder.png" alt="logo" />
            <h2 class="text-green-500">سهلة لحد الإتقان</h2>
          </div>

          <custom-input
            :label="'البريد الإلكتروني'"
            :message="'ادخل بريد الكتروني صحيح'"
            should-validate
            is-email
            :attrs="{ type: 'email', placeholder: 'ادخل البريد الإلكتروني' }"
            @changed="user.email = $event"
          />
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
            @click="userLogin"
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
const { required, email } = require('vuelidate/lib/validators')

export default Vue.extend({
  name: 'LoginPage',
  components: { CustomInput },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  computed: {
    valid() {
      return (
        (!this.$v.user?.email?.$invalid && !this.$v.user?.password?.$invalid) ||
        false
      )
    },
  },
  validations: {
    user: {
      email: { required, email },
      password: { required },
    },
  },
  methods: {
    async userLogin() {
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
        await this.$auth.loginWith('local', { data: this.user })
        this.$router.push('/')
        this.$notify({
          group: 'foo',
          type: 'success',
          text: 'تم تسجيل الدخول',
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
