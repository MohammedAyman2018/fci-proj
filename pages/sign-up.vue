<template>
  <section class="container">
    <div class="columns is-multiline">
      <div class="column is-8 is-offset-2 register">
        <div class="columns">
          <div class="column left">
            <h1 class="title is-1">السوق الالكتروني</h1>
            <h2 class="subtitle colored is-4">كل ما تحتاجه وأكثر.</h2>
            <p>هدفنا إيصال البائع بالمشتري بدون وساطة أو أي تكاليف إضافية.</p>
          </div>
          <div class="column right">
            <h1 class="title has-text-centered is-4">سجل معنا اليوم</h1>
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
                :input-class="[
                  'btn-success',
                  'is-justify-content-center',
                  'w-full',
                  'btn',
                ]"
                :disabled="isLoading || !valid"
                :label="isLoading ? 'جاري التسجيل' : 'تسجيل'"
              />
            </FormulateForm>
          </div>
        </div>
      </div>
      <div class="column is-8 is-offset-2">
        <br />
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span class="icon">
                <i class="fab fa-twitter"></i>
              </span>
              &emsp;
              <span class="icon">
                <i class="fab fa-facebook"></i>
              </span>
              &emsp;
              <span class="icon">
                <i class="fab fa-instagram"></i>
              </span>
              &emsp;
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              &emsp;
              <span class="icon">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="level-right">
            <small class="level-item" style="color: var(--textLight)">
              &copy; Super Cool Website. All Rights Reserved.
            </small>
          </div>
        </nav>
      </div>
    </div>
  </section>
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
        this.$store.dispatch('showToast', {
          message: 'تم إنشاء الحساب بنجاح',
          type: 'success',
        })
        this.$router.push('/login')
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

<style>
:root {
  --brandColor: hsl(166, 67%, 51%);
  --background: rgb(247, 247, 247);
  --textDark: hsla(0, 0%, 0%, 0.66);
  --textLight: hsla(0, 0%, 0%, 0.33);
}

body {
  height: 100vh;
  color: var(--textDark);
}

.field:not(:last-child) {
  margin-bottom: 1rem;
}

.register {
  margin-top: 10rem;
  background: white;
  border-radius: 10px;
}

.left,
.right {
  padding: 4.5rem;
}

.left {
  border-right: 5px solid var(--background);
}

.left .title {
  font-weight: 800;
  letter-spacing: -2px;
}

.left .colored {
  color: var(--brandColor);
  font-weight: 500;
  margin-top: 1rem !important;
  letter-spacing: -1px;
}

.left p {
  color: var(--textLight);
  font-size: 1.15rem;
}

.right .title {
  font-weight: 800;
  letter-spacing: -1px;
}

.right .description {
  margin-top: 1rem;
  margin-bottom: 1rem !important;
  color: var(--textLight);
  font-size: 1.15rem;
}

.right small {
  color: var(--textLight);
}

input {
  font-size: 1rem;
}

input:focus {
  border-color: var(--brandColor) !important;
  box-shadow: 0 0 0 1px var(--brandColor) !important;
}

.fab,
.fas {
  color: var(--textLight);
  margin-right: 1rem;
}
</style>
