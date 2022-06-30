<template>
  <section>
    <b-loading is-full-page v-model="isLoading" :can-cancel="false" />
    <b-field label="اسم المتجر">
      <b-input v-model="theStore.title" value="اسم المتجر"></b-input>
    </b-field>
    <b-field label="ما هو مجال عملك الأساسي">
      <b-select
        v-model="theStore.workOn"
        expanded
        placeholder="اختر مجال عملك الرئيسي"
      >
        <option
          v-for="option in categories"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </b-select>
    </b-field>
    <b-field label="نبذة مختصرة عن المتجر">
      <b-input
        v-model="theStore.desc"
        maxlength="200"
        type="textarea"
      ></b-input>
    </b-field>
    <b-field label="مدينتك">
      <b-select v-model="theStore.location" expanded placeholder="اختر مدينتك">
        <option
          v-for="option in locations"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </b-select>
    </b-field>
    <b-field>
      <b-upload v-model="theStore.files" multiple drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"> </b-icon>
            </p>
            <p>
              برجاء رفع صور من الملفات الاتية صورة البطاقة, السجل التجاري, فيش
            </p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div class="tags">
      <span
        v-for="(file, index) in theStore.files"
        :key="index"
        class="tag is-primary"
      >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="theStore.files.splice(index, 1)"
        ></button>
      </span>
    </div>
    <b-button
      native-type="button"
      @click="storeEdit ? updateStore() : createStore()"
    >
      تسجيل
    </b-button>
  </section>
</template>

<script>
import uploader from '~/utils/uploader'

export default {
  props: {
    editStore: {
      type: Object,
      default: () => null,
    },
    showNotReviewedMessage: {
      type: Boolean,
      default: () => false,
    },
    storeSuccess: {
      type: Boolean,
      default: () => false,
    },
    storeEdit: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      isLoading: false,
      categories: [],
      locations: [],
      theStore: {
        title: '',
        desc: '',
        location: '',
        files: [],
      },
    }
  },
  computed: {
    valid() {
      return (
        !!this.theStore.title &&
        !!this.theStore.desc &&
        !!this.theStore.location &&
        this.theStore.files &&
        this.theStore.files.length >= 3
      )
    },
  },
  watch: {
    editStore: {
      deep: true,
      handler(val) {
        if (val) {
          this.theStore = val
        }
      },
    },
  },
  async mounted() {
    const locations = await this.$axios.get('/locations')
    this.getCategories()
    this.locations = locations.data.map((x) => {
      return { label: x.name, value: x._id }
    })
  },
  methods: {
    async getCategories() {
      this.categories = await this.$axios.$get('/categories').catch((err) => {
        this.$store.dispatch('showToast', { message: err, type: 'error' })
      })
      this.categories = this.categories.map((cat) => {
        return { label: cat.name, value: cat._id }
      })
    },
    async updateStore(data) {
      this.isLoading = true
      const files = await this.uploader(this.theStore.files)

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
          owner: this.$auth.user._id,
        })
        window.location.reload()
        this.$store.dispatch('showToast', {
          message: 'تم استقبال طلبك بنجاح',
          type: 'success',
        })
      } catch (err) {
        this.$store.dispatch('showToast', {
          message: err.response.data.msg,
          type: 'error',
        })
      }
      this.isLoading = false
    },
    uploader,
    async createStore() {
      this.isLoading = true

      const files = await this.uploader(this.theStore.files)
      try {
        await this.$axios.$post('/stores', {
          ...this.theStore,
          workOn: [this.theStore.workOn],
          files,
          owner: this.$auth.user._id,
        })
        window.location.reload()
        this.$store.dispatch('showToast', {
          message: 'تم استقبال طلبك بنجاح',
          type: 'success',
        })
      } catch (err) {
        this.$store.dispatch('showToast', {
          message: err,
          type: 'error',
        })
      }
      this.isLoading = false
    },
  },
}
</script>

<style></style>
