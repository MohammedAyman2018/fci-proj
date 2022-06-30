<template>
  <div class="container mx-auto">
    <h2 class="text-2xl">أضف منتج</h2>
    <FormulateForm
      v-model="formValues"
      class="login-form"
      @submit="oldProduct ? editProduct($event) : addProduct($event)"
    >
      <div class="columns is-multiline">
        <div v-if="!oldProduct" class="column is-3-desktop">
          <b-field label="صور المنتج">
            <b-upload v-model="images" multiple drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"> </b-icon>
                  </p>
                  <p>اسحب صور المنتج هنا</p>
                </div>
              </section>
            </b-upload>
          </b-field>
          <div class="tags">
            <span
              v-for="(file, index) in images"
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
        </div>
        <FormulateInput
          name="name"
          type="text"
          class="column is-3-desktop"
          label="اسم المنتج"
          placeholder="اسم المنتج"
          validation="required"
        />

        <FormulateInput
          name="url"
          class="column is-3-desktop"
          type="text"
          label="رابط المنتج"
          help="ادخل رابط خاص للمنتج للمساعدة في ظهوره بشكل اكبر في محركات البحث"
          placeholder="مثال: جاكيت أطفال جلد مقاس 45"
          validation="required"
        />

        <FormulateInput
          name="desc"
          type="textarea"
          class="column is-3-desktop"
          label="وصف المنتج"
          placeholder="وصف المنتج"
          validation="required"
        />

        <FormulateInput
          name="price"
          type="number"
          class="column is-3-desktop"
          label="سعر المنتج"
          placeholder="سعر المنتج"
          validation="required"
        />

        <FormulateInput
          v-if="store && store.workOn"
          class="column is-3-desktop"
          name="selectedCategories"
          type="select"
          :options="
            store.workOn.map((x) => {
              return { label: x.name, value: x._id }
            })
          "
          label="الفئات"
          placeholder="اختر فئة المنتج"
          validation="required"
        />

        <FormulateInput
          name="amountType"
          class="column is-3-desktop"
          type="select"
          :options="{ limited: 'منتج', unlimited: 'خدمة' }"
          label="نوع المنتج"
          placeholder="هل تقدم منتج ام خدمة؟"
          validation="required"
        />

        <FormulateInput
          v-if="!!formValues.amountType && formValues.amountType === 'limited'"
          class="column is-3-desktop"
          name="available"
          type="number"
          label="الكمية المتاحة"
          placeholder="الكمية المتاحة من المنتج"
          validation="required"
        />
        <div
          v-if="!!formValues.amountType && formValues.amountType === 'limited'"
          class="column is-3-desktop"
        >
          <FormulateInput
            name="alarm"
            class="column"
            type="checkbox"
            label="هل تريد إشعار عند قرب انتهاء مدة المنتج؟"
          />

          <FormulateInput
            v-if="formValues.alarm"
            class="column"
            name="alarmAmount"
            type="number"
            label="الكمية المتاحة"
            placeholder="الكمية المتاحة من المنتج"
            validation="required"
          />
        </div>

        <div class="overflow-hidden w-full column is-3-desktop">
          <h4 class="text-md my-3">أين تريد أن يظهر هذا المنتج؟</h4>
          <FormulateInput
            class="inline"
            name="visible[website]"
            type="checkbox"
            label="الموقع"
          />
          <FormulateInput
            class="inline"
            name="visible[app]"
            type="checkbox"
            label="تطبيق الهاتف"
          />
        </div>
      </div>
      <!-- <button class="btn btn-primary btn-sm" @click="addProduct">أضف</button> -->
      <FormulateInput type="submit" :label="oldProduct ? 'تعديل' : 'أضف'" />
    </FormulateForm>
    <b-loading v-model="isLoading" :can-cancel="false" is-full-page />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ICategory from '~/interfaces/category'
import IProduct from '~/interfaces/product'
import uploader from '~/utils/uploader'
export default Vue.extend({
  name: 'ProductForm',
  props: {
    oldProduct: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      store: {},
      isLoading: false,
      images: [] as string[],
      product: {} as IProduct,
      formValues: {} as any,
      categories: [] as {
        label: string
        value: string
        name?: string
        _id?: string
      }[],
      selectedCategories: {} as ICategory,
      productImages: '',
      once: 0,
    }
  },
  watch: {
    oldProduct: {
      deep: true,
      handler(val) {
        if (val) {
          this.formValues = {
            selectedCategories: val.category._id,
            name: val.name,
            desc: val.desc,
            price: val.price,
            amountType: val.amount.amountType,
            available: val.amount.available,
            alarm: val.amount.alarm,
            alarmAmount: val.amount.alarmAmount,
            url: val.url,
            'visible[website]': val.visible.store,
            'visible[app]': val.visible.app,
          }
        }
      },
    },
  },
  mounted() {
    this.getCategories()
    this.getStore()
  },
  methods: {
    uploader,
    reset() {
      this.formValues = {}
      this.product = {} as IProduct
      this.images = []
    },
    async getStore() {
      const res = await this.$axios.get(
        `/stores/one/${this.$route.params.storeName}`
      )
      this.store = res.data.store
    },
    async createProduct(data) {
      const images: any = await this.uploader(this.images)
      return {
        images: !this.oldProduct ? images : this.oldProduct.images,
        name: data.name,
        desc: data.desc,
        price: data.price,
        category: data.selectedCategories,
        amount: {
          amountType: data.amountType,
          available: data.available,
          alarm: data.alarm,
          alarmAmount: data.alarmAmount,
        },
        url: data.url,
        visible: {
          store: data['visible[website]'],
          app: data['visible[app]'],
        },
        storeName: this.$route.params.storeName,
      }
    },
    async addProduct(data) {
      try {
        this.isLoading = true

        const product = await this.createProduct(data)
        await this.$axios.$post('/products', product)
        this.reset()
        this.$store.dispatch('showToast', {
          message: 'تمت إضافة المنتج بنجاح',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
      this.isLoading = false
    },
    async editProduct(data) {
      try {
        this.isLoading = true
        const product = await this.createProduct(data)
        await this.$axios.$patch(`/products/${this.$route.params.id}`, product)
        this.reset()
        this.$store.dispatch('showToast', {
          message: 'تم تعديل المنتج بنجاح',
          type: 'success',
        })
        this.$router.push(`/dashboard/${this.$route.params.storeName}/products`)
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error,
          type: 'error',
        })
      }
      this.isLoading = false
    },
    async getCategories() {
      this.categories = await this.$axios
        .$get(`/categories?storeName=${this.$route.params.storeName}`)
        .catch((err) => {
          this.$store.dispatch('showToast', {
            message: err.response.data.msg,
            type: 'error',
          })
        })
      this.categories = this.categories.map((cat) => {
        return { label: cat.name!, value: cat._id! }
      })
    },
  },
})
</script>

<style scoped></style>
