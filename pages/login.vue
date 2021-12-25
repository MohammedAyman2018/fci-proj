<template>
  <div>
    <div class="container mx-auto">
      <div class="hero min-h-screen">
        <div class="flex-col justify-center hero-content lg:flex-row">
          <div class="text-center lg:text-right">
            <h1 class="mb-5 text-5xl font-bold">أهلا بيك</h1>
            <p class="mb-5">
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت
              دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا .
              يوت
            </p>
          </div>
          <div
            class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div class="card-body">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">البريد الإلكتروني</span>
                </label>
                <input
                  v-model="user.email"
                  placeholder="البريد الإلكتروني"
                  class="input-sm"
                  :class="{ 'input-error': $v.user.email.$error }"
                />
                <label v-if="$v.user.email.$error" class="label">
                  <span class="label-text-alt">ادخل بريد الكتروني صحيح</span>
                </label>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">كلمة المرور</span>
                </label>
                <input
                  v-model="user.password"
                  type="password"
                  placeholder="ادخل كلمة المرور"
                  class="input-sm"
                  :class="{ 'input-error': $v.user.password.$error }"
                />
                <label v-if="$v.user.password.$error" class="label">
                  <span class="label-text-alt">يحب ادخال كلمة المرور</span>
                </label>
              </div>
              <div class="form-control mt-6">
                <button
                  :class="{ 'btn-disabled': !valid }"
                  class="btn w-full mt-4 btn-success"
                  @click="userLogin"
                >
                  تسجيل
                </button>
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
import { validationMixin } from 'vuelidate'
const { required, email } = require('vuelidate/lib/validators')

export default Vue.extend({
  name: 'LoginPage',
  mixins: [validationMixin],

  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  validations(): { [key: string]: any } {
    return {
      user: {
        email: { required, email },
        password: { required },
      },
    }
  },
  computed: {
    valid(): Boolean {
      return (
        (!this.$v.user?.email?.$invalid && !this.$v.user?.password?.$invalid) ||
        false
      )
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
