<template>
  <div class="container mx-auto">
    <h2 class="text-2xl">أضف منتج</h2>

    <input id="images" name="img[]" type="file" multiple accept="images/*" />

    <FormulateForm v-model="formValues" class="login-form">
      <div class="grid grid-cols-1 lg:grid-cols-3">
        <FormulateInput
          name="name"
          type="text"
          label="اسم المننج"
          placeholder="اسم المننج"
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
          placeholder="وصف المننج"
          validation="required"
        />

        <FormulateInput
          name="price"
          type="number"
          label="سعر المننج"
          placeholder="سعر المننج"
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
        <div>
          <h4 class="text-md my-3">أين تريد أن يظهر هذا المنتج؟</h4>
          <FormulateInput
            name="visible[website]"
            type="checkbox"
            label="الموقع"
          />
          <FormulateInput
            name="visible[app]"
            type="checkbox"
            label="تطبيق الهاتف"
          />
        </div>
      </div>
      <button class="btn btn-primary btn-sm" @click="addProduct">أضف</button>
    </FormulateForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ICategory from '~/interfaces/category'
import IProduct from '~/interfaces/product'

export default Vue.extend({
  name: 'AddProductForm',
  layout: 'admin',
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
  mounted() {
    this.getCategories()
  },
  methods: {
    async uploadFile() {
      try {
        const input = document.getElementById('images') as HTMLInputElement
        if (input && input.files) {
          for (let i = 0; i < input.files.length; i++) {
            const formData = new FormData()
            formData.append('img', input.files[i])
            const result = await this.$axios.post('/image', formData)
            this.images.push(result.data)
          }
        }
      } catch (err) {
        console.log('Unable to upload file')
      }
    },
    reset() {
      this.product = {} as IProduct
    },
    async addProduct() {
      try {
        await this.uploadFile()
        const product = {
          images: this.images,
          name: this.formValues.name,
          desc: this.formValues.desc,
          price: this.formValues.price,
          category: this.selectedCategories.map((cat) => cat._id),
          amount: {
            amountType: this.formValues.amountType,
            available: this.formValues.available,
            alarm: this.formValues.alarm,
            alarmAmount: this.formValues.alarmAmount,
          },
          url: this.formValues.url,
          visible: {
            store: this.formValues['visible[website]'],
            app: this.formValues['visible[app]'],
          },
          storeName: this.$route.params.storeName,
        }
        await this.$axios.$post('/products', product)
        this.reset()
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تمت إضافة الفئة بنجاح',
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
            type: 'success',
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
