<template>
  <div class="container mx-auto">
    <h2 class="text-2xl">أضف منتج</h2>

    <FormulateForm
      v-model="formValues"
      class="login-form"
      @submit="oldProduct ? editProduct($event) : addProduct($event)"
    >
      <div class="grid grid-cols-1 lg:grid-cols-3">
        <client-only>
          <FormulateInput
            :key="oldProduct.images"
            type="image"
            name="files"
            label="صور المنتج"
            :value="oldProduct.images"
            validation="mime:image/jpeg,image/png,image/gif"
            multiple
            :uploader="uploader"
            upload-behavior="delayed"
          />
        </client-only>
        <FormulateInput
          name="name"
          type="text"
          label="اسم المنتج"
          placeholder="اسم المنتج"
          validation="required"
        />

        <FormulateInput
          name="url"
          type="text"
          label="رابط المنتج"
          help="ادخل رابط خاص للمنتج للمساعدة في ظهوره بشكل اكبر في محركات البحث"
          placeholder="مثال: جاكيت أطفال جلد مقاس 45"
          validation="required"
        />

        <FormulateInput
          name="desc"
          type="textarea"
          label="وصف المنتج"
          placeholder="وصف المنتج"
          validation="required"
        />

        <FormulateInput
          name="price"
          type="number"
          label="سعر المنتج"
          placeholder="سعر المنتج"
          validation="required"
        />

        <div class="md:col-span-3 my-3">
          <h4 class="text-lg my-3">الفئات</h4>
          <ul class="mb-3">
            <li v-for="(cat, idx) in selectedCategories" :key="cat._id">
              <p class="inline-block ml-3">{{ cat.name }}</p>
              <button
                class="btn btn-error btn-square btn-xs mx-3"
                @click="selectedCategories.splice(idx, 1)"
              >
                <i class="ri-delete-bin-line"></i>
              </button>
            </li>
          </ul>
          <autocomplete
            :search="search"
            placeholder="اختر الفئات التي يندرج تحتها المنتج"
            aria-label="اختر الفئات التي يندرج تحتها المنتج"
            :get-result-value="getResultValue"
            @submit="handleCategory"
          />
        </div>

        <FormulateInput
          name="amountType"
          type="select"
          :options="{ limited: 'منتج', unlimited: 'خدمة' }"
          label="نوع المنتج"
          placeholder="هل تقدم منتج ام خدمة؟"
          validation="required"
        />

        <FormulateInput
          v-if="!!formValues.amountType && formValues.amountType === 'limited'"
          name="available"
          type="number"
          label="الكمية المتاحة"
          placeholder="الكمية المتاحة من المنتج"
          validation="required"
        />
        <div
          v-if="!!formValues.amountType && formValues.amountType === 'limited'"
        >
          <FormulateInput
            name="alarm"
            type="checkbox"
            label="هل تريد إشعار عند قرب انتهاء مدة المنتج؟"
          />

          <FormulateInput
            v-if="formValues.alarm"
            name="alarmAmount"
            type="number"
            label="الكمية المتاحة"
            placeholder="الكمية المتاحة من المنتج"
            validation="required"
          />
        </div>

        <div class="overflow-hidden w-full">
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
      images: [] as string[],
      product: {} as IProduct,
      formValues: {} as any,
      categories: [] as ICategory[],
      selectedCategories: [] as ICategory[],
      productImages: '',
    }
  },
  watch: {
    oldProduct: {
      deep: true,
      handler(val) {
        if (val) {
          this.selectedCategories = val.category
          this.formValues = {
            files: val.images,
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
  },
  methods: {
    uploader,
    reset() {
      this.product = {} as IProduct
    },
    createProduct(data) {
      const images: string[] = []
      data.files.forEach((x: { name: string; url: string }[]) => {
        images.push(x[0].url)
      })
      return {
        images,
        name: data.name,
        desc: data.desc,
        price: data.price,
        category: this.selectedCategories.map((cat) => cat._id),
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
        const product = this.createProduct(data)
        await this.$axios.$post('/products', product)
        this.reset()
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تمت إضافة المنتج بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },
    async editProduct(data) {
      try {
        const product = this.createProduct(data)
        await this.$axios.$patch(`/products/${this.$route.params.id}`, product)
        this.reset()
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تم تعديل المنتج بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },
    async getCategories() {
      this.categories = await this.$axios
        .$get(`/categories?storeName=${this.$route.params.storeName}`)
        .catch((err) => {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: err,
          })
        })
    },
    search(input) {
      if (input.length < 1) {
        return []
      }
      return this.categories.filter((category) => {
        return category.name.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getResultValue(result) {
      return result.name
    },
    handleCategory(result) {
      if (!result) return
      return this.selectedCategories.push(result)
    },
  },
})
</script>

<style scoped>
</style>
