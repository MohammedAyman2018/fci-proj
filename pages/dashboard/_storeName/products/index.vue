<template>
  <div class="container mx-auto px-2">
    <div class="justify-between flex items-center my-3">
      <h2 class="text-2xl mb-3">كل المنتجات</h2>
      <button
        class="btn btn-primary btn-sm"
        @click="
          $router.push(`/dashboard/${$route.params.storeName}/products/add`)
        "
      >
        أضف منتج
      </button>
    </div>

    <modal name="delete-product" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">حذف المنتج</h2>
        <p>هل انت واثق انك تريد حذف المنتج؟</p>

        <div class="mt-5">
          <button class="btn btn-error btn-sm" @click="removeProduct">
            نعم
          </button>
          <button
            class="btn btn-error btn-sm"
            @click="closeModal('delete-product')"
          >
            إلغاء
          </button>
        </div>
      </div>
    </modal>

    <vue-good-table
      :columns="[
        { label: 'اسم المنتج', field: 'name' },
        { label: 'تاريخ الانشاء', field: 'createdAt' },
        { label: 'العمليات المتاحة', field: 'operations' },
      ]"
      :rows="products"
      :rtl="true"
      :search-options="{ enabled: true, placeholder: 'ابحث في الجدول' }"
      max-height="auto"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'createdAt'">
          <span>{{ props.row.createdAt.substr(0, 10) }}</span>
        </span>
        <span v-else-if="props.column.field == 'operations'">
          <div data-tip="تعديل" class="tooltip">
            <button
              class="btn btn-warning btn-square btn-xs"
              @click="openModal('edit-product', props.row)"
            >
              <i class="ri-pencil-line"></i>
            </button>
          </div>
          <div data-tip="حذف" class="tooltip">
            <button
              class="btn btn-error btn-square btn-xs"
              @click="openModal('delete-product', props.row)"
            >
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <div slot="emptystate">لا توجد فئات حتى الآن</div>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IProduct from '@/interfaces/product'

export default Vue.extend({
  name: 'ProductPage',
  data() {
    return {
      product: {} as IProduct,
      edit: false,
      products: [],
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    openModal(modalName, product) {
      this.product = product
      this.$modal.show(modalName)
    },
    async getProducts() {
      await this.$axios
        .$get(`/products?storeName=${this.$route.params.storeName}`)
        .then((res) => {
          this.products = res
        })
        .catch((err) => {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: err,
          })
        })
    },

    async removeProduct() {
      try {
        await this.$axios.$delete(`/products/${this.product._id}`)
        await this.getProducts()
        this.closeModal('delete-product')
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تم حذف المنتج بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },

    closeModal(modalName) {
      this.product = {} as IProduct
      this.edit = true
      this.$modal.hide(modalName)
    },
  },
})
</script>

<style scoped>
</style>
