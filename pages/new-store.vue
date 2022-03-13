<template>
  <div class="banner">
    <img class="bg" src="@/assets/topography.svg" alt="" />

    <Success v-if="storeSuccess" />

    <p v-if="storeEdit" class="text-2xl text-center my-5">
      للأسف لم يتم قبول متجرك للسبب التالي: {{ theStore.rejectMessage }}. لكن لا
      تقلق يمكنك دائماً التقديم مرة أخرى
    </p>

    <div
      v-if="!showNotReviewedMessage && !storeSuccess"
      class="flex items-center"
    >
      <div
        class="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl"
      >
        <div class="flex flex-col md:flex-row">
          <div class="h-32 md:h-auto md:w-1/2">
            <img
              class="object-cover w-full h-full"
              src="@/assets/banner.jpeg"
              alt="img"
            />
          </div>
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div class="w-full">
              <h1 class="mb-4 text-2xl font-bold text-center text-gray-700">
                انشئ متجرك
              </h1>
              <FormulateForm
                v-model="theStore"
                #default="{ isLoading }"
                @submit="createStore"
              >
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
                  help="برجاء رفع صور من الملفات الاتية صورة البطاقة, السجل التجاري, فيش "
                  validation="mime:image/jpeg,image/png,image/gif,application/pdf"
                  multiple
                  :uploader="uploader"
                  upload-behavior="delayed"
                />
                <FormulateInput
                  type="submit"
                  :wrapper-class="['w-full']"
                  :input-class="['btn-success', 'w-full', 'btn']"
                  :disabled="isLoading || !valid"
                  :label="isLoading ? 'جاري التسجيل' : 'تسجيل'"
                />
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

    <div v-if="!storeSuccess || showNotReviewedMessage">
      <p class="text-xl mt-4 text-center">المتجر تحت المراجعة برجاء الانتظار</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IStore from '~/interfaces/store'
import Success from '@/components/NewStore/success.vue'
import uploader from '~/utils/uploader'

export default Vue.extend({
  name: 'CreateStore',
  components: {
    Success,
  },
  data() {
    return {
      showNotReviewedMessage: false,
      theStore: {
        title: '',
        desc: '',
        location: '',
        files: { files: [] },
      } as IStore,
      storeSuccess: false,
      storeEdit: false,
    }
  },
  computed: {
    valid(): boolean {
      return (
        !!this.theStore.title &&
        !!this.theStore.desc &&
        !!this.theStore.location &&
        this.theStore.files.files &&
        this.theStore.files.files.length >= 3
      )
    },
    filesError(): boolean {
      return false
    },
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      const validateStore: IStore = await this.$axios.$get(
        '/stores/check-if-validate'
      )
      if (validateStore === null) return
      if (validateStore.reviewed && validateStore.approved) {
        this.theStore = validateStore
        this.$store.commit('setStore', validateStore)
        // TODO: refresh token and get user again
        this.storeSuccess = true
      } else if (validateStore.reviewed && !validateStore.approved) {
        this.theStore = validateStore
        this.storeEdit = true
      } else if (!validateStore.reviewed) {
        this.showNotReviewedMessage = true
      }
    }
  },
  methods: {
    uploader,
    async createStore(data) {
      const files: string[] = []
      data.files.forEach((file: { url: string }[]) => files.push(file[0].url))
      try {
        await this.$axios.$post('/stores', {
          desc: data.desc,
          files,
          location: data.location,
          title: data.title,
          owner: this.$auth.user!._id,
        })
        window.location.reload()
        this.$notification('نجح الطلب', 'تم إنشاء الحساب بنجاح')
      } catch (err: any) {
        this.$notification('حدث خطأ ما', err.response.data.msg)
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
