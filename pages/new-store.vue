<template>
  <div class="banner">
    <img class="bg" src="@/assets/topography.svg" alt="" />

    <Success v-if="storeSuccess" :store-name="store.title" />

    <p v-if="storeEdit" class="text-2xl text-center my-5">
      للأسف لم يتم قبول متجرك للسبب التالي: ملف 1 غير صالح. لكن لا تقلق يمكنك
      دائماً التقديم مرة أخرى
    </p>

    <div v-if="!storeSuccess" class="flex items-center">
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
                انشئ متجرك
              </h1>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">اسم المتجر</span>
                </label>
                <input
                  v-model="store.title"
                  placeholder="اسم المتجر"
                  class="input-sm"
                  :class="{ 'input-error': $v.store.title.$error }"
                />
                <label v-if="$v.store.title.$error" class="label">
                  <span class="label-text-alt">اسم المتجر مطلوب</span>
                </label>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">نبذة مختصرة عن المتجر</span>
                </label>
                <textarea
                  v-model="store.desc"
                  rows="15"
                  cols="15"
                  placeholder="نبذة مختصرة عن المتجر"
                  class="textarea input-bordered h-24"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">عنوان المتجر</span>
                </label>
                <input
                  v-model="store.location"
                  placeholder="عنوان المتجر"
                  class="input-sm"
                  :class="{ 'input-error': $v.store.location.$error }"
                />
                <label v-if="$v.store.location.$error" class="label">
                  <span class="label-text-alt">عنوان المتجر مطلوب</span>
                </label>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">ملفات إثبات الهوية</span>
                </label>

                <input
                  multiple
                  type="file"
                  :class="{ 'input-error': filesError }"
                />
                <label class="label">
                  <span class="label-text-alt">
                    برجاء رفع صور من الملفات الاتية ملف 1, ملف 2 , ملف 3
                  </span>
                </label>
              </div>

              <button
                :class="{ 'btn-disabled': !valid }"
                class="btn mt-4 btn-success w-full"
                @click="createStore"
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
import IStore from '~/interfaces/store'
import Success from '@/components/NewStore/success.vue'
const { required } = require('vuelidate/lib/validators')

export default Vue.extend({
  name: 'CreateStore',
  components: {
    Success,
  },
  data() {
    return {
      store: {} as IStore,
      storeSuccess: false,
      storeEdit: false,
    }
  },
  computed: {
    valid() {
      return true
    },
    filesError() {
      return false
    },
  },
  validations: {
    store: {
      title: { required },
      location: { required },
    },
  },
  async mounted() {
    const validateStore: IStore = await this.$axios.$get(
      '/stores/check-if-validate'
    )
    if (validateStore === null) return
    if (validateStore.reviewed && validateStore.approved) {
      // TODO: your app
      this.store = validateStore
      this.storeSuccess = true
    } else if (validateStore.reviewed && !validateStore.approved) {
      this.store = validateStore
      this.storeEdit = true
    }
  },
  methods: {
    async createStore() {
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
        await this.$axios.$post('/stores', this.store)
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
.banner {
  @apply relative h-screen;
}
.banner img.bg {
  z-index: -1;
  @apply w-full h-full absolute top-0 left-0 object-cover opacity-10;
}
</style>
