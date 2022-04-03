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
    <modal name="offer-modal" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">إضافة عرض</h2>

        <FormulateForm @submit="makeOffer">
          <FormulateInput
            type="number"
            name="amount"
            help="إذا أردت اضافة عرض 30% فقط اكتب 30"
            placeholder="مثال: 30"
            validation="required|number|min:0|max:100"
            label="نسبة العرض"
          />

          <div class="mt-5">
            <FormulateInput type="submit" label="أنشئ" />
            <button
              class="btn btn-error btn-sm"
              type="button"
              @click="closeModal('offer-modal')"
            >
              إلغاء
            </button>
          </div>
        </FormulateForm>
      </div>
    </modal>

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
        { label: 'السعر', field: 'price', type: 'number' },
        { label: 'لديه عرض', field: 'hasOffer', type: 'boolean' },
        { label: 'نسبة العرض', field: 'offerAmount', type: 'number' },
        { label: 'عدد الطلبات', field: 'ordered', type: 'number' },
        { label: 'عدد الزيارات', field: 'views', type: 'number' },
        { label: 'الكمية المتاحة', field: 'amount.available', type: 'number' },
        {
          label: 'تاريخ الانشاء',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`,
          dateOutputFormat: 'MMM dd yyyy',
        },
        {
          label: 'العمليات المتاحة',
          field: 'operations',
          sortable: false,
          globalSearchDisabled: true,
        },
      ]"
      :rows="products"
      :rtl="true"
      :select-options="{
        enabled: true,
        selectionInfoClass: 'make-rtl',
        selectionText: 'الصفوف المختارة',
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :search-options="{ enabled: true, placeholder: 'ابحث في الجدول' }"
      max-height="auto"
      @on-selected-rows-change="selectionChanged"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'price'">
          <span>{{ props.row.price }} جنيه</span>
        </span>
        <span v-else-if="props.column.field == 'hasOffer'">
          <span>{{ props.row.hasOffer ? 'نعم' : 'لا' }} </span>
        </span>
        <span v-else-if="props.column.field == 'amount.available'">
          <span>{{ props.row.amount.available }} قطعة</span>
        </span>
        <span v-else-if="props.column.field == 'createdAt'">
          <span>{{ props.row.createdAt.substr(0, 10) }}</span>
        </span>
        <span v-else-if="props.column.field == 'operations'" class="flex">
          <div data-tip="تعديل" class="tooltip mx-1">
            <button
              class="btn btn-warning btn-square btn-xs"
              @click="
                $router.push(
                  `/dashboard/${$route.params.storeName}/products/edit/${props.row._id}`
                )
              "
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
      <div slot="selected-row-actions">
        <button class="btn btn-primary btn-sm" @click="$modal.show('offer-modal')">
          انشئ عرض بالمنتجات المختارة
        </button>
        <button class="btn btn-error btn-sm" @click="removeOffer">
حذف العرض من المنتجات المختارة
        </button>
      </div>
      <div slot="emptystate">لا توجد فئات حتى الآن</div>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import clonDeep from 'lodash.clonedeep'
import IProduct from '@/interfaces/product'
export default Vue.extend({
  name: 'ProductPage',
  layout: 'admin',
  data() {
    return {
      product: {} as IProduct,
      edit: false,
      products: [],
      selectedRows: [],
    }
  },
  head () {
    return {
      title: 'إدارة المنتجات'
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
        .$get(`/products?storeName=${this.$route.params.storeName}`, {
          headers: { admin: true },
        })
        .then((res) => {
          this.products = res
        })
        .catch((err) => {
          this.$store.dispatch('showToast', {
            message: err.response.data.msg,
            type: 'error',
          })
        })
    },
    clonDeep,
    async removeProduct() {
      try {
        await this.$axios.$delete(`/products/${this.product._id}`)
        await this.getProducts()
        this.closeModal('delete-product')
        this.$store.dispatch('showToast', {
          message: 'تم حذف المنتج بنجاح',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },
    async removeOffer() {
      if (confirm('هل حقاً تريد حذف العرض من المنتجات المختارة؟')) {
        for (let idx = 0; idx < this.selectedRows.length; idx++) {
          const product: IProduct = this.selectedRows[idx]
          try {
            await this.$axios.$patch(`/products/${product._id}`, {
              hasOffer: false,
              offerAmount: 0,
            })
          } catch (error: any) {
            return this.$store.dispatch('showToast', {
              message: error.response.data.msg,
              type: 'error',
            })
          }
        } // end for
        this.$modal.hide('offer-modal')
        this.getProducts()
        this.$store.dispatch('showToast', {
          message: 'تم  حذف العرض',
          type: 'success',
        })
      }
    },
    async makeOffer(data: { amount: string }) {
      for (let idx = 0; idx < this.selectedRows.length; idx++) {
        const product: IProduct = this.selectedRows[idx]
        try {
          await this.$axios.$patch(`/products/${product._id}`, {
            hasOffer: true,
            offerAmount: Number(data.amount),
          })
        } catch (error: any) {
          return this.$store.dispatch('showToast', {
            message: error.response.data.msg,
            type: 'error',
          })
        }
      } // end for
      this.$modal.hide('offer-modal')
      this.getProducts()
      this.$store.dispatch('showToast', {
        message: 'تم إضافة العرض',
        type: 'success',
      })
    },
    selectionChanged(selectedRows) {
      this.selectedRows = selectedRows.selectedRows
    },
    closeModal(modalName) {
      this.product = {} as IProduct
      this.edit = true
      this.$modal.hide(modalName)
    },
  },
})
</script>

<style scoped></style>
