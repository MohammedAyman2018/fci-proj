<template>
  <div class="banner">
    <!-- <img class="bg" src="@/assets/topography.svg" alt="" /> -->

    <Success v-if="storeSuccess" />

    <p v-if="storeEdit" class="text-2xl text-center my-5">
      للأسف لم يتم قبول متجرك للسبب التالي: {{ theStore.rejectMessage }}. لكن لا
      تقلق يمكنك دائماً التقديم مرة أخرى
    </p>

    <div
      v-if="!showNotReviewedMessage && !storeSuccess"
      class="is-flex items-center"
    >
      <div class="">
        <div class="columns">
          <div class="column is-hidden-touch is-6-desktop">
            <video autoplay loop="true" width="100%" height="100%">
              <source src="@/assets/videos/sign up.mp4" type="video/mp4" />

              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
          <div
            class="column is-6-desktop is-flex is-align-items-center is-justify-content-center p-6"
          >
            <div class="w-full">
              <h1 class="mb-4 is-size-3 has-text-weight-bold">انشئ متجرك</h1>
              <FormulateForm
                v-slot="{ isLoading }"
                v-model="theStore"
                @submit="storeEdit ? updateStore() : createStore()"
              >
                <FormulateInput
                  name="title"
                  label="اسم المتجر"
                  placeholder="اسم المتجر"
                  validation="required"
                />

                <FormulateInput
                  name="workOn"
                  type="select"
                  :options="categories"
                  label="ما هو مجال عملك الأساسي"
                  placeholder="اختر مجال عملك الرئيسي"
                  validation="required"
                />

                <FormulateInput
                  type="textarea"
                  name="desc"
                  label="نبذة مختصرة عن المتجر"
                />
                <FormulateInput
                  name="location"
                  type="select"
                  :options="locations"
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
                  :input-class="[
                    'btn-success',
                    'is-justify-content-center',
                    'w-full',
                    'btn',
                  ]"
                  :disabled="isLoading || !valid"
                  :label="isLoading ? 'جاري التسجيل' : 'تسجيل'"
                />
                <!-- class="btn mt-4 btn-success w-full" -->
              </FormulateForm>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!storeSuccess || showNotReviewedMessage">
      <p class="has-text-centered is-size-3 mt-4">
        المتجر تحت المراجعة برجاء الانتظار
      </p>
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
      categories: [] as any[],
      locations: [],
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
  head() {
    return {
      title: 'إنشئ متجرك',
    }
  },
  computed: {
    valid(): boolean {
      return (
        !!this.theStore.title &&
        !!this.theStore.desc &&
        !!this.theStore.location &&
        this.theStore.files.files! &&
        this.theStore.files.files!.length >= 3
      )
    },
    filesError(): boolean {
      return false
    },
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      const locations = await this.$axios.get('/locations')
      this.getCategories()
      this.locations = locations.data.map((x) => {
        return { label: x.name, value: x._id }
      })
      const validateStore: IStore = await this.$axios.$get(
        '/stores/check-if-validate'
      )
      if (validateStore === null) return
      if (validateStore.reviewed && validateStore.approved) {
        this.theStore = validateStore
        this.$store.commit('stores/setStore', validateStore)
        if (this.$auth.user.role !== 'owner') {
          await this.$auth.logout()
          this.$store.dispatch('showToast', {
            message: 'تم قبول متجرك رجاء تسجيل الدخول مرة أخرى.',
            type: 'success',
          })
        }
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
    async getCategories() {
      this.categories = await this.$axios.$get('/categories').catch((err) => {
        this.$store.dispatch('showToast', { message: err, type: 'error' })
      })
      this.categories = this.categories.map((cat: any) => {
        return { label: cat.name, value: cat._id }
      })
    },
    async updateStore(data) {
      const files: string[] = []
      data.files.forEach((file: { url: string }[]) => files.push(file[0].url))
      try {
        await this.$axios.$patch(`/stores?storeName=${data.title}`, {
          desc: data.desc,
          files,
          location: data.location,
          workOn: [data.workOn],
          reviewed: false,
          rejectMessage: '',
          approved: false,
          title: data.title,
          owner: this.$auth.user!._id,
        })
        window.location.reload()
        this.$store.dispatch('showToast', {
          message: 'تم استقبال طلبك بنجاح',
          type: 'success',
        })
      } catch (err: any) {
        this.$store.dispatch('showToast', {
          message: err.response.data.msg,
          type: 'error',
        })
      }
    },
    async createStore(data) {
      const files: string[] = []
      data.files.forEach((file: { url: string }[]) => files.push(file[0].url))
      try {
        await this.$axios.$post('/stores', {
          desc: data.desc,
          files,
          location: data.location,
          workOn: [data.workOn],
          title: data.title,
          owner: this.$auth.user!._id,
        })
        window.location.reload()
        this.$store.dispatch('showToast', {
          message: 'تم استقبال طلبك بنجاح',
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

<style scoped>
.banner {
  @apply relative h-screen;
}
.banner img.bg {
  z-index: -1;
  @apply w-full h-full absolute top-0 left-0 object-cover opacity-10;
}
</style>
