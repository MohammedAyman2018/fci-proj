<template>
  <div class="banner">
    <img class="bg" src="@/assets/topography.svg" alt="" />

    <Success v-if="storeSuccess" :store-name="store.title" />

    <p v-if="storeEdit" class="text-2xl text-center my-5">
      للأسف لم يتم قبول متجرك للسبب التالي: {{ store.rejectMessage }}. لكن لا
      تقلق يمكنك دائماً التقديم مرة أخرى
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
              <FormulateForm v-model="store" @submit="createStore">
                <FormulateInput
                  name="title"
                  label="اسم المتجر"
                  placeholder="اسم المتجر"
                  validation="required"
                />

                <FormulateInput
                  type="textarea"
                  name="desc"
                  label="نبذة مختصرة عن المتجر"
                />
                <FormulateInput
                  name="location"
                  label="عنوان المتجر"
                  placeholder="عنوان المتجر"
                  validation="required"
                />

                <FormulateInput
                  type="image"
                  name="files"
                  label="ملفات إثبات الهوية"
                  help="برجاء رفع صور من الملفات الاتية ملف 1, ملف 2 , ملف 3"
                  validation="mime:image/jpeg,image/png,image/gif"
                  multiple
                  :uploader="uploader"
                  upload-behavior="delayed"
                />
                <FormulateInput type="submit" label="تسجيل" />
                <!-- class="btn mt-4 btn-success w-full" -->
              </FormulateForm>
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

export default Vue.extend({
  name: 'CreateStore',
  components: {
    Success,
  },
  data() {
    return {
      store: {
        title: '',
        desc: '',
        location: '',
        files: [],
      } as IStore,
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
    async uploader(file, progress, error, options) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const result = await this.$axios.post(options.uploadUrl, formData)
        progress(100) // (native fetch doesn’t support progress updates)
        return await Promise.resolve(result.data)
      } catch (err) {
        error('Unable to upload file')
      }
    },
    async createStore(data) {
      try {
        console.log(data)
        await this.$axios.$post('/stores', {
          desc: data.desc,
          files: data.files[0].map((x) => x.url),
          location: data.location,
          title: data.title,
          owener: this.$auth.user!._id,
        })
        this.$notify({
          group: 'foo',
          type: 'success',
          text: 'تم إنشاء الحساب بنجاح',
        })
      } catch (err: any) {
        this.$notify({
          group: 'foo',
          title: 'حدث خطأ ما',
          text: err,
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
