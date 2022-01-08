<template>
  <div class="container mx-auto">
    <h2 class="text-2xl">أضف منتج</h2>

    <FormulateForm v-model="formValues" class="login-form">
      <div class="grid grid-cols-1 md:grid-cols-3">
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
          <div class="flex">
            <FormulateInput
              name="visibleStore"
              type="checkbox"
              label="الموقع"
            />
            <FormulateInput
              name="visibleStore"
              type="checkbox"
              label="تطبيق الهاتف"
            />
          </div>
        </div>
      </div>
    </FormulateForm>

    {{ formValues }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ICategory from '~/interfaces/category'
import IProduct from '~/interfaces/product'

export default Vue.extend({
  name: 'AddProductForm',
  data() {
    return {
      product: {} as IProduct,
      formValues: {},
      categories: [] as ICategory[],
      selectedCategories: [] as ICategory[],
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    reset() {
      this.product = {} as IProduct
    },
    async addProduct() {
      try {
        await this.$axios.$post('/categories', {
          ...this.product,
          storeName: this.$route.params.storeName,
        })
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
