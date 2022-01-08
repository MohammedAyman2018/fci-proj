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
              <FormulateInput
                v-model="user.email"
                type="email"
                name="email"
                label="البريد الإلكتروني"
                placeholder="البريد الإلكتروني"
                validation="required|email"
              />

              <FormulateInput
                v-model="user.password"
                type="password"
                name="password"
                label="كلمة المرور"
                placeholder="كلمة المرور"
                validation="required"
              />

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
  methods: {
    async userLogin() {
      try {
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
